# Melo Space design system

> **Current visual authority:** [Melo Space document design](DOCUMENT-DESIGN.md), including the Word file's 73 embedded mockups, supersedes the earlier TURA interpretation for user/admin screens. The live implementation uses purple navigation, neon heart/script branding, illustrated cards, and pink-to-orange controls.

> **DS6 implementation update:** [Document-based scope](DS6-IMPLEMENTATION.md) implements the 61 named user screens and admin MEL-A-001–013 through Category Management. It follows the supplied Word document's Meetura-integrated, adults-18+ structure. Earlier standalone-site and screen inventories below are historical where they conflict with DS6.

> **Current visual direction:** The user requested the TURA Shopping theme. [Theme alignment](THEME.md) and the final token overrides in `tokens.css` supersede the earlier plum palette, Manrope typography, dark sidebar, and brand-separation recommendations below. Navigation and functional specifications remain applicable.

> **Current delivery priorities:** [Implementation roadmap](IMPLEMENTATION-ROADMAP.md) supersedes all earlier phase guidance. Phase 1 MVP is 0/9, Phase 2 Operations is 0/7, and Phase 3 Growth is 0/7. Staff QR check-in is Phase 1; expanded staff shifts and assignments are Phase 2.

> **Current portal scope:** [Admin, staff, shared screens, and key flows](PORTAL-SCREEN-INVENTORY.md) supersedes the earlier admin and staff navigation breakdowns below. It records 106 admin entries, 22 staff entries, and 13 shared-system entries. Alongside the 73 customer entries, the raw sum is 214 before deduplication; this is not a unique-page implementation estimate. Earlier sidebar structures and phase allocations remain historical reference material.

> **Current customer scope:** [Complete customer screen inventory](CUSTOMER-SCREEN-INVENTORY.md) defines 73 entries across seven areas and takes precedence over the earlier customer screen counts, eight-category taxonomy, booking breakdown, and Dream Room screen breakdown below. Those sections retain earlier reference context and reusable interaction guidance. The previous 63-screen project total is superseded; a revised overall total and phase allocation require reconciliation of shared and gift-voucher scope.

A warm, creative space to come as you are, connect, and leave a little happier.

This first version translates the supplied visual reference into a system for Melo Space. The product positioning is provisional: a welcoming destination for creative experiences, gatherings, and moments of rest. The reference’s “her space.” name is replaced with “melo space.”; any relationship to TURA should be confirmed before publication.

## Brand expression

- Name: **melo space.** Use lowercase, with a full stop, in the wordmark.
- Suggested tagline: **A little space to feel like you.**
- Hero headline: **Come as you are. Leave a little happier.**
- Supporting copy: Create, laugh, unwind, and make memories in a space designed for you.
- Primary action: **Explore experiences**. Use **Book your place** when an experience is selected.
- Voice: kind, clear, gently playful, and inclusive. Use direct invitations and concrete details about each experience.

## Color

The palette follows the supplied reference; hexadecimal values are proposed implementation values, rather than a pixel-perfect extraction.

| Token | Value | Role |
| --- | --- | --- |
| Background / ivory | `#FFF9F6` | Main page background, updated from the latest reference |
| Surface / white | `#FFFFFF` | Inputs and elevated content |
| Blush | `#F8E9F0` | Hero panels and welcoming sections |
| Rose | `#F1DCEB` | Secondary panels and selected filters |
| Lavender | `#E7D9F6` | Creative experiences and quiet accents |
| Peach | `#F4DCCB` | Warm accents and supporting sections |
| Plum | `#945078` | Primary buttons and active controls |
| Plum hover | `#7B4064` | Hover and pressed emphasis |
| Brand rose | `#AD628B` | Brand accents; use the darker primary plum for white-label buttons |
| Deep plum | `#6B3354` | Admin sidebar and strong emphasis |
| Success | `#62765B` | Success labels and icons |
| Warning | `#A56A21` | Warning labels and icons |
| Error | `#B83F58` | Error labels and icons |
| Ink | `#55364D` | Body text and headings |
| Muted ink | `#715C6B` | Supporting text |
| Border | `#DCC9D5` | Decorative borders and dividers |
| Control border | `#927487` | Input boundaries |

Use ink on pastel surfaces and white on plum buttons. Keep pastel colors as backgrounds; they are too light for text on white. Meaning must also be conveyed through words or icons. Validate contrast for each implemented text/background pairing: at least 4.5:1 for normal text and 3:1 for large text. Decorative borders do not substitute for visible control boundaries.

