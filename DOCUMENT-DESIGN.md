# Melo Space: visual correction from the Word document

The visual reference is **Melo Space screen.docx**, including its 73 embedded mobile/web mockups. This supersedes the earlier TURA-inspired treatment for the user and admin interfaces. Reading only the document's text missed this visual specification; the correction uses the embedded images as the source of truth.

## Applied direction

- Dark-purple horizontal customer navigation and persistent admin sidebar.
- Neon heart/M monogram and cursive Melo Space+ wordmark implemented as SVG and typography.
- Pink-to-orange action gradients, lavender/pink page surfaces, and compact rounded panels.
- Illustrated category shortcuts, experience images, special-offer panel, and room hero on the customer homepage.
- Admin category cards, category editor over a muted grid, and two-panel subcategory/tag management.
- Illustrated split-panel authentication/onboarding layouts.
- The development screen index is available through All screens in the footer, rather than occupying the customer page sidebar.

The document's category names are used for the starter categories. The migration updates unchanged starter names and adds missing starter categories while preserving custom category edits and local booking records.

## Artwork

Twelve small reusable artwork crops were extracted from the supplied document into `assets/melo/`. They retain the source's limited resolution. Original mockups and a contact sheet are in `reference-design/` for comparison. They are references, not full-page screenshot substitutes for the implemented UI.

**Resolution correction:** The nine active category/experience crops are replaced in the live UI by newly generated high-resolution artwork: `workshop-hd.png`, `craft-hd.png`, `dress-hd.png`, `celebration-hd.png`, `room-hd.png`, `photo-hd.png`, `meetup-hd.png`, `wellness-hd.png`, and `crochet-hd.png`, all under `assets/melo/`. The built-in image-generation tool recreates the reference's pink/purple subjects; these are new illustrations rather than recovered detail from the tiny originals. The original crops are preserved for reference. Their existing web URLs serve the high-resolution files, and direct `-hd.png` URLs are also available. The complete final prompts are recorded in `assets/melo/hd-artwork-prompts.json`.

Run `node scripts/verify-artwork.mjs` to verify file dimensions and confirm both image URL forms serve the high-resolution bytes. Use `MELO_ARTWORK_ONLY=1` with `tests/design-capture.mjs` for user/admin/mobile artwork checks, including enough source pixels for cards at twice their rendered width.

The larger hero was generated with the **built-in image-generation tool** and saved to **`assets/melo/celebration-hero.png`**. This recreates the reference's room atmosphere at usable desktop resolution, rather than claiming it is an original high-resolution asset from the document.

Final generation prompt:

> Create a polished premium 3D photorealistic website hero background, landscape composition 1536x864. The design reference is a feminine magical Melo Space celebration studio: rich deep violet and fuchsia pink room, a blush pink curved sofa on the RIGHT, a luminous pink neon outline HEART on a dark purple feature wall above the sofa, warm fairy lights and sheer golden curtains, pastel pink balloons, tasteful peony flowers in vases, wrapped pink gift boxes, a gold floor lamp, potted tropical plants. Warm golden bokeh. A few tiny star sparkles. LEFT 45 percent is predominantly deep aubergine purple gradient wall with subtle flowing magenta silk light, deliberately empty to overlay legible HTML headlines. RIGHT 55 percent is a beautifully detailed staged celebration room. This is a background artwork ONLY: NO WORDS, NO LETTERS, NO TYPOGRAPHY, NO LOGOS, NO UI, NO WATERMARK. Match glamorous pink-purple party experience marketplace imagery, no people.

## Scope and verification

The implemented scope remains 61 named user screens and admin MEL-A-001–013. IDs 053–056 remain undefined in the source. Account, OTP, payment, and booking-system integrations remain simulated. The visual correction does not make those services production-ready.

Verification includes browser rendering of all 74 screens, category editing/discovery linkage, simulated account/age flows, booking/reschedule/cancel, private-room customization, and mobile overflow/menu checks. Separate screenshots wait for fonts, inline images, and hero artwork to decode before capture. Screenshots are in `test-artifacts/`.

Run `node tests/design-capture.mjs` against the local server on port 3001 to capture the homepage, admin dashboard, category list/editor/taxonomy, login, and mobile homepage using installed Edge.

## MEL-U-001 splash screen

The splash is a standalone full-screen composition: neon heart/M and cursive wordmark, deep purple/pink background, high-resolution celebration-room and dress artwork, layered SVG pink curves, and a loading indicator. It excludes the normal navigation and authentication panels. Normal entry advances to MEL-U-002 after the artwork is ready; Enter Melo Space provides immediate navigation. Add `?preview=1` to keep the splash visible for visual review. Reduced-motion preferences stop the spinner animation.

Preview: http://localhost:3001/customer/screens/MEL-U-001?preview=1

Verification: `MELO_SPLASH_ONLY=1` with `tests/design-capture.mjs` captures desktop and mobile, checks image loading and viewport fit, verifies the standalone layout and entry link, and confirms automatic navigation to the welcome screen.
