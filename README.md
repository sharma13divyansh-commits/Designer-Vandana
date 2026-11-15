# Designer Vandana Learning Studio — Official Website

A modern, responsive, high-converting website for **Designer Vandana Learning Studio** (ISO Certified & MSME Registered Institute in Paschim Vihar, New Delhi).

## 📁 File Structure

```text
Designer Vandana/
├── index.html                 # Main website HTML with Formspree lead enquiry form
├── vercel.json                # Vercel configuration (clean URLs & security headers)
├── css/
│   └── style.css              # Custom styling, responsive layouts & typography
├── js/
│   └── main.js                # Form validation, Formspree AJAX handler, navigation & lightbox
└── images/
    ├── logo.png               # Official transparent gold monogram logo
    ├── hero-creative-workspace.svg # Hero section workstation illustration
    ├── about-classroom.svg    # About Us studio classroom visual
    ├── certificate-iso.svg    # ISO 9001 certification showcase badge
    ├── certificate-msme.svg   # MSME Government registration badge
    └── gallery/               # Student project showcase artwork
        ├── logo-design.svg
        ├── visiting-card.svg
        ├── packaging-design.svg
        ├── social-media.svg
        ├── photoshop-manipulation.svg
        ├── vector-illustration.svg
        ├── video-editing.svg
        └── brand-mockup.svg
```

## 🚀 How to Publish on Vercel

### Method 1: Deploy with Vercel CLI (Fastest)

1. Open PowerShell / Command Prompt inside this folder:
   ```bash
   cd "C:\Users\admin\.gemini\Designer Vandana"
   ```
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the on-screen prompts:
   - Log in or create a free Vercel account.
   - Confirm project name (`designer-vandana`).
   - Leave build settings as default (Static).
4. Your site will instantly go live with a free `.vercel.app` URL and free SSL!

---

### Method 2: Deploy via GitHub (Recommended for automatic updates)

1. Create a new repository on [GitHub](https://github.com/new).
2. Push this folder to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Designer Vandana website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new).
4. Click **Import** next to your repository.
5. Click **Deploy**. Vercel will build and deploy your site in seconds!

---

### Method 3: Drag & Drop on Vercel Dashboard

1. Log into [vercel.com](https://vercel.com).
2. Go to **Overview** and click **Add New...** -> **Project**.
3. Select your local folder `C:\Users\admin\.gemini\Designer Vandana` and upload.
4. Click **Deploy**.

---

## 📬 Formspree Integration

The client enquiry form connects to:
- **Endpoint**: `https://formspree.io/f/xbgogjow`
- **Method**: `POST`
- **Fields**: `name`, `phone`, `email`
- Submissions are delivered directly to your verified Formspree email address.
