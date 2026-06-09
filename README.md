# Jay Thom — Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://jaythom.dev)

Personal portfolio website for **Jay Thom**, a Senior Software Engineer with 7+ years of experience building scalable full-stack applications. Built with React and Framer Motion, featuring scroll-triggered animations and a bold, modern design.

**→ [Live Site](https://jaythom.dev)**

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Animated intro with typewriter role cycling and key impact stats |
| **About** | Background, value proposition, and availability |
| **Featured Work** | Architecture case studies with measurable outcomes |
| **Experience** | Full work history with quantified impact bullets |
| **Skills** | Categorized tech stack across Frontend, Backend, DevOps, and Practices |
| **Contact** | Email, LinkedIn, GitHub, and phone |

---

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Animations:** Framer Motion 11 (scroll-triggered, stagger, hover)
- **Styling:** Inline styles with CSS custom properties — no external CSS framework
- **Fonts:** Space Grotesk, Inter, JetBrains Mono (Google Fonts)
- **Deployment:** Vercel

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/ljik95/jay-portfolio.git
cd jay-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Sticky nav with scroll-aware frosted glass effect
│   ├── Hero.jsx         # Animated hero with particle canvas and typewriter
│   ├── About.jsx        # About section with value proposition cards
│   ├── Projects.jsx     # Featured work / case studies
│   ├── Experience.jsx   # Timeline with work history and education
│   ├── Skills.jsx       # Categorized skill badges
│   ├── Contact.jsx      # Contact cards and CTA
│   └── Footer.jsx       # Footer with links
├── App.jsx              # Root component
├── main.jsx             # Entry point
└── index.css            # Global styles and CSS variables
```

---

## Deployment

This site is deployed on **Vercel**. Any push to `main` triggers an automatic redeployment.

To deploy your own fork:
1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — no additional configuration required
4. Click **Deploy**

---

## Contact

**Jay Thom** — Senior Software Engineer

- Email: [ljik95@gmail.com](mailto:ljik95@gmail.com)
- LinkedIn: [linkedin.com/in/jongikthom](https://linkedin.com/in/jongikthom)
- GitHub: [github.com/ljik95](https://github.com/ljik95)
