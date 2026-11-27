# Melo Space local backend

Run with Node.js 24 or newer: `npm start`. This reads the ignored `.env` file. The app is available on the configured localhost port.

Customer signup, email/password login, profile updates, booking creation, cancellation, and rescheduling now use server APIs. Customer and admin booking views read from SQLite rather than the browser's booking cache. A signed-in administrator can view customer records. Demo OTP no longer grants a server session.

Database: `.local/melo.sqlite` (ignored by Git). Back up the database and its WAL consistently while stopped. Browser-only records from older previews are not automatically imported. Existing local demo passwords were never saved; register an account to use the new server.

Administrator: configure `MELO_ADMIN_EMAIL` and a password of at least 12 characters in `.env` before startup. A new administrator is created only if that email does not exist. Changing the bootstrap password does not reset an existing account. This workspace has a generated local administrator credential in its ignored `.env`; do not commit or share this file.

Passwords use salted scrypt hashes. Sessions are random tokens in HttpOnly, SameSite=Strict cookies, stored as hashes with a one-day expiry. Customer endpoints require a session; admin customer records require the admin role. Booking ownership, totals, dates, capacities and cancellation transitions are checked on the server. This local backend does not allocate real room inventory or collect payments.

Payments, email/OTP delivery, password recovery, production deployment, and shared category/content storage remain outside this local backend stage. The former staff demo still uses browser records. Categories, messages and community interactions remain preview features. Do not expose this local development server as a production service.

Run `npm run check` and `npm test`. The API integration test uses a temporary database and exercises account isolation, administrator access, booking status persistence, server-side pricing, rejected origins, and logout.
