import heroPortrait0 from '../assets/images/hero_portrait_0.jpg';
import heroPortrait1 from '../assets/images/hero_portrait_1.jpg';
import heroPortrait2 from '../assets/images/hero_portrait_2.jpg';
import heroPortrait3 from '../assets/images/hero_portrait_3.jpg';
import heroPortrait4 from '../assets/images/hero_portrait_4.jpg';
import treatmentDermaplaningImg from '../assets/images/1795611754357.jpg';
import treatmentPeelImg from '../assets/images/1795611760632.jpg';
import treatmentHydraImg from '../assets/images/1795611766795.jpg';
import treatmentHyperImg from '../assets/images/1795611773360.jpg';
import treatmentAcneImg from '../assets/images/1795611779225.jpg';
import treatmentComboImg from '../assets/images/1795611785184.jpg';
import quizPortraitImg from '../assets/images/quiz_portrait_opt.jpg';
import glowClubImg from '../assets/images/glow_club_opt.jpg';

export const WHATSAPP_BASE_URL = 'https://wa.me/2348012345678';
export const DEFAULT_WHATSAPP_MESSAGE = 'Hi Glow Lab, I want to book my free consultation';

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || DEFAULT_WHATSAPP_MESSAGE);
  return `${WHATSAPP_BASE_URL}?text=${text}`;
}

export function validateNigerianPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s\-()]/g, '');
  return /^(?:0[789][01]\d{8}|(?:\+?234)[789][01]\d{8})$/.test(cleaned);
}

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  tone: string;
  anchor: [number, number];
  chest: [number, number];
  title: string;
  note: string;
  vesselLabel: string;
}

export const HERO_PORTRAIT_DIMS = {
  width: 1376,
  height: 768,
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'acne-clear',
    src: heroPortrait0,
    alt: 'Woman with deep rich skin tone after Acne Clear facial care',
    tone: '#4a2e22',
    anchor: [900, 262],
    chest: [840, 615],
    title: 'Acne Clear',
    note: 'calms breakouts, spares your barrier',
    vesselLabel: 'acne clear',
  },
  {
    id: 'pigment-fix',
    src: heroPortrait1,
    alt: 'Woman with warm brown skin tone and balanced clarity after Hyperpigmentation Fix',
    tone: '#6a4230',
    anchor: [755, 282],
    chest: [880, 615],
    title: 'Pigment Fix',
    note: 'fades post-acne marks steadily',
    vesselLabel: 'pigment fix',
  },
  {
    id: 'hydra-glow',
    src: heroPortrait2,
    alt: 'Woman with golden brown complexion glowing cleanly after Hydra Glow Facial',
    tone: '#a9754f',
    anchor: [818, 234],
    chest: [915, 615],
    title: 'Hydra Glow',
    note: 'clears clogged pores in 45 mins',
    vesselLabel: 'hydra glow',
  },
  {
    id: 'gentle-peel',
    src: heroPortrait3,
    alt: 'Woman with warm olive skin tone showing smooth texture after Gentle Peel',
    tone: '#b98a62',
    anchor: [865, 250],
    chest: [975, 615],
    title: 'Gentle Peel',
    note: 'softens rough texture and scars',
    vesselLabel: 'gentle peel',
  },
  {
    id: 'barrier-calm',
    src: heroPortrait4,
    alt: 'Woman with fair complexion and calm, even skin after Barrier Calm treatment',
    tone: '#d9a98a',
    anchor: [808, 247],
    chest: [870, 615],
    title: 'Barrier Calm',
    note: 'steadies tight, reactive skin',
    vesselLabel: 'barrier calm',
  },
];

// Interleaved skin-tone showcase order
export const HERO_DISPLAY_ORDER = [0, 3, 1, 4, 2];

export interface TreatmentItem {
  id: string;
  name: string;
  price: string;
  benefit: string;
  concernMatch: SkinConcernOption;
  image: string;
  alt: string;
}

export type SkinConcernOption = 'Acne' | 'Dark Spots' | 'Uneven Tone' | 'Sensitive' | 'Other';