## Typography

Use **Manrope** for headings, body copy, and controls, with `Arial, sans-serif` as a fallback. Its rounded geometry keeps the interface friendly and readable. Load font files locally when available; the system works with its fallback without an external font dependency.

| Style | Desktop | Mobile | Weight / line height |
| --- | --- | --- | --- |
| Display | 56px | 36px | 600 / 1.12 |
| Page heading | 40px | 30px | 600 / 1.2 |
| Section heading | 28px | 24px | 600 / 1.3 |
| Card heading | 20px | 20px | 600 / 1.4 |
| Body | 16px | 16px | 400 / 1.6 |
| Small | 14px | 14px | 400 / 1.5 |
| Label / button | 14px | 14px | 600 / 1.4 |

Keep long text to about 65 characters per line. Use sentence case throughout. Reserve uppercase for short eyebrow labels with modest letter spacing.

## Layout and shape

- Spacing scale: **4, 8, 12, 16, 24, 32, 48, 64, 96px**.
- Content width: up to **1200px**, centered. Page gutters: **20px** on mobile, **32px** on tablet, **48px** on desktop.
- Cards: **24px** corner radius and **24px** padding; compact cards may use **16px** padding.
- Images: **16px** corners. Use **16:9** for hero imagery and **4:3** for experience cards.
- Inputs: **12px** corners. Buttons and filter chips: pill shape.
- Use whitespace and surface color to group content. Keep shadows subtle and optional.
- Suggested layout breakpoints: **640px** and **1024px**. Experience grids move from one to two to three columns when content fits comfortably.

## Components

| Component | Anatomy and behavior |
| --- | --- |
| Header | Wordmark, short navigation, and one booking action. Mobile navigation uses a labeled menu button with expanded state. |
| Hero panel | Blush surface, large warm photograph, headline, short description, and one primary action. Text remains outside photography for reliable contrast. |
| Primary button | Plum fill, white label, 48px minimum height, 24px horizontal padding. Darken on hover; show a visible focus ring. |
| Secondary button | Transparent or white background, ink label, control-border outline. Use for supporting actions. |
| Experience card | Image, category, title, short description, date/duration, price when relevant, and a clear detail action. Keep information order consistent. |
| Filter chip | Category label, 44px minimum height. Selected state uses rose, an ink outline, and explicit selected semantics. |
| Favorite toggle | Heart icon inside a 44 × 44px target. Accessible name changes between “Save experience” and “Remove saved experience”; expose pressed state. |
| Form field | Persistent label, 48px minimum control height, optional hint, and specific inline error. Placeholder text is supplementary. |
| Feedback message | Short status heading and useful next step. Pair status color with text or an icon. Announce asynchronous results accessibly. |
| Empty state | Explain what is empty and provide one helpful next action, such as “Explore experiences.” |

Every interactive component needs default, hover, focus-visible, pressed/selected where applicable, and disabled states. Buttons submitting data also need loading and error handling. Disabled controls retain legible labels; explain unavailable actions when the reason is not obvious.

## Imagery and iconography

Choose sunlit creative rooms, tactile materials, plants, art supplies, and relaxed human moments. Favor warm light, natural skin tones, and candid compositions. Represent a range of people without implying the space serves only one gender unless that is part of the confirmed positioning.

Use simple rounded outline icons at 20 or 24px with consistent stroke width. Pair unfamiliar icons with labels. Treat the supplied image as visual direction: it includes a third-party watermark, so obtain an appropriately licensed photograph for production.

## Accessibility and motion

- Make all actions keyboard accessible, with logical focus order and semantic controls.
- Use a 3px plum focus outline with a 3px offset; verify visibility on the surrounding surface.
- Target at least 44 × 44px for interactive touch areas.
- Provide meaningful alternative text for informative images and empty alt text for decoration.
- Keep feedback close to the relevant control and avoid communicating errors by color alone.
- Use 160–220ms transitions for color and subtle elevation. Respect reduced-motion preferences and avoid essential information depending on animation.

## Overall website navigation

The second supplied reference establishes a shared welcome / landing page with three portal destinations. Use **melo space.** in the brand panel in place of the reference's HER SPACE label.

| Entry point | Destination | Proposed path |
| --- | --- | --- |
| Melo Space | Welcome / landing page | `/` |
| Customer | Customer portal | `/customer` |
| Admin | Admin portal | `/admin` |
| Staff | Staff portal | `/staff` |

