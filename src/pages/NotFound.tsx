import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Ghost } from 'reicon-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Helmet>
        <title>Page Not Found — Reicon</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center pt-14 overflow-x-hidden">
        <Ghost size={74} className="mt-4 text-text-base" />

        <p className="text-text-base/60 text-lg mt-2 mb-6">This page doesn't exist.</p>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="bg-[#6C5CE7] hover:bg-[#5A4BD1] text-text-base text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/icons"
            className="bg-text-base/6 hover:bg-text-base/10 text-text-base/70 hover:text-text-base text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Browse Icons
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
