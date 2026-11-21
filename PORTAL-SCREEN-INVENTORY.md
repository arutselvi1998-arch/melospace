# Melo Space: admin, staff, and shared navigation

Current capability-level delivery phases are defined in [Implementation priorities](IMPLEMENTATION-ROADMAP.md), superseding earlier phase estimates. A deduplicated implementation estimate and detailed screen-to-phase mapping remain to be defined.

This user-supplied inventory supersedes the earlier 24-item admin and six-item staff navigation breakdowns. Screen entries may share routes, templates, components, or states; they are not a count of independently implemented pages.

| Scope | Planning entries |
| --- | ---: |
| Customer, including Dream Room (see customer inventory) | 73 |
| Admin | 106 |
| Staff | 22 |
| Authentication and shared system | 13 |
| **Raw sum before cross-portal deduplication** | **214** |

The raw sum is not a unique-screen development estimate. Staff Logout is an action; shared authentication, notifications, booking details, and other entries overlap across inventories. Do not add the earlier gift-voucher/membership allocation separately: its scope now appears across customer and admin entries and requires reconciliation. Delivery phases and a deduplicated implementation estimate remain to be defined.

## Admin dashboard — complete sidebar navigation

The Admin Portal controls activities, booking inventory, customers, staff, revenue, website content, and system settings. Preserve the following 11 sidebar groups and item order. Use expandable groups where needed for the larger inventory, keeping the active group open and the active page visible. Expand/collapse buttons expose their state; destination links expose the current page. Retain the established deep plum sidebar, rose active highlight, ivory workspace, and white cards.

### Dashboard — 5 screens

1. Overview Dashboard
2. Live Activity Dashboard
3. Revenue Snapshot
4. Booking Trends
5. Alerts & Notifications

### Booking Management — 10 screens

1. All Bookings
2. Booking Calendar
3. Pending Bookings
4. Confirmed Bookings
5. Cancelled Bookings
6. Reschedule Requests
7. Refund Requests
8. Manual / Walk-in Booking
9. Waitlist Management
10. QR Check-in Records

### Experience Management — 11 screens

1. All Experiences
2. Add New Experience
3. Edit Experience
4. Experience Categories
5. Experience Pricing
6. Session Templates
7. Create Sessions
8. Session Calendar
9. Slot Availability
10. Capacity Management
11. Materials & Add-ons

### Dream Room Management — 9 screens

1. Room Dashboard
2. Room Inventory
3. Room Themes
4. Theme Customization
5. Outfits & Props Inventory
6. Private Booking Calendar
7. Room Maintenance Blocks
8. Dream Room Pricing
9. Room Add-on Packages

### Events & Community — 9 screens

1. All Events
2. Create Event
3. Edit Event
4. Event Calendar
5. Event Registrations
6. Meetup Groups
7. Talent Showcase Schedule
8. Waitlists
9. Community Safety Reports

### Customers — 6 screens

1. All Customers
2. Customer Profile
3. Customer Booking History
4. Customer Feedback
5. Customer Support Tickets
6. Customer Restrictions & Safety Review

### Staff & Operations — 9 screens

1. Staff Directory
2. Add / Edit Staff
3. Roles & Permissions
4. Staff Shifts
5. Facilitator Assignments
6. Attendance & Check-in
7. Room Readiness
8. Daily Operations Checklist
9. Incident Reports

### Finance — 9 screens

1. Payment Transactions
2. Revenue Reports
3. Refund Management
4. Discounts & Coupons
5. Gift Voucher Management
6. Membership Plans
7. Invoices & Receipts
8. Payment Reconciliation
9. Tax Settings

### Marketing & Content — 8 screens

1. Homepage CMS
2. Banners & Promotions
3. Gallery Management
4. Testimonials & Reviews
5. Email / WhatsApp Templates
6. Campaign Management
7. SEO Settings
8. Blog / Stories

### Reports & Analytics — 8 screens

1. Booking Analytics
2. Revenue Analytics
3. Experience Performance
4. Room Utilization
5. Customer Retention
6. Cancellation Reports
7. Staff Performance
8. Export Reports

### System Settings — 12 screens

1. Business Profile
2. Location Management
3. Operating Hours
4. Holidays & Closures
5. Booking Rules
6. Cancellation Rules
7. Payment Gateway Settings
8. Notification Settings
9. Admin User Management
10. Audit Logs
11. Integrations
12. Security Settings

