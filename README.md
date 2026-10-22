# BrightMark - Digital Marketing Agency Website

A modern, responsive, high-performance website for **BrightMark**, a full-service digital marketing agency specializing in Web Design, E-commerce, SEO, PPC, Social Media, and Content Marketing.

---

## 🌟 Key Features

- **Responsive & Mobile-First**: Built with Bootstrap 5.3.3 and custom CSS, fully adaptive across smartphones, tablets, laptops, and 4K displays.
- **Interactive Component Suite (Vanilla JS)**:
  - **Dynamic Statistics Counter**: Animated numeric counters triggered on scroll using `IntersectionObserver`.
  - **Portfolio Filtering**: Category-based project filtering (Web Design, E-Commerce, SEO, Branding) with smooth CSS transitions.
  - **Client Trust Carousel**: Pause/resume toggleable animated trust badges with reduced-motion support.
  - **Blog Search & Filter**: Real-time client-side search query matching and category filtering.
  - **Validated Forms**: Interactive client-side validation for contact inquiries and newsletter subscriptions.
  - **Back to Top**: Floating action button with smooth scrolling.
- **Multi-Page Architecture**:
  - `index.html`: Homepage featuring hero section, stats, service highlights, portfolio preview, testimonials, and contact lead capture.
  - `about.html`: Agency background, mission, core values, and team overview.
  - `services.html` & `services/*.html`: Hub page plus 10 dedicated in-depth service detail pages:
    - Web Design & Development
    - E-commerce Development
    - Search Engine Optimization (SEO)
    - Social Media Marketing
    - Google Ads & PPC
    - Content Marketing
    - Branding & Graphic Design
    - Email Marketing
    - Website Redesign
    - Local SEO & Marketing
  - `projects.html` & `projects/sample-project.html`: Portfolio grid with interactive category filters and detailed case study view.
  - `blog.html` & `blog/sample-article.html`: Insights blog with live search, topic filtering, and long-form article template.
  - `contact.html`: Dedicated contact page with office details, FAQs, and inquiry form.
  - `404.html`: Custom error page with quick recovery navigation.
  - `privacy.html` & `terms.html`: Complete legal and policy templates.
  - `robots.txt` & `sitemap.xml`: Ready for search engine indexing.

---

## 📂 Project Structure

```text
Digital/
├── index.html                  # Main Landing Page
├── about.html                  # About Us
├── services.html               # Services Hub
├── projects.html               # Portfolio / Projects
├── blog.html                   # Blog Hub
├── contact.html                # Contact Us
├── privacy.html                # Privacy Policy
├── terms.html                  # Terms & Conditions
├── 404.html                    # 404 Error Page
├── robots.txt                  # Robots configuration
├── sitemap.xml                 # XML Sitemap
├── style.css                   # Main custom stylesheet & design system
├── script.js                   # Vanilla JS interactivity & form handling
├── .gitignore                  # Git ignore rules
│
├── blog/
│   └── sample-article.html     # Long-form article page
│
├── projects/
│   └── sample-project.html     # Case study detail page
│
├── services/
│   ├── branding.html           # Branding & Design
│   ├── content-marketing.html  # Content Marketing
│   ├── ecommerce.html          # E-commerce Development
│   ├── email-marketing.html    # Email Marketing
│   ├── google-ads.html         # Google Ads & PPC
│   ├── local-marketing.html    # Local SEO & Marketing
│   ├── seo.html                # SEO Services
│   ├── social-media.html       # Social Media Marketing
│   ├── web-design.html         # Web Design & Dev
│   └── website-redesign.html   # Website Redesign
│
└── images/                     # Optimized visual assets, logos & photos
```

---

## 🚀 Getting Started

### Local Preview

No build tools or node servers are required. You can preview the website directly:

1. **Option 1: Direct File Open**
   Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

2. **Option 2: VS Code Live Server**
   - Open this folder in **Visual Studio Code**.
   - Install the **Live Server** extension.
   - Click **"Go Live"** in the bottom status bar or right-click `index.html` and select **"Open with Live Server"**.

3. **Option 3: Node.js / npx**
   ```bash
   npx serve .
   ```
   Open `http://localhost:3000` in your browser.

---

## 🛠️ Built With

- **HTML5**: Semantic tags, OpenGraph meta, and accessibility attributes.
- **CSS3**: Custom design tokens, Flexbox, CSS Grid, and custom animations.
- **Bootstrap 5.3.3**: Responsive grid layout and dropdown / collapse components.
- **Bootstrap Icons 1.11.3**: Clean vector UI icons.
- **Google Fonts**: *Plus Jakarta Sans*.
- **JavaScript**: ES6+ Vanilla JS with zero external framework overhead.

---

## 📄 License

This project is licensed under the MIT License - feel free to customize and use it for your agency or portfolio.
