export function SiteHeader() {
  return (
    <div className="inner-header">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="bijan, home">
          <span className="wordmark-mark">b</span>
          <span>bijan</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="/work">Work</a>
          <a href="/books">Books</a>
          <a href="/case-studies">Case studies</a>
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
        <a className="footer-email" href="mailto:bijan.pourriahi@gmail.com">email ↗</a>
      </div>
      <div className="footer-links">
        <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">GitHub</a>
        <a href="/resume.pdf">Résumé</a>
        <a href="/engine-sim/">Engine sim</a>
        <a href="/books">Books</a>
      </div>
      <p className="footer-note">Site source and public project history are stored on GitHub.</p>
    </footer>
  );
}