Paths are implementation proposals. Portal contents and role permissions have not yet been specified.

### Portal selector

Place a blush welcome panel above three evenly spaced portal links inside a white container with a subtle border and 24px corners. The brand panel uses a centered wordmark and the subtitle “Welcome to Melo Space.” Each portal link has a rounded outline icon, a visible role label, and the secondary label “Portal.” Use people for Customer, a four-square grid for Admin, and a person with a check for Staff.

On desktop, display Customer, Admin, and Staff in one row in that order. On narrow screens, stack them in the same order. Make each entire portal tile a keyboard-accessible link with a visible focus ring and at least a 44px touch target. Icons are decorative because the role label supplies the accessible name. Use blush on hover and rose with a plum outline for the current destination; expose the current page semantically.

Portal selection identifies a destination; authorization must be checked independently for protected pages and data. When sign-in is required, retain the intended destination through sign-in and show a clear access message if the account lacks the required role. Specific authentication and role policies remain to be defined.

### Shared navigation

Keep the wordmark linked to the welcome page in each portal. Show the current portal name clearly and provide a “Switch portal” link back to the selector. Display navigation relevant to the authenticated account's permissions. Keep typography, color, spacing, focus behavior, and component shapes consistent across all three portals.

## Customer website: screen navigation

The third supplied reference defines the customer journey below. Screen order and category names follow the reference; paths and component details are proposed implementation guidance.

| Step | Screen | Proposed path | Content and actions |
| --- | --- | --- | --- |
| 01 | Homepage | `/customer` | Introduce the space and provide an Explore experiences action. |
| 02 | Explore Experiences | `/customer/experiences` | Browse the eight categories below and open an experience. |
| 03 | Experience Details | `/customer/experiences/:experienceId` | Show the description, imagery, duration, pricing, inclusions, and relevant participation requirements; continue to availability. |
| 04 | Date & Slot Selection | `/customer/booking/date` | Choose an available date and time; clearly distinguish selected, available, and unavailable slots. |
| 05 | Guest Details & Add-ons | `/customer/booking/guests` | Enter guest information and select any optional add-ons with visible prices. |
| 06 | Login / Sign Up (if needed) | `/customer/sign-in` | Authenticate when needed, then return to the booking without losing selections or entered details. Skip this screen for an already authenticated customer. |
| 07 | Booking Summary | `/customer/booking/review` | Review the experience, date, slot, guests, add-ons, and itemized total. Provide edit links and applicable booking terms. |
| 08 | Payment | `/customer/booking/payment` | Present the amount due and payment status. Handle pending, failed, and successful outcomes clearly. |
| 09 | Booking Confirmation + QR Code | `/customer/bookings/:bookingId/confirmation` | Show the confirmed booking, booking reference, QR code, date/time, and arrival instructions. |
| 10 | My Bookings | `/customer/bookings` | Let the customer find their bookings and reopen booking details and the QR code. |

### Experience categories

Preserve the reference's desktop grid order:

| Left column | Right column |
| --- | --- |
| Art & Craft | My Dream Room |
| Talent & Skit | Reading & Relax |
| Singing / Open Mic | Kids Workshops |
| Group Events | Special Events |

Use two columns where labels fit comfortably and one column on narrow screens. Mobile reading order follows each row from left to right. Category tiles act as labeled navigation links to filtered experience lists; the category taxonomy does not imply unconfirmed offerings or availability.

### Booking components and states

- **Progress indicator:** Show the current booking stage in text and expose the current step accessibly. Permit return to completed stages while retaining valid selections.
- **Date and slot picker:** Use explicit date labels and show the relevant venue timezone. Expose selected and unavailable states without relying on color. Provide a useful empty state when no slots are available.
- **Guest and add-on form:** Use persistent labels, clear required fields, quantity controls where appropriate, and inline validation. Mark add-ons as optional and update the itemized total when selections change.
- **Booking summary:** Keep prices and currency explicit. Show applicable fees and taxes before payment. Editing an earlier selection must update the summary and revalidate dependent choices.
- **Payment feedback:** Prevent duplicate submission while processing. Retain booking context after failure and provide a retry action. If status is pending, explain that confirmation is still in progress.
- **Confirmation card:** Use a calm lavender surface for the success summary, a high-contrast QR code on white, and a readable booking reference as an alternative to scanning. Include a clear My Bookings action.
- **My Bookings list:** Provide loading, empty, and error states alongside the populated list. Display the booking's actual status in text; offer only actions supported by the final booking policy.

