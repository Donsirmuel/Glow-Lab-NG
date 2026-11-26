import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/clinicData';
import { EASE_EDITORIAL } from './SectionMotion';

export function FloatingWhatsApp() {
  const shouldReduceMotion = useReducedMotion();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [nearBooking, setNearBooking] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolledPastHero(window.scrollY > 280);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    const bookingEl = document.getElementById('booking');
    let observer: IntersectionObserver | null = null;
    if (bookingEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          setNearBooking(Boolean(entries[0]?.isIntersecting));
        },
        { threshold: 0.25 }
      );
      observer.observe(bookingEl);
    }

    return () => {
      window.removeEventListener('scroll', updateScroll);
      observer?.disconnect();
    };
  }, []);

  const isVisible = scrolledPastHero && !nearBooking;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Glow Lab NG on WhatsApp"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.94 }}
          transition={{ duration: 0.26, ease: EASE_EDITORIAL }}
          whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          className="fixed right-4 bottom-4 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-[#D8C9AF]/30 bg-[#2B2118] px-4 text-xs font-semibold text-[#F3EBDD] shadow-lg transition-colors duration-150 hover:bg-[#41322A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A4B2E] sm:right-5 sm:bottom-5 sm:h-12 sm:px-5 sm:text-sm"
        >
          <MessageCircle className="h-4 w-4 shrink-0 text-[#D8C9AF]" aria-hidden="true" />
          <span className="whitespace-nowrap">WhatsApp Us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
