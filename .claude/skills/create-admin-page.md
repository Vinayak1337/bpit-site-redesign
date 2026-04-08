# Skill: Create an Admin Page

Use this skill when adding a new editable admin page or a new editable section to an existing page.

---

## Architecture Overview

Every public page has a corresponding admin page. The public component is re-rendered identically in the admin panel, but each section is wrapped in the `Editable` click-to-edit overlay. Clicking a section opens a Sheet (or Dialog) with a form. Saving calls a server action that writes to the DB, creates an audit log, and revalidates the cache. The section preview updates live as the form changes.

### Data flow

```
Admin page (RSC) → fetch all section data in parallel (server actions)
  → pass data to *Editor client components
    → each Editor wraps the public component in <Editable>
      → form opens in Sheet/Dialog
        → form onChange → local state → live preview updates
          → onSubmit → server action (validate → DB write → audit log → revalidateTag)
```

### Rules
- **No hardcoded data in components.** All data comes from props.
- **`server-only`** must be imported in every action file.
- **`requireAdmin()`** must be called at the top of every server action and every admin page server component.
- **`createAuditLog()`** must be called in every action that mutates data.
- **Seed script** must exist for every page under `scripts/seed-<pagename>.cjs`.
- **`admin-page-map.ts`** must be updated when a new admin page is created.
- Components are reusable across the site — the same component is used on both the public page and the admin preview.

---

## File Structure for a New Page

```
src/
  app/
    (Public Pages)/
      <pagename>/
        page.tsx                      ← public page (RSC, uses public action)
        components/
          SectionAComponent.tsx       ← reusable section, data from props only
          SectionBComponent.tsx

    (Private Pages)/
      actions/
        <pagename>.ts                 ← server actions (server-only, requireAdmin, audit log)

      admin/
        <pagename>/
          page.tsx                    ← admin page (RSC, fetches all section data)
          components/
            SectionAEditor.tsx        ← wraps SectionAComponent in <Editable>
            SectionAForm.tsx          ← React Hook Form form for Section A
            SectionBEditor.tsx
            SectionBForm.tsx

  data/
    admin-page-map.ts                 ← register the new public→admin URL mapping

scripts/
  seed-<pagename>.cjs                 ← seed script with realistic dummy data
```

---

## Step-by-Step: Adding a New Admin Page

### 1. Public Component

Create each section as a pure component that accepts all data via props:

```tsx
// src/app/(Public Pages)/<page>/components/HeroSection.tsx
type Props = {
  title: string;
  subtitle: string;
  image: string;
};

export default function HeroSection({ title, subtitle, image }: Props) {
  return ( /* JSX using only props */ );
}
```

### 2. Server Action

```ts
// src/app/(Private Pages)/actions/<pagename>.ts
'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';
import { revalidateTag, unstable_cache } from 'next/cache';

const CACHE_TAG = '<pagename>_hero';
const COMPONENT_KEY = 'HERO';  // must match DB seeded key

// pageSlug is validated separately — it identifies which page's component to update
const pageSlugSchema = z.string().min(1);

const heroSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  image: z.string().url().optional(),
});

export type HeroData = z.infer<typeof heroSchema>;

// READ — use cache
export const getHero = unstable_cache(
  async (pageSlug: string) => {
    const comp = await prisma.component.findFirst({
      where: { page: { slug: pageSlug }, key: COMPONENT_KEY }
    });
    const raw = comp?.data as Record<string, unknown> | null;
    return heroSchema.parse(raw ?? { title: '', subtitle: '' });
  },
  [CACHE_TAG],
  { tags: [CACHE_TAG] }
);

// WRITE — validate, write, audit log, revalidate
export async function updateHero(
  pageSlug: string,
  data: HeroData
): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = await requireAdmin();

  // Validate both pageSlug and the payload
  const slugParsed = pageSlugSchema.safeParse(pageSlug);
  if (!slugParsed.success) return { ok: false, error: 'invalid_slug' };

  const parsed = heroSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: 'invalid_payload' };

  const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
  if (!page) return { ok: false, error: 'page_not_found' };
  const comp = await prisma.component.findFirst({
    where: { pageId: page.id, key: COMPONENT_KEY }
  });
  if (!comp) return { ok: false, error: 'component_not_found' };

  const previousData = comp.data;
  await prisma.component.update({
    where: { id: comp.id },
    data: { data: parsed.data }
  });

  await createAuditLog({
    actorId: admin.id,
    action: 'UPDATE',
    resourceType: 'COMPONENT',
    summary: `Updated hero for page ${pageSlug}`,
    changes: [{
      resourceId: comp.id,
      resourceType: 'COMPONENT',
      field: 'data',
      previousData: previousData === null ? undefined : previousData as Prisma.InputJsonValue,
      newData: parsed.data as unknown as Prisma.InputJsonValue,
    }],
  });

  revalidateTag(CACHE_TAG);
  return { ok: true };
}
```

### 3. Form Component

```tsx
// src/app/(Private Pages)/admin/<pagename>/components/HeroForm.tsx
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateHero, type HeroData } from '@/app/(Private Pages)/actions/<pagename>';

type Props = {
  initialData: HeroData;
  onChange?: (data: HeroData) => void;
  pageSlug: string;
};

export default function HeroForm({ initialData, onChange, pageSlug }: Props) {
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<HeroData>({
    resolver: zodResolver(heroSchema),
    defaultValues: initialData,
  });

  // Live preview sync
  useEffect(() => {
    const sub = watch((values) => onChange?.(values as HeroData));
    return () => sub.unsubscribe();
  }, [watch, onChange]);

  async function onSubmit(data: HeroData) {
    const result = await updateHero(pageSlug, data);
    if (result.ok) toast.success('Saved');
    else toast.error('Failed to save');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-4'>
      <div className='space-y-1'>
        <Label>Title</Label>
        <Input {...register('title')} />
      </div>
      <div className='space-y-1'>
        <Label>Subtitle</Label>
        <Input {...register('subtitle')} />
      </div>
      <Button type='submit' disabled={isSubmitting}>Save</Button>
    </form>
  );
}
```