### Journey behavior

Keep selected experience, date, slot, guest details, and add-ons through back navigation and authentication. If availability or pricing changes, explain the change and request review before payment. Confirm bookings only after the payment outcome is verified by the booking system; opening the confirmation URL alone must not imply payment success. Restrict booking details and QR codes to authorized users.

The reference places My Bookings at the end of the journey. Also make it directly accessible from customer navigation for returning customers. Authentication method, payment provider, slot reservation rules, cancellation/refund policies, and QR check-in behavior remain to be specified.

## Customer navigation menu

The fourth supplied reference defines the customer menu. Replace the reference's “her space.” wordmark with **melo space.** Preserve the menu labels and desktop row order below. Paths are proposed.

| Left item | Proposed path | Right item | Proposed path |
| --- | --- | --- | --- |
| Home | `/customer` | Experiences | `/customer/experiences` |
| Book a Slot | `/customer/booking` | Dream Room | `/customer/dream-room` |
| Events | `/customer/events` | Gift Cards | `/customer/gift-cards` |
| My Bookings | `/customer/bookings` | My Profile | `/customer/profile` |
| About Us | `/customer/about` | Contact | `/customer/contact` |

### Menu anatomy

Use a white panel with a subtle border and 24px corners. Place the wordmark at the upper left and Search, My Profile, and Menu icon controls at the upper right. A light divider separates the header from the navigation links. Each link combines a small outline icon with its visible text label and a minimum 44px interaction height.

Use a semantic navigation landmark labeled “Customer navigation.” Mark the current page with `aria-current="page"`, a plum text treatment, and a visible surface or indicator. Retain the standard focus ring for keyboard users. Icons beside text are decorative; icon-only header controls require accessible names.

On desktop, use the two-column layout shown in the reference. On narrow screens, use one column with row-by-row reading order: Home, Experiences, Book a Slot, Dream Room, Events, Gift Cards, My Bookings, My Profile, About Us, Contact. Keep the header controls reachable without horizontal overflow.

If the menu is collapsible, its toggle exposes expanded state and identifies the controlled panel. A modal mobile drawer additionally requires focus containment, Escape-to-close, a visible close control, and focus restoration to the opener. Hidden links must not remain keyboard focusable.

### Destination behavior

- **Book a Slot:** Start with experience selection when no experience has been chosen, then enter the established booking flow at Date & Slot Selection. Resume an existing draft only when its selections remain valid.
- **Dream Room:** Open the dedicated Dream Room landing page and private-room journey defined below. The My Dream Room category in Explore Experiences links to this same landing page. Keep “Dream Room” as the shorter navigation label from the reference.
- **Events:** Provide an entry to Group Events and Special Events. Event listings and detail behavior remain to be specified.
- **My Bookings / My Profile:** If sign-in is needed, return to the requested destination after authentication.
- **Search:** Its presence follows the reference; search scope and results behavior remain to be specified before implementation.
- **Gift Cards:** Its presence follows the reference; purchase, delivery, redemption, and balance rules remain to be specified before implementation.
- **About Us / Contact:** Use confirmed business information and contact channels when content is available.

## Admin dashboard: sidebar navigation

The fifth supplied reference defines the admin shell and sidebar. Use the eyebrow “Admin panel” above the **melo space.** wordmark. Preserve the six groups and item order below. Paths are proposed; the screenshot establishes navigation, rather than complete workflows or permissions.

| Group | Menu item | Proposed path |
| --- | --- | --- |
| Overview | Dashboard | `/admin` |
| Overview | Live Booking Calendar | `/admin/calendar` |
| Bookings | All Bookings | `/admin/bookings` |
| Bookings | Pending Payments | `/admin/bookings/pending-payments` |
| Bookings | Check-ins | `/admin/check-ins` |
| Bookings | Cancellations & Refunds | `/admin/cancellations-refunds` |
| Experience Management | Experiences | `/admin/experiences` |
| Experience Management | Sessions & Slots | `/admin/sessions` |
| Experience Management | Rooms & Themes | `/admin/rooms-themes` |
| Experience Management | Add-ons & Pricing | `/admin/add-ons-pricing` |
| Experience Management | Events | `/admin/events` |
| People | Customers | `/admin/customers` |
| People | Staff & Roles | `/admin/staff-roles` |
| People | Facilitator Schedule | `/admin/facilitator-schedule` |
| Business | Payments | `/admin/payments` |
| Business | Offers & Coupons | `/admin/offers-coupons` |
| Business | Gift Vouchers | `/admin/gift-vouchers` |
| Business | Revenue Reports | `/admin/revenue-reports` |
| Business | Analytics | `/admin/analytics` |
| System | Website Content | `/admin/website-content` |
| System | Notifications | `/admin/notifications` |
| System | Policies | `/admin/policies` |
| System | Settings | `/admin/settings` |
| System | Audit Logs | `/admin/audit-logs` |

