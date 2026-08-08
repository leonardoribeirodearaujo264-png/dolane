/**
 * Trust signals and differentiators.
 *
 * Every claim here was confirmed by the owners. Deliberately absent, because
 * they are not currently true: "Licensed", "BBB Accredited", background-check
 * claims, satisfaction guarantees, and any client/satisfaction counts.
 */
import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  CalendarClock,
  HandHeart,
  Heart,
  Languages,
  Leaf,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

export type Badge = { label: string; icon: LucideIcon };

/** Compact seals for the bar under the hero. */
export const trustBadges: Badge[] = [
  { label: 'Fully Insured', icon: ShieldCheck },
  { label: 'Family-Owned & Operated', icon: Users },
  { label: '7+ Years of Experience', icon: BadgeCheck },
  { label: 'Ohio Registered Business', icon: Leaf },
  { label: "Workers' Compensation Coverage", icon: HandHeart },
  { label: 'Pet Friendly', icon: PawPrint },
  { label: 'Hypoallergenic Options Available', icon: Sparkles },
  { label: 'Personalized Cleaning Services', icon: Heart },
];

/** The four figures we can state honestly — no invented client counts. */
export const stats = [
  { value: '7+', label: 'Years of Experience' },
  { value: 'Family', label: 'Owned & Operated' },
  { value: 'Fully', label: 'Insured' },
  { value: '3', label: 'Languages Spoken' },
] as const;

export const whyChooseUs: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: 'A Family You Can Trust',
    body: 'We are a husband-and-wife team. When you book with us, you know exactly who is coming into your home.',
    icon: Users,
  },
  {
    title: 'Fully Insured',
    body: "We carry commercial general liability and Ohio workers' compensation coverage. Certificates are available to clients on request.",
    icon: ShieldCheck,
  },
  {
    title: 'Attention to Detail',
    body: 'More than seven years of hands-on experience shows up in the details most people never think to ask for.',
    icon: Sparkles,
  },
  {
    title: 'Flexible Scheduling',
    body: 'Weekly, biweekly, monthly or one-time. We build the schedule around your routine, not ours.',
    icon: CalendarClock,
  },
  {
    title: 'Pet Friendly & Gentle Products',
    body: 'We are happy to work in homes with pets, and hypoallergenic or fragrance-free options are available on request.',
    icon: PawPrint,
  },
  {
    title: 'We Speak Your Language',
    body: 'English, Portuguese and Spanish. Ask your questions in whichever one feels most comfortable.',
    icon: Languages,
  },
];

export const values = [
  {
    title: 'Trust',
    body: "We respect our clients' homes, privacy and the trust they place in us.",
  },
  {
    title: 'Care',
    body: 'We treat every home with attention, responsibility and genuine care.',
  },
  {
    title: 'Excellence',
    body: 'We strive to provide consistent, detailed and high-quality service at every visit.',
  },
] as const;

export const mission =
  'To provide clean, comfortable and well-cared-for spaces through reliable, detailed and personalized cleaning services while treating every home with respect and care.';
