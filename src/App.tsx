/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import Background from './components/Background';
import { motion, AnimatePresence } from 'motion/react';

type ToastType = 'success' | 'info' | 'error' | 'loading';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Toast | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Check local storage on mount
  useEffect(() => {
    const joined = localStorage.getItem('reicon_joined');
    if (joined === 'true') {
      setIsJoined(true);
    }
  }, []);

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setStatus({ id, type, message });
    if (type !== 'loading') {
      setTimeout(() => {
        setStatus(prev => prev?.id === id ? null : prev);
      }, 4000);
    }
  };

  const handleJoin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Honeypot check
    if (honeypotRef.current?.value) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast('error', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    showToast('loading', 'Saving your spot...');

    const path = 'waitlist';
    try {
      const waitlistRef = collection(db, path);

      // Duplicate check
      const q = query(waitlistRef, where('email', '==', email.toLowerCase().trim()));
      let snapshot;
      try {
        snapshot = await getDocs(q);
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, path);
        return;
      }

      if (snapshot && !snapshot.empty) {
        setIsLoading(false);
        setIsJoined(true);
        localStorage.setItem('reicon_joined', 'true');
        showToast('info', "You're already on the list.");
        return;
      }

      // Save to Firestore
      try {
        await addDoc(waitlistRef, {
          email: email.toLowerCase().trim(),
          createdAt: serverTimestamp()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
        return;
      }

      setIsLoading(false);
      setIsJoined(true);
      localStorage.setItem('reicon_joined', 'true');
      showToast('success', "You're on the list!");
    } catch (err) {
      console.error('Waitlist error:', err);
      setIsLoading(false);

      let message = 'Something went wrong. Please try again.';
      try {
        if (err instanceof Error) {
          const parsed = JSON.parse(err.message);
          if (parsed.error) message = parsed.error;
        }
      } catch {
        // Fallback
      }

      showToast('error', message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      <Background />
      <div className="fixed inset-0 bg-black/50 z-1" aria-hidden="true" />

      <main className="relative z-10 w-full max-w-2xl px-6 py-20 flex flex-col items-center text-center gap-10" role="main">
        {/* HERO */}
        <header className="flex flex-col items-center gap-7">
          <h1 className="font-serif text-[clamp(44px,8vw,78px)] leading-[1.07] tracking-[-1.5px] text-white fade-in d1">
            The icon library<br />
            <em className="not-italic text-white/50">designers</em><br />
            actually want.
          </h1>

          <p className="font-sans font-light text-[clamp(15px,2.2vw,17px)] leading-[1.72] text-white/50 max-w-[500px] fade-in d2">
            Precision-crafted, open-source icons. Clean, consistent, and built right.
          </p>
        </header>

        {/* FEATURES */}
        <section aria-label="Features" className="flex flex-wrap gap-2.5 justify-center fade-in d3">
          <h2 className="sr-only">Key Features</h2>
          <FeatureCard title="Pixel Perfect" icon={<PixelPerfectIcon />} />
          <FeatureCard title="Handcrafted" icon={<HandcraftedIcon />} />
          <FeatureCard title="Open Source" icon={<OpenSourceIcon />} />
        </section>

        {/* FORM / STATUS */}
        <section aria-label="Join Waitlist" className="w-full max-w-md flex flex-col items-center gap-3.5 fade-in d4">
          <AnimatePresence mode="wait">
            {!isJoined ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleJoin}
                className="w-full flex flex-col sm:flex-row bg-white/10 border border-white/20 rounded-xl sm:rounded-full backdrop-blur-xl overflow-hidden focus-within:border-white/45 focus-within:bg-white/15 transition-all p-1"
              >
                <input ref={honeypotRef} type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={isLoading}
                  required
                  autoComplete="email"
                  aria-label="Enter your email to join the Reicon waitlist"
                  className="flex-1 bg-transparent border-none outline-none px-5 py-3.5 text-sm text-white placeholder:text-white/30 min-w-0"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="shrink-0 bg-white text-[#09090b] px-6 py-3 sm:py-2.5 rounded-[8px] sm:rounded-full font-medium text-[13.5px] hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Join Waitlist →'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="joined"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex items-center justify-center bg-white/10 border border-white/25 rounded-full backdrop-blur-xl px-6 py-4 text-white text-[13.5px] font-medium gap-3"
              >
                <div className="w-5 h-5 text-white/70">
                  <WaitlistBadgeIcon />
                </div>
                You are already registered
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-[12px] text-white/30 tracking-wide">No spam, ever. Unsubscribe anytime.</p>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 flex flex-col items-center gap-3 text-white/20 text-[12.5px] tracking-wide fade-in d5" role="contentinfo">
          <nav aria-label="Footer navigation" className="flex gap-5">
            <FooterLink href="https://github.com/reicon-dev" label="GitHub" />
            <FooterLink href="https://reicon.dev" label="reicon.dev" />
            <FooterLink href="mailto:hello@reicon.dev" label="Contact" />
          </nav>
          <span className="text-[11.5px] text-white/30">
            Designed & developed by <FooterLink href="https://devchauhan.in" label="@devchauhan" className="text-[11.5px] text-white/50" />
          </span>
        </footer>
      </main>

      {/* TOASTS */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2.5 pointer-events-none">
        <AnimatePresence>
          {status && (
            <motion.div
              key={status.id}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              className={`pointer-events-auto flex items-center gap-2.5 px-5 py-3 rounded-full border backdrop-blur-2xl text-sm whitespace-nowrap shadow-xl
                ${status.type === 'success' ? 'bg-white/10 border-white/20 text-white' : ''}
                ${status.type === 'info' ? 'bg-white/5 border-white/10 text-white/80' : ''}
                ${status.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-100' : ''}
                ${status.type === 'loading' ? 'bg-white/5 border-white/10 text-white/50' : ''}
              `}
            >
              <ToastIcon type={status.type} />
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


function FeatureCard({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="group bg-white/10 text-white text-[13.5px] px-4.5 py-2.5 rounded-full border border-white/25 backdrop-blur-md flex items-center gap-2 hover:bg-white/20 transition-colors cursor-default select-none">
      <div className="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full text-white/85">
        {icon}
      </div>
      {title}
    </div>
  );
}

function FooterLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-white/35 hover:text-white/65 transition-colors ${className}`}
    >
      {label}
    </a>
  );
}

function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case 'success': return <SuccessIcon />;
    case 'info': return <InfoIcon />;
    case 'error': return <ErrorIcon />;
    case 'loading': return <LoaderIcon />;
  }
}

function SuccessIcon() {
  return (
    <div className="w-5 h-5">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M9.78133 3.89027C10.3452 3.40974 10.6271 3.16948 10.9219 3.02859C11.6037 2.70271 12.3963 2.70271 13.0781 3.02859C13.3729 3.16948 13.6548 3.40974 14.2187 3.89027C14.4431 4.08152 14.5553 4.17715 14.6752 4.25747C14.9499 4.4416 15.2584 4.56939 15.5828 4.63344C15.7244 4.66139 15.8713 4.67312 16.1653 4.69657C16.9038 4.7555 17.273 4.78497 17.5811 4.89378C18.2936 5.14546 18.8541 5.70591 19.1058 6.41844C19.2146 6.72651 19.244 7.09576 19.303 7.83426C19.3264 8.12819 19.3381 8.27515 19.3661 8.41669C19.4301 8.74114 19.5579 9.04965 19.7421 9.32437C19.8224 9.44421 19.918 9.55642 20.1093 9.78084C20.5898 10.3447 20.8301 10.6267 20.971 10.9214C21.2968 11.6032 21.2968 12.3958 20.971 13.0776C20.8301 13.3724 20.5898 13.6543 20.1093 14.2182C19.918 14.4426 19.8224 14.5548 19.7421 14.6747C19.5579 14.9494 19.4301 15.2579 19.3661 15.5824C19.3381 15.7239 19.3264 15.8709 19.303 16.1648C19.244 16.9033 19.2146 17.2725 19.1058 17.5806C18.8541 18.2931 18.2936 18.8536 17.5811 19.1053C17.273 19.2141 16.9038 19.2435 16.1653 19.3025C15.8713 19.3259 15.7244 19.3377 15.5828 19.3656C15.2584 19.4297 14.9499 19.5574 14.6752 19.7416C14.5553 19.8219 14.4431 19.9175 14.2187 20.1088C13.6548 20.5893 13.3729 20.8296 13.0781 20.9705C12.3963 21.2963 11.6037 21.2963 10.9219 20.9705C10.6271 20.8296 10.3452 20.5893 9.78133 20.1088C9.55691 19.9175 9.44469 19.8219 9.32485 19.7416C9.05014 19.5574 8.74163 19.4297 8.41718 19.3656C8.27564 19.3377 8.12868 19.3259 7.83475 19.3025C7.09625 19.2435 6.72699 19.2141 6.41893 19.1053C5.7064 18.8536 5.14594 18.2931 4.89427 17.5806C4.78546 17.2725 4.75599 16.9033 4.69706 16.1648C4.6736 15.8709 4.66188 15.7239 4.63393 15.5824C4.56988 15.2579 4.44209 14.9494 4.25796 14.6747C4.17764 14.5548 4.08201 14.4426 3.89076 14.2182C3.41023 13.6543 3.16997 13.3724 3.02907 13.0776C2.7032 12.3958 2.7032 11.6032 3.02907 10.9214C3.16997 10.6266 3.41023 10.3447 3.89076 9.78084C4.08201 9.55642 4.17764 9.44421 4.25796 9.32437C4.44209 9.04965 4.56988 8.74114 4.63393 8.41669C4.66188 8.27515 4.6736 8.12819 4.69706 7.83426C4.75599 7.09576 4.78546 6.72651 4.89427 6.41844C5.14594 5.70591 5.7064 5.14546 6.41893 4.89378C6.72699 4.78497 7.09625 4.7555 7.83475 4.69657C8.12868 4.67312 8.27564 4.66139 8.41718 4.63344C8.74163 4.56939 9.05014 4.4416 9.32485 4.25747C9.4447 4.17715 9.55691 4.08152 9.78133 3.89027Z" stroke="currentColor" strokeWidth="1.5" /><path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}

function InfoIcon() {
  return (
    <div className="w-5 h-5">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 17V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="currentColor" />
      </svg>
    </div>
  );
}

function ErrorIcon() {
  return (
    <div className="w-5 h-5">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function LoaderIcon() {
  return (
    <div className="w-5 h-5 animate-spin">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M3.67981 11.3333H2.92981H3.67981ZM3.67981 13L3.15157 13.5324C3.44398 13.8225 3.91565 13.8225 4.20805 13.5324L3.67981 13ZM5.88787 11.8657C6.18191 11.574 6.18377 11.0991 5.89203 10.8051C5.60029 10.511 5.12542 10.5092 4.83138 10.8009L5.88787 11.8657ZM2.52824 10.8009C2.2342 10.5092 1.75933 10.511 1.46759 10.8051C1.17585 11.0991 1.17772 11.574 1.47176 11.8657L2.52824 10.8009ZM18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0001 7.42199 20.1103 6.96007 19.8934 6.60721L18.6156 7.39279ZM12.0789 2.25C7.03155 2.25 2.92981 6.3112 2.92981 11.3333H4.42981C4.42981 7.15072 7.84884 3.75 12.0789 3.75V2.25ZM2.92981 11.3333L2.92981 13H4.42981L4.42981 11.3333H2.92981ZM4.20805 13.5324L5.88787 11.8657L4.83138 10.8009L3.15157 12.4676L4.20805 13.5324ZM4.20805 12.4676L2.52824 10.8009L1.47176 11.8657L3.15157 13.5324L4.20805 12.4676ZM19.8934 6.60721C18.287 3.99427 15.3873 2.25 12.0789 2.25V3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279L19.8934 6.60721Z" fill="currentColor" /><path d="M20.3139 11L20.8411 10.4666C20.549 10.1778 20.0788 10.1778 19.7867 10.4666L20.3139 11ZM18.1004 12.1333C17.8058 12.4244 17.8031 12.8993 18.0942 13.1939C18.3854 13.4885 18.8603 13.4913 19.1549 13.2001L18.1004 12.1333ZM21.4729 13.2001C21.7675 13.4913 22.2424 13.4885 22.5335 13.1939C22.8247 12.8993 22.822 12.4244 22.5274 12.1332L21.4729 13.2001ZM5.31794 16.6061C5.1004 16.2536 4.6383 16.1442 4.28581 16.3618C3.93331 16.5793 3.82391 17.0414 4.04144 17.3939L5.31794 16.6061ZM11.8827 21.75C16.9451 21.75 21.0639 17.6915 21.0639 12.6667H19.5639C19.5639 16.8466 16.1332 20.25 11.8827 20.25V21.75ZM21.0639 12.6667V11H19.5639V12.6667H21.0639ZM19.7867 10.4666L18.1004 12.1333L19.1549 13.2001L20.8411 11.5334L19.7867 10.4666ZM19.7867 11.5334L21.4729 13.2001L22.5274 12.1332L20.8411 10.4666L19.7867 11.5334ZM4.04144 17.3939C5.65405 20.007 8.56403 21.75 11.8827 21.75V20.25C9.10023 20.25 6.66584 18.7903 5.31794 16.6061L4.04144 17.3939Z" fill="currentColor" /></svg>
    </div>
  );
}

function PixelPerfectIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5C8 6.65685 6.65685 8 5 8C3.34315 8 2 6.65685 2 5C2 3.34315 3.34315 2 5 2C6.65685 2 8 3.34315 8 5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 19C8 20.6569 6.65685 22 5 22C3.34315 22 2 20.6569 2 19C2 17.3431 3.34315 16 5 16C6.65685 16 8 17.3431 8 19Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.3431 17.3431 16 19 16C20.6569 16 22 17.3431 22 19Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 19H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 16L19 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 16L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HandcraftedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1497 8.80219L9.70794 9.40825L10.1497 8.80219ZM12 3.10615L11.4925 3.65833C11.7794 3.9221 12.2206 3.9221 12.5075 3.65833L12 3.10615ZM13.8503 8.8022L14.2921 9.40826L13.8503 8.8022ZM12 9.67598L12 10.426H12L12 9.67598ZM10.5915 8.19612C9.90132 7.69298 9.16512 7.08112 8.60883 6.43627C8.03452 5.77053 7.75 5.18233 7.75 4.71476H6.25C6.25 5.73229 6.82845 6.66885 7.47305 7.41607C8.13569 8.18419 8.97435 8.87349 9.70794 9.40825L10.5915 8.19612ZM7.75 4.71476C7.75 3.65612 8.27002 3.05231 8.8955 2.84182C9.54754 2.62238 10.5199 2.76435 11.4925 3.65833L12.5075 2.55398C11.2302 1.37988 9.70254 0.987559 8.41707 1.42016C7.10502 1.8617 6.25 3.09623 6.25 4.71476H7.75ZM14.2921 9.40826C15.0257 8.8735 15.8643 8.18421 16.527 7.41608C17.1716 6.66886 17.75 5.73229 17.75 4.71475H16.25C16.25 5.18234 15.9655 5.77055 15.3912 6.43629C14.8349 7.08113 14.0987 7.69299 13.4085 8.19613L14.2921 9.40826ZM17.75 4.71475C17.75 3.09622 16.895 1.8617 15.5829 1.42016C14.2975 0.987559 12.7698 1.37988 11.4925 2.55398L12.5075 3.65833C13.4801 2.76435 14.4525 2.62238 15.1045 2.84181C15.73 3.0523 16.25 3.65612 16.25 4.71475H17.75ZM9.70794 9.40825C10.463 9.95869 11.0618 10.426 12 10.426L12 8.92598C11.635 8.92598 11.4347 8.81074 10.5915 8.19612L9.70794 9.40825ZM13.4085 8.19613C12.5653 8.81074 12.365 8.92598 12 8.92598L12 10.426C12.9382 10.426 13.537 9.9587 14.2921 9.40826L13.4085 8.19613Z" fill="currentColor" />
      <path d="M5 20.3884H7.25993C8.27079 20.3884 9.29253 20.4937 10.2763 20.6964C12.0166 21.0549 13.8488 21.0983 15.6069 20.8138C16.4738 20.6734 17.326 20.4589 18.0975 20.0865C18.7939 19.7504 19.6469 19.2766 20.2199 18.7459C20.7921 18.216 21.388 17.3487 21.8109 16.6707C22.1736 16.0894 21.9982 15.3762 21.4245 14.943C20.7873 14.4619 19.8417 14.462 19.2046 14.9433L17.3974 16.3084C16.697 16.8375 15.932 17.3245 15.0206 17.4699C14.911 17.4874 14.7962 17.5033 14.6764 17.5172M14.6764 17.5172C14.6403 17.5214 14.6038 17.5254 14.5668 17.5292M14.6764 17.5172C14.8222 17.486 14.9669 17.396 15.1028 17.2775C15.746 16.7161 15.7866 15.77 15.2285 15.1431C15.0991 14.9977 14.9475 14.8764 14.7791 14.7759C11.9817 13.1074 7.62942 14.3782 5 16.2429M14.6764 17.5172C14.6399 17.525 14.6033 17.5292 14.5668 17.5292M14.5668 17.5292C14.0434 17.5829 13.4312 17.5968 12.7518 17.5326" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="2" y="14" width="3" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function OpenSourceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function WaitlistBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M16 22V13C16 11.5858 16 10.8787 15.5607 10.4393C15.1213 10 14.4142 10 13 10H11C9.58579 10 8.87868 10 8.43934 10.4393C8 10.8787 8 11.5858 8 13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 22C8 20.5858 8 19.8787 7.56066 19.4393C7.12132 19 6.41421 19 5 19C3.58579 19 2.87868 19 2.43934 19.4393C2 19.8787 2 20.5858 2 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 22V19C22 17.5858 22 16.8787 21.5607 16.4393C21.1213 16 20.4142 16 19 16C17.5858 16 16.8787 16 16.4393 16.4393C16 16.8787 16 17.5858 16 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.1459 3.02251C11.5259 2.34084 11.7159 2 12 2C12.2841 2 12.4741 2.34084 12.8541 3.02251L12.9524 3.19887C13.0603 3.39258 13.1143 3.48944 13.1985 3.55334C13.2827 3.61725 13.3875 3.61725 13.5972 3.68841L13.7881 3.73161C14.526 3.89857 14.895 3.98205 14.9828 4.26432C15.0706 4.54659 14.819 4.84072 14.316 5.42898L14.1858 5.58117C14.0429 5.74833 13.9714 5.83191 13.9392 5.93531C13.9071 6.03872 13.9179 6.15023 13.9395 6.37327L13.9592 6.57632C14.0352 7.36118 14.0733 7.75361 13.8435 7.92807C13.6136 8.10252 13.2682 7.94346 12.5773 7.62535L12.3986 7.54305C12.2022 7.45265 12.1041 7.40745 12 7.40745C11.8959 7.40745 11.7978 7.45265 11.6014 7.54305L11.4227 7.62535C10.7318 7.94346 10.3864 8.10252 10.1565 7.92807C9.92674 7.75361 9.96476 7.36118 10.0408 6.57632L10.0605 6.37327C10.0821 6.15023 10.0929 6.03872 10.0608 5.93531C10.0286 5.83191 9.95713 5.74833 9.81418 5.58117L9.68403 5.42898C9.18097 4.84072 8.92945 4.54659 9.01723 4.26432C9.10501 3.98205 9.47396 3.89857 10.2119 3.73161L10.4028 3.68841C10.6125 3.64097 10.7173 3.61725 10.8015 3.55334C10.8857 3.48944 10.9397 3.39258 11.0476 3.19887L11.1459 3.02251Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