### 4. Editor Component (wraps public component with Editable)

```tsx
// src/app/(Private Pages)/admin/<pagename>/components/HeroEditor.tsx
'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import HeroSection from '@/app/(Public Pages)/<pagename>/components/HeroSection';
import HeroForm from './HeroForm';
import type { HeroData } from '@/app/(Private Pages)/actions/<pagename>';

type Props = { initialData: HeroData; pageSlug: string };

export default function HeroEditor({ initialData, pageSlug }: Props) {
  const initial = useMemo(() => initialData, [initialData]);
  const [data, setData] = useState(initial);

  return (
    <Editable
      label='Hero'
      formContent={<HeroForm initialData={initial} onChange={setData} pageSlug={pageSlug} />}
    >
      <HeroSection {...data} />
    </Editable>
  );
}
```

### 5. Admin Page (RSC)

```tsx
// src/app/(Private Pages)/admin/<pagename>/page.tsx
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getHero } from '@/app/(Private Pages)/actions/<pagename>';
import HeroEditor from './components/HeroEditor';

export default async function AdminPagenamePage() {
  await requireAdmin();
  const [hero] = await Promise.all([
    getHero('pagename'),
    // ... other sections
  ]);
  return (
    <div>
      <HeroEditor initialData={hero} pageSlug='pagename' />
      {/* other editors */}
    </div>
  );
}
```

### 6. Seed Script

```js
// scripts/seed-<pagename>.cjs
async function main() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  const pageSlug = '<pagename>';

  const page = await prisma.page.upsert({
    where: { slug: pageSlug },
    update: {},
    create: { slug: pageSlug, title: 'Page Title', kind: 'PAGE', status: 'PUBLISHED', metadata: { seeded: true } }
  });

  await prisma.component.upsert({
    where: { pageId_key: { pageId: page.id, key: 'HERO' } },
    update: {},
    create: {
      pageId: page.id,
      key: 'HERO',
      data: { title: 'Welcome', subtitle: 'Subtitle here', image: 'https://...' }
    }
  });

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
```

Add it to `scripts/seed.cjs`:
```js
// At the end of the main seed runner:
const seedPagename = require('./seed-<pagename>.cjs');
await seedPagename();
```

### 7. Register in admin-page-map.ts

```ts
// src/data/admin-page-map.ts
'/<pagename>': {
  adminHref: '/admin/<pagename>',
  status: 'complete',
  editingMode: 'live',
},
// Sub-pages (accessible via in-page nav, not in navbar):
'/<pagename>/sub-section': {
  adminHref: '/admin/<pagename>/sub-section',
  status: 'complete',
  editingMode: 'live',
},
```

---

## Sub-Pages Pattern

Sub-pages are public pages accessible via in-page navigation (tabs, links within a page) — NOT in the main navbar. Examples: `/about/principal-message`, `/admissions/process`, `/student-life/clubs`.

Each sub-page gets its own admin route:
```
/admin/<parent>/<sub>/page.tsx     ← same pattern as parent but for sub-page sections
```

The `/admin/pages` navigation hub (`src/data/admin-page-map.ts`) lists them as expandable children of their parent page.

---

## Presentation: Sheet vs Dialog

| Form complexity | Presentation | Width |
|---|---|---|
| < 15 fields | Sheet (default) | `sm:max-w-xl` (default in Editable) |
| 15–30 fields | Sheet with `contentClassName='sm:max-w-2xl'` | `sm:max-w-2xl` |
| 30+ fields, nested arrays | Dialog via `presentation='dialog'` | `h-[92vh] w-[96vw]` |
| Very complex (like Gallery) | Custom Dialog with live preview side-by-side | `h-[96vh] w-[98vw]` |

---

## Global Announcement Banner

The `ImportantAnnouncement` component (`src/components/header/ImportantAnnouncement.tsx`) is the scrolling ticker bar shown above the navbar. It is editable via `HeaderAnnouncementsEditor` on the home admin page. It is NOT a separate page — it's part of the header and uses the `HEADER_ANNOUNCEMENTS` component key with the `main` pageSlug.

---

## Checklist

When creating a new admin page:

- [ ] Public components accept all data via props (no hardcoded data)
- [ ] Action file has `'use server'` + `import 'server-only'`
- [ ] Action file calls `requireAdmin()` before any mutation
- [ ] Action file calls `createAuditLog()` after every DB write
- [ ] Action file uses Zod schema for validation (no `as any`)
- [ ] `pageSlug` validated with `z.string().min(1)` before DB lookup
- [ ] Action uses `unstable_cache` + `revalidateTag` for reads/writes
- [ ] Form component uses `react-hook-form` + `zodResolver`
- [ ] Form calls `watch()` and `onChange?.()` for live preview sync
- [ ] Editor component wraps public component in `<Editable>`
- [ ] Admin page calls `requireAdmin()` and fetches all data in `Promise.all`
- [ ] Seed script created and registered in `seed.cjs`
- [ ] Entry added to `src/data/admin-page-map.ts`
- [ ] Sub-pages have their own admin routes and map entries
