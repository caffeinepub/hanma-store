# Specification

## Summary
**Goal:** Add a protected Admin Dashboard page and navigation entry point for authenticated admin users.

**Planned changes:**
- Add a new admin home route at `/admin` that is access-controlled (admins only) and shows an access-denied experience for logged-out or non-admin users (with a login option when logged out).
- Build an Admin Dashboard page that displays high-level statistics (Products, Categories, Menu Items, Orders) with loading/error states, plus clickable navigation tiles/cards to key admin areas.
- Add an “Admin” link to site navigation (desktop and mobile where applicable) that is only visible to authenticated admin users and routes to `/admin`.

**User-visible outcome:** Admin users can navigate to `/admin` (or via an Admin nav link) to see dashboard stats and quick links to admin sections; non-admin or logged-out users are blocked with an access-denied screen.
