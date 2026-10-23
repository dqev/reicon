import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NPM_PACKAGE = 'reicon-react';

function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

function FooterNpmStats() {
  const [total, setTotal] = useState<number | null>(null);
  const [weekly, setWeekly] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const today = new Date().toISOString().slice(0, 10);

    Promise.all([
      fetch(`https://api.npmjs.org/downloads/point/2015-01-01:${today}/${NPM_PACKAGE}`).then((res) => {
        if (!res.ok) throw new Error('total fetch failed');
        return res.json();
      }),
      fetch(`https://api.npmjs.org/downloads/point/last-week/${NPM_PACKAGE}`).then((res) => {
        if (!res.ok) throw new Error('weekly fetch failed');
        return res.json();
      }),
    ])
      .then(([totalData, weeklyData]) => {
        if (!isMounted) return;
        if (typeof totalData?.downloads === 'number') setTotal(totalData.downloads);
        if (typeof weeklyData?.downloads === 'number') setWeekly(weeklyData.downloads);
      })
      .catch(() => {
        // Keep footer clean when offline / API blocked — render nothing.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (total === null || weekly === null) return null;

  return (
    <a
      href={`https://www.npmjs.com/package/${NPM_PACKAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-npm"
      aria-label={`${formatCount(total)} total downloads of ${NPM_PACKAGE} on npm, ${formatCount(weekly)} in the last week`}
    >
      <img src="/framework-logos/npm.svg" alt="" width="16" height="16" className="footer-npm-logo" aria-hidden="true" />
      <span className="footer-npm-text">
        {formatCount(total)} downloads on npm, {formatCount(weekly)} in the last week
      </span>
    </a>
  );
}

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
            Open-Source Icon Library for Designers & Developers.
          </p>
          <FooterNpmStats />
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h3 className="footer-col-title">Libraries</h3>
            <Link to="/docs/react">React</Link>
            <Link to="/docs/angular">Angular</Link>
            <Link to="/docs/vue">Vue</Link>
            <Link to="/docs/svelte">Svelte</Link>
            <Link to="/docs/react-native">React Native</Link>
            <Link to="/docs/flutter">Flutter</Link>
            <Link to="/docs/vanilla">JavaScript</Link>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Product</h3>
            <Link to="/">Home</Link>
            <Link to="/icons">Icons</Link>
            <Link to="/docs">How to use</Link>
            <Link to="/brand">Brand</Link>
            <Link to="/notice">Notice</Link>
            <Link to="/faq">FAQs</Link>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Legal &amp; Account</h3>
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
            width="31"
            height="12"
            className="h-3 w-auto inline-block align-middle ml-0.5 relative -top-[1px]"
          />
        </p>
      </div>
    </footer>
  );
}
