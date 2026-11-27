import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { GLOW_CLUB_IMAGE, GLOW_CLUB_PERKS } from '../data/clinicData';
import { EditorialImage } from './EditorialImage';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

interface GlowClubProps {
  onJoinGlowClub: () => void;
}

export function GlowClub({ onJoinGlowClub }: GlowClubProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="glow-club" className="bg-[#F3EBDD] py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.62, ease: EASE_EDITORIAL }}
          className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#2B2118]/14 bg-[#FAF6EE] lg:grid-cols-2 lg:items-stretch"
        >
          <div className="group relative aspect-[4/3] overflow-hidden bg-[#D8C9AF]/40 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[500px]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.06 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={SECTION_VIEWPORT}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_EDITORIAL }}
              className="h-full w-full"
            >
              <EditorialImage
                src={GLOW_CLUB_IMAGE.src}
                alt={GLOW_CLUB_IMAGE.alt}
                loading="lazy"
                fallbackTitle="Glow Club Lekki"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </motion.div>
          </div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
            className="flex flex-col justify-center p-6 sm:p-10 lg:p-10 xl:p-14"
          >
            <motion.p
              variants={STAGGER_ITEM}
              className="text-xs font-semibold tracking-wider text-[#7A4B2E] uppercase"
            >
              Monthly Skin Care Plan
            </motion.p>
            <motion.h2
              variants={STAGGER_ITEM}
              className="font-display mt-2 text-[32px] leading-[1.08] font-semibold text-[#2B2118] sm:text-[42px]"
            >
              Don't gatekeep the glow.
            </motion.h2>
            <motion.p variants={STAGGER_ITEM} className="mt-3 text-base text-[#6B5B4A]">
              Join the Glow Club and keep your skin consistent without thinking about it.
            </motion.p>

            <motion.div
              variants={STAGGER_ITEM}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.2 }}
              className="mt-6 rounded-[20px] border border-[#2B2118]/14 bg-[#EDE4D3]/60 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#2B2118]/12 pb-4">
                <h3 className="font-display text-xl font-semibold text-[#2B2118]">
                  Glow Club Monthly
                </h3>
                <div className="tabular-nums text-2xl font-bold text-[#2B2118]">
                  ₦89,000<span className="text-sm font-medium text-[#6B5B4A]">/mo</span>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {GLOW_CLUB_PERKS.map((perk, idx) => (
                  <motion.li
                    key={perk}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={SECTION_VIEWPORT}
                    transition={{
                      duration: 0.42,
                      delay: 0.16 + idx * 0.08,
                      ease: EASE_EDITORIAL,
                    }}
                    className="flex items-center gap-3 text-sm font-medium text-[#2B2118]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2B2118] text-[#F3EBDD]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>{perk}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={onJoinGlowClub}
                className="mt-6 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-full bg-[#2B2118] px-6 py-3 text-sm font-semibold text-[#F3EBDD] transition-colors duration-150 hover:bg-[#41322A] sm:text-base whitespace-nowrap"
              >
                Join The Glow Club
              </motion.button>

              <p className="mt-3 text-center text-xs font-medium text-[#6B5B4A]">
                Cancel anytime. Zero lock-in.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
