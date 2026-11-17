'use client';

import { useState, useEffect, useRef } from 'react';

// Official WhatsApp channel link
const WHATSAPP_INVITE_URL = 'https://whatsapp.com/channel/0029VbElVyjKLaHl2fAsvu3s';
const SHARE_IMAGE_URL = '/share/social-card.png';

export default function WhatsAppCTA() {
  const [count, setCount] = useState<number | null>(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch true live interest count from server
  useEffect(() => {
    fetch('/api/interest')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === 'number') {
          setCount(data.count);
        }
      })
      .catch((err) => console.error('Failed to load interest count:', err));
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  async function handleJoinClick() {
    // Open the download / social share popup immediately
    setIsModalOpen(true);

    if (!hasClicked) {
      setHasClicked(true);
      setIsUpdating(true);
      try {
        const res = await fetch('/api/interest', { method: 'POST' });
        const data = await res.json();
        if (typeof data.count === 'number') {
          setCount(data.count);
        }
      } catch (err) {
        console.error('Failed to update interest count:', err);
      } finally {
        setIsUpdating(false);
      }
    }
  }

  const currentCount = count ?? 0;

  return (
    <>
      <div
        id="request-form"
        className="max-w-xl mx-auto w-full text-center flex flex-col items-center gap-10"
      >
        {/* Live Counter Display */}
        <div className="flex flex-col items-center gap-3 p-8 border border-[var(--cream)]/15 bg-white/[0.03] w-full">
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[var(--cream)]/70 font-mono">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Live Community Counter</span>
          </div>

          <div className="flex items-baseline justify-center gap-2">
            <span
              className={`font-[family-name:var(--font-display)] text-5xl sm:text-6xl tracking-tight text-[var(--cream)] transition-all duration-300 ${
                isUpdating ? 'scale-110 text-emerald-400' : 'scale-100'
              }`}
            >
              {currentCount.toLocaleString()}
            </span>
            <span className="font-[family-name:var(--font-label)] text-lg sm:text-xl uppercase tracking-wider text-[var(--cream)]/80">
              {currentCount === 1 ? 'Parent' : 'Parents'}
            </span>
          </div>

          <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-[var(--cream)]/60 max-w-md leading-relaxed">
            {currentCount === 0
              ? 'Be the first parent to join our private announcement channel.'
              : 'Joined the announcement channel for priority invite release.'}
          </p>
        </div>

        {/* Action Block */}
        <div className="flex flex-col items-center gap-4 w-full">
          <a
            href={WHATSAPP_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleJoinClick}
            aria-label="Join WhatsApp Announcement Channel"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 text-sm sm:text-base uppercase tracking-widest font-semibold transition-all duration-200 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cream)] focus-visible:outline-offset-4 cursor-pointer"
            style={{
              fontFamily: 'var(--font-label)',
              backgroundColor: 'var(--cta)',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = 'var(--cream)';
              btn.style.color = 'var(--cta)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = 'var(--cta)';
              btn.style.color = '#FFFFFF';
            }}
          >
            {/* Subtle clean chat indicator icon */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.12.82.83-3.04-.2-.32a8.21 8.21 0 0 1-1.26-4.34c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.69 8.23-8.1 8.23z" />
            </svg>
            <span>Join WhatsApp Announcement</span>
          </a>

          <div className="flex flex-col items-center gap-1.5 text-xs text-[var(--cream)]/60 font-[family-name:var(--font-body)]">
            <p>Silent, one-way announcements only. No chat spam.</p>
          </div>
        </div>
      </div>

      {/* Social Media Share Download Popup Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-lg bg-[var(--dark)] border border-[var(--cream)]/20 p-6 sm:p-10 shadow-2xl flex flex-col items-center text-center gap-6"
            style={{ color: 'var(--cream)' }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-[var(--cream)]/60 hover:text-[var(--cream)] text-2xl p-2 transition-colors cursor-pointer"
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-[var(--cream)]/60">
                Community Member Pass
              </span>
              <h3
                id="share-modal-title"
                className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl tracking-tight text-[var(--cream)]"
              >
                Share with other parents
              </h3>
              <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-[var(--cream)]/70 max-w-sm">
                You&rsquo;re now set to receive the first announcement. Download your official badge
                to post on Instagram, WhatsApp, or Stories.
              </p>
            </div>

            {/* Share Card Preview */}
            <div className="relative w-full max-w-[380px] aspect-[2000/1414] bg-white rounded-xl overflow-hidden shadow-2xl border border-[var(--cream)]/20">
              <img
                src={SHARE_IMAGE_URL}
                alt="Erito Community Share Graphic"
                className="w-full h-full object-contain block"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col items-center gap-3 w-full">
              <a
                href={SHARE_IMAGE_URL}
                download="erito-community-badge.png"
                className="w-full py-3.5 px-6 uppercase tracking-widest text-xs sm:text-sm font-semibold transition-all duration-200 outline-none focus-visible:outline-2 focus-visible:outline-[var(--cream)] focus-visible:outline-offset-4 cursor-pointer text-center"
                style={{
                  fontFamily: 'var(--font-label)',
                  backgroundColor: 'var(--cta)',
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = 'var(--cream)';
                  btn.style.color = 'var(--cta)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = 'var(--cta)';
                  btn.style.color = '#FFFFFF';
                }}
              >
                Download Share Image
              </a>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs uppercase tracking-wider text-[var(--cream)]/60 hover:text-[var(--cream)] py-1 transition-colors cursor-pointer"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
