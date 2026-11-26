import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import {
  buildWhatsAppUrl,
  validateNigerianPhone,
  type SkinConcernOption,
} from '../data/clinicData';
import {
  EASE_EDITORIAL,
  SECTION_VIEWPORT,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from './SectionMotion';

interface BookingFormProps {
  preselectedConcern: SkinConcernOption;
  bookingNote: string;
}

const CONCERN_OPTIONS: SkinConcernOption[] = [
  'Acne',
  'Dark Spots',
  'Uneven Tone',
  'Sensitive',
  'Other',
];

function getTomorrowIsoDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function BookingForm({ preselectedConcern, bookingNote }: BookingFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [concern, setConcern] = useState<SkinConcernOption>(preselectedConcern);
  const [preferredDate, setPreferredDate] = useState(getTomorrowIsoDate());
  const [errors, setErrors] = useState<{
    fullName?: string;
    whatsapp?: string;
    preferredDate?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setConcern(preselectedConcern);
  }, [preselectedConcern]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: {
      fullName?: string;
      whatsapp?: string;
      preferredDate?: string;
    } = {};

    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!validateNigerianPhone(whatsapp)) {
      nextErrors.whatsapp =
        'Enter a valid Nigerian WhatsApp number (e.g. 0803 123 4567 or +234 803 123 4567).';
    }

    if (!preferredDate) {
      nextErrors.preferredDate = 'Please pick a preferred date.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const resetBooking = () => {
    setSubmitted(false);
    setFullName('');
    setWhatsapp('');
    setErrors({});
  };

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-[#F3EBDD] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[780px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.62, ease: EASE_EDITORIAL }}
          className="rounded-[28px] border border-[#2B2118]/14 bg-[#FAF6EE] p-6 shadow-sm sm:p-10 lg:p-12"
        >
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
              Lekki Phase 1 Clinic & Remote Consults
            </motion.p>
            <motion.h2
              variants={STAGGER_ITEM}
              className="font-display mt-2 text-[32px] leading-[1.08] font-semibold text-[#2B2118] sm:text-[44px]"
            >
              Book your free consultation.
            </motion.h2>
            <motion.p
              variants={STAGGER_ITEM}
              className="mx-auto mt-3 max-w-md text-base text-[#6B5B4A]"
            >
              Fill this out and we will message you on WhatsApp within 2 hours to confirm your time.
            </motion.p>
            {bookingNote && (
              <motion.p
                key={bookingNote}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm font-semibold text-[#7A4B2E]"
              >
                Selected: {bookingNote}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.5, delay: 0.14, ease: EASE_EDITORIAL }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="booking-form"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                  noValidate
                >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-sm font-semibold text-[#2B2118]"
                    >
                      Full Name
                    </label>
                    <input
                      id="booking-name"
                      name="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tolu Adeyemi"
                      className="mt-2 w-full rounded-xl border border-[#2B2118]/20 bg-[#EDE4D3]/40 px-4 py-3 text-sm text-[#2B2118] placeholder:text-[#6B5B4A]/70 transition-colors focus:border-[#7A4B2E] focus:bg-white focus:outline-none"
                    />
                    {errors.fullName && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#7A4B2E]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-whatsapp"
                      className="block text-sm font-semibold text-[#2B2118]"
                    >
                      WhatsApp Number
                    </label>
                    <input
                      id="booking-whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="e.g. 0803 123 4567"
                      className="mt-2 w-full rounded-xl border border-[#2B2118]/20 bg-[#EDE4D3]/40 px-4 py-3 text-sm text-[#2B2118] placeholder:text-[#6B5B4A]/70 transition-colors focus:border-[#7A4B2E] focus:bg-white focus:outline-none"
                    />
                    {errors.whatsapp && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#7A4B2E]">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-concern"
                      className="block text-sm font-semibold text-[#2B2118]"
                    >
                      Skin Concern
                    </label>
                    <select
                      id="booking-concern"
                      name="concern"
                      value={concern}
                      onChange={(e) => setConcern(e.target.value as SkinConcernOption)}
                      className="mt-2 w-full rounded-xl border border-[#2B2118]/20 bg-[#EDE4D3]/40 px-4 py-3 text-sm text-[#2B2118] transition-colors focus:border-[#7A4B2E] focus:bg-white focus:outline-none"
                    >
                      {CONCERN_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-sm font-semibold text-[#2B2118]"
                    >
                      Preferred Date
                    </label>
                    <div className="relative mt-2">
                      <input
                        id="booking-date"
                        name="preferredDate"
                        type="date"
                        min={getTomorrowIsoDate()}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-xl border border-[#2B2118]/20 bg-[#EDE4D3]/40 px-4 py-3 text-sm text-[#2B2118] transition-colors focus:border-[#7A4B2E] focus:bg-white focus:outline-none"
                      />
                    </div>
                    {errors.preferredDate && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#7A4B2E]">
                        {errors.preferredDate}
                      </p>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="mt-2 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center rounded-full bg-[#2B2118] px-8 py-3.5 text-base font-semibold text-[#F3EBDD] transition-colors duration-150 hover:bg-[#41322A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A4B2E]"
                >
                  Book My Free Spot
                </motion.button>

                <p className="text-center text-xs font-medium text-[#6B5B4A]">
                  No payment needed now. Free means free.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="booking-success"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 rounded-2xl border border-[#2B2118]/15 bg-[#EDE4D3]/60 p-6 text-center sm:p-8"
              >
                <CheckCircle2
                  className="mx-auto h-10 w-10 text-[#7A4B2E]"
                  aria-hidden="true"
                />
                <h3 className="font-display mt-3 text-2xl font-semibold text-[#2B2118]">
                  Done! Check your WhatsApp, we don message you.
                </h3>
                <p className="mt-2 text-sm text-[#6B5B4A]">
                  We reserved your consultation request for <span className="font-semibold text-[#2B2118]">{concern}</span> on{' '}
                  <span className="tabular-nums font-semibold text-[#2B2118]">{preferredDate}</span> at 14 Admiralty Way, Lekki Phase 1.
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <motion.a
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    href={buildWhatsAppUrl(
                      `Hi Glow Lab, my name is ${fullName}. I just booked my free consultation for ${concern} on ${preferredDate}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#2B2118] px-6 py-2.5 text-sm font-semibold text-[#F3EBDD] transition-colors hover:bg-[#41322A]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Message Us Now on WhatsApp
                  </motion.a>
                  <button
                    type="button"
                    onClick={resetBooking}
                    className="inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-full border border-[#2B2118]/35 px-5 py-2.5 text-sm font-semibold text-[#2B2118] hover:bg-white"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    Book Another Slot
                  </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
