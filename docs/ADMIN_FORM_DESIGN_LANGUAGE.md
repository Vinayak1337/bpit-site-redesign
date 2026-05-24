# Admin Form Design Language

This document is the single source of truth for the look, feel, and behavior of every form in the admin app (any file under `src/app/(Private Pages)/admin/**`). The motto: **flat, calm, and scannable — never boxes inside boxes**.

If you are about to create or edit an admin form, read this first. Use the primitives in `src/app/(Private Pages)/admin/components/form-kit.tsx` — do not inline new visual treatments. If you need something that isn't in the kit, add it to the kit, then use it.

---

## 1. Principles

1. **One container, one card** — the form is rendered inside an `Editable` sheet that already provides padding and a panel. Do **not** add another `rounded-xl border bg-white shadow` wrapper around the whole form.
2. **No nested borders** — at most one bordered surface deep. A field inside an item card never gets its own border/box. Use whitespace and labels to group, not chrome.
3. **Sections are headings, not cards** — a section is `<h3>` + 1-line helper + content. No border, no background.
4. **Repeatable items use ONE light card** — a single `rounded-lg border border-slate-200 bg-slate-50/60` card with `p-4`, no shadow, subtle hover. Children inside the item are flat fields and one optional toggle.
5. **No decorative chrome inside cards** — no gradient icon tiles, no oversized icon pills, no "position badge" floating chips, no rainbow buttons. Use one accent color (blue-600/700) for primary actions, slate for everything else.
6. **Save state is one bar, in one place** — a sticky bottom action bar with: subtle status text on the left, secondary + primary action on the right. Not a status pill in the header, a status pill in the section, and a status pill on the button.
7. **Predictable density** — `space-y-6` between sections, `space-y-4` inside a section, `space-y-3` inside an item card.

---

## 2. Anatomy of an admin form

```
<AdminForm>                       // root <form>, no card
  <AdminFormHeader                // optional, only when a sheet doesn't supply a title
    title="Footer contacts"
    description="…" />

  <AdminFormSection
    title="Quick links"
    description="…"
    action={<AddButton />}>       // optional inline action
    …content…
  </AdminFormSection>

  <AdminFormSection title="Stats">
    …
  </AdminFormSection>

  <AdminFormFooter                // sticky bottom bar, status + save
    status={…}
    onReset={…}
    saving={isPending} />
</AdminForm>
```

### Inside a section

For repeatable lists:

```
<AdminItemList>
  {items.map((item, i) => (
    <AdminItemCard
      key={item.id}
      index={i}
      total={items.length}
      title={item.label}
      subtitle={item.href}
      onMove={…}
      onRemove={…}>
      <AdminFieldGrid>
        <AdminField label="Label">…input…</AdminField>
        <AdminField label="URL">…input…</AdminField>
      </AdminFieldGrid>
      <AdminToggle label="Show on site" … />
    </AdminItemCard>
  ))}
</AdminItemList>
<AddRowButton onClick={…}>Add link</AddRowButton>
```

For singletons, skip the item card entirely:

```
<AdminFieldGrid cols={2}>
  <AdminField label="Heading">…</AdminField>
  <AdminField label="Sub-heading">…</AdminField>
</AdminFieldGrid>
```

---

## 3. Spacing & sizing

| Token            | Value                          | Use                                    |
| ---------------- | ------------------------------ | -------------------------------------- |
| section gap      | `space-y-6`                    | between sections                       |
| in-section gap   | `space-y-4`                    | inside a section                       |
| in-item gap      | `space-y-3`                    | inside an item card                    |
| field grid gap   | `gap-4`                        | between fields in a grid               |
| input height     | `h-10`                         | Input, Select, button trigger          |
| button height    | shadcn default                 | do not override                        |
| outer padding    | _none_ from the form           | sheet provides padding                 |
| item padding     | `p-4`                          | single bordered item card              |

---

## 4. Color & elevation

