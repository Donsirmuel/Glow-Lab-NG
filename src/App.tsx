import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TreatmentsCarousel } from './components/TreatmentsCarousel';
import { SkinQuiz } from './components/SkinQuiz';
import { PromoBanner } from './components/PromoBanner';
import { Bestsellers } from './components/Bestsellers';
import { Testimonials } from './components/Testimonials';
import { GlowClub } from './components/GlowClub';
import { FaqSection } from './components/FaqSection';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import type { SkinConcernOption } from './data/clinicData';

export default function App() {
  const [preselectedConcern, setPreselectedConcern] = useState<SkinConcernOption>('Acne');
  const [bookingNote, setBookingNote] = useState<string>('');

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const ogImageUrl = `${window.location.origin}/og-image.jpg`;

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.href = canonicalUrl;

    const ogUrlEl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.content = canonicalUrl;

    const ogImageEl = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImageEl) ogImageEl.content = ogImageUrl;

    const ogSecureEl = document.querySelector<HTMLMetaElement>('meta[property="og:image:secure_url"]');
    if (ogSecureEl) ogSecureEl.content = ogImageUrl;

    const twImageEl = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    if (twImageEl) twImageEl.content = ogImageUrl;
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookConsultation = () => {
    setBookingNote('');
    scrollToSection('booking');
  };

  const handleSelectTreatment = (concern: SkinConcernOption, treatmentName: string) => {
    setPreselectedConcern(concern);
    setBookingNote(treatmentName);
    scrollToSection('booking');
  };

  const handleClaimPromo = () => {
    setBookingNote('20% Off First Treatment (Ends Sunday)');
    scrollToSection('booking');
  };

  const handleJoinGlowClub = () => {
    setPreselectedConcern('Uneven Tone');
    setBookingNote('Glow Club Monthly (₦89,000/mo)');
    scrollToSection('booking');
  };

  const handleBookFromQuiz = (
    recommendedConcern: 'Acne' | 'Dark Spots' | 'Uneven Tone' | 'Sensitive'
  ) => {
    setPreselectedConcern(recommendedConcern);
    setBookingNote(`Skin Quiz Match (${recommendedConcern})`);
    scrollToSection('booking');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#EDE4D3] text-[#2B2118]">
        {/* Section 1: Sticky Header */}
        <Header onBookClick={handleBookConsultation} />

        <main>
          {/* Section 2: Hero */}
          <Hero
            onBookClick={handleBookConsultation}
            onQuizClick={() => scrollToSection('skin-quiz')}
          />

          {/* Section 3: Treatments Carousel */}
          <TreatmentsCarousel onSelectTreatment={handleSelectTreatment} />

          {/* Section 4: Skin Quiz - Lead Magnet */}
          <SkinQuiz onBookFromQuiz={handleBookFromQuiz} />

          {/* Section 5: Promo Banner */}
          <PromoBanner onClaimPromo={handleClaimPromo} />

          {/* Section 6: Bestselling Treatments */}
          <Bestsellers
            onBookTreatment={handleSelectTreatment}
            onBookConsultation={handleBookConsultation}
          />

          {/* Section 7: Testimonials - Dark Section */}
          <Testimonials />

          {/* Section 8: Membership - Glow Club */}
          <GlowClub onJoinGlowClub={handleJoinGlowClub} />

          {/* Section 9: FAQ Accordion */}
          <FaqSection />

          {/* Section 10: Final Booking Form */}
          <BookingForm
            preselectedConcern={preselectedConcern}
            bookingNote={bookingNote}
          />
        </main>

        {/* Section 11: Footer */}
        <Footer />

        {/* Mobile & Desktop Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
