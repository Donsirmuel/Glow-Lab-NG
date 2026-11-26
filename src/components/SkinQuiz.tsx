import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import {
  QUIZ_PORTRAIT,
  SKIN_TYPES,
  buildWhatsAppUrl,
  validateNigerianPhone,
  type SkinTypeChip,
} from '../data/clinicData';
import { EditorialImage } from './EditorialImage';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

interface SkinQuizProps {
  onBookFromQuiz: (recommendedConcern: 'Acne' | 'Dark Spots' | 'Uneven Tone' | 'Sensitive') => void;
}

const GOALS = [
  { id: 'breakouts', label: 'Clear breakouts', concern: 'Acne' as const },
  { id: 'dark-spots', label: 'Fade dark spots', concern: 'Dark Spots' as const },
  { id: 'uneven-tone', label: 'Even out dull tone', concern: 'Uneven Tone' as const },
  { id: 'calm-skin', label: 'Calm sensitive skin', concern: 'Sensitive' as const },
];

const ROUTINE_STAGES = [
  'Just soap and cream',
  '3 to 5 products',
  'Too many, nothing works',
];

function getQuizRecommendation(
  skinType: SkinTypeChip,
  goalId: string
): { treatment: string; routine: string; concern: 'Acne' | 'Dark Spots' | 'Uneven Tone' | 'Sensitive' } {
  if (goalId === 'breakouts' || skinType === 'Acne-Prone') {
    return {
      treatment: 'Acne Clear Treatment (₦45,000)',
      routine: 'Gentle salicylic wash, niacinamide serum, oil-free SPF 50 every morning.',
      concern: 'Acne',
    };
  }
  if (goalId === 'dark-spots') {
    return {
      treatment: 'Hyperpigmentation Fix (₦55,000)',
      routine: 'Mandelic acid cleanser, vitamin C + alpha arbutin, daily broad-spectrum sun protection.',
      concern: 'Dark Spots',
    };
  }
  if (goalId === 'calm-skin' || skinType === 'Sensitive') {
    return {
      treatment: 'Dermaplaning + Barrier Calm (₦30,000)',
      routine: 'Fragrance-free hydrating wash, ceramide moisturizer, mineral sunscreen.',
      concern: 'Sensitive',
    };
  }
  return {
    treatment: 'Hydra Glow Facial (₦35,000)',
    routine: 'Hydrating enzyme wash, hyaluronic serum, lightweight moisturizer and SPF 50.',
    concern: 'Uneven Tone',
  };
}

