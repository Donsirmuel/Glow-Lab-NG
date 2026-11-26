import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/clinicData';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

export function FaqSection() {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="bg-[#EDE4D3] py-14 sm:py-20">
      <div className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          className="text-center"
        >
          <motion.p
            variants={STAGGER_ITEM}
            className="text-xs font-semibold tracking-wider text-[#7A4B2E] uppercase"
          >
            Honest Answers
          </motion.p>
          <motion.h2
            variants={STAGGER_ITEM}
            className="font-display mt-2 text-[32px] leading-[1.08] font-semibold text-[#2B2118] sm:text-[42px]"
          >
            Questions you probably want to ask.
          </motion.h2>
        </motion.div>

        <div className="mt-10 divide-y divide-[#2B2118]/15 border-y border-[#2B2118]/15">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <motion.div
                key={item.question}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SECTION_VIEWPORT}
                transition={{
                  duration: 0.46,
                  delay: 0.05 + idx * 0.06,
                  ease: EASE_EDITORIAL,
                }}
                className="py-1"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(idx)}
                    className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[#2B2118] transition-colors hover:text-[#7A4B2E] sm:text-lg"
                  >
                    <span>{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className="h-5 w-5 text-[#7A4B2E]"
                        aria-hidden="true"
                      />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pr-8 pb-5 text-sm leading-relaxed text-[#6B5B4A] sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
