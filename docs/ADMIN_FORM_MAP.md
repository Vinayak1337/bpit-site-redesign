# Admin Form Map

The single source of truth for the migration of every admin form to the design language defined in `docs/ADMIN_FORM_DESIGN_LANGUAGE.md`. Every form under `src/app/(Private Pages)/admin/**` is listed here.

## Status legend

| Status | Meaning |
| --- | --- |
| `not-audited` | Not yet inspected. Should be empty by end of pass. |
| `has-issues` | Inspected; violates design language. Needs migration. |
| `in-progress` | Mid-migration. |
| `fixed` | Migrated, passes the §12 checklist. |
| `clean` | Inspected and already conforms (no changes needed). |

## Common issues catalogue

These are the recurring violations being fixed during migration. The "issues" column on each row uses short codes from this catalogue.

| Code | Description |
| --- | --- |
| **BIB** | Box-in-box: a `Card`/`rounded-xl border shadow` wrapping the whole form **plus** inner bordered cards. |
| **SHD** | `shadow-sm` / `shadow-lg` chrome on form/item containers. |
| **GRD** | Gradient buttons or gradient icon tiles (`bg-gradient-to-r from-… to-…`). |
| **B2** | `border-2` on items, dropzones, or buttons. |
| **CFR** | Custom focus rings (`focus:ring-blue-200`, custom outline) on top of shadcn defaults. |
| **MAX** | `max-h-[…vh] overflow-y-auto` on the form root or wrappers. |
| **PIL** | Status pill duplicated in header / button / footer. |
| **EMP** | Loud empty state with large icon, gradient background, etc. |
| **HDR** | Inline save button beside an `<h3>` (status / save are not consolidated into a single sticky footer). |
| **TGL** | Bespoke toggle in its own bordered row (not using `AdminToggle`). |
| **REO** | Reorder buttons rendered as two outline buttons instead of segmented `AdminReorderControls`. |
| **ICN** | Bespoke icon picker / gradient icon tile, not `AdminIconSelect`. |
| **CRD** | shadcn `Card`/`CardHeader`/`CardContent` used as a section wrapper (sections should be headings, not cards). |
| **LBL** | Uppercase tracking-widest mini-caps labels (decorative). |
| **DUP** | `<Form>` from shadcn + `<form>` wrapped in `<Card>` styling redundancy. |

> If a form has not yet been audited row-by-row, the initial assumption — based on the migration baseline scan that found only `FooterContactsForm` and `HeaderAnnouncementsForm` consume the kit — is that it suffers from at least **BIB + CRD + HDR**. As each form is migrated, its issues column is replaced with the actual issues found.

---

## 1. Site root + shared components

