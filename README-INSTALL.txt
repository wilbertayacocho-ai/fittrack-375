# FitTrack 375 — GitHub Pages update package

This package adds the generated exercise illustration overview to the Exercises tab, fixes the app icon path, and bumps the service-worker cache to v3.

## Files to upload to the root of `wilbertayacocho-ai/fittrack-375` (branch `main`)
- `index.html` — updated app page with the illustration overview in the Exercises tab
- `manifest.webmanifest` — correct manifest icon path and app metadata
- `sw.js` — v3 cache, removes old `fittrack375-*` caches and fetches app HTML network-first
- `icons/fittrack-icon.svg` — new FitTrack icon
- `assets/exercise-guide-overview.png` — generated exercise illustration overview

Keep the folders `icons/` and `assets/` intact.

## Upload from iPhone Safari
1. Open https://github.com/wilbertayacocho-ai/fittrack-375
2. For each existing file (`index.html`, `manifest.webmanifest`, `sw.js`), open it, tap the pencil/Edit control, replace its contents with the matching file from this package, then commit to `main`.
3. Upload `icons/fittrack-icon.svg` and `assets/exercise-guide-overview.png` using Add file → Upload files. Create the `icons` and `assets` folders if needed; GitHub creates folders through the file path.
4. Wait 1–3 minutes, then open https://wilbertayacocho-ai.github.io/fittrack-375/
5. If it still looks old, close the app tab and reopen the live link. The v3 service worker removes older `fittrack375-*` caches after it activates.

## Important
The infographic is a visual overview, not a substitute for the individual Guide steps. Generated poster text can contain small visual inaccuracies; use the app's written movement instructions for exercise technique. The package does not change workout data or the 375 km target.
