import { MotionConfig } from 'framer-motion'
import Curtain from './components/Curtain'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Marquee from './components/Marquee'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    // reducedMotion="user" makes Framer Motion drop transform and layout
    // animations when the OS asks for reduced motion, while keeping opacity
    // fades. CSS keyframes are handled separately in styles/base.css.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <Curtain />
      <Cursor />
      <div id="top" />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Marquee />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
