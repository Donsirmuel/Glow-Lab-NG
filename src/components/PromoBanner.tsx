import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Clock } from 'lucide-react';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

interface PromoBannerProps {
  onClaimPromo: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getNextSundayEnd(): Date {
  const now = new Date();
  const day = now.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  const target = new Date(now);
  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(23, 59, 59, 999);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  return target;
}

function calculateRemaining(): TimeRemaining {
  const diff = Math.max(0, getNextSundayEnd().getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function padTwo(val: number): string {
  return String(val).padStart(2, '0');
}

export function PromoBanner({ onClaimPromo }: PromoBannerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateRemaining());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="editorial-grain relative overflow-hidden bg-[#F3EBDD] py-14 sm:py-20">
      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.78 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={SECTION_VIEWPORT}
        transition={{ duration: 0.72, ease: EASE_EDITORIAL }}
        className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[#D8C9AF]/55 sm:h-32"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex max-w-[440px] items-center justify-center sm:max-w-[500px]">
          {/* Subtle ambient breathing ring */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.055, 1], opacity: [0.45, 0.1, 0.45] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#7A4B2E]/35"
            />
          )}

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.62, ease: EASE_EDITORIAL }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
            className="relative flex w-full flex-col items-center justify-center rounded-full border border-[#2B2118]/20 bg-[#D8C9AF] px-8 py-14 text-center shadow-sm sm:aspect-square sm:px-14 sm:py-12"
          >
            <motion.div
              variants={STAGGER_CONTAINER}
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
              className="flex flex-col items-center"
            >
              <motion.div
                variants={STAGGER_ITEM}
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#7A4B2E] uppercase"
              >
                <Clock className="h-3.5 w-3.5 text-[#7A4B2E]" aria-hidden="true" />
                <span className="tabular-nums">
                  Ends in {timeLeft.days}d {padTwo(timeLeft.hours)}h {padTwo(timeLeft.minutes)}m{' '}
                  {padTwo(timeLeft.seconds)}s
                </span>
              </motion.div>

              <motion.h2
                variants={STAGGER_ITEM}
                className="font-display mt-3 text-[28px] leading-[1.08] font-semibold text-[#2B2118] sm:text-[38px]"
              >
                20% OFF Your First Treatment This Week
              </motion.h2>

              <motion.p
                variants={STAGGER_ITEM}
                className="mt-3 max-w-xs text-sm leading-relaxed text-[#6B5B4A] sm:text-base"
              >
                Book before Sunday and save. No code needed, just book.
              </motion.p>

              <motion.div variants={STAGGER_ITEM}>
                <motion.button
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  onClick={onClaimPromo}
                  className="mt-6 inline-flex min-h-[46px] cursor-pointer items-center justify-center rounded-full bg-[#2B2118] px-7 py-3 text-sm font-semibold text-[#F3EBDD] transition-colors duration-150 hover:bg-[#41322A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A4B2E] whitespace-nowrap shrink-0"
                >
                  Claim My 20% Off
                </motion.button>
              </motion.div>

              <motion.p
                variants={STAGGER_ITEM}
                className="mt-4 text-xs font-medium text-[#6B5B4A]"
              >
                Offer ends Sunday, 11:59pm. Valid at our Lekki clinic.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
