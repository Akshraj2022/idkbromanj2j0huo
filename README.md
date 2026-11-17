# Erito — Static Website

A pure, standalone HTML, CSS, and JavaScript website for Erito — A first wallet for teens, built around standards.

## Project Structure

```
├── index.html          # Main semantic HTML5 webpage
├── style.css           # Pure responsive CSS (design tokens, animations, layout)
├── script.js           # Vanilla JavaScript (modal, scroll animations, 3D card tilt)
├── favicon.ico         # Website favicon
├── brand/
│   ├── wordmark.png    # Official Erito logo wordmark
│   └── wordmark.svg    # Official SVG vector wordmark
├── cards/
│   ├── basic.png       # Basic tier card render
│   ├── core.png        # Core tier card render
│   └── prodigy.png     # Prodigy tier card render
└── share/
    ├── social-card.png # Community badge for parents to share on social media
    └── social-card.jpg
```

## Running Locally

Because this project requires no build tools or package managers, you can view it directly:
- Open `index.html` in any web browser, or
- Start a simple local static server:
  ```bash
  # Using Python 3:
  python -m http.server 3000

  # Or using Node.js:
  npx serve .
  ```

## Features

- **Zero dependencies & zero server runtime**: Pure HTML5, CSS3, and vanilla JS.
- **WhatsApp Announcement Channel CTA**: Direct integration with one-way announcement channel.
- **Social Media Share Pass**: Interactive modal popup allowing parents to preview and download their official community share badge.
- **3D Interactive Cards**: Subtle perspective mouse tracking on desktop.
- **Accessible & Responsive**: Fully responsive across mobile, tablet, and widescreen viewports with `prefers-reduced-motion` support.