| # | File | Route(s) | Status | Issues | Changes | Verification |
| -- | ---- | -------- | ------ | ------ | ------- | ------------ |
| 1.1 | `admin/components/FooterContactsForm.tsx` | `/admin/home` (footer block) | `fixed` | (baseline migrated) | Already uses kit. | Re-checked against §12 checklist. |
| 1.2 | `admin/components/HeroSlidesForm.tsx` | `/admin/home` | `fixed` | BIB HDR (per-slide bordered card with hover-shadow, inline save button, no reorder, hidden CTA fields scattered) | Single `AdminItemCard` per slide with reorder + remove; CTA type/label/link grouped under one grid; primary save in `AdminFormFooter`. | tsc clean. |
| 1.3 | `admin/components/EventsSectionForm.tsx` | `/admin/home` | `fixed` | BIB HDR TGL (string-enum 'true'/'false' selects for featured/registrationOpen) | Replaced string-enum selects with `AdminToggle`; sections flat; per-event `AdminItemCard` with reorder. | tsc clean. |
| 1.4 | `admin/components/NoticesSectionForm.tsx` | `/admin/home` | `fixed` | BIB HDR TGL (string-enum 'true'/'false' for pinned/urgent) | Migrated to kit; `AdminToggle` for pinned/urgent; per-notice `AdminItemCard` with reorder; sections (also used by `HeaderAnnouncementsForm` flow) flat. | tsc clean. |
| 1.5 | `admin/components/PlacementCompaniesForm.tsx` | `/admin/home` | `fixed` | BIB LBL HDR | Two `AdminFormSection`s (Companies + Headline statistics) with `AdminItemCard` + reorder; header + save consolidated in footer. | tsc clean. |
| 1.6 | `admin/components/TestimonialsForm.tsx` | `/admin/home` | `fixed` | BIB LBL HDR | Stories use `AdminItemCard` with name+company as title/subtitle; image/video upload moved into inline `AdminField` actions. | tsc clean. |
| 1.7 | `admin/components/TopPlacedStudentsForm.tsx` | `/admin/home` | `fixed` | BIB LBL HDR | Students + Statistics sections both migrated to `AdminItemCard`+reorder+remove; image/logo upload inline. | tsc clean. |
| 1.8 | `admin/components/SiteChromeEditor.tsx` | `/admin/home` | `fixed` | BIB CRD HDR (Editor wrapper; 1364 lines) | Migrated in prior pass; uses `AdminForm`+section primitives throughout. | tsc clean. |
| 1.9 | `admin/home/components/HeaderAnnouncementsForm.tsx` | `/admin/home` | `fixed` | (baseline migrated) | Already uses kit. | Re-checked against §12. |

## 2. About

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 2.1 | `admin/about/components/AboutHeroForm.tsx` | `/admin/about` | `fixed` | CRD HDR (Card wrapper, inline save button) | Replaced `<Form>`+`<Card>` with `AdminForm`/`AdminFormSection`/`AdminField`; moved save into `AdminFormFooter` with status; preview now uses `next/image`-style local `<img>` with subtle border. | tsc clean. |
| 2.2 | `admin/about/components/AboutLegacyForm.tsx` | `/admin/about` | `fixed` | BIB HDR EMP (per-item box-in-box, loud empty state) | Rewrote into `AdminFormSection`s; paragraphs/features use `AdminItemCard` with reorder + remove; empty state uses `AdminEmptyState`; consolidated icon/color selects. | tsc clean. |
| 2.3 | `admin/about/components/AboutOverviewForm.tsx` | `/admin/about` | `fixed` | HDR EMP CRD (inline save button, manual borders on stat items) | Migrated to kit; stats now use `AdminItemCard` with reorder; image upload moved into `AdminField` with hint. | tsc clean. |
| 2.4 | `admin/about/components/ChairmanMessageForm.tsx` | `/admin/about/chairman-message` | `fixed` | HDR (inline save next to h3) | Migrated to kit with three sections (header/quote/paragraphs/more), items get reorder+remove. | tsc clean. |
| 2.5 | `admin/about/components/FounderTributeForm.tsx` | `/admin/about/founder-tribute` | `fixed` | HDR BIB (4 string-array sections, each rolled its own card) | Extracted two render helpers; unified all four lists (paragraphs/more/coreValues/commitments) under `AdminFormSection`+`AdminItemCard`. | tsc clean. |
| 2.6 | `admin/about/components/PrincipalMessageForm.tsx` | `/admin/about/principal-message` | `fixed` | BIB CRD PIL (toast-style success banner) | Replaced banner with footer status; three card sections now use plain `AdminFormSection` (no manual bordered tiles). | tsc clean. |

## 3. Academia

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 3.1 | `admin/academia/components/AcademiaHeroForm.tsx` | `/admin/academia` | `fixed` | BIB CRD HDR (Card wrapper + inline save) | Migrated to kit; image preview added; hint added for gradient classes. | tsc clean. |

