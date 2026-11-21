# Melo Space implementation priorities

This user-supplied roadmap supersedes earlier phase guidance. Progress tracks implemented and verified capabilities, rather than documentation or screen counts.

## Phase 1 — MVP

**Progress: 0/9**

- [ ] Homepage and experience discovery
- [ ] Experience details and slot availability
- [ ] Authentication and customer profiles
- [ ] Booking, checkout and payment
- [ ] Booking confirmation and QR ticket
- [ ] Dream Room booking and customization
- [ ] Admin dashboard and booking management
- [ ] Experience, session and room management
- [ ] Staff QR check-in

## Phase 2 — Operations

**Progress: 0/7**

- [ ] Staff shifts and assignments
- [ ] Cancellation, refund and rescheduling
- [ ] Customer support and notifications
- [ ] Coupons and promotional pricing
- [ ] Finance and reconciliation reports
- [ ] Content management and galleries
- [ ] Waitlists and capacity monitoring

## Phase 3 — Growth

**Progress: 0/7**

- [ ] Gift vouchers
- [ ] Membership plans
- [ ] Community engagement
- [ ] Customer reviews
- [ ] Advanced analytics
- [ ] Multi-location expansion
- [ ] Campaign automation

## Scope and dependencies

These 23 work items group capabilities across the current screen inventories; they are not 23 screens. Mark an item complete after its agreed scope, interaction states, authorization, responsive behavior, and integrations have been implemented and verified. The workspace currently contains specifications and tokens, so no implementation completion is claimed.

Staff QR check-in is explicitly Phase 1, superseding the earlier blanket Phase 2 staff allocation. Include the assignment-scoped access and booking verification needed for MVP check-in; expanded shift planning and assignment management remain Phase 2.

Phase 1 includes basic dashboard and booking-management views. Expanded finance and reconciliation reports are Phase 2; advanced analytics is Phase 3. MVP payment integration still requires verified payment outcomes before booking confirmation.

Later-phase screens remain in the inventory without implying MVP delivery. Coupon application belongs to Phase 2; gift-voucher purchase and redemption belong to Phase 3. Expose navigation and checkout options when their supported capability is delivered.

Location selection and administration already appear in the screen inventories. Multi-location expansion is Phase 3; the number of launch locations remains to be confirmed. Keep location context explicit without assuming a full multi-location rollout.

Earlier build-order recommendations apply only where consistent with this roadmap. Detailed screen-to-work-item mapping, delivery dates, and estimates remain to be defined.

## Related specifications

- [Design system](DESIGN-SYSTEM.md)
- [Customer screen inventory](CUSTOMER-SCREEN-INVENTORY.md)
- [Admin, staff, shared screens, and flows](PORTAL-SCREEN-INVENTORY.md)
- [CSS tokens](tokens.css)
