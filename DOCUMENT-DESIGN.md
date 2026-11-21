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

## MEL-U-002 welcome / get started

The welcome screen follows its separate reference layout. Desktop uses a light pink header and background, welcome headline, room-and-community collage, Get Started/Login actions, account link, and five feature shortcuts. Mobile uses a purple branded welcome panel, large room artwork, a curved transition into the light action area, and stacked full-width Get Started and Login buttons. It does not use the shared authentication split-panel layout.

Get Started opens MEL-U-003 onboarding, Login opens MEL-U-005, and Create an account opens MEL-U-007. All imagery reuses the high-resolution Melo artwork. No new live authentication behavior is implied.

Preview: http://localhost:3001/customer/screens/MEL-U-002

Verification: `MELO_WELCOME_ONLY=1` with `tests/design-capture.mjs` checks desktop/mobile artwork loading and viewport fit, confirms the standalone layout and account-link destinations, and activates Get Started to verify navigation into onboarding.

## MEL-U-003 onboarding

The onboarding screen follows the supplied three-card layout: Discover Experiences, Book Private Rooms, and Celebrate Together. Desktop displays the introductory headline beside all three rounded cards. Mobile displays one image/card at a time, with progress dots, Skip, and a full-width Next button. The page uses the reference's light pink background, heart/script branding, outlined card icons, and curved pink/lavender footer.

Next advances through the three steps; the final action is Get Started. Skip and completion both open MEL-U-004 Role Selection. Dots, left/right arrow keys, and horizontal touch swipes can change the active step. Progress is announced to assistive technology, and inactive mobile cards are hidden. There is no automatic carousel playback.

Two high-resolution illustrations were made with the built-in image-generation tool and saved as `assets/melo/onboarding-discover.png` and `assets/melo/onboarding-celebrate.png`. These recreate the workshop and friends imagery from the reference; the middle card reuses `celebration-hd.png`. Exact final prompts are saved in `assets/melo/onboarding-artwork-prompts.json`.

Preview: http://localhost:3001/customer/screens/MEL-U-003

Verification: `MELO_ONBOARD_ONLY=1` with `tests/design-capture.mjs` checks desktop/mobile artwork and viewport fit, three desktop cards versus one mobile card, progress/Next controls, keyboard navigation, touch swipes, Skip destination, and completion to Role Selection. Both visual captures were reviewed against the source mockup.

## MEL-U-004 role selection — user / host

The dedicated role-selection page follows the reference's heading, two portrait cards, selection outlines, small feature icons, pink/lavender surfaces, curved footer, and gradient Continue action. Desktop places the cards side by side; mobile stacks them and provides a back link to onboarding. The whole card acts as a native radio label, with a visible selected state and keyboard focus.

User is the initial choice unless a saved Host choice exists. Only User and Host are accepted. Continue saves the choice and opens MEL-U-005 shared Meetura login, with the chosen role retained in that flow. It does not create independent authentication or implement the existing Partner Portal.

The portrait cutouts were created with the built-in image-generation tool using transparent backgrounds and saved as `assets/melo/role-user.png` and `assets/melo/role-host.png`. Final prompts are in `assets/melo/role-artwork-prompts.json`.

Preview: http://localhost:3001/customer/screens/MEL-U-004

Verification: `MELO_ROLE_ONLY=1` with `tests/design-capture.mjs` checks desktop/mobile image loading and viewport fit, standalone layout, back destination, keyboard radio selection, selected styling, whole-card selection, one selected role, saved-state restoration, and both User/Host transitions into shared login. Both visual captures were reviewed against the source mockup.

## MEL-U-005 login / sign up

The dedicated login screen follows the reference's illustrated room/brand panel, welcome heading, Login/Sign Up navigation, email-or-mobile and password fields, Remember me, recovery control, gradient Login action, and three social-provider controls. Mobile uses a purple branded header above the light form card. The selected User/Host role is retained from MEL-U-004 and can be changed through that screen.

This remains an explicit local demo. Use a sample email or a 7–15 digit sample mobile number and a sample password of at least six characters; these are demonstration validation rules, not a production password policy. The form discards the password, saves neither identifier nor password, and opens the existing demo verification screen. Remember me stores only a boolean preference. Booking return context is preserved through login and verification.

The password-visibility toggle is keyboard accessible. Account recovery uses a native dialog with Escape support and focus restoration; it explains the disconnected Meetura recovery service and sends no messages. Google, Apple, and WhatsApp controls show provider-specific unavailability feedback without pretending to authenticate. Sign Up and Create an account open MEL-U-007.

Preview: http://localhost:3001/customer/screens/MEL-U-005

Verification: `MELO_LOGIN_ONLY=1` with `tests/design-capture.mjs` checks desktop/mobile layout and artwork, password visibility, recovery-dialog focus/Escape, provider feedback, form validation, verification navigation, return context, role preservation, remember preference, and absence of credentials in storage. The updated role-selection checks and full 74-screen/booking browser smoke suite also pass.

## MEL-U-006 OTP verification

The dedicated verification screen follows the reference's illustrated purple room/brand panel, curved light form panel, shield symbol, six code boxes, resend countdown, gradient Verify action, and outlined Change Number action. Mobile uses a light branded header and native SVG envelope illustration above the form. Existing high-resolution celebration artwork is reused.

The six inputs support numeric entry, automatic focus advance, whole-code paste/autofill, left/right arrows, and Backspace into the previous box. Missing digits and incorrect demo codes show accessible errors. The 30-second resend cooldown disables resend until ready, then resets the inputs and cooldown when activated. Resend explicitly reports that no message was sent.

The code is **123456** in this local demo. No real OTP service is connected. Successful verification opens MEL-U-008 age eligibility, or returns to checkout when the booking return context is present. Change Number returns to MEL-U-005 with that context retained; it does not lose the stored role or booking draft. Admin MFA keeps its existing separate demo interface.

Preview: http://localhost:3001/customer/screens/MEL-U-006

Verification: `MELO_OTP_ONLY=1` with `tests/design-capture.mjs` checks desktop/mobile layout and images, six-box entry, incomplete/incorrect codes, focus advance, Backspace, paste, resend availability/reset, demo verification, and checkout return context. The countdown is advanced only in the isolated test browser to avoid a real 30-second test wait.