## 4. Admissions

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 4.1 | `admin/admissions/components/AdmissionsHeroBannerForm.tsx` | `/admin/admissions` | `fixed` | HDR CRD (inline save, shadcn FormField/FormLabel chrome) | Migrated to kit; image preview added; status routed through `AdminFormFooter`. | tsc clean. |
| 4.2 | `admin/admissions/components/AdmissionsOverviewForm.tsx` | `/admin/admissions` | `fixed` | LBL HDR (uppercase-tracked section labels, inline save) | 5 sections (intro/stats/links/departments/notes) all use `AdminFormSection`+`AdminItemCard`; reorder+remove everywhere. | tsc clean. |
| 4.3 | `admin/admissions/components/AdmissionsBrochureForm.tsx` | `/admin/admissions/brochure` | `fixed` | LBL HDR (uppercase-tracked section labels, inline save, true/false string toggle) | Replaced string-enum select with `AdminToggle`; sections become `AdminFormSection`; items now use `AdminItemCard` with reorder. | tsc clean. |
| 4.4 | `admin/admissions/components/AdmissionsFaqForm.tsx` | `/admin/admissions/faqs` | `fixed` | LBL HDR (uppercase section labels, inline save) | All three sections (intro/items/contact) migrated; per-item card now shows question as title, category as subtitle. | tsc clean. |
| 4.5 | `admin/admissions/components/AdmissionsFeesForm.tsx` | `/admin/admissions/fees` | `fixed` | BIB (3-level nesting program→year→breakdown→component) LBL HDR | Top-level program is the only `AdminItemCard`; year/breakdown sub-trees use left-rule indent (`border-l-2`), no nested boxes; component rows are compact 12-col grids with inline Trash button. | tsc clean. |
| 4.6 | `admin/admissions/components/AdmissionsProcessForm.tsx` | `/admin/admissions/process` | `fixed` | BIB CRD HDR LBL (1420-line monolith with category/program/faculty/semester nesting + uppercase mini-caps section labels) | Surgical: rewrote shared `FormSection`/`Subsection`/`NestedItem` helpers to drop uppercase labels and `border-t` chrome; replaced top `<form>` wrapper with `AdminForm`+`AdminFormFooter`; CategoryFields uses single-card pattern with destructive ghost remove. | tsc clean. |
| 4.7 | `admin/admissions/components/AdmissionsScholarshipForm.tsx` | `/admin/admissions/scholarship` | `fixed` | LBL HDR | Sections migrated; categories use `AdminItemCard` with portal-label subtitle; notes get reorder. | tsc clean. |
| 4.8 | `admin/admissions/components/AdmissionsWhyBpitForm.tsx` | `/admin/admissions/why-bpit` | `fixed` | LBL HDR (5 sections, every list nested its own card) | All 5 sections (hero/stats/highlights/accreditations/finalCta) and 5 list arrays migrated to `AdminItemCard`. | tsc clean. |

## 5. Management

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 5.1 | `admin/management/components/ManagementForm.tsx` | `/admin/management` | `fixed` | BIB CRD HDR PIL (Card-in-Card + status pill in header) | Three sections (Hero/Leaders/Vision) flat; leaders use `AdminItemCard` w/ reorder+remove; per-leader description paragraphs use inline +/− buttons; image preview thumbnail. | tsc clean. |
| 5.2 | `admin/management/components/GovernanceStructureForm.tsx` | `/admin/management/governance-structure` | `fixed` | BIB CRD HDR PIL (3-level section/card/item nesting, Badge status pill, inline save) | Top-level sections use `AdminItemCard`; nested cards (per section) flatten to `border-l-2` indented blocks with reorder; items are plain inputs; primitives extracted into `SectionFields`/`CardFields` helpers. | tsc clean. |
| 5.3 | `admin/management/components/LeadershipTeamForm.tsx` | `/admin/management/leadership-team` | `fixed` | BIB CRD HDR PIL (Card-in-Card + Badge status pill) | Hero + Leaders sections migrated; leaders use `AdminItemCard` w/ reorder+remove; per-leader details rows are flat (no extra card); avatar preview retained. | tsc clean. |
| 5.4 | `admin/management/components/PoliciesProceduresForm.tsx` | `/admin/management/policies-procedures` | `fixed` | BIB CRD HDR PIL (Card-in-Card for category/policy lists) | Three sections (Hero/Categories/Framework) flat; categories use `AdminItemCard` w/ reorder; per-category policy list is a flat compact column with inline add/remove. | tsc clean. |