export function SkinQuiz({ onBookFromQuiz }: SkinQuizProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedType, setSelectedType] = useState<SkinTypeChip>('Oily');
  const [quizOpen, setQuizOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGoal, setSelectedGoal] = useState(GOALS[0].id);
  const [routineStage, setRoutineStage] = useState(ROUTINE_STAGES[1]);
  const [whatsappInput, setWhatsappInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const recommendation = getQuizRecommendation(selectedType, selectedGoal);

  const handleStartQuiz = () => {
    setHasInteracted(true);
    setQuizOpen(true);
    setStep(1);
    setSubmitted(false);
    setPhoneError('');
  };

  const handleWhatsAppSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateNigerianPhone(whatsappInput)) {
      setPhoneError('Enter a valid Nigerian WhatsApp number (e.g. 0803 123 4567).');
      return;
    }
    setPhoneError('');
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setHasInteracted(true);
    setQuizOpen(false);
    setStep(1);
    setSubmitted(false);
    setWhatsappInput('');
    setPhoneError('');
  };

  return (
    <section id="skin-quiz" className="bg-[#EDE4D3] py-12 sm:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.62, ease: EASE_EDITORIAL }}
          className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#2B2118]/14 bg-[#FAF6EE] lg:grid-cols-2 lg:items-stretch"
        >
          {/* Left: Deep Espresso panel with scalloped flower portrait cutout */}
          <div className="relative flex min-h-[340px] items-center justify-center bg-[#2B2118] p-8 sm:min-h-[440px] sm:p-12">
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <clipPath id="glow-flower-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0.5,0.03 C0.61,0.03,0.68,0.12,0.77,0.1 C0.87,0.08,0.93,0.17,0.9,0.27 C0.88,0.36,0.97,0.43,0.97,0.53 C0.97,0.63,0.88,0.7,0.9,0.79 C0.93,0.89,0.84,0.95,0.74,0.92 C0.65,0.9,0.58,0.98,0.48,0.98 C0.38,0.98,0.31,0.89,0.22,0.91 C0.12,0.94,0.06,0.85,0.09,0.75 C0.11,0.66,0.03,0.59,0.03,0.49 C0.03,0.39,0.11,0.32,0.09,0.23 C0.06,0.13,0.15,0.07,0.25,0.1 C0.34,0.12,0.4,0.03,0.5,0.03 Z" />
                </clipPath>
              </defs>
            </svg>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={SECTION_VIEWPORT}
              transition={{ duration: 0.72, delay: 0.14, ease: EASE_EDITORIAL }}
              className="relative aspect-square w-full max-w-[340px]"
            >
              <motion.div
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.02, 1] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                }
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                className="relative h-full w-full overflow-hidden shadow-lg"
                style={{ clipPath: 'url(#glow-flower-clip)' }}
              >
                <EditorialImage
                  src={QUIZ_PORTRAIT.src}
                  alt={QUIZ_PORTRAIT.alt}
                  loading="lazy"
                  fallbackTitle="Know Your Skin"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SECTION_VIEWPORT}
              transition={{ duration: 0.48, delay: 0.32, ease: EASE_EDITORIAL }}
              className="absolute right-6 bottom-5 text-xs font-semibold tracking-wider text-[#D8C9AF] uppercase"
            >
              60-Second Check
            </motion.span>
          </div>

          {/* Right: Interactive Skin Type Selector + Animated 3-Step Quiz Flow */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <AnimatePresence mode="wait">
              {!quizOpen ? (
                <motion.div
                  key="quiz-intro"
                  variants={STAGGER_CONTAINER}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  animate={hasInteracted ? 'visible' : undefined}
                  whileInView={hasInteracted ? undefined : 'visible'}
                  viewport={SECTION_VIEWPORT}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                >
                  <motion.p
                    variants={STAGGER_ITEM}
                    className="text-xs font-semibold tracking-wider text-[#7A4B2E] uppercase"
                  >
                    Find Your Match
                  </motion.p>
                  <motion.h2
                    variants={STAGGER_ITEM}
                    className="font-display mt-2 text-[32px] leading-[1.08] font-semibold text-[#2B2118] sm:text-[42px]"
                  >
                    Your skin type is our specialty.
                  </motion.h2>
                  <motion.p variants={STAGGER_ITEM} className="mt-3 text-base text-[#6B5B4A]">
                    Not sure what your skin needs? Answer 3 quick questions, get a free routine. No guesswork.
                  </motion.p>

                  <motion.div
                    variants={STAGGER_ITEM}
                    className="mt-6"
                    role="group"
                    aria-label="Choose your skin type"
                  >
                    <p className="mb-3 text-xs font-semibold tracking-wide text-[#6B5B4A] uppercase">
                      Tap your skin type to start
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {SKIN_TYPES.map((type, idx) => {
                        const active = selectedType === type;
                        return (
                          <motion.button
                            key={type}
                            type="button"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={SECTION_VIEWPORT}
                            transition={{
                              duration: 0.4,
                              delay: 0.22 + idx * 0.045,
                              ease: EASE_EDITORIAL,
                            }}
                            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                            onClick={() => setSelectedType(type)}
                            aria-pressed={active}
                            className={`min-h-[42px] cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                              active
                                ? 'border-[#2B2118] bg-[#2B2118] text-[#F3EBDD] shadow-xs'
                                : 'border-[#2B2118]/20 bg-[#F3EBDD] text-[#2B2118] hover:border-[#2B2118]'
                            }`}
                          >
                            {type}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div variants={STAGGER_ITEM} className="mt-8">
                    <motion.button
                      type="button"
                      whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                      onClick={handleStartQuiz}
                      className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2B2118] px-7 py-3 text-sm font-semibold text-[#F3EBDD] transition-colors duration-150 hover:bg-[#41322A] sm:text-base whitespace-nowrap shrink-0"
                    >
                      Start My Free Quiz
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={`quiz-step-${step}-${submitted ? 'done' : 'open'}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between border-b border-[#2B2118]/12 pb-3">
                    <span className="tabular-nums text-xs font-semibold tracking-wider text-[#7A4B2E] uppercase">
                      {submitted ? 'Your Free Routine' : `Question ${Math.min(step, 3)} of 3`}
                    </span>
                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#6B5B4A] hover:text-[#2B2118]"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      Start over
                    </button>
                  </div>

                  {step === 1 && (
                    <div className="mt-5">
                      <h3 className="font-display text-2xl font-semibold text-[#2B2118]">
                        1. How does your skin feel by midday?
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {SKIN_TYPES.map((type) => (
                          <motion.button
                            key={type}
                            type="button"
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                            onClick={() => setSelectedType(type)}
                            className={`min-h-[42px] cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              selectedType === type
                                ? 'border-[#2B2118] bg-[#2B2118] text-[#F3EBDD]'
                                : 'border-[#2B2118]/20 bg-[#F3EBDD] text-[#2B2118] hover:border-[#2B2118]'
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                      <motion.button
                        type="button"
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        onClick={() => setStep(2)}
                        className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-[#2B2118] px-6 py-2.5 text-sm font-semibold text-[#F3EBDD] hover:bg-[#41322A]"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </motion.button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-5">
                      <h3 className="font-display text-2xl font-semibold text-[#2B2118]">
                        2. What do you want to fix first?
                      </h3>
                      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {GOALS.map((goal) => (
                          <motion.button
                            key={goal.id}
                            type="button"
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                            onClick={() => setSelectedGoal(goal.id)}
                            className={`min-h-[46px] cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                              selectedGoal === goal.id
                                ? 'border-[#7A4B2E] bg-[#EDE4D3] text-[#2B2118]'
                                : 'border-[#2B2118]/15 bg-[#F3EBDD]/60 text-[#2B2118] hover:border-[#2B2118]'
                            }`}
                          >
                            {goal.label}
                          </motion.button>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="min-h-[44px] cursor-pointer rounded-full border border-[#2B2118]/25 px-5 py-2 text-sm font-semibold text-[#2B2118]"
                        >
                          Back
                        </button>
                        <motion.button
                          type="button"
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                          onClick={() => setStep(3)}
                          className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-[#2B2118] px-6 py-2.5 text-sm font-semibold text-[#F3EBDD] hover:bg-[#41322A]"
                        >
                          Next
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mt-5">
                      <h3 className="font-display text-2xl font-semibold text-[#2B2118]">
                        3. What are you using right now?
                      </h3>
                      <div className="mt-4 flex flex-col gap-2.5">
                        {ROUTINE_STAGES.map((stage) => (
                          <motion.button
                            key={stage}
                            type="button"
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                            onClick={() => setRoutineStage(stage)}
                            className={`min-h-[46px] cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                              routineStage === stage
                                ? 'border-[#7A4B2E] bg-[#EDE4D3] text-[#2B2118]'
                                : 'border-[#2B2118]/15 bg-[#F3EBDD]/60 text-[#2B2118] hover:border-[#2B2118]'
                            }`}
                          >
                            {stage}
                          </motion.button>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="min-h-[44px] cursor-pointer rounded-full border border-[#2B2118]/25 px-5 py-2 text-sm font-semibold text-[#2B2118]"
                        >
                          Back
                        </button>
                        <motion.button
                          type="button"
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                          onClick={() => setStep(4)}
                          className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-[#7A4B2E] px-6 py-2.5 text-sm font-semibold text-[#F3EBDD] hover:bg-[#613A22]"
                        >
                          See My Routine
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {step === 4 && !submitted && (
                    <form onSubmit={handleWhatsAppSubmit} className="mt-5" noValidate>
                      <h3 className="font-display text-2xl font-semibold text-[#2B2118]">
                        Your skin match is ready.
                      </h3>
                      <div className="mt-3 rounded-2xl border border-[#2B2118]/15 bg-[#F3EBDD] p-4">
                        <p className="text-xs font-semibold text-[#7A4B2E] uppercase">
                          Recommended Treatment
                        </p>
                        <p className="mt-1 font-display text-lg font-semibold text-[#2B2118]">
                          {recommendation.treatment}
                        </p>
                        <p className="mt-1.5 text-sm text-[#6B5B4A]">
                          {recommendation.routine}
                        </p>
                      </div>

                      <label
                        htmlFor="quiz-whatsapp"
                        className="mt-4 block text-sm font-semibold text-[#2B2118]"
                      >
                        Where should we send your full 6-week routine? (WhatsApp Number)
                      </label>
                      <input
                        id="quiz-whatsapp"
                        type="tel"
                        value={whatsappInput}
                        onChange={(e) => setWhatsappInput(e.target.value)}
                        placeholder="e.g. 0803 123 4567"
                        className="mt-2 w-full rounded-xl border border-[#2B2118]/25 bg-white px-4 py-3 text-sm text-[#2B2118] placeholder:text-[#6B5B4A]/70 focus:border-[#7A4B2E] focus:outline-none"
                      />
                      {phoneError && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-[#7A4B2E]">
                          {phoneError}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                        className="mt-4 inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center rounded-full bg-[#2B2118] px-6 py-3 text-sm font-semibold text-[#F3EBDD] transition-colors hover:bg-[#41322A]"
                      >
                        Send My Free Routine on WhatsApp
                      </motion.button>
                    </form>
                  )}

                  {step === 4 && submitted && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="mt-5 rounded-2xl border border-[#2B2118]/15 bg-[#F3EBDD] p-5"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#7A4B2E]" aria-hidden="true" />
                        <div>
                          <h3 className="font-display text-xl font-semibold text-[#2B2118]">
                            Routine sent to your WhatsApp!
                          </h3>
                          <p className="mt-1.5 text-sm text-[#6B5B4A]">
                            We matched your {selectedType.toLowerCase()} skin with{' '}
                            <span className="font-semibold text-[#2B2118]">{recommendation.treatment}</span>. Want us to check your skin in person for free?
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => onBookFromQuiz(recommendation.concern)}
                          className="min-h-[44px] cursor-pointer rounded-full bg-[#2B2118] px-5 py-2.5 text-sm font-semibold text-[#F3EBDD] hover:bg-[#41322A]"
                        >
                          Book Free Consultation
                        </button>
                        <a
                          href={buildWhatsAppUrl(
                            `Hi Glow Lab, I took the skin quiz (${selectedType}) and want my free consultation.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center rounded-full border border-[#2B2118]/35 px-5 py-2.5 text-sm font-semibold text-[#2B2118] hover:bg-white"
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
