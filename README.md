# Melo Space

The current user and admin interfaces follow [DS6 from the supplied Word document](DS6-IMPLEMENTATION.md): all 61 named user screens and 13 admin screens ending at Category Management. Admin category edits feed user discovery. Missing user IDs 053–056 are flagged rather than invented. Existing staff pages remain the earlier prototype.

A dependency-free local website prototype for the customer, admin, and staff portals, alongside the design-system specifications.

Requires Node.js 20 or newer. Run `npm start`, then open:

The DS6 preview in this session runs on **port 3001**, since port 3000 is used by another project. Open http://localhost:3001/customer or http://localhost:3001/admin. To choose that port on a fresh PowerShell launch, run `$env:PORT='3001'` followed by `npm.cmd start`. The default URLs below apply when port 3000 is free.

- Customer: http://localhost:3000/customer
- Admin: http://localhost:3000/admin
- Staff: http://localhost:3000/staff

Run `npm run check` for JavaScript syntax validation.

## Prototype scope

Experience discovery and filters, experience details, a private-room customization form, demo booking creation, customer booking records, admin booking metrics, staff booking-reference lookup and demo check-in, plus the complete admin/staff navigation structure. Unimplemented modules are explicitly marked as planned. Data is stored only in this browser's localStorage and is shared across portals on the same origin.

This is a local demo, with no real authentication, role enforcement, live availability, payments, valid QR tickets, or production data storage. Use sample guest names only. All portal routes are intentionally accessible for local exploration. The server binds to loopback only; do not expose this prototype as a production booking system.

## Specifications

- `DESIGN-SYSTEM.md`: visual and interaction system
- `CUSTOMER-SCREEN-INVENTORY.md`: complete customer scope
- `PORTAL-SCREEN-INVENTORY.md`: admin/staff/shared scope
- `IMPLEMENTATION-ROADMAP.md`: delivery priorities
- `tokens.css`: reusable CSS tokens

GitHub publication requires a target repository and authenticated Git access. This Node server requires a Node-compatible host; GitHub Pages does not run Node servers.