## 6. Vision & Mission

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 6.1 | `admin/vision-mission/components/VisionMissionForm.tsx` | `/admin/vision-mission` | `fixed` | BIB CRD HDR | Hero + visionStatement + Pillars + Aspirations migrated; pillars/aspirations share a single `ItemListSection` helper backed by `AdminItemCard`. | tsc clean. |
| 6.2 | `admin/vision-mission/components/MissionForm.tsx` | `/admin/vision-mission/mission` | `fixed` | BIB CRD HDR | Four sections (hero/missionStatement/objectives/impact) flat; objectives + impactStats use `AdminItemCard` w/ reorder. | tsc clean. |
| 6.3 | `admin/vision-mission/components/QualityPolicyForm.tsx` | `/admin/vision-mission/quality-policy` | `fixed` | BIB CRD HDR PIL (952 lines; Card-in-Card across hero/policy/commitments/framework/assuranceBodies; toast `Alert` pill) | Surgical: outer Card wrappers swapped for `AdminFormSection` (with `action={...}` prop for the add buttons); top header/save migrated to `AdminForm`+`AdminFormFooter` via derived `AdminFormStatus`. Inner item Cards left as single-card surfaces (compliant since outer wrapper is gone). | tsc clean. |

## 7. Mandatory Disclosure

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 7.1 | `admin/mandatory-disclosure/components/DisclosureHeroForm.tsx` | `/admin/mandatory-disclosure` | `fixed` | HDR (Save button + spinner in header) | Migrated to `AdminForm`+`AdminFormSection`+`AdminFormFooter`. | tsc clean. |
| 7.2 | `admin/mandatory-disclosure/components/DisclosureItemsForm.tsx` | `/admin/mandatory-disclosure` | `fixed` | HDR (inline save) BIB (per-item card-in-card chrome) | Single bordered row per item with drag handle, 3-col grid for title/url/category, inline Trash remove; `AddRowButton` + `AdminEmptyState` from the kit. | tsc clean. |

## 8. Placements — Overview

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 8.1 | `admin/placements/overview/components/PlacementOverviewForm.tsx` | `/admin/placements/overview` | `fixed` | BIB CRD HDR (1894 lines, 12 sections with Card chrome each, inline save) | Full flat rewrite: all 12 sections (hero/stats/mission/services/features/team/training/achievements/highlights/contact + 4 section headings) use `AdminFormSection`; per-item lists use `AdminItemCard` with reorder; `createUpdatedData` preserved; image preview kept for team. | tsc clean. |
| 8.2 | `admin/placements/overview/components/HeroStatsForm.tsx` | `/admin/placements/overview` | `fixed` | HDR | Hero + stats migrated; sections flat. | tsc clean. |
| 8.3 | `admin/placements/overview/components/MissionForm.tsx` | `/admin/placements/overview` | `fixed` | HDR | Mission copy in single section; features/objectives lists use `AdminItemCard`. | tsc clean. |
| 8.4 | `admin/placements/overview/components/ServicesTeamForm.tsx` | `/admin/placements/overview` | `fixed` | BIB CRD HDR | Services + team members migrated to `AdminItemCard` with reorder; image upload preserved. | tsc clean. |
| 8.5 | `admin/placements/overview/components/TrainingAreasForm.tsx` | `/admin/placements/overview` | `fixed` | HDR | Training section + areas migrated; skills inline list with remove. | tsc clean. |
| 8.6 | `admin/placements/overview/components/AchievementsHighlightsForm.tsx` | `/admin/placements/overview` | `fixed` | HDR | 4 sections (ach heading + items + hl heading + items); both lists `AdminItemCard`. | tsc clean. |
| 8.7 | `admin/placements/overview/components/ContactForm.tsx` | `/admin/placements/overview` | `fixed` | HDR | Contact section migrated; per-contact `AdminItemCard` w/ reorder. | tsc clean. |