### Admin shell

Use a persistent sidebar of approximately 240px on wide screens, with the main workspace filling the remaining width. Keep group labels visually quieter than navigation links while retaining readable text size and contrast. Use compact spacing between related links and more space between groups. Allow the sidebar to scroll when needed without hiding its final items.

Select **Dashboard** by default. Its main workspace begins with an outline dashboard icon, the page heading “Dashboard,” and an **Overview** card covering bookings, revenue, occupancy, and alerts. The reference's “Navigation preview,” “Selected admin screen,” and “Page actions” are prototype annotations; they do not establish production controls or content. Dashboard metrics, date filters, and action details remain to be specified.

Apply the shared palette with a white or cream workspace, rose for the active navigation surface, plum for the active label, and a visible current-page indicator. Operational content should use the same typography and shapes as the customer experience, with layouts sized for tables, filters, calendars, and forms. Distinguish missing data from zero values and provide loading, empty, and error states.

### Responsive navigation and access

- Use a semantic navigation landmark labeled “Admin navigation,” with group headings and ordinary links. Mark the current page using `aria-current="page"`; do not rely on color alone.
- On narrow screens, move the sidebar into a drawer opened by a labeled menu button. Expose expanded state, support Escape and a visible close control, contain focus while modal, and restore focus on close.
- Keep the current page title visible in the main workspace. Preserve filters and list position when returning from a detail screen where practical.
- Apply authorization to each destination and its data independently of sidebar visibility. Exact permissions for staff management, pricing, refunds, reports, settings, and audit logs remain to be defined.
- Give changes clear save, success, validation, and failure states. Consequential operations such as issuing refunds or changing role access need explicit action labels and a review of the affected record and change before submission.

### Cross-portal consistency

Treat customer **Gift Cards** and admin **Gift Vouchers** as related navigation concepts; whether they represent the same product requires confirmation. Align admin Experiences, Sessions & Slots, Add-ons & Pricing, and Bookings with the customer booking journeys once their workflows are defined. The staff portal uses the simplified navigation below.

## Staff portal navigation

The sixth supplied reference specifies a simplified staff interface rather than access to the full admin dashboard. Preserve these six items and their desktop row order. Paths and detailed interactions are proposed.

| Left item | Proposed path | Right item | Proposed path |
| --- | --- | --- | --- |
| Today's Sessions | `/staff` | Check-in Scanner | `/staff/check-in` |
| Guest List | `/staff/guests` | Room Status | `/staff/rooms` |
| Attendance | `/staff/attendance` | Report Issue | `/staff/issues/new` |

### Staff navigation and screen behavior

Use a simple two-column panel with rounded corners, a subtle border, and outline icons above visible labels, matching the reference. Use calendar, scanner, people, room, clipboard, and issue-report icons respectively. On narrow screens, stack items in row order. Make each tile a labeled link with a minimum 44px touch target, keyboard focus treatment, and a visible current-page state.

- **Today's Sessions:** Show the current day's assigned or permitted sessions using the venue timezone, with session time, experience, room, and status. Exact assignment rules remain to be specified.
- **Check-in Scanner:** Request camera access when scanning starts. Provide clear outcomes for valid, already checked-in, invalid, and unreadable codes. If camera access is unavailable, provide a permitted manual booking-reference lookup. Show the relevant booking before recording check-in and prevent duplicate attendance records.
- **Guest List:** Show guests for permitted sessions with clear session context, search, and booking status. Limit personal information to what staff need for their tasks.
- **Room Status:** Show the current status of permitted rooms with text labels as well as color. Room states, update rights, and refresh behavior remain to be specified.
- **Attendance:** Show attendance within the permitted session scope. Distinguish a recorded absence from attendance that has not yet been recorded; correction rights remain to be defined.
- **Report Issue:** Provide a short form for the issue description and related room or session where applicable, with validation, submission feedback, and a reference after successful reporting. Routing and escalation rules remain to be specified.