export const TREATMENTS: TreatmentItem[] = [
  {
    id: 'acne-clear',
    name: 'Acne Clear Treatment',
    price: 'From ₦45,000',
    benefit: 'For breakouts & oil',
    concernMatch: 'Acne',
    image: treatmentAcneImg,
    alt: 'Aesthetician in Lagos clinic applying calming acne gel to a client cheek',
  },
  {
    id: 'hyperpigmentation-fix',
    name: 'Hyperpigmentation Fix',
    price: 'From ₦55,000',
    benefit: 'For dark spots & uneven tone',
    concernMatch: 'Dark Spots',
    image: treatmentHyperImg,
    alt: 'Aesthetician using a glass dropper to apply brightening serum to dark spots on a client cheek',
  },
  {
    id: 'hydra-glow-facial',
    name: 'Hydra Glow Facial',
    price: 'From ₦35,000',
    benefit: 'For dull, tired skin',
    concernMatch: 'Uneven Tone',
    image: treatmentHydraImg,
    alt: 'Hydro-dermabrasion facial session inside our Lekki skincare room',
  },
  {
    id: 'chemical-peel',
    name: 'Chemical Peel',
    price: 'From ₦60,000',
    benefit: 'For texture & scars',
    concernMatch: 'Dark Spots',
    image: treatmentPeelImg,
    alt: 'Skincare specialist brushing a gentle facial peel onto a client face',
  },
  {
    id: 'dermaplaning',
    name: 'Dermaplaning',
    price: 'From ₦30,000',
    benefit: 'For smooth, soft skin',
    concernMatch: 'Sensitive',
    image: treatmentDermaplaningImg,
    alt: 'Aesthetician performing gentle facial dermaplaning along a client cheek',
  },
];

export interface BestsellerItem {
  id: string;
  name: string;
  price: string;
  rating: string;
  reviewCount: string;
  concernMatch: SkinConcernOption;
  image: string;
  alt: string;
}

export const BESTSELLERS: BestsellerItem[] = [
  {
    id: 'best-hydra',
    name: 'Hydra Glow Facial',
    price: '₦45,000',
    rating: '4.9',
    reviewCount: '312 reviews',
    concernMatch: 'Uneven Tone',
    image: treatmentHydraImg,
    alt: 'Hydra Glow Facial treatment at Glow Lab NG Lekki',
  },
  {
    id: 'best-acne',
    name: 'Acne Clear',
    price: '₦45,000',
    rating: '4.8',
    reviewCount: '268 reviews',
    concernMatch: 'Acne',
    image: treatmentAcneImg,
    alt: 'Acne Clear facial treatment for breakouts and oil control',
  },
  {
    id: 'best-hyper',
    name: 'Hyperpigmentation Fix',
    price: '₦55,000',
    rating: '4.9',
    reviewCount: '198 reviews',
    concernMatch: 'Dark Spots',
    image: treatmentHyperImg,
    alt: 'Hyperpigmentation Fix for stubborn dark spots across all skin tones',
  },
  {
    id: 'best-combo',
    name: 'Glow Facial + Peel Combo',
    price: '₦85,000',
    rating: '5.0',
    reviewCount: '156 reviews',
    concernMatch: 'Dark Spots',
    image: treatmentComboImg,
    alt: 'Glow Facial and gentle Chemical Peel combo session',
  },
];

export const QUIZ_PORTRAIT = {
  src: quizPortraitImg,
  alt: 'Candid photo of a woman laughing naturally with healthy glowing skin',
};

export const GLOW_CLUB_IMAGE = {
  src: glowClubImg,
  alt: 'Client relaxing during a monthly facial session inside the Glow Lab NG Lekki studio',
};

export type SkinTypeChip = 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Acne-Prone';

export const SKIN_TYPES: SkinTypeChip[] = [
  'Oily',
  'Dry',
  'Combination',
  'Sensitive',
  'Acne-Prone',
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  age: number;
  area: string;
  treatment: string;
  stars: number;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'chiamaka',
    quote:
      'I spent so much money on random creams last year and nothing worked. Six weeks into my Acne Clear sessions here, my cheeks finally calmed down and I can go out without concealer.',
    author: 'Chiamaka',
    age: 22,
    area: 'Yaba',
    treatment: 'Acne Clear Treatment',
    stars: 5,
  },
  {
    id: 'tobi',
    quote:
      'What I appreciated most is that they checked my skin first instead of pushing extra products. They showed me what was irritating my face, and my dark spots have faded properly since.',
    author: 'Tobi',
    age: 31,
    area: 'Ikeja',
    treatment: 'Hyperpigmentation Fix',
    stars: 5,
  },
  {
    id: 'amara',
    quote:
      'I just wanted even, healthy skin without anything harsh or bleaching. My face feels softer, my tone looks balanced, and even my sister asked what I have been using.',
    author: 'Amara',
    age: 37,
    area: 'Lekki',
    treatment: 'Hydra Glow Facial',
    stars: 5,
  },
];

export const GLOW_CLUB_PERKS = [
  '2 facials per month',
  '1 free consultation',
  '10% off all products',
  'Priority booking on WhatsApp',
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Will it bleach my skin?',
    answer: 'No. We don\'t do bleaching. We work with your natural tone to even it out.',
  },
  {
    question: 'How long before I see results?',
    answer: 'Most people see change in 3-4 weeks, full results in 6-8 weeks.',
  },
  {
    question: 'Is it safe for sensitive skin and all skin tones?',
    answer:
      'Yes. Every treatment is calibrated for sensitive, light, olive, and melanin-rich skin without harsh bleaching agents.',
  },
  {
    question: 'What do I need to bring?',
    answer: 'Just yourself. We do full skin analysis on your first visit.',
  },
];
