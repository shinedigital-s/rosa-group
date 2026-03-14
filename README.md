# The ROSA Group Website

React + Vite website for The ROSA Group / M/s. ROSA Infra – Civil Contractors.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

---

## Google Sheets Contact Form Setup

When a visitor submits the contact form, the data is sent to Google Sheets.

### Steps

1. **Create a Google Sheet** with these column headers in Row 1:
   `Timestamp | Name | Company | Phone | Email | Service | Message`

2. **Open Apps Script**: Extensions → Apps Script

3. **Paste this script** and save:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.company,
    data.phone,
    data.email,
    data.service,
    data.message,
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. **Deploy as Web App**:
   - Click Deploy → New Deployment
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy → Copy the Web App URL

5. **Paste the URL** into `src/pages/Contact.jsx`:
   ```js
   const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   ```

---

## Adding Your Real Logo

Replace the "R" icon in `Navbar.jsx` and `Footer.jsx` with your actual logo image:

```jsx
import logoImg from '../assets/rosa-logo.png'

// In the logo area:
<img src={logoImg} alt="The ROSA Group" height="38" />
```

Place your logo file at `src/assets/rosa-logo.png`.

---

## Replacing Project Placeholder Images

In `src/pages/Projects.jsx`, each project card uses an SVG placeholder.
To add real project photos:

1. Add images to `src/assets/projects/`
2. In the `PROJECTS` array, add an `image` field:
   ```js
   { id: 1, ..., image: '/src/assets/projects/st-louis.jpg' }
   ```
3. In `ProjectPlaceholder`, replace the SVG with:
   ```jsx
   <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
   ```

---

## Tech Stack

- **React 18** + **Vite 5**
- **React Router v6** — SPA routing
- **Lenis** — Smooth scrolling
- **GSAP + ScrollTrigger** — All animations
- **Montserrat** + **Cormorant Garamond** — Typography
- Pure CSS (no Tailwind) — CSS variables for the brand palette

---

## Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--rosa-red` | `#C0392B` | Primary accent, CTAs |
| `--rosa-deep` | `#8B1A11` | Hover states |
| `--rosa-blue` | `#1A2B5F` | Dark sections |
| `--cream` | `#F6F1E9` | Page backgrounds |
| `--charcoal` | `#1C1C1C` | Body text |

---

Contact: info@therosagroup.in | www.therosagroup.in