Enforce staff permissions on each page and data operation independently of navigation visibility. Provide loading, empty, error, and connection-loss feedback for operational screens; never imply a check-in or issue was saved when submission has not been confirmed. The staff portal does not expose the full admin sidebar.

## Special Dream Room navigation

The same reference establishes a private-room flow separate from normal group activities. Both the customer Dream Room menu item and the My Dream Room category open its dedicated landing page. Preserve the following nine steps; routes and screen details are proposed.

| Step | Screen | Proposed path | Content and actions |
| --- | --- | --- | --- |
| 01 | Dream Room Landing | `/customer/dream-room` | Introduce the private-room offering and provide an Explore room themes action. |
| 02 | Explore Room Themes | `/customer/dream-room/themes` | Show available themes with imagery and clear selection states. |
| 03 | Select Date & Private Slot | `/customer/dream-room/booking/date` | Select availability for the chosen theme or room, with date, time, duration, and applicable capacity. |
| 04 | Customize Experience | `/customer/dream-room/booking/customize` | Present supported customization choices, constraints, and any price changes. |
| 05 | Choose Optional Add-ons | `/customer/dream-room/booking/add-ons` | Offer optional extras with explicit prices and an easy way to continue without extras. |
| 06 | Review Booking & Rules | `/customer/dream-room/booking/review` | Review theme, room details, date, private slot, customization, extras, itemized total, and applicable rules. Provide edit links. |
| 07 | Payment | `/customer/dream-room/booking/payment` | Collect payment and show processing, pending, failed, or successful status. |
| 08 | Private Room Confirmation | `/customer/dream-room/bookings/:bookingId/confirmation` | Show confirmed room/theme, slot, selected options, booking reference, and arrival instructions. |
| 09 | Visit & Check-in | `/customer/dream-room/bookings/:bookingId/visit` | Show visit details and the supported check-in method. Record actual check-in through an authorized staff workflow. |

### Private-room booking behavior

Keep this journey distinct from the standard group-experience checkout while reusing shared form, slot, price-summary, payment-feedback, and confirmation components. Label the journey “Dream Room” throughout and retain selections when navigating backward. A theme change must revalidate room availability, customizations, and add-ons; explain changes before payment.

Do not add a mandatory sign-in screen to the supplied nine-step sequence. If authentication is required by the final booking policy, preserve the draft through sign-in and return to the same step. Confirm availability and the final amount before payment, prevent duplicate submission, and issue confirmation only after the booking system verifies the payment outcome.

Include private-room reservations in My Bookings with a clear Dream Room label and access to their details. Keep room rules visible at review and accessible after confirmation. Specific themes, customization options, capacities, reservation holds, cancellation terms, and the check-in method remain to be defined. The reference does not explicitly require a QR code for this flow; use the shared QR component if QR check-in is confirmed.

## Screen inventory for development

**Superseded planning snapshot:** The counts below record the earlier reference, not the current scope. Use `CUSTOMER-SCREEN-INVENTORY.md` for the expanded 73-entry customer inventory, including Dream Room. Do not use 63 as the current project total.

The seventh supplied reference establishes the following planning inventory. Counts are planning allocations, not a count of unique routes or independently implemented components.

| Portal / area | Planned screens | Priority |
| --- | ---: | --- |
| Customer | 20 | Phase 1 |
| Dream Room customization | 7 | Phase 1 |
| Admin | 24 | Phase 1–2 |
| Staff | 6 | Phase 2 |
| Gift vouchers / memberships | 6 | Phase 3 |
| **Total planned** | **63** | |

Reuse shared components such as login, checkout, and booking details across journeys rather than developing them separately. The nine-step Dream Room journey describes navigation stages; its seven-screen development allocation is a separate planning estimate. Likewise, the customer navigation and ten-step booking journey do not enumerate all 20 planned customer screens. A final screen-by-screen allocation remains to be defined; do not invent screens merely to meet the estimates.

### Recommended build order

Follow the sequence supplied in the reference:

1. Customer homepage.
2. Experience listing.
3. Experience details.
4. Booking calendar.
5. Checkout.
6. Confirmation.
7. Admin dashboard.
8. Slot management.
9. Staff check-in.

