# Melo Space: complete customer website navigation

Use [Implementation priorities](IMPLEMENTATION-ROADMAP.md) for current capability-level delivery phases. Earlier phase estimates are superseded; a detailed screen-to-phase mapping remains to be defined.

Current customer scope supplied by the user: **73 screen entries across seven areas**. This inventory supersedes the earlier 20-screen customer estimate, seven-screen Dream Room estimate, and eight-category discovery list. These are planning entries; several can share a route, template, component, or state. They are not 73 independently implemented pages.

| Area | Screen entries |
| --- | ---: |
| Home & Discovery | 8 |
| Experiences | 9 |
| Booking & Checkout | 14 |
| Dream Room | 9 |
| Events & Community | 7 |
| Customer Account | 17 |
| Help & Legal | 9 |
| **Total** | **73** |

## Home & Discovery — 8 screens

1. Homepage
2. About Melo Space
3. Explore All Experiences
4. Experience Categories
5. Experience Details
6. Gallery
7. How It Works
8. Locations & Directions

## Experiences — 9 screens

1. Art & Craft
2. Skit & Drama
3. Singing & Open Mic
4. Talent Showcase
5. Reading & Relaxation
6. Strangers Meetup
7. Group Creative Sessions
8. Special Events
9. Private Dream Room

These replace the earlier eight-category taxonomy. Use shared listing and detail templates where appropriate. Private Dream Room opens the dedicated private-room journey.

## Booking & Checkout — 14 screens

1. Experience Selection
2. Location Selection
3. Date Selection
4. Time Slot Selection
5. Participants & Guest Details
6. Add-ons & Customization
7. Booking Summary
8. Login / Register
9. Apply Coupon / Gift Voucher
10. Payment Checkout
11. Payment Processing
12. Payment Success
13. Payment Failure / Retry
14. Booking Confirmation & QR Ticket

This inventory expands the earlier booking sequence. It is not a mandatory linear traversal of all 14 entries: authenticated customers skip Login / Register; coupon or voucher application is optional; payment success and failure are alternative outcomes. Preserve the booking draft through authentication and retries. Location, date, and time are distinct selections with dependent availability. A change to an earlier selection revalidates subsequent selections.

Show any discount and the final itemized total before payment. Payment Success reflects a verified payment outcome; Booking Confirmation & QR Ticket additionally requires a confirmed booking. Processing and failure must not imply that a booking has been confirmed.

## Dream Room — 9 screens

1. Dream Room Landing
2. Room Themes Gallery
3. Theme Details
4. Private Slot Availability
5. Room Customization
6. Outfits & Props Selection
7. Optional Add-ons
8. Dream Room Booking Summary
9. Dream Room Guidelines

This nine-entry inventory supersedes the earlier Dream Room screen breakdown. Keep the dedicated private-room journey, with guidelines available before committing to payment and after booking. Reuse Booking & Checkout for authentication when required, coupon/voucher application, payment processing and outcomes, and confirmation. Reuse customer booking details for ticket retrieval and visit information. The inventory does not add separate Dream Room payment or confirmation implementations.

## Events & Community — 7 screens

1. Upcoming Events
2. Event Details
3. Group Session Details
4. Meetup Booking
5. Event Registration
6. Event Waitlist
7. Community Guidelines

Event and meetup booking can feed into the shared checkout. Waitlist participation must be distinguished from a confirmed reservation. Eligibility, capacity, waitlist promotion, and registration policies remain to be specified.

## Customer Account — 17 screens

1. My Dashboard
2. My Profile
3. Edit Profile
4. My Bookings
5. Upcoming Bookings
6. Past Bookings
7. Booking Details
8. Download Ticket / QR
9. Reschedule Booking
10. Cancel Booking
11. Refund Status
12. My Payments & Receipts
13. My Favorites
14. My Gift Vouchers
15. Notification Preferences
16. Change Password / Account Security
17. Delete Account

Protect account data and actions with authorization. Upcoming and Past Bookings may be filtered views of My Bookings; ticket download may be an action on Booking Details. Share these implementations while keeping all inventory entries traceable. Availability, eligibility, fees, cancellation consequences, and refund status must come from the booking system. Account deletion needs a clear explanation of its effect and explicit confirmation; retention and deletion behavior remain to be defined.

## Help & Legal — 9 screens

1. Contact Us
2. Help Center / FAQ
3. Support Request
4. Support Request Status
5. Terms & Conditions
6. Privacy Policy
7. Cancellation & Refund Policy
8. Safety & Community Rules
9. Accessibility Information

Make public help and policy content reachable from the footer and relevant booking steps. Access to a customer's support request status must be protected. Legal copy, support channels, and policy details require supplied business requirements; screen names do not establish those policies.

## Navigation integration

Keep the established ten-item customer menu as the primary entry structure. Home links to Homepage; Experiences to Explore All Experiences; Book a Slot to Experience Selection; Dream Room to Dream Room Landing; Events to Upcoming Events; My Bookings to the booking list; My Profile to the profile; About Us to About Melo Space; Contact to Contact Us. Gift Cards remains a previously specified entry whose purchase flow is not enumerated here; My Gift Vouchers is explicitly included in the account inventory.

Expose Gallery, How It Works, Locations & Directions, and account subsections through contextual links and secondary navigation. Place Help & Legal destinations in support navigation and the footer. Keep Community Guidelines and Safety & Community Rules as separate traceable entries until their content relationship is defined.

## Planning implications

The previous **63-screen overall total is superseded** and is no longer a current project total. The 73 customer entries already include Dream Room; do not add its nine entries again. The subsequent `PORTAL-SCREEN-INVENTORY.md` expands Admin to 106 entries and Staff to 22, and adds 13 shared-system entries. The raw cross-inventory sum is 214 before deduplication. The earlier six-entry gift vouchers / memberships allocation overlaps the expanded customer and admin scope and must not be added separately.

Earlier phase priorities remain historical guidance. This expanded scope has not been assigned item-level phases; do not assume all 73 entries are committed to Phase 1. Component-library implementation progress remains 0/17 until components are implemented and verified.
