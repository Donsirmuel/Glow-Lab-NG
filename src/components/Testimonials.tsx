import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/clinicData';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const mobileItem = TESTIMONIALS[activeIndex];

  return (
    <section
      id="reviews"
      className="bg-[#2B2118] py-16 text-[#F3EBDD] sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <motion.p
              variants={STAGGER_ITEM}
              className="text-xs font-semibold tracking-wider text-[#D8C9AF] uppercase"
            >
              Verified Clinic Reviews
            </motion.p>
            <motion.h2
              variants={STAGGER_ITEM}
              className="font-display mt-2 text-[34px] leading-[1.06] font-semibold text-[#F3EBDD] sm:text-[46px]"
            >
              Lagos is talking.
            </motion.h2>
          </div>

          <motion.div variants={STAGGER_ITEM} className="flex items-center gap-2 lg:hidden">
            <motion.button
              type="button"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              onClick={handlePrev}
              aria-label="Previous review"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#D8C9AF]/40 text-[#F3EBDD] hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </motion.button>
            <motion.button
              type="button"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              onClick={handleNext}
              aria-label="Next review"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#D8C9AF]/40 text-[#F3EBDD] hover:bg-white/10"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Mobile & Tablet animated slider */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.56, delay: 0.1, ease: EASE_EDITORIAL }}
          className="mt-8 lg:hidden"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={mobileItem.id}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
              className="flex flex-col justify-between rounded-[22px] border border-[#D8C9AF]/20 bg-[#372A1F] p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center gap-1" aria-label={`${mobileItem.stars} out of 5 stars`}>
                  {Array.from({ length: mobileItem.stars }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 fill-[#D8C9AF] text-[#D8C9AF]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="font-display mt-5 text-lg leading-relaxed font-medium tracking-wide text-[#F3EBDD] sm:text-xl">
                  “{mobileItem.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-7 border-t border-[#D8C9AF]/20 pt-4">
                <div className="text-sm font-semibold text-[#F3EBDD]">
                  {mobileItem.author}, {mobileItem.age}, {mobileItem.area}
                </div>
                <div className="mt-0.5 text-xs text-[#D8C9AF]">{mobileItem.treatment}</div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>

        {/* Desktop 3-column grid */}
        <div className="mt-10 hidden grid-cols-3 gap-5 lg:grid">
          {TESTIMONIALS.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={SECTION_VIEWPORT}
              transition={{
                duration: 0.58,
                delay: 0.08 + idx * 0.1,
                ease: EASE_EDITORIAL,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              className="flex flex-col justify-between rounded-[22px] border border-[#D8C9AF]/20 bg-[#372A1F] p-6 transition-colors duration-200 hover:border-[#D8C9AF]/50 xl:p-8"
            >
              <div>
                <div className="flex items-center gap-1" aria-label={`${item.stars} out of 5 stars`}>
                  {Array.from({ length: item.stars }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 fill-[#D8C9AF] text-[#D8C9AF]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="font-display mt-5 text-xl leading-relaxed font-medium tracking-wide text-[#F3EBDD]">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-7 border-t border-[#D8C9AF]/20 pt-4">
                <div className="text-sm font-semibold text-[#F3EBDD]">
                  {item.author}, {item.age}, {item.area}
                </div>
                <div className="mt-0.5 text-xs text-[#D8C9AF]">
                  {item.treatment}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-5 flex items-center justify-center gap-2 lg:hidden"
        >
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show review by ${item.author}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === activeIndex ? 'w-6 bg-[#D8C9AF]' : 'w-2.5 bg-[#D8C9AF]/40'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
