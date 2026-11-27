import { motion, useReducedMotion } from 'motion/react';
import { buildWhatsAppUrl } from '../data/clinicData';
import {
  FooterBottomBotanicalArt,
  FooterSvgDefs,
  FooterTopWaveArt,
} from './FooterArtwork';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

interface FooterProps {
  onBookClick: () => void;
}

export function Footer({ onBookClick }: FooterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative overflow-hidden bg-[#241A13] text-[#F3EBDD]">
      <FooterSvgDefs />

      {/* Top Inverted Botanical Apothecary Outline Wave */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={SECTION_VIEWPORT}
        transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
      >
        <FooterTopWaveArt />
      </motion.div>

      {/* Main Editorial Footer Grid */}
      <motion.div
        variants={STAGGER_CONTAINER}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={SECTION_VIEWPORT}
        className="mx-auto mt-2 grid w-full max-w-[1280px] grid-cols-2 gap-8 px-6 sm:grid-cols-3 sm:px-8 lg:grid-cols-[1.45fr_0.95fr_0.85fr_1.35fr] lg:gap-9 lg:px-10 xl:gap-[44px] xl:px-[clamp(22px,6vw,96px)]"
      >
        {/* Brand Statement & Booking CTA */}
        <motion.div
          variants={STAGGER_ITEM}
          className="col-span-2 sm:col-span-3 lg:col-span-1"
        >
          <p className="mb-[26px] max-w-[15ch] font-display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.1] font-normal text-[#F3EBDD]">
            Skincare that respects{' '}
            <em className="italic text-[#E8BE8E]">your skin,</em> wherever you are.
          </p>
          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F3EBDD] px-[26px] py-[15px] text-[0.93rem] font-bold text-[#2B2118] whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE8E]"
          >
            Book free consultation
          </button>
        </motion.div>

        {/* Visit the Clinic */}
        <motion.div variants={STAGGER_ITEM}>
          <h4 className="mb-4 text-[0.78rem] font-medium text-[#C9B79F]">
            Visit the clinic
          </h4>
          <address className="not-italic text-[0.95rem] leading-[1.55] text-[#F3EBDD]">
            14 Admiralty Way,
            <br />
            Lekki Phase 1, Lagos
          </address>
        </motion.div>

        {/* Opening Hours */}
        <motion.div variants={STAGGER_ITEM}>
          <h4 className="mb-4 text-[0.78rem] font-medium text-[#C9B79F]">
            Opening hours
          </h4>
          <span className="block text-[0.95rem] leading-[1.55] text-[#F3EBDD]">
            Mon-Sat
            <br />
            9am-7pm
          </span>
        </motion.div>

        {/* Book or Ask Us Anything */}
        <motion.div
          variants={STAGGER_ITEM}
          className="col-span-2 sm:col-span-1"
        >
          <h4 className="mb-4 text-[0.78rem] font-medium text-[#C9B79F]">
            Book or ask us anything
          </h4>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-[10px] rounded-full border border-[#E8BE8E]/60 px-5 py-[13px] text-[0.9rem] font-bold text-[#E8BE8E] whitespace-nowrap transition-colors duration-300 hover:bg-[#E8BE8E] hover:text-[#2B2118] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE8E]"
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.3z" />
              <path d="M9.2 8.8c.2 2.3 2.4 4.6 4.8 4.8l1.2-1.3-2-1.1-.9.9c-.9-.4-1.9-1.4-2.3-2.3l.9-.9-1.1-2z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>

          <div className="mt-4 flex gap-[10px]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-[42px] w-[42px] place-items-center rounded-full border border-[#F3EBDD]/30 text-[#F3EBDD] transition-colors duration-300 hover:bg-[#F3EBDD] hover:text-[#2B2118] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE8E]"
            >
              <svg
                className="h-[19px] w-[19px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.3" cy="6.7" r=".6" />
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="grid h-[42px] w-[42px] place-items-center rounded-full border border-[#F3EBDD]/30 text-[#F3EBDD] transition-colors duration-300 hover:bg-[#F3EBDD] hover:text-[#2B2118] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE8E]"
            >
              <svg
                className="h-[19px] w-[19px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3v11.2a3.6 3.6 0 1 1-3.6-3.6M14 3c.4 2.6 2.1 4.3 4.8 4.5" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Copyright & Section Bar */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={SECTION_VIEWPORT}
        transition={{ duration: 0.45, delay: 0.15, ease: EASE_EDITORIAL }}
        className="mx-auto mt-9 mb-1.5 flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 text-[0.8rem] text-[#C9B79F] sm:px-8 lg:mt-11 lg:px-10 xl:px-[clamp(22px,6vw,96px)]"
      >
        <span>© 2026 Glow Lab NG. All rights reserved.</span>
        <nav aria-label="Footer navigation" className="flex items-center gap-2">
          <a
            href="#treatments"
            className="transition-colors hover:text-[#F3EBDD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE8E]"
          >
            Treatments
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#skin-quiz"
            className="transition-colors hover:text-[#F3EBDD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE8E]"
          >
            Skin Quiz
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#reviews"
            className="transition-colors hover:text-[#F3EBDD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE8E]"
          >
            Reviews
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#faq"
            className="transition-colors hover:text-[#F3EBDD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE8E]"
          >
            FAQ
          </a>
        </nav>
      </motion.div>

      {/* Bottom Shaded Multi-Complexion Terrain & Apothecary Vessels */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={SECTION_VIEWPORT}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE_EDITORIAL }}
      >
        <FooterBottomBotanicalArt />
      </motion.div>
    </footer>
  );
}
