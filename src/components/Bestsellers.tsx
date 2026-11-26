import { motion, useReducedMotion } from 'motion/react';
import { Star } from 'lucide-react';
import { BESTSELLERS, type SkinConcernOption } from '../data/clinicData';
import { EditorialImage } from './EditorialImage';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

interface BestsellersProps {
  onBookTreatment: (concern: SkinConcernOption, treatmentName: string) => void;
  onBookConsultation: () => void;
}

export function Bestsellers({ onBookTreatment, onBookConsultation }: BestsellersProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="bestsellers" className="bg-[#EDE4D3] py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          className="mx-auto max-w-xl text-center"
        >
          <motion.p
            variants={STAGGER_ITEM}
            className="text-xs font-semibold tracking-wider text-[#7A4B2E] uppercase"
          >
            Client Favorites
          </motion.p>
          <motion.h2
            variants={STAGGER_ITEM}
            className="font-display mt-2 text-[32px] leading-[1.08] font-semibold text-[#2B2118] sm:text-[44px]"
          >
            Our most-booked treatments.
          </motion.h2>
          <motion.p
            variants={STAGGER_ITEM}
            className="mt-2.5 text-base text-[#6B5B4A] sm:text-lg"
          >
            These are the sessions clients keep coming back for.
          </motion.p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BESTSELLERS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={SECTION_VIEWPORT}
              transition={{
                duration: 0.56,
                delay: 0.06 + idx * 0.08,
                ease: EASE_EDITORIAL,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-[#2B2118]/12 bg-[#FAF6EE] shadow-xs transition-all duration-200 hover:border-[#7A4B2E]/40 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#D8C9AF]/40">
                <EditorialImage
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  fallbackTitle={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B5B4A]">
                    <Star
                      className="h-3.5 w-3.5 fill-[#7A4B2E] text-[#7A4B2E]"
                      aria-hidden="true"
                    />
                    <span className="tabular-nums">
                      {item.rating}★ ({item.reviewCount})
                    </span>
                  </div>

                  <h3 className="font-display mt-2 text-xl leading-snug font-semibold text-[#2B2118]">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#2B2118]/10 pt-4">
                  <span className="tabular-nums text-base font-bold text-[#2B2118]">
                    {item.price}
                  </span>
                  <motion.button
                    type="button"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    onClick={() => onBookTreatment(item.concernMatch, item.name)}
                    className="min-h-[40px] cursor-pointer rounded-full bg-[#2B2118] px-5 py-2 text-xs font-semibold text-[#F3EBDD] transition-colors duration-150 hover:bg-[#41322A] whitespace-nowrap shrink-0"
                  >
                    Book
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.52, delay: 0.2, ease: EASE_EDITORIAL }}
          className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row"
        >
          <p className="text-sm text-[#6B5B4A]">
            Not sure which session fits your skin right now?
          </p>
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            onClick={onBookConsultation}
            className="min-h-[44px] cursor-pointer rounded-full border border-[#2B2118]/40 px-6 py-2.5 text-sm font-semibold text-[#2B2118] transition-colors duration-150 hover:bg-[#2B2118] hover:text-[#F3EBDD] whitespace-nowrap shrink-0"
          >
            Book Free Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
