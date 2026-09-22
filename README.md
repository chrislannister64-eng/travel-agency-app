# Voyage — Travel Agency App

React + React Router + Material UI (MUI) + Firebase (Auth + Firestore) + Paystack.

## Pages
- **Home** — hero + featured packages
- **Destinations** — browse, search destinations (derived from package data)
- **Packages** — browse/search/filter packages by destination
- **Package detail** (`/packages/:id`) — full info, "Book now"
- **Booking** (`/booking/:packageId`, protected) — traveler details + Paystack checkout
- **My Bookings** (protected) — booking history with status
- **Contact** — message form, saved to Firestore
- **Login / Signup**
- **Admin** (bonus, not in the assignment's page list, but needed to populate data) — package CRUD

## Get it running locally

1. `npm install`
2. Create a Firebase project at console.firebase.google.com, register a Web App, enable **Authentication → Email/Password** and **Firestore Database**
3. `cp .env.example .env` and fill in the `VITE_FIREBASE_*` values
4. For Paystack: sign up at paystack.com, grab your **test public key** from Settings → API Keys, put it in `VITE_PAYSTACK_PUBLIC_KEY`
5. `npm run dev`

## Cloud Functions (payment verification)

Paystack's client-side "success" callback can be spoofed, so actual payment
confirmation happens server-side in `functions/index.js`:

```
cd functions && npm install
firebase functions:secrets:set PAYSTACK_SECRET_KEY   # paste your Paystack SECRET key when prompted
firebase deploy --only functions
```

Also set the webhook URL Firebase gives you for `paystackWebhook` in your
Paystack dashboard (Settings → API Keys & Webhooks) as a backup confirmation
path.

## Deploy Firestore rules & indexes

```
npm install -g firebase-tools
firebase login
firebase init   # select Firestore + Functions, point at this folder, keep existing files
firebase deploy --only firestore:rules,firestore:indexes
```

## Git workflow (this is graded, so commit as you go — don't do one giant commit)

```
git init
git add .
git commit -m "chore: initial project scaffold with Firebase auth"
git branch -M main
git remote add origin <your-empty-GitHub-repo-URL>
git push -u origin main
```

Then, as you build each piece, commit separately with a message describing
just that change, e.g.:
```
git commit -m "feat: destinations page with search"
git commit -m "feat: booking flow with Paystack checkout"
git commit -m "feat: cloud function for server-side payment verification"
git commit -m "fix: booking status not updating after payment"
```
Small, frequent, descriptively-labeled commits are what graders are looking
for in the Git history — not perfection, just visible incremental progress.

## Deploy to Vercel or Netlify

Both read `vercel.json` / `netlify.toml` already in this repo for
client-side routing support (React Router needs the server to always
serve `index.html`).

**Vercel:**
1. Push this repo to GitHub
2. vercel.com → New Project → import the repo
3. Framework preset: Vite. Add the same env vars from your `.env` in Project Settings → Environment Variables
4. Deploy

**Netlify:**
1. Push this repo to GitHub
2. app.netlify.com → Add new site → import from Git
3. Build command: `npm run build`, publish directory: `dist`
4. Add the same env vars under Site settings → Environment variables
5. Deploy

Submit both the live URL and the GitHub repo URL as required.

## Folder guide
```
src/
  components/   Navbar, PackageCard — shared UI
  pages/
    customer/   Home, Destinations, Packages, PackageDetail, Booking, MyBookings, Contact
    admin/      Dashboard, Packages (CRUD)
    auth/       Login, Signup
  context/      AuthContext — logged-in user + admin claim
  hooks/        usePackages, useAllPackages, usePackage, useMyBookings — Firestore data hooks
  routes/       ProtectedRoute, AdminRoute
  lib/          firebase.js (init), paystack.js (checkout helper)
  theme.js      MUI theme (colors, typography)
functions/      Cloud Functions — verifyPayment, paystackWebhook, setAdminClaim
firestore.rules server-side security rules
```
