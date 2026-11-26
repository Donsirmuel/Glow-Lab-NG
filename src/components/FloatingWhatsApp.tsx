import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/clinicData';

export function FloatingWhatsApp() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Glow Lab NG on WhatsApp"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: [0, -3, 0] }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.2 }
          : {
              opacity: { duration: 0.35, delay: 0.3 },
              y: { duration: 2.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' },
            }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      className="fixed right-4 bottom-4 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-[#D8C9AF]/30 bg-[#2B2118] px-4 text-xs font-semibold text-[#F3EBDD] shadow-lg transition-colors duration-150 hover:bg-[#41322A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A4B2E] sm:h-12 sm:px-5 sm:text-sm"
    >
      <MessageCircle className="h-4 w-4 shrink-0 text-[#D8C9AF]" aria-hidden="true" />
      <span className="whitespace-nowrap">WhatsApp Us</span>
    </motion.a>
  );
}