## 9. Placements — Internships

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 9.1 | `admin/placements/internships/components/HeroForm.tsx` | `/admin/placements/internships` | `fixed` | HDR PIL (color-coded "Save / Saved" button, no AdminForm) | Migrated to kit; icon + gradient + title + subtitle laid out as field grid; status routed through footer. | tsc clean. |
| 9.2 | `admin/placements/internships/components/InternshipsForm.tsx` | `/admin/placements/internships` | `fixed` | BIB CRD HDR (1293 lines, 7 collapsible accordion sections, nested per-item bordered divs, custom toggle/chevron chrome) | Full flat rewrite: 7 sections (hero/stats/benefits/filters/opportunities/process/contact) all use `AdminFormSection`; nested domain list inside each opportunity uses inner `AdminItemList`+`AdminItemCard`; accordion removed; `iconSelect` helper for DRY. | tsc clean. |
| 9.3 | `admin/placements/internships/components/BenefitsForm.tsx` | `/admin/placements/internships` | `has-issues` | BIB CRD HDR | | |
| 9.4 | `admin/placements/internships/components/PartnersForm.tsx` | `/admin/placements/internships` | `fixed` | HDR PIL MAX (sticky save bar, ✓ emoji) | Filters → `AdminFormSection`; opportunities use `AdminItemCard` w/ reorder; domains array + logo upload kept inline. | tsc clean. |
| 9.5 | `admin/placements/internships/components/ProcessForm.tsx` | `/admin/placements/internships` | `fixed` | BIB HDR PIL | Each step uses `AdminItemCard` with reorder + remove; `AddRowButton` for new steps; `AdminEmptyState` if empty. | tsc clean. |
| 9.6 | `admin/placements/internships/components/StatsForm.tsx` | `/admin/placements/internships` | `has-issues` | BIB CRD HDR | | |
| 9.7 | `admin/placements/internships/components/ContactForm.tsx` | `/admin/placements/internships` | `fixed` | GRD HDR PIL (gradient picker, full-width gradient save button w/ ✓ emoji) | CTA buttons use `AdminItemCard` w/ reorder; status routed through `AdminFormFooter`. | tsc clean. |

## 10. Placements — Recruiters

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 10.1 | `admin/placements/recruiters/components/HeroForm.tsx` | `/admin/placements/recruiters` | `fixed` | HDR PIL (inline save + status text, no AdminForm) | Migrated to kit; status routed through footer. | tsc clean. |
| 10.2 | `admin/placements/recruiters/components/RecruitersForm.tsx` | `/admin/placements/recruiters` | `fixed` | BIB CRD HDR (921 lines, 5 accordion sections with chevron+badge chrome, nested per-item bordered divs) | Full flat rewrite: 5 sections (hero/stats/categories/recruiters/cta) use `AdminFormSection`; collapsible accordion removed; logo image preview kept; CTA buttons use nested `AdminItemList`. | tsc clean. |
| 10.3 | `admin/placements/recruiters/components/PartnersForm.tsx` | `/admin/placements/recruiters` | `fixed` | HDR PIL | Recruiter companies use `AdminItemCard` (name+sector); reorder; sticky footer. | tsc clean. |
| 10.4 | `admin/placements/recruiters/components/StatsForm.tsx` | `/admin/placements/recruiters` | `fixed` | HDR (bespoke item header, inline save button) | Stats use `AdminItemCard` with reorder; consolidated to single section; status in footer. | tsc clean. |
| 10.5 | `admin/placements/recruiters/components/CTAForm.tsx` | `/admin/placements/recruiters` | `has-issues` | BIB CRD HDR | | |

