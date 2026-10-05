import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-logo">
            <span className="brand-mark">
              <img src="/favicon/favicon.svg" alt="Reicon logo" width="22" height="22" />
            </span>
            <span className="brand-word">
              <span className="brand-word-strong">Reicon</span>
              <span className="brand-word-dim">.dev</span>
            </span>
          </Link>
          <p className="footer-tagline">
            High-crafted vector icons for modern web applications.
          </p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4 className="footer-col-title">Libraries</h4>
            <Link to="/docs/react">React</Link>
            <Link to="/docs/angular">Angular</Link>
            <Link to="/docs/vue">Vue</Link>
            <Link to="/docs/svelte">Svelte</Link>
            <Link to="/docs/react-native">React Native</Link>
            <Link to="/docs/flutter">Flutter</Link>
            <Link to="/docs/vanilla">JavaScript</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Product</h4>
            <Link to="/">Home</Link>
            <Link to="/icons">Icons</Link>
            <Link to="/docs">How to use</Link>
            <Link to="/faq">FAQs</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Legal &amp; Account</h4>
            <a href="https://github.com/dqev/reicon" target="_blank" rel="noopener noreferrer">GitHub</a>
            <Link to="/license">License</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <a href="mailto:support@reicon.dev">Contact</a>
          </div>
        </div>
      </div>

      <div className="footer-byline">
        <p className="footer-credit">
          <span className="footer-muted">Created by</span>
          <a
            href="https://devchauhan.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-name"
          >
            Dev Chauhan
          </a>
        </p>
        <p className="footer-thanks inline-flex items-center gap-1.5 flex-wrap">
          <span>Built for designers &amp; developers in</span>
          <span className="inline-block mx-0.5 text-sm" title="India" aria-label="India">🇮🇳</span>
          <span>and</span>
          <img
            src="/extra/Diet-coke.svg"
            alt="Diet Coke"
            className="h-3 w-auto inline-block align-middle ml-0.5 relative -top-[1px]"
          />
        </p>
      </div>
    </footer>
  );
}
