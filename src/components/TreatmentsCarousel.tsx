import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Columns3, X } from 'lucide-react';
import {
  TREATMENTS,
  type SkinConcernOption,
  type TreatmentFocusFilter,
} from '../data/clinicData';
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

const FILTER_OPTIONS: {
  id: TreatmentFocusFilter;
  label: string;
  description: string;
}[] = [
  {
    id: 'All',
    label: 'All Treatments',
    description: 'Every clinical facial and corrective session',
  },
  {
    id: 'Acne',
    label: 'Acne Focus',
    description: 'Calms breakouts, clogged pores, and post-acne texture',
  },
  {
    id: 'Hyperpigmentation',
    label: 'Hyperpigmentation',
    description: 'Fades dark spots and balances uneven tone safely',
  },
];

export function TreatmentsCarousel({ onSelectTreatment }: TreatmentsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] = useState<TreatmentFocusFilter>('All');
  const [hasFiltered, setHasFiltered] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const filteredTreatments =
    activeFilter === 'All'
      ? TREATMENTS
      : TREATMENTS.filter((item) => item.focusAreas.includes(activeFilter));

  const getCountForFilter = (filterId: TreatmentFocusFilter) =>
    filterId === 'All'
      ? TREATMENTS.length
      : TREATMENTS.filter((item) => item.focusAreas.includes(filterId)).length;

  const handleFilterChange = (filterId: TreatmentFocusFilter) => {
    if (filterId === activeFilter) return;
    setHasFiltered(true);
    setActiveFilter(filterId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollByCard = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const offset = direction === 'left' ? -320 : 320;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const desktopGridClass =
    filteredTreatments.length <= 3
      ? 'lg:grid-cols-3'
      : filteredTreatments.length === 4
        ? 'lg:grid-cols-4'
        : 'lg:grid-cols-5';

  const activeMeta = FILTER_OPTIONS.find((opt) => opt.id === activeFilter);

  return (
    <section
      id="treatments"
      aria-labelledby="treatments-heading"
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
              id="treatments-heading"
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

        {/* Treatment Comparison Filter Bar & Side-by-Side Toggle */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_EDITORIAL }}
          className="mt-7 flex flex-col justify-between gap-3 border-y border-[#2B2118]/12 py-4 sm:flex-row sm:items-center"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div
              role="tablist"
              aria-label="Filter treatments by skin focus"
              className="no-scrollbar flex items-center gap-1.5 overflow-x-auto rounded-full border border-[#2B2118]/12 bg-[#EDE4D3] p-1"
            >
              {FILTER_OPTIONS.map((option) => {
                const isSelected = activeFilter === option.id;
                const count = getCountForFilter(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleFilterChange(option.id)}
                    className={`min-h-[38px] cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 sm:px-4 sm:text-sm ${
                      isSelected
                        ? 'bg-[#2B2118] text-[#F3EBDD] shadow-xs'
                        : 'text-[#6B5B4A] hover:text-[#2B2118]'
                    }`}
                  >
                    {option.label}{' '}
                    <span
                      className={`tabular-nums ml-1 text-[11px] ${
                        isSelected ? 'text-[#D8C9AF]' : 'text-[#6B5B4A]/80'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {activeMeta && (
              <p className="text-xs text-[#6B5B4A] sm:text-sm">{activeMeta.description}</p>
            )}
          </div>

          <motion.button
            type="button"
            aria-expanded={compareOpen}
            aria-controls="treatment-comparison-panel"
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            onClick={() => setCompareOpen((prev) => !prev)}
            className={`inline-flex min-h-[40px] cursor-pointer items-center justify-center gap-2 self-start rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 sm:self-auto sm:text-sm ${
              compareOpen
                ? 'border-[#7A4B2E] bg-[#7A4B2E] text-[#F3EBDD]'
                : 'border-[#2B2118]/25 bg-[#FAF6EE] text-[#2B2118] hover:border-[#2B2118]'
            }`}
          >
            {compareOpen ? (
              <>
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Close Comparison
              </>
            ) : (
              <>
                <Columns3 className="h-3.5 w-3.5" aria-hidden="true" />
                Compare Side-by-Side
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Expandable Side-by-Side Treatment Comparison Table */}
        <AnimatePresence initial={false}>
          {compareOpen && (
            <motion.div
              id="treatment-comparison-panel"
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.34, ease: EASE_EDITORIAL }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-[22px] border border-[#2B2118]/14 bg-[#FAF6EE] p-4 shadow-xs sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#2B2118]/10 pb-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#2B2118]">
                      Treatment Comparison
                      {activeFilter !== 'All' ? ` · ${activeFilter}` : ''}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#6B5B4A] sm:text-sm">
                      Compare session duration, downtime, and starting rates before booking.
                    </p>
                  </div>
                  <span className="tabular-nums text-xs font-semibold text-[#7A4B2E]">
                    Showing {filteredTreatments.length} treatments
                  </span>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#2B2118]/12 text-xs font-semibold tracking-wide text-[#6B5B4A] uppercase">
                        <th scope="col" className="w-36 py-3 pr-4">
                          Detail
                        </th>
                        {filteredTreatments.map((item) => (
                          <th
                            key={item.id}
                            scope="col"
                            className="font-display px-3 py-3 text-base font-semibold normal-case tracking-normal text-[#2B2118]"
                          >
                            {item.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B2118]/10 text-[#2B2118]">
                      <tr>
                        <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#6B5B4A]">
                          Best For
                        </th>
                        {filteredTreatments.map((item) => (
                          <td key={item.id} className="px-3 py-3 text-xs leading-relaxed text-[#6B5B4A] sm:text-sm">
                            {item.bestFor}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#6B5B4A]">
                          Primary Focus
                        </th>
                        {filteredTreatments.map((item) => (
                          <td key={item.id} className="px-3 py-3 text-xs font-medium text-[#2B2118] sm:text-sm">
                            {item.focusAreas.join(' · ')}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#6B5B4A]">
                          Session Time
                        </th>
                        {filteredTreatments.map((item) => (
                          <td key={item.id} className="tabular-nums px-3 py-3 text-xs sm:text-sm">
                            {item.duration}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#6B5B4A]">
                          Downtime
                        </th>
                        {filteredTreatments.map((item) => (
                          <td key={item.id} className="px-3 py-3 text-xs text-[#6B5B4A] sm:text-sm">
                            {item.downtime}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#6B5B4A]">
                          Typical Plan
                        </th>
                        {filteredTreatments.map((item) => (
                          <td key={item.id} className="tabular-nums px-3 py-3 text-xs sm:text-sm">
                            {item.sessionsRecommended}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#6B5B4A]">
                          Starting Rate
                        </th>
                        {filteredTreatments.map((item) => (
                          <td key={item.id} className="tabular-nums px-3 py-3 text-sm font-bold text-[#2B2118]">
                            {item.price}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4 pb-1 pr-4 text-xs font-semibold text-[#6B5B4A]">
                          Action
                        </th>
                        {filteredTreatments.map((item) => (
                          <td key={item.id} className="px-3 pt-4 pb-1">
                            <button
                              type="button"
                              onClick={() => onSelectTreatment(item.concernMatch, item.name)}
                              className="inline-flex min-h-[38px] cursor-pointer items-center gap-1 rounded-full bg-[#2B2118] px-4 py-1.5 text-xs font-semibold text-[#F3EBDD] transition-colors hover:bg-[#41322A] whitespace-nowrap shrink-0"
                            >
                              Book This
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sculptural Wave Cards Row */}
        <div className="relative mt-6 sm:mt-8">
          {/* Subtle sculptural sine wave thread flowing across the treatment cards */}
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
            className={`no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-6 pb-10 sm:mx-0 sm:px-0 lg:grid ${desktopGridClass} lg:gap-5 lg:overflow-visible lg:pt-8 lg:pb-12`}
          >
            <AnimatePresence mode="popLayout">
              {filteredTreatments.map((treatment, idx) => {
                const isCrest = idx % 2 === 0;
                return (
                  <motion.div
                    key={treatment.id}
                    layout={!shouldReduceMotion}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: isCrest ? 22 : 32, scale: 0.96 }
                    }
                    animate={hasFiltered ? { opacity: 1, y: 0, scale: 1 } : undefined}
                    whileInView={hasFiltered ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
                    viewport={SECTION_VIEWPORT}
                    transition={{
                      duration: 0.45,
                      delay: hasFiltered ? idx * 0.04 : 0.08 + idx * 0.07,
                      ease: EASE_EDITORIAL,
                    }}
                    className={`w-[74vw] max-w-[265px] shrink-0 snap-start lg:w-auto lg:max-w-none ${
                      isCrest
                        ? '-translate-y-3 lg:-translate-y-6'
                        : 'translate-y-4 lg:translate-y-7'
                    }`}
                  >
                    <motion.article
                      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                      transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
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
                          <p className="tabular-nums text-[11px] font-medium text-[#7A4B2E]">
                            {treatment.duration} · {treatment.downtime}
                          </p>
                          <h3 className="font-display mt-1 text-lg leading-snug font-semibold text-[#2B2118]">
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