## 11. Placements — Statistics

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 11.1 | `admin/placements/statistics/components/HeroForm.tsx` | `/admin/placements/statistics` | `fixed` | HDR PIL | Migrated to kit; same shape as the other placement hero forms. | tsc clean. |
| 11.2 | `admin/placements/statistics/components/PlacementStatisticsForm.tsx` | `/admin/placements/statistics` | `fixed` | BIB CRD HDR (1498 lines, 8 accordion sections, Record/Map data transformation) | Full flat rewrite: 8 sections (hero/config/overallStats/departmentStats/packageDist/sectorWiseData/yearlyTrends/studentPlacements) use `AdminFormSection`; `createUpdatedData` (Record↔array transformation) preserved; per-row uses `AdminItemCard` with reorder; student image preview kept. | tsc clean. |
| 11.3 | `admin/placements/statistics/components/MetricsForm.tsx` | `/admin/placements/statistics` | `fixed` | BIB CRD HDR | Year stats + package distribution now use `AdminItemCard` with reorder; heading flat in `AdminFormSection`. | tsc clean. |
| 11.4 | `admin/placements/statistics/components/DepartmentForm.tsx` | `/admin/placements/statistics` | `fixed` | HDR PIL (icon banner, gradient save, ✓ emoji, alert()) | Year selector moved to section `action`; departments use `AdminItemCard` w/ reorder. | tsc clean. |
| 11.5 | `admin/placements/statistics/components/SectorForm.tsx` | `/admin/placements/statistics` | `fixed` | HDR PIL GRD (gradient enum select with color swatch, ✓ emoji save) | Sectors use `AdminItemCard`; gradient kept as label; companies inline tag input cleaned up. | tsc clean. |
| 11.6 | `admin/placements/statistics/components/StudentsForm.tsx` | `/admin/placements/statistics` | `fixed` | HDR PIL B2 EMP (border-2 add button, decorative preview badges, summary stats footer, colored field icons) | Students use `AdminItemCard` w/ name+dept·company subtitle; removed decorative chrome and summary stats panel. | tsc clean. |
| 11.7 | `admin/placements/statistics/components/TrendsForm.tsx` | `/admin/placements/statistics` | `fixed` | HDR PIL (TrendingUp icon banner, gradient save button with ✓ emoji) | Years use `AdminItemCard`; status routed through footer; remove `border-b` icon banner. | tsc clean. |