Apply role-specific authorization to every destination, record, and mutation. Similar names such as Refund Requests and Refund Management identify separate navigation contexts, not automatically separate implementations. Reuse booking-status lists and create/edit forms where appropriate while preserving all entries for scope tracking. Exact admin permission assignments and business rules remain to be specified.

## Staff portal — complete navigation

Staff members see only the sessions, rooms, and operational tasks assigned to them. This expands the earlier six-tile entry menu into six groups and 22 entries; the old tiles may be retained as shortcuts to this navigation.

| Group | Entries | Count |
| --- | --- | ---: |
| Staff Dashboard | Today's Overview; My Shift; Announcements | 3 |
| Sessions | My Assigned Sessions; Session Details; Participant List; Start / End Session; Session Attendance | 5 |
| Check-in | QR Code Scanner; Manual Booking Search; Guest Verification; Check-in History | 4 |
| Rooms | Room Schedule; Room Readiness Checklist; Equipment & Materials; Maintenance / Issue Report | 4 |
| Support & Safety | Customer Assistance; Incident Reporting; Emergency Procedures | 3 |
| Account | My Profile; Notifications; Logout | 3 |
| **Total** | | **22** |

Keep the staff interface mobile-first, with large operational actions and simple session lists. Enforce assignment scope in returned data as well as navigation. Show only information required for the staff member's role. Verify booking and session context before recording attendance; prevent duplicate submissions and show confirmed save status. Session start/end, attendance corrections, and room-readiness updates require defined permissions and transition rules. Logout is an action using the shared logout-confirmation pattern where appropriate.

## Authentication and shared system screens — 13 entries

1. Welcome / Login
2. Customer Registration
3. Email / Phone Verification
4. Forgot Password
5. Reset Password
6. Session Expired
7. Access Denied (403)
8. Page Not Found (404)
9. Server Error (500)
10. Offline / Connection Error
11. Maintenance Mode
12. Notification Center
13. Logout Confirmation

Share implementations where appropriate across portals while enforcing role-specific authorization. Preserve a permitted return destination and booking draft through login or session renewal. Keep errors actionable, with an appropriate retry or navigation option. Notifications show only content authorized for the signed-in account. Registration and recovery methods remain to be configured; listing Email / Phone Verification does not require both channels for every account.

## Key navigation flows

### Standard experience booking

Home → Explore → Experience Details → Date & Slot → Guests → Add-ons → Checkout → Payment → QR Confirmation → My Bookings

Use the detailed customer inventory for location selection, optional authentication and vouchers, and payment outcome states.

### Private Dream Room booking

Home → Dream Room → Theme → Private Slot → Customization → Add-ons → Booking Summary → Payment → Confirmation

Use the dedicated Dream Room selection journey and shared payment components. Make guidelines available before payment; preserve the private-room context through confirmation.

### Group meetup booking

Events → Meetup Details → Age / Capacity Rules → Choose Session → Registration → Payment → Confirmation → Check-in

Age / Capacity Rules is a required step in this flow; numeric age limits and capacity policies have not been supplied. Validate configured eligibility and capacity before payment. Waitlisting does not imply confirmed attendance.

### Admin session creation

Admin → Experiences → Create Session → Assign Room & Facilitator → Set Capacity & Price → Publish → Booking Calendar

Validate configured room and facilitator availability, capacity, and price before publication. Show validation failures without discarding the draft. Publishing exposes the session according to its configured availability; the precise publication rules remain to be defined. “Create Session” in the flow maps to the “Create Sessions” sidebar entry.

### Staff check-in

Staff Login → Today's Sessions → QR Scanner → Verify Booking → Mark Attendance → Session Completion

“Today's Sessions” maps to the assigned-session view within Today's Overview / My Assigned Sessions. “QR Scanner” maps to QR Code Scanner; verification and attendance use their corresponding staff entries. Session Completion uses the authorized end-session action. These are flow labels, not additional inventory entries. Scanner access and attendance updates remain scoped to assigned sessions.

## Relationship to the design system

Use `DESIGN-SYSTEM.md` for visual and interaction guidance, `tokens.css` for shared tokens, and `CUSTOMER-SCREEN-INVENTORY.md` for the 73 customer entries. This document is authoritative for the expanded admin and staff navigation, shared system screens, and key flows. Implementation progress remains 0/17 component-library items until components are implemented and verified.
