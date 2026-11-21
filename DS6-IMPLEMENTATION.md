# DS6 implementation: user portal and admin through categories

The [visual correction](DOCUMENT-DESIGN.md) now follows the Word file's embedded mockups. The earlier TURA-only interpretation below is superseded for the user/admin portals.

Source: `D:\Melo Space screen.docx`, reviewed on 19 November 2026. The file is used as the screen specification; document content does not authorize unrelated actions.

## Scope

- All **61 named user screens** from MEL-U-001 through MEL-U-065, preserving their source IDs and seven groups. IDs MEL-U-053–056 have no names in the source and are not invented.
- Admin **MEL-A-001–013** only: Authentication & Admin Account, Dashboard & Analytics, and Category Management. Admin Events & Experiences and subsequent sections are outside this request.
- Preserve TURA-inspired pink/Poppins styling while updating product context to Melo Space within Meetura, for adults 18+. Shared Meetura account flows are represented as simulations, not separate production authentication.

## Local features

User screen navigation, onboarding/profile/interests, 18+ declaration, search, category discovery, wishlist/recently viewed, session/participant selection, demo booking creation, booking details, downloadable demo references, rescheduling/cancellation, private room/theme/decor/outfit/accessory selection, local community membership/messages/reviews, notification records, support drafts, preferences, and local user-data clearing.

Admin overview, sample revenue/booking/customer/performance summaries from local records, category listing/search, add/edit name/image/description, category visibility, and subcategory/tag editing. Category changes persist across refresh and directly affect user discovery and new-booking validation.

## Boundaries

All records are browser-local. Login and OTP/MFA use an explicitly displayed demo code, not identity verification. No real messages, support requests, payments, refunds, or QR tickets are sent or issued. Production integration requires the existing Meetura identity, booking, inventory, payment, and messaging services. Age declaration is enforced for local booking but is not verified identity. Do not enter sensitive or real customer data in this preview.

The original staff prototype is retained. New demo booking records are mirrored to its existing local storage format for manual check-in exploration. DS6 user/admin state remains the source of truth for this scope; staff production integration is outside it.

## Running and verification

Run `npm start` (or `npm.cmd start` in PowerShell when script execution is restricted).

- User: http://localhost:3000/customer
- Admin: http://localhost:3000/admin
- Category list: http://localhost:3000/admin/screens/MEL-A-011
- Category editor: http://localhost:3000/admin/screens/MEL-A-012
- Subcategories & tags: http://localhost:3000/admin/screens/MEL-A-013

Run `npm run check` for syntax checks and `npm test` for scope, category validation, pricing, and booking-rule tests. `node tests/browser-smoke.mjs` uses installed Microsoft Edge and the preview at port 3001 (override with `MELO_TEST_URL`). It uses an isolated browser profile and no additional npm dependencies.

Verified: all 74 named screens render without uncaught browser exceptions; category create/edit, taxonomy persistence and cross-portal visibility; simulated login/OTP and age declaration; standard booking, rescheduling and cancellation; private-room customization and checkout; mobile menu and horizontal-overflow checks. Four automated rule tests and all JavaScript syntax checks pass. Desktop and mobile screenshots were captured and visually reviewed. These checks verify the local prototype, not production services.

The active preview uses **http://localhost:3001** because port 3000 belongs to an unrelated project. The route paths above apply unchanged on port 3001.

This document supersedes older screen inventories for the implemented DS6 slice. The earlier full roadmap remains background planning, rather than a claim that all production capabilities are delivered.