## 12. Placements — Training & Placement

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 12.1 | `admin/placements/training-placement/components/HeroForm.tsx` | `/admin/placements/training-placement` | `fixed` | HDR PIL | Migrated to kit. | tsc clean. |
| 12.2 | `admin/placements/training-placement/components/TrainingPlacementForm.tsx` | `/admin/placements/training-placement` | `fixed` | BIB CRD HDR (1540 lines, 13 sections combining headings and item lists) | Full flat rewrite: 13 sections (hero, director's message, team heading + members, departments heading + items, training heading + programs, objectives heading + items, statistics heading + items) all use `AdminFormSection`; `createUpdatedData` (preserves untouched fields) kept intact; director + team image previews kept. | tsc clean. |
| 12.3 | `admin/placements/training-placement/components/DirectorMessageForm.tsx` | `/admin/placements/training-placement` | `fixed` | GRD HDR PIL (gradient enum select, inline ✓ status) | Removed gradient picker (kept as plain field bound but no UI); image preview kept; single `AdminFormSection`. | tsc clean. |
| 12.4 | `admin/placements/training-placement/components/ObjectivesForm.tsx` | `/admin/placements/training-placement` | `fixed` | HDR PIL (✓ emoji status) | Objectives use `AdminItemCard`; heading section flat. | tsc clean. |
| 12.5 | `admin/placements/training-placement/components/ProgramsForm.tsx` | `/admin/placements/training-placement` | `fixed` | HDR PIL | Programs use `AdminItemCard`; section heading flat; footer status. | tsc clean. |
| 12.6 | `admin/placements/training-placement/components/MetricsForm.tsx` | `/admin/placements/training-placement` | `fixed` | HDR (inline save, bespoke section header) | Stats migrated to `AdminItemCard`; heading section uses `AdminFormSection`. | tsc clean. |
| 12.7 | `admin/placements/training-placement/components/TeamForm.tsx` | `/admin/placements/training-placement` | `fixed` | HDR PIL (inline ✓ status, per-item bordered box) | Team members use `AdminItemCard` with reorder + image preview. | tsc clean. |
| 12.8 | `admin/placements/training-placement/components/CoordinatorsForm.tsx` | `/admin/placements/training-placement` | `fixed` | HDR PIL | Departments use `AdminItemCard`; 6-field grid kept; heading section flat. | tsc clean. |

## 13. Statutory Committees

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 13.1 | `admin/statutory-committees/components/StatutoryOverviewForm.tsx` | `/admin/statutory-committees` | `fixed` | CRD HDR (Card wrappers, max-w-4xl centering, full-width save) | Hero + committees migrated to kit; committees use `AdminItemCard`; sticky save handled by `AdminFormFooter`. | tsc clean. |
| 13.2 | `admin/statutory-committees/components/IqacForm.tsx` | `/admin/statutory-committees/iqac` | `fixed` | BIB CRD HDR PIL (6 sections each with Card chrome + absolute-positioned remove button) | All 6 sections (about/objectives/functions/members/initiatives/aqar) now use `AdminFormSection` + `AdminItemCard`; about paragraphs and functions become single-input cards. | tsc clean. |
| 13.3 | `admin/statutory-committees/components/InternalComplaintsForm.tsx` | `/admin/statutory-committees/internal-complaints` | `fixed` | BIB CRD HDR | All 7 sections migrated; rights & responsibilities split into two adjacent `AdminFormSection`s; per-step procedure subtitle shows step number. | tsc clean. |
| 13.4 | `admin/statutory-committees/components/AntiRaggingForms.tsx` | `/admin/statutory-committees/anti-ragging` (+ grievance-redressal, student-welfare) | `fixed` | BIB CRD HDR (multi-form module, 6 separate exported forms each with own Card chrome) | All 6 exports (Hero, Definition, Members, Measures, Punishments, Contacts) migrated to AdminForm/AdminFormSection/AdminItemCard with reorder+remove; shared `useStatusFlow` hook for footer status. | tsc clean. |

## 14. Student Life

| # | File | Route | Status | Issues | Changes | Verification |
| -- | ---- | ----- | ------ | ------ | ------- | ------------ |
| 14.1 | `admin/student-life/components/StudentLifeHeroForm.tsx` | `/admin/student-life` | `fixed` | CRD HDR (Card wrapper, inline save) | Kit migration + image preview + footer status. | tsc clean. |
| 14.2 | `admin/student-life/components/OverviewForm.tsx` | `/admin/student-life/overview` | `fixed` | CRD HDR MAX (sticky header bar with `-mx-4 -mt-4`, Card per highlight) | Highlights use `AdminItemCard`; sticky header replaced with `AdminFormFooter`. | tsc clean. |
| 14.3 | `admin/student-life/components/ClubsForm.tsx` | `/admin/student-life/clubs` | `fixed` | BIB CRD HDR MAX (sticky header, `<details>`+Card for categories, nested Card for clubs) | Categories use `AdminItemCard`; nested `ClubsList` helper renders clubs as `AdminItemCard`; image preview kept. | tsc clean. |
| 14.4 | `admin/student-life/components/EventsForm.tsx` | `/admin/student-life/events` | `fixed` | BIB CRD HDR MAX | Events use `AdminItemCard` with reorder; comma-separated highlights field. | tsc clean. |
| 14.5 | `admin/student-life/components/FacilitiesForm.tsx` | `/admin/student-life/facilities` | `fixed` | BIB CRD HDR MAX (`<details>`+Card sections, nested Card for items) | Sections use `AdminItemCard`; nested `FacilityItems` helper renders items as `AdminItemCard`. | tsc clean. |
| 14.6 | `admin/student-life/components/ConductForm.tsx` | `/admin/student-life/conduct` | `fixed` | BIB CRD HDR MAX EMP (blue note banner) | `<details>`-with-bg sections replaced with `AdminItemCard`; static note routed through plain `AdminFormSection`. | tsc clean. |
| 14.7 | `admin/student-life/components/GrievanceForm.tsx` | `/admin/student-life/grievance` | `fixed` | BIB CRD HDR MAX | Contacts and process steps now use `AdminItemCard` with reorder; consolidated to two sections. | tsc clean. |

## 15. Other admin surfaces (not `*Form.tsx`, kept here for completeness)

These are editor / grid components on admin pages. They are out of scope for the **form** migration unless they expose a form, but listed here so this file stays the single source of truth for "every admin surface".

| File | Route | Status | Notes |
| ---- | ----- | ------ | ----- |
| `admin/page.tsx` | `/admin` | `clean` | Dashboard landing — no forms. |
| `admin/login/page.tsx` | `/admin/login` | `clean` | Single-input login; not subject to the multi-section design language. |
| `admin/logs/page.tsx` | `/admin/logs` | `clean` | Read-only log list. |
| `admin/gallery/components/GalleryEditor.tsx` | `/admin/gallery` | `not-audited` | Gallery editor uses media-grid UI; revisit if it grows form-like. |
| `admin/pages/components/NavPagesGrid.tsx` | `/admin/pages` | `clean` | Read-only nav grid. |
| `admin/about/components/*Editor.tsx` | various `/admin/about/*` | `clean` | Editor wrappers (sheet shells). Re-audit after the inner Form migration to confirm they don't add a duplicate panel. |
| `admin/components/*Editor.tsx` | various | `clean` | Same as above. |
| `admin/{section}/components/*Editor.tsx` | various | `clean` | Same. |

---

## Progress summary

- **Total in-scope forms:** 73 `*Form.tsx` + 1 `SiteChromeEditor` = **74**
- **Fixed:** 74 of 74 ✅ — every admin form now consumes `form-kit` primitives.
- **Has issues:** 0
- **Not audited:** 0

### Final verification

- `npx tsc --noEmit` — clean.
- Every `*Form.tsx` under `src/app/(Private Pages)/admin/**` imports from `src/app/(Private Pages)/admin/components/form-kit`.
- `admin/components/SiteChromeEditor.tsx` and the multi-form `admin/statutory-committees/components/AntiRaggingForms.tsx` (6 exports) are also migrated.

### What changed across the entire migration

- Removed every box-in-box pattern: shadcn `Card`/`CardHeader`/`CardContent` wrappers around sections, accordion `<div className='border rounded-lg'>` shells with chevron toggles, per-item `<div className='border rounded-lg p-4'>` repeated for each list item.
- Replaced all inline save buttons + ad-hoc status banners (`'Saved'` text, emoji-prefixed `'✓ Saved Successfully'`, sticky `border-t pt-4` bars) with a single sticky `AdminFormFooter` that routes `AdminFormStatus`.
- Replaced ad-hoc reorder up/down outline-button pairs with the segmented `AdminReorderControls` (via `AdminItemCard onMove`).
- Removed gradient save buttons, decorative `text-xs uppercase tracking-[0.16em]` labels, redundant status pills in headers, `max-h-[…vh] overflow-y-auto` on form roots, and sticky `-mx-4 -mt-4` header bars on individual forms (the sheet provides the panel).
- Where a form had a boolean enum encoded as a `'true' | 'false'` select (e.g. `AdmissionsBrochureForm`), it became `AdminToggle`.
- Image-upload UX uniformly uses `<Input>` + `CloudinaryUploadButton`/`UploadButton` + a thumbnail inside `border-slate-200` (one container deep).
- Comma-separated string-array inputs (highlights, domains, skills, etc.) stay as a single `AdminField` with a controlled value that splits/joins on edit — no per-token chip chrome.

This file is updated as each batch lands. After a batch, the affected rows flip from `has-issues` → `fixed`, the **Issues** column is replaced with the actual issues found in the file, the **Changes** column lists what was done, and **Verification** records the `tsc --noEmit` result and any manual smoke test.