This sequence establishes the core customer booking journey, followed by operational management and check-in. Dream Room customization remains a Phase 1 deliverable even though it is not separately listed in the supplied build sequence. Schedule its detailed implementation within Phase 1 using the shared booking components. Admin work spans Phases 1 and 2; the allocation of individual admin screens between those phases remains to be specified. Staff is Phase 2, and gift vouchers / memberships is Phase 3.

### Shared implementation foundations

Use the same design tokens, buttons, fields, navigation states, loading/empty/error patterns, and accessible focus behavior across portals. Reuse authentication, booking details, availability selection, itemized pricing, checkout, payment feedback, and confirmation components where behavior overlaps. Keep standard group bookings and private-room bookings distinct in their configuration and journey context.

Membership screens and rules have not yet been supplied. Gift-card and voucher navigation already appears above, but the six-screen Phase 3 allocation still needs a detailed breakdown and product rules. Phase assignments describe delivery priority; menu entries for later phases should become available when their destinations are implemented.

## Admin dashboard design system

The latest reference prioritizes clarity and productivity while retaining the brand palette. It refines the earlier navigation wireframe: use a **light ivory background, white cards, a deep plum sidebar, and rose highlights for active navigation**. On the deep plum sidebar, use white navigation text; the rose active surface uses deep plum text. Use the shared control borders and visible focus treatment.

The dashboard header contains the **melo space.** wordmark with a small “admin” label and a notification control with an accessible name. The four metric cards are **Bookings**, **Revenue**, **Occupancy**, and **Check-ins**. The reference's values—24, ₹8,450, 78%, and 16—are illustrative only and must not be presented as live business data. The currency example does not establish a final currency policy. Show each metric's reporting period and scope; use an explicit unavailable state when data cannot be loaded.

Use compact data tables with clear column headings, readable type, sufficient cell padding, and consistent alignment. Right-align monetary and numerical columns where useful. Preserve access to columns on narrow screens through a labeled scrolling region or a suitable stacked view. Filtering, sorting, and pagination need explicit labels and state feedback when implemented.

Pair status colors with text or icons. Destructive actions require a confirmation dialog naming the affected record, describing the consequence, and providing clear Cancel and action-specific confirmation controls. Use modal focus behavior and return focus to the opener after closing. Keep routine operational content visually simple and avoid decorative imagery in data-heavy workspaces.

## Staff portal design

Make the staff portal **mobile-first**, with large check-in actions, simple session lists, QR scanning, and room-readiness indicators. Use the staff-action token for a proposed 56px primary action height and retain at least 44px touch targets elsewhere. Prioritize Today's Sessions and Check-in Scanner without removing the six established navigation destinations.

Session rows should put time, experience, room, and current status first. Room readiness must include a text label alongside its indicator. The supported readiness states and who can change them remain to be defined. Scanning follows the previously specified camera-permission, manual-lookup, and verified-submission behavior.

Avoid exposing payment details or private customer information unless required for the staff member's role. Enforce this restriction in returned data as well as rendered fields. Staff operational tasks should remain usable on narrow screens without horizontal scrolling.

## Developer token conventions

`tokens.css` is the implementation source for shared `--melo-*` tokens. The latest reference contributes ivory background, brand rose, deep plum, success, warning, error, and 8px / 12px / 20px general radius tokens. Existing component-specific radii remain available for the established customer cards and imagery.

The reference's `--hs-*` token names are supplied as compatibility aliases. These map to the Melo palette rather than claiming a pixel-perfect transcription of the small screenshot. Keep the darker `--melo-color-primary` for white-label buttons and use `--melo-color-brand-primary` for the lighter brand accent. Use semantic sidebar and active-navigation tokens so portal styling stays consistent.

## Design system component checklist

The final supplied reference defines 17 component-library work items. **Implementation progress: 0/17.** This guide and the CSS tokens establish specifications and foundations; they do not constitute an implemented, validated component library. Mark an item complete only after its applicable variants, responsive behavior, accessibility, and integration have been implemented and verified.

- [ ] Logo, colors and typography
- [ ] Buttons and icon buttons
- [ ] Inputs, dropdowns and date picker
- [ ] Experience cards
- [ ] Booking calendar and time slots
- [ ] Guest and participant selector
- [ ] Dream Room theme selector
- [ ] Add-on selection cards
- [ ] Booking summary and checkout
- [ ] Payment status and confirmation
- [ ] QR booking ticket
- [ ] Customer profile and booking history
- [ ] Admin sidebar and topbar
- [ ] Data tables, filters and pagination
- [ ] Dashboard KPI cards and charts
- [ ] Modal, toast and loading states
- [ ] Mobile navigation and responsive layouts

