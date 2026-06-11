# 🌿 Queen's Pod - Complete Project Specifications

This document serves as the ultimate source of truth for the **Queen's Pod** web project. It outlines the technology stack, the complete design system (including themes, colors, and typography), file architectures, and JavaScript module breakdowns.

---

## 🛠️ Technology Stack
- **Structure:** HTML5 (Semantic tagging, accessible ARIA labels)
- **Styling:** CSS3 (Vanilla CSS, CSS Variables/Custom Properties, Flexbox & CSS Grid, Media Queries)
- **Logic:** Vanilla JavaScript ES6+ (No external JS frameworks like React or jQuery used)
- **Form Handling:** Web3Forms API (For serverless email processing)
- **Deployment & Version Control:** Git, GitHub, Render (Continuous Deployment)

---

## 🎨 Design System & Theme

The project uses a custom design system centered around a "Bali-inspired, Eco-Luxury, Nature-Centric" aesthetic.

### 1. Typography
Two primary Google Fonts are used to establish a luxurious yet readable hierarchy:
- **Heading Font:** `Playfair Display`, fallback to `Georgia`, `serif`. Used for all `h1`-`h6` tags, giving a classic, elegant, and premium feel.
- **Body Font:** `Lato`, fallback to `system-ui`, `-apple-system`, `sans-serif`. Used for standard paragraph text (`p`), buttons, and UI elements for clean, modern readability.

### 2. Color Palette
Defined globally via CSS Variables in `:root`:
- 🟢 **Forest Teal (`#1A6B5E`):** Used for primary Call-To-Action (CTA) buttons, headings, and navigation elements.
- 🟡 **Warm Gold (`#B8862C`):** Used for accents, highlights, tags, and hover states.
- ⚪ **Ivory Mist (`#F7F3EE`):** The primary page background color.
- ⚫ **Deep Earth (`#2C2416`):** Used for all primary body text and dark backgrounds.
- 🪨 **Stone White (`#FDFAF6`):** Used for solid card backgrounds and input fields.
- 🔵 **River Blue (`#4A8FA8`):** Decorative accent color representing the Ranikhola river.

### 3. Signature Glassmorphism Elements
To provide a highly modern and eco-luxurious feel, "Frosted Glass" (`.glass-card`) is used heavily across the UI:
- **Background:** `rgba(253, 250, 246, 0.45)`
- **Backdrop Blur:** `15px`
- **Border:** `1px solid rgba(184, 134, 44, 0.25)`
- **Shadow:** `0 8px 32px 0 rgba(44, 36, 22, 0.08)`
- **Borders Radius:** Large (`20px`), Medium (`12px`), Small (`6px`)

---

## ⚙️ Core Modules & Functionality (JavaScript)

The `script.js` file is the brain of the Single Page Application (SPA). It initializes the following controllers automatically upon page load:

1. **SPA Routing Controller:** 
   - Listens to the `hashchange` event (e.g., changing from `#home` to `#menu`).
   - Toggles the `.active` CSS class to instantly display the requested page section while hiding the others, and smoothly scrolls to the top.
2. **360° Panorama Viewer Controller:** 
   - Handles mouse/touch drag events to pan a wide background image horizontally inside a constrained viewport.
   - Includes logic to constrain scroll boundaries to prevent scrolling past the edge of the image.
   - Handles interactive "hotspots" layered over the image.
3. **Ambient River Sound Controller:**
   - Controls an HTML5 `<audio>` element that plays a soft river ambient sound effect with a custom play/pause toggle button.
4. **Dynamic Menu Controller (Tabs & Filters):**
   - **Tabs:** Handles clicking between Categories (e.g., Sikkimese, Italian, Starters) and displays the corresponding menu grid.
   - **Dietary Filters:** Handles filtering the visible items inside a category based on their `data-diet` attribute (Veg vs. Non-Veg).
5. **Experience Page Lightbox Gallery:**
   - Allows users to filter the photo gallery by tags (Architecture, Food, Culture).
   - Provides an interactive Lightbox Modal to view images in full screen with captions.
6. **Testimonials Slider Automation:**
   - Automatically loops through guest reviews every 6.5 seconds, with manual override dot-controls.
7. **Reservation Form & WhatsApp Engine:**
   - Captures user input (Name, Phone, Date, Time, Guests, Pets).
   - Prevents past-date bookings using HTML5 limits.
   - Pings **Web3Forms** in the background to send an email notification to the restaurant.
   - Generates a URL-encoded string to redirect the user to WhatsApp with a pre-filled booking request.

---

## 📁 File Structure

- **`index.html`**: The sole HTML file. Contains the navigation, the four main sections (Home, Experience, Menu, Reservations), and the footer.
- **`styles.css`**: Contains all CSS tokens, base resets, class definitions, animations, and `@media` queries for mobile responsiveness.
- **`script.js`**: Contains all interactive logic.
- **`assets/` Directory**: Contains all visual media including:
  - Menu Item thumbnails (e.g., `pizza_margherita_card.png`, `chicken_dry_fry_card.png`)
  - Experience images (e.g., `exterior.jpg`, `cocktail.png`, `founders.png`)
  - Background textures and ambient audio files.
