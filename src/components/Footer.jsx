export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner mono">
        <span>© {new Date().getFullYear()} Jay Thom</span>
        <span>Built with React, Vite &amp; Framer Motion</span>
        <a className="footer__top" href="#top">
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