- **Background**: the form itself has no background color — inherits from the sheet.
- **Item card**: `border border-slate-200 bg-slate-50/60`. No shadow. Hover: `hover:bg-slate-50`. Do not add a second border on hover.
- **Inputs**: shadcn defaults, `bg-white`. Focus uses the built-in focus ring; do not stack a custom `ring-blue-200`.
- **Primary action**: `bg-blue-700 hover:bg-blue-800`. Never `bg-gradient-to-r from-sky-… via-blue-… to-indigo-…`.
- **Destructive action**: ghost button with `text-rose-600 hover:bg-rose-50`.
- **Disabled state**: rely on shadcn `disabled:` styles; do not add `opacity-50` manually.
- **Dividers**: `border-slate-200` only. Never `border-2`, never `ring-4`.

---

## 5. Typography

- Section title: `text-base font-semibold text-slate-900`.
- Section description: `text-sm text-slate-500`.
- Field label: `text-sm font-medium text-slate-700`. (Not uppercase tracking-widest mini caps — they read as decoration.)
- Helper text under a field: `text-xs text-slate-500`.
- Error text: `text-xs text-rose-600`.

---

## 6. Status, save, reset

- Saving state lives in **one** sticky bottom bar (`AdminFormFooter`).
- Status text format: `Saved`, `Saving…`, or an error sentence. No emoji, no icon pill.
- Use `aria-live="polite"` on the status text.
- A success message auto-clears after 4 seconds.

---

## 7. Toggles & switches

- Use `AdminToggle` (a switch). Always inline with its label inside the item card — never inside a separate bordered row.
- Hidden / disabled items get a `Hidden` pill in the item card header. The card itself stays the same size (do not gray out the whole card).

---

## 8. Reordering

- Up/Down controls are a single segmented control via `AdminReorderControls` — never two separate outline buttons.
- Disabled state when at the edges.
- Remove is a destructive ghost button next to reorder controls — never a full-width red box.

---

## 9. Icons

- Icon select uses `AdminIconSelect` — a single dropdown with a leading 28px square preview. Do not also render the icon inside a gradient tile in the item header.
- Choose icons from the existing whitelist in `form-kit.tsx`. Adding new ones is fine; keep the list sorted.

---

## 10. Tabs

- Use tabs only when a form has **5+ logical sections**. Below that, scroll is faster.
- Tab list style: shadcn defaults. Do not add a sticky tab bar with a separate background.
- Tab content uses the same `AdminFormSection` primitive as a non-tabbed form.

---

## 11. Anti-patterns (do not do these)

- ❌ Wrapping the whole form in `rounded-xl border bg-white shadow-sm p-6`. The sheet already does that.
- ❌ Nesting `rounded-lg border` inside another `rounded-lg border`.
- ❌ A separate bordered row just to hold a single toggle.
- ❌ Gradient icon tiles (`bg-gradient-to-br from-blue-600 to-indigo-600`) inside item headers.
- ❌ Floating position badges (`-top-2 -left-2 rounded-full …`).
- ❌ Status pills duplicated in the header and the footer.
- ❌ Hover effects that grow shadow or thicken borders — they make cards feel like they jump.
- ❌ `max-h-[70vh] overflow-y-auto` on the form itself — the sheet handles scroll.
- ❌ Custom focus rings (`focus:ring-blue-500/40`) on top of shadcn's built-in ring.

---

## 12. Checklist when adding/editing an admin form

- [ ] Imports `AdminForm`, `AdminFormSection`, `AdminField`, `AdminItemCard`, `AdminFormFooter` from `form-kit.tsx`.
- [ ] No `rounded-xl border … shadow` on the root form.
- [ ] No more than one bordered surface deep.
- [ ] Sections are headings, not cards.
- [ ] One sticky `AdminFormFooter` for save/reset/status.
- [ ] No duplicate status messages.
- [ ] All inputs `h-10`, all buttons shadcn default.
- [ ] Reorder and remove use the kit's controls, not bespoke buttons.
- [ ] No `max-h-[…vh]` or `overflow` on the form itself.

---

## 13. Migration order

Existing forms will be migrated to this language one folder at a time. The priority order:

1. `admin/components/SiteChromeEditor.tsx` (visible on `/admin/home`)
2. `admin/home/components/HeaderAnnouncementsForm.tsx`
3. `admin/components/FooterContactsForm.tsx`
4. Remaining `*Form.tsx` files under `admin/**` (alphabetical by route).

Until a form has been migrated, keep edits behavior-only — do not touch markup that will be replaced. After migration, the form should pass the checklist in §12.
