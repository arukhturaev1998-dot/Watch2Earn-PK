# Rabbit Rewards — Mobile Packaging (Capacitor)

This wraps the existing `frontend/` web app in a native shell so it can be
built into a real installable Android `.apk` (or iOS app). It does **not**
rewrite any of your HTML/CSS/JS — it just packages it.

Building an actual `.apk` requires Android Studio and the Android SDK, which
aren't available in this chat environment, so the steps below are for you to
run on your own computer.

## Prerequisites (on your computer)

- Node.js 18+
- [Android Studio](https://developer.android.com/studio) installed (for the Android SDK + emulator/build tools)
- A real deployed backend URL (not `localhost`) — see the main project README for deployment steps, since your phone/emulator can't reach your computer's `localhost`

## 1. Point the app at your live backend

Before packaging, open `../frontend/js/api.js` and change:

```js
const API_BASE = "http://localhost:5000/api";
```

to your real deployed API, e.g.:

```js
const API_BASE = "https://rabbit-rewards-api.onrender.com/api";
```

(If you only want to test on an Android **emulator** against a backend still
running on your own machine, use `http://10.0.2.2:5000/api` instead — that's
the emulator's special address for your computer's localhost.)

## 2. Install dependencies

```bash
cd mobile
npm install
```

## 3. Add the Android platform (first time only)

```bash
npm run add-android
```

This creates an `android/` folder — a full native Android Studio project.

## 4. Copy the web app in and sync

```bash
npm run sync
```

Run this again any time you change files in `../frontend/`.

## 5. Open in Android Studio and build

```bash
npm run open-android
```

This opens the `android/` project in Android Studio. From there:

- **Run on an emulator/device**: click the ▶ Run button
- **Build a shareable APK**: `Build → Build Bundle(s) / APK(s) → Build APK(s)`
  — the `.apk` will appear under `android/app/build/outputs/apk/`
- **Build for the Play Store**: `Build → Generate Signed Bundle / APK`, choose
  "Android App Bundle", and follow Android's signing-key wizard (needed once
  per app — keep that keystore file safe, you'll need it for every future update)

## iOS (optional, requires a Mac + Xcode)

```bash
npm run add-ios
npm run sync
npm run open-ios
```

Then build/run from Xcode. Publishing to the App Store additionally requires
an active Apple Developer account ($99/year).

## App icon & splash screen

Capacitor uses `resources/icon.png` (1024×1024) and `resources/splash.png`
(2732×2732) if present, then the
[`@capacitor/assets`](https://github.com/ionic-team/capacitor-assets) tool
can generate all the platform-specific sizes automatically:

```bash
npx @capacitor/assets generate
```

## Notes

- This is a WebView wrapper, not a from-scratch native rewrite — it's the
  fastest legitimate way to get a real installable app from an existing web
  frontend, and is the same approach many production apps use.
- Before publishing to the Play Store, double check `capacitor.config.json`'s
  `appId` is unique to you (reverse-domain style, e.g. `com.yourcompany.rabbitrewards`).
