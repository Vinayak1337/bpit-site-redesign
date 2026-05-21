# Responsive Audit Ledger

Branch: `ui-responsive-fixes`

Required viewport set: `375`, `430`, `768`, `1024`, `1440`

| Page name | Public route/path | Admin route/path | Status | Viewports tested | Issues found | Files changed | Commit hash | Push status | Verification notes |
|---|---|---|---|---|---|---|---|---|---|
| Home | `/` | `/admin/home` | Pushed | `375`, `430`, `768`, `1024`, `1440` | Public/admin home initially blocked by SSR `localStorage.getItem` crash; desktop nav enabled at `1024px` and caused 15px horizontal overflow. | `src/instrumentation.ts`, `src/components/providers/PostHogProvider.tsx`, `src/components/providers/PageTracker.tsx`, `src/components/header/Navbar.tsx` | `03c3adc` | Pushed to `origin/ui-responsive-fixes` | Added server storage shim and browser-only PostHog loading so pages render; kept tablet landscape on mobile/tablet nav until `xl`; verified no page-level horizontal overflow on `/` and `/admin/home`; verified tablet menu opens at `1024px` without overflow. `npx tsc --noEmit` passed. `npm run lint` fails on pre-existing unrelated lint errors. |
| Admin dashboard | `/` | `/admin` | Pushed | `375`, `430`, `768`, `1024`, `1440` | Mobile dashboard spacing was too large, leaving form fields cramped at 375px; header did not stack cleanly on narrow screens. | `src/app/(Private Pages)/admin/page.tsx` | `2a6e9c6` | Pushed to `origin/ui-responsive-fixes` | Reduced mobile padding, stacked the dashboard header on mobile, widened form controls, kept users table in a horizontal scroll container, and moved quick links to a 2-up grid from small tablets. Verified no horizontal page overflow at all required widths. `npx tsc --noEmit` passed. |
| Admin pages index | `/` | `/admin/pages` | Verified | `375`, `430`, `768`, `1024`, `1440` | No actionable responsive issues found. | - | - | No code changes to push | Verified admin page index cards and actions remain usable with no page-level horizontal overflow at all required widths. |
| Admin logs | `/` | `/admin/logs` | Pushed | `375`, `430`, `768`, `1024`, `1440` | Mobile audit logs relied on a wide table with long unwrapped JSON/code previews, making log review awkward on small screens. | `src/app/(Private Pages)/admin/logs/page.tsx` | `966c6b4` | Pushed to `origin/ui-responsive-fixes` | Added mobile log cards with wrapped, scrollable change details; kept a horizontally scrollable table for tablet/desktop; tightened mobile spacing. Verified no page-level horizontal overflow at all required widths. `npx tsc --noEmit` passed. |
| Admin login | `/` | `/admin/login` | Not checked | - | - | - | - | - | Public paired with home; login has no public equivalent. |
| About | `/about` | `/admin/about` | Not checked | - | - | - | - | - | - |
| Founder tribute | `/about/founder-tribute` | `/admin/about/founder-tribute` | Not checked | - | - | - | - | - | - |
| Chairman message | `/about/chairman-message` | `/admin/about/chairman-message` | Not checked | - | - | - | - | - | - |
| Principal message | `/about/principal-message` | `/admin/about/principal-message` | Not checked | - | - | - | - | - | - |
| Vision | `/vision-mission` | `/admin/vision-mission` | Not checked | - | - | - | - | - | - |
| Mission | `/vision-mission/mission` | `/admin/vision-mission/mission` | Not checked | - | - | - | - | - | - |
| Quality policy | `/vision-mission/quality-policy` | `/admin/vision-mission/quality-policy` | Not checked | - | - | - | - | - | - |
| Management | `/management` | `/admin/management` | Not checked | - | - | - | - | - | - |
| Leadership team | `/management/leadership-team` | `/admin/management/leadership-team` | Not checked | - | - | - | - | - | - |
| Governance structure | `/management/governance-structure` | `/admin/management/governance-structure` | Not checked | - | - | - | - | - | - |
| Policies procedures | `/management/policies-procedures` | `/admin/management/policies-procedures` | Not checked | - | - | - | - | - | - |
| Statutory committees | `/statutory-committees` | `/admin/statutory-committees` | Not checked | - | - | - | - | - | - |
| IQAC | `/statutory-committees/iqac` | `/admin/statutory-committees/iqac` | Not checked | - | - | - | - | - | - |
| Anti-ragging | `/statutory-committees/anti-ragging` | `/admin/statutory-committees/anti-ragging` | Not checked | - | - | - | - | - | - |
| Internal complaints | `/statutory-committees/internal-complaints` | `/admin/statutory-committees/internal-complaints` | Not checked | - | - | - | - | - | - |
| Student welfare | `/statutory-committees/student-welfare` | `/admin/statutory-committees/student-welfare` | Not checked | - | - | - | - | - | Admin route exists but map says page-level editor is under construction. |
| Grievance redressal | `/statutory-committees/grievance-redressal` | `/admin/statutory-committees/grievance-redressal` | Not checked | - | - | - | - | - | Admin route exists but map says page-level editor is under construction. |
| Mandatory disclosure | `/mandatory-disclosure` | `/admin/mandatory-disclosure` | Not checked | - | - | - | - | - | - |
| Gallery | `/gallery` | `/admin/gallery` | Not checked | - | - | - | - | - | - |
| Academia | `/academia` | `/admin/academia` | Not checked | - | - | - | - | - | - |
| Academic calendar | `/academia/academic-calendar` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Examination | `/academia/examination` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Notices circulars | `/academia/notices-circulars` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Syllabus ordinance | `/academia/syllabus-ordinance` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library | `/academia/library` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library advisory committee | `/academia/library/advisory-committee` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library book acquisition | `/academia/library/book-acquisition` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library book bank | `/academia/library/book-bank` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library collection | `/academia/library/collection` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library contact | `/academia/library/contact` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library Delnet | `/academia/library/delnet` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Digital library | `/academia/library/digital-library` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library downloads | `/academia/library/downloads` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library e-resources | `/academia/library/e-resources` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library information | `/academia/library/information` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library MOOCS | `/academia/library/moocs` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library NDLI | `/academia/library/ndli` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library newspapers | `/academia/library/newspapers` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Photocopy service | `/academia/library/photocopy-service` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library rules | `/academia/library/rules` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Self learning | `/academia/library/self-learning` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library services | `/academia/library/services` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library staff | `/academia/library/staff` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Library timings | `/academia/library/timings` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Useful links | `/academia/library/useful-links` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Weeding out | `/academia/library/weeding-out` | - | Not checked | - | - | - | - | - | No page-level admin editor found. |
| Accreditation | `/accreditation` | - | Not checked | - | - | - | - | - | No admin page found. |
| Admissions | `/admissions` | `/admin/admissions` | Not checked | - | - | - | - | - | - |
| Why BPIT admissions | `/admissions/why-bpit` | `/admin/admissions/why-bpit` | Not checked | - | - | - | - | - | - |
| Admission process | `/admissions/process` | `/admin/admissions/process` | Not checked | - | - | - | - | - | Dynamic program detail pages checked under this pair. |
| Admission fees | `/admissions/fees` | `/admin/admissions/fees` | Not checked | - | - | - | - | - | - |
| Scholarships | `/admissions/scholarship` | `/admin/admissions/scholarship` | Not checked | - | - | - | - | - | - |
| Admissions brochure | `/admissions/brochure` | `/admin/admissions/brochure` | Not checked | - | - | - | - | - | - |
| Admissions FAQs | `/admissions/faqs` | `/admin/admissions/faqs` | Not checked | - | - | - | - | - | - |
| CSE shortcut | `/cse` | - | Not checked | - | - | - | - | - | No admin page found. |
| Departments | `/departments` | - | Not checked | - | - | - | - | - | No admin page found. |
| Department CSE | `/departments/cse` | - | Not checked | - | - | - | - | - | No admin page found. |
| Placement overview | `/placements/overview` | `/admin/placements/overview` | Not checked | - | - | - | - | - | - |
| Training placement | `/placements/training-placement` | `/admin/placements/training-placement` | Not checked | - | - | - | - | - | - |
| Recruiters | `/placements/recruiters` | `/admin/placements/recruiters` | Not checked | - | - | - | - | - | - |
| Placement statistics | `/placements/statistics` | `/admin/placements/statistics` | Not checked | - | - | - | - | - | - |
| Internships | `/placements/internships` | `/admin/placements/internships` | Not checked | - | - | - | - | - | - |
| Student life | `/student-life` | `/admin/student-life/overview` | Not checked | - | - | - | - | - | - |
| Campus facilities | `/student-life/campus-facilities` | `/admin/student-life/facilities` | Not checked | - | - | - | - | - | - |
| Clubs societies | `/student-life/clubs-and-societies` | `/admin/student-life/clubs` | Not checked | - | - | - | - | - | - |
| Events festivals | `/student-life/events-and-festivals` | `/admin/student-life/events` | Not checked | - | - | - | - | - | - |
| Student grievance cell | `/student-life/student-grievance-cell` | `/admin/student-life/grievance` | Not checked | - | - | - | - | - | - |
| Code of conduct | `/student-life/code-of-conduct` | `/admin/student-life/conduct` | Not checked | - | - | - | - | - | - |
| Privacy policy | `/privacy-policy` | - | Not checked | - | - | - | - | - | No admin page found. |
| Terms of service | `/terms-of-service` | - | Not checked | - | - | - | - | - | No admin page found. |
