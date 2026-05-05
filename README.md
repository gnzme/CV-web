# Gonzalo Medina C. — Interactive Portfolio

Personal portfolio website with an embedded AI assistant, built with vanilla HTML, CSS, and JavaScript.

🔗 **Live site:** [gnzme.github.io/CV-web](https://gnzme.github.io/CV-web/)

---

## Features

- Responsive single-page design with engineering-inspired dark theme
- Interactive AI chatbot powered by Google Gemini — answers questions about my background in real time
- Sections: About, Experience, Skills, Projects, Contact
- Smooth scroll animations and hover effects

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- Google Gemini API (via Cloudflare Workers proxy)
- Hosted on GitHub Pages

## Project Structure

```
cv-web/
├── index.html      # Main site (all HTML, CSS, JS in one file)
├── foto.jpg        # Profile photo
├── README.md       # This file
└── LICENSE         # MIT License
```

## Local Development

No build tools required. Just open `index.html` in your browser:

```bash
git clone https://github.com/gnzme/CV-web.git
cd CV-web
# Open index.html in your browser
```

> **Note:** The AI chatbot requires a valid Cloudflare Worker proxy with a Gemini API key to function. Without it, the chat will show a connection error.

## AI Chatbot

The chatbot uses a Cloudflare Worker as a secure proxy to avoid exposing the API key in the frontend. All knowledge comes from a `SYSTEM_PROMPT` defined in the JavaScript — it does not browse the internet or access external sources.

## Contact

- **Email:** gon.medinae@gmail.com
- **LinkedIn:** [linkedin.com/in/gonzalo-medina09](https://www.linkedin.com/in/gonzalo-medina09/)
- **GitHub:** [github.com/gnzme](https://github.com/gnzme)

---

*Built from scratch as part of a personal career development project — Dallas, TX, 2025*
