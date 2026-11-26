import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Clock, Instagram, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/clinicData';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-[#2B2118] text-[#F3EBDD]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand Column */}
          <motion.div variants={STAGGER_ITEM}>
            <a href="#top" className="font-display text-2xl font-semibold text-[#F3EBDD]">
              Glow Lab <span className="italic text-[#D8C9AF]">NG</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-[#D8C9AF]">
              Glow Lab NG - Skincare that respects your skin, wherever you are.
            </p>
          </motion.div>

          {/* Address Column */}
          <motion.div variants={STAGGER_ITEM}>
            <h3 className="text-xs font-semibold tracking-wider text-[#D8C9AF] uppercase">
              Visit Lekki Clinic
            </h3>
            <address className="mt-3 flex items-start gap-2.5 text-sm not-italic text-[#F3EBDD]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D8C9AF]" aria-hidden="true" />
              <span>14 Admiralty Way, Lekki Phase 1, Lagos</span>
            </address>
          </motion.div>

          {/* Hours Column */}
          <motion.div variants={STAGGER_ITEM}>
            <h3 className="text-xs font-semibold tracking-wider text-[#D8C9AF] uppercase">
              Opening Hours
            </h3>
            <div className="mt-3 flex items-start gap-2.5 text-sm text-[#F3EBDD]">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D8C9AF]" aria-hidden="true" />
              <span>Mon-Sat, 9am-7pm</span>
            </div>
          </motion.div>

          {/* Social & WhatsApp Links */}
          <motion.div variants={STAGGER_ITEM}>
            <h3 className="text-xs font-semibold tracking-wider text-[#D8C9AF] uppercase">
              Connect
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F3EBDD] transition-colors hover:text-[#D8C9AF]"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F3EBDD] transition-colors hover:text-[#D8C9AF]"
                >
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F3EBDD] transition-colors hover:text-[#D8C9AF]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.48, delay: 0.25, ease: EASE_EDITORIAL }}
          className="mt-12 border-t border-[#D8C9AF]/20 pt-6 text-center text-xs text-[#D8C9AF] sm:text-left"
        >
          © 2026 Glow Lab NG. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
