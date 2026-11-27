import { motion, useReducedMotion } from 'motion/react';
import { EASE_EDITORIAL } from './SectionMotion';

interface HeaderProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Results', href: '#bestsellers' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Glow Club', href: '#glow-club' },
];

export function Header({ onBookClick }: HeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
      className="sticky top-0 z-40 border-b border-[#2B2118]/12 bg-[#EDE4D3]/92 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:gap-8 lg:px-10">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-display whitespace-nowrap shrink-0 text-xl font-semibold tracking-tight text-[#2B2118] sm:text-[22px] lg:text-[26px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A4B2E]"
        >
          Glow Lab <span className="italic text-[#7A4B2E]">NG</span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav aria-label="Primary" className="hidden items-center md:flex md:gap-5 lg:gap-8">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 text-[13px] font-medium text-[#6B5B4A] underline-offset-4 transition-colors duration-150 hover:text-[#2B2118] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A4B2E] lg:text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex shrink-0 items-center">
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            onClick={onBookClick}
            className="whitespace-nowrap shrink-0 cursor-pointer rounded-full bg-[#2B2118] px-4 py-2.5 text-xs font-semibold text-[#F3EBDD] transition-colors duration-150 hover:bg-[#41322A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A4B2E] sm:px-4 sm:text-[13px] lg:px-5 lg:text-sm"
          >
            Book Free Consultation
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
