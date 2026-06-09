Steps to deploy Google Apps Script webhook and wire it to the site

1) Open the Google Sheet you linked (you already provided it):
   https://docs.google.com/spreadsheets/d/1GB0EPbq6R2txaTkE2WjdlvAQaFpPo1DXEcs0D-JKkUs/edit

2) Tools → Script editor (or Extensions → Apps Script) and create a new project.

3) Replace the default code with the file `scripts/google-apps-script.gs` in this repo. Make sure `SHEET_ID` matches the ID from step 1 (the file already contains your Sheet ID).

4) (Optional) Change `SECRET_KEY` to a secret string (e.g. `mySecret123`) if you want a simple access key.

5) Deploy the script as a web app:
   - Click Deploy → New deployment
   - Select "Web app"
   - For "Execute as" choose: Me
   - For "Who has access" choose: Anyone (if you want no auth) or "Anyone with Google account" for some protection
   - Click Deploy and copy the Web App URL (e.g. https://script.google.com/macros/s/XXXXXXXX/exec)

6) If you set a `SECRET_KEY`, append it as a query parameter to the URL when you use it. Example:

   https://script.google.com/macros/s/XXXXXXXX/exec?key=mySecret123

7) You can use the URL directly in the site code, so `.env` is optional. If you prefer environment-based config, use `VITE_GOOGLE_SHEET_URL`.

Local testing (optional, if you want env override):

```
VITE_GOOGLE_SHEET_URL="https://script.google.com/macros/s/XXXXXXXX/exec?key=mySecret123"
```

8) Build & deploy your site (so the URL is baked into the built code):

```bash
npm run build
npm run deploy
```

9) Test by submitting the contact form or the buy modal. The Apps Script should append rows to your sheet.

Security notes
- The web app is public if you choose "Anyone" access — anyone with the URL can POST. Use `SECRET_KEY` to make it slightly safer.
- For production-sensitive data, use OAuth/Cloud Functions with authentication.

If you want, I can also:
- Provide a ready-to-deploy GitHub Actions workflow snippet that injects the URL as `VITE_GOOGLE_SHEET_URL` using GitHub Secrets.
- Help you deploy the Apps Script if you paste back the Web App URL and desired secret (you must run the actual deploy in your Google account).