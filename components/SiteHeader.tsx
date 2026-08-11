export function SiteHeader() {
  return (
    <div className="inner-header">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Bijan Pourriahi, home">
          <span className="wordmark-mark">BP</span>
          <span>Bijan Pourriahi</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="/case-studies">Case studies</a>
          <a href="/archive">Archive</a>
          <a href="/blog">Blog</a>
          <a href="/about">About</a>
        </nav>
        <a className="availability" href="mailto:bijan.pourriahi@gmail.com">Email</a>
      </header>
    </div>
  );
}

export function SimpleFooter() {
  return (
    <footer className="site-footer wrap">
      <div>
        <p className="eyebrow">Contact</p>
        <a className="footer-email" href="mailto:bijan.pourriahi@gmail.com">bijan.pourriahi@gmail.com ↗</a>
      </div>
      <div className="footer-links">
        <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">GitHub</a>
        <a href="/resume.pdf">Résumé</a>
        <a href="/engine-sim/">Engine sim</a>
        <a href="/archive">Archive</a>
        <a href="/blog">Blog</a>
      </div>
      <p className="footer-note">Source code and blog posts are stored on GitHub.</p>
    </footer>
  );
}
