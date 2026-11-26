import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TREATMENTS, type SkinConcernOption } from '../data/clinicData';
import { EditorialImage } from './EditorialImage';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

interface TreatmentsCarouselProps {
  onSelectTreatment: (concern: SkinConcernOption, treatmentName: string) => void;
}

export function TreatmentsCarousel({ onSelectTreatment }: TreatmentsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollByCard = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const offset = direction === 'left' ? -320 : 320;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      id="treatments"
      className="relative overflow-hidden border-t border-[#2B2118]/12 bg-[#F3EBDD] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <motion.p
              variants={STAGGER_ITEM}
              className="text-xs font-semibold tracking-wider text-[#7A4B2E] uppercase"
            >
              Our Treatments
            </motion.p>
            <motion.h2
              variants={STAGGER_ITEM}
              className="font-display mt-2 text-[34px] leading-[1.06] font-semibold text-[#2B2118] sm:text-[46px]"
            >
              Compliments, incoming.
            </motion.h2>
            <motion.p
              variants={STAGGER_ITEM}
              className="mt-2.5 text-base text-[#6B5B4A] sm:text-lg"
            >
              Pick the treatment your skin has been asking for.
            </motion.p>
          </div>

          <motion.div variants={STAGGER_ITEM} className="hidden items-center gap-2 lg:flex">
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              onClick={() => scrollByCard('left')}
              aria-label="Scroll treatments left"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#2B2118]/25 bg-[#FAF6EE] text-[#2B2118] transition-colors duration-150 hover:border-[#2B2118] hover:bg-[#EDE4D3]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              onClick={() => scrollByCard('right')}
              aria-label="Scroll treatments right"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#2B2118]/25 bg-[#FAF6EE] text-[#2B2118] transition-colors duration-150 hover:border-[#2B2118] hover:bg-[#EDE4D3]"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="relative mt-6 sm:mt-8">
          {/* Subtle sculptural sine wave thread flowing across the 5 treatment cards */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-1/2 left-0 hidden h-36 w-full -translate-y-1/2 lg:block"
          >
            <motion.path
              d="M 40 50 C 160 15, 220 145, 360 135 C 480 125, 500 35, 600 40 C 700 45, 740 140, 860 135 C 980 130, 1040 25, 1160 55"
              fill="none"
              stroke="rgba(122, 75, 46, 0.22)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={SECTION_VIEWPORT}
              transition={{ duration: 1.05, delay: 0.15, ease: EASE_EDITORIAL }}
            />
          </svg>

          <div
            ref={scrollContainerRef}
            className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-6 pb-10 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pt-8 lg:pb-12"
          >
            {TREATMENTS.map((treatment, idx) => {
              const isCrest = idx % 2 === 0;
              return (
                <div
                  key={treatment.id}
                  className={`w-[74vw] max-w-[265px] shrink-0 snap-start lg:w-auto lg:max-w-none ${
                    isCrest
                      ? '-translate-y-3 lg:-translate-y-6'
                      : 'translate-y-4 lg:translate-y-7'
                  }`}
                >
                  <motion.article
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: isCrest ? 26 : 36, scale: 0.97 }
                    }
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={SECTION_VIEWPORT}
                    transition={{
                      duration: 0.58,
                      delay: 0.08 + idx * 0.08,
                      ease: EASE_EDITORIAL,
                    }}
                    whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                    className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#2B2118]/12 bg-[#FAF6EE] shadow-xs transition-shadow duration-200 hover:shadow-md"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#EDE4D3]">
                      <EditorialImage
                        src={treatment.image}
                        alt={treatment.alt}
                        loading="lazy"
                        fallbackTitle={treatment.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                      <div>
                        <h3 className="font-display text-lg leading-snug font-semibold text-[#2B2118]">
                          {treatment.name}
                        </h3>
                        <p className="mt-1 text-sm text-[#6B5B4A]">{treatment.benefit}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-[#2B2118]/10 pt-3">
                        <span className="tabular-nums text-sm font-bold text-[#2B2118]">
                          {treatment.price}
                        </span>
                        <motion.button
                          type="button"
                          whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                          onClick={() => onSelectTreatment(treatment.concernMatch, treatment.name)}
                          className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#7A4B2E] underline-offset-4 transition-colors hover:text-[#2B2118] hover:underline whitespace-nowrap shrink-0"
                        >
                          Book This
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