### Component completion criteria

Use shared tokens and consistent public component interfaces. Implement relevant interaction states, keyboard and focus behavior, accessible names and semantics, and supported mobile layouts. Data-driven components need loading, empty, error, and populated states where applicable. Validate consequential behaviors such as slot availability, payment status, QR check-in, and permissions against their actual system contracts; a visual mockup alone does not complete them.

Use charts only for defined metrics with a reporting period and an accessible text or tabular alternative. Announce toast feedback appropriately without moving focus unnecessarily. Keep loading feedback descriptive and respect reduced-motion preferences. Reuse the same components across portals where behavior matches, with variants for customer, Dream Room, admin, and staff contexts.

### DS1.0 brand and application recommendation

Keep **Melo Space visually distinct from Meetura and TURA Shopping**, following the reference's recommendation for its HER SPACE brand. Apply this system consistently across the customer website, Dream Room booking journey, admin dashboard, and staff portal using shared tokens and reusable components. Any business affiliation copy still requires confirmed wording; related brands do not automatically share navigation, visual identity, or access permissions.

## Navigation UI recommendations

The latest supplied reference defines the primary customer navigation surfaces below. These refine the earlier expanded customer menu; retain its full destination list as secondary navigation rather than placing every link in the main header.

### Customer desktop header

Place the **melo space.** wordmark at the left. Provide the following primary links in the reference order: **Home · Experiences · Dream Room · Events · About · Book Now**. Map them respectively to Homepage, Explore All Experiences, Dream Room Landing, Upcoming Events, About Melo Space, and Experience Selection. “About” is the compact header label for About Us; “Book Now” is the header booking action corresponding to Book a Slot.

The reference shows Search, a gift icon, Profile, and Menu controls at the right. Give each icon-only control an explicit accessible name: “Search experiences,” “Gift Cards,” “My Profile,” and “Open menu” (changing to “Close menu” while expanded). Gift Cards retains the previously specified destination; its purchase behavior still requires definition. The menu exposes secondary destinations including My Bookings and Contact, plus the other discovery and support links defined in the current inventory.

Keep the header light, compact, and separated with a subtle border. Use the reference's wordmark-and-controls row with primary navigation beneath where space allows. Avoid overflow by switching to the mobile pattern when content no longer fits, rather than shrinking text or interaction targets. Preserve at least 44px targets and visible keyboard focus. Mark the current destination semantically and visually.

### Customer mobile bottom navigation

Use four persistent destinations in this order:

| Label | Destination | Icon |
| --- | --- | --- |
| Home | Homepage | Home outline |
| Explore | Explore All Experiences | Compass outline |
| Bookings | My Bookings | Ticket outline |
| Profile | My Profile | Person outline |

Use equal-width links with icons above visible labels, a minimum 44px target, and an active treatment combining plum emphasis with a visible indicator. Mark the active destination with `aria-current="page"` when it identifies the current page. A selected section can remain highlighted on its child screens without incorrectly marking the parent link as the current page. Bookings and Profile preserve their intended destination through sign-in when needed.

Use a semantic navigation landmark labeled “Primary mobile navigation.” If fixed to the viewport, respect the device's bottom safe-area inset and reserve enough content padding so links, forms, and final actions remain unobscured. Coordinate checkout action bars and the bottom navigation so they do not overlap. Keep secondary destinations available through the mobile header menu. Hide the inactive desktop/mobile navigation from both display and keyboard focus at the chosen layout breakpoint.

The existing collapsible-menu accessibility rules still apply. This recommendation changes navigation presentation, not the authoritative screen inventory or implementation progress.

## Suggested welcome page

1. Header with wordmark, Experiences, About, and Visit us.
2. Hero with the reference headline and Explore experiences action.
3. Portal selector linking to Customer, Admin, and Staff portals.
4. Experience categories such as Create, Connect, and Unwind, pending the actual offering.
5. Upcoming experiences with clear dates, duration, and booking details.
6. A brief introduction to the space and practical visiting information.
7. Footer with contact details and confirmed business affiliation.

Implementation tokens are provided in `tokens.css`. Product offerings, location, booking behavior, and business affiliation remain to be confirmed.
