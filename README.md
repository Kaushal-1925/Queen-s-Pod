# Queen's Pod - Eco-Luxury Riverside Cafe & Restaurant

Welcome to the **Queen's Pod** web project! This is a complete, vanilla-stack web application built for a Bali-inspired eco-luxury restaurant located in Gangtok, Sikkim. 

The application is built as a highly interactive, Single Page Application (SPA) using purely HTML, CSS, and JavaScript, without the need for heavy frameworks.

## 🚀 Tech Stack
- **HTML5:** Semantic structure and layout.
- **CSS3:** Custom styling, animations, responsive design, and CSS variables for theming.
- **Vanilla JavaScript (ES6+):** Logic for SPA routing, interactive components, and form submissions.

## ✨ Key Features
1. **Single Page Application (SPA) Routing:** Seamless navigation between Home, Experience, Menu, and Reservation pages using hash-based routing (`#home`, `#menu`, etc.) without page reloads.
2. **Interactive 360° Panorama:** A drag-to-scroll panoramic viewport showcasing the riverside ambiance with interactive hotspots (Glass Deck, Stream, Bamboo Domes).
3. **Ambient Audio:** A toggleable river ambient sound effect for an immersive browsing experience.
4. **Dynamic Menu Filtering:** 
   - **Category Tabs:** Filter between Sikkimese, Starters, Oriental, Italian, North Indian, etc.
   - **Dietary Toggles:** Filter dishes dynamically by Veg and Non-Veg.
5. **Lightbox Gallery:** An interactive, filterable image gallery on the Experience page.
6. **Reservation System:** A complete table booking form integrated with **Web3Forms** for email notifications and an automatic redirect to a pre-filled WhatsApp message.

## 📁 File Structure

```text
a:\Queens Pod\
├── index.html       # The main entry point containing all SPA sections.
├── styles.css       # Core styling, animations, CSS variables, and media queries.
├── script.js        # Core logic (Routing, Panorama, Filters, Forms).
├── README.md        # This project context document.
└── assets/          # Directory containing all images, icons, and media files.
    ├── hero_background.png
    ├── exterior.jpg
    ├── food_item_cards...
    └── ...
```

## 🧠 Architecture Overview

### 1. `index.html` (The Skeleton)
The entire site lives within a single HTML file divided into `.page-section` blocks (`#home`, `#experience`, `#menu`, `#reservations`). Only the active section is displayed at any given time, controlled by the JavaScript router.

### 2. `styles.css` (The Theme)
The CSS utilizes modern features:
- **CSS Variables (`:root`)**: For centralized color management (e.g., `--bg-dark`, `--accent-gold`, `--text-light`).
- **Glassmorphism**: Achieved using `backdrop-filter: blur()` and semi-transparent backgrounds to give a premium, modern feel.
- **Responsive Layouts**: Flexbox and CSS Grid are used extensively to ensure the site looks beautiful on both mobile phones and desktop monitors.

### 3. `script.js` (The Brain)
The JavaScript file is neatly compartmentalized into functions within an `initializeApp()` wrapper:
- **Routing (`handleRouting`):** Listens to the `hashchange` event and toggles the `active` class on the relevant HTML sections and navigation links.
- **Panorama (`centerPanorama` / Drag Events):** Calculates mouse/touch movements to translate the `panorama-slider` div horizontally.
- **Menu Filtering:** Reads `data-target` and `data-diet` attributes to dynamically hide/show menu grid items.
- **Form Handling:** Intercepts the reservation form submission, sends an asynchronous `fetch` request to the Web3Forms API, and builds a URL-encoded string for the WhatsApp redirect.

## 🛠️ How to Run Locally
1. Navigate to the project directory.
2. Serve the directory using a local web server to prevent CORS issues (especially for the panorama and audio). For example, if you have Python installed:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.

## 🌐 Deployment
The project is connected to a GitHub repository (`Kaushal-1925/Queen-s-Pod`) and is set up to deploy automatically via **Render** whenever changes are pushed to the `main` branch.
