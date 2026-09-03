import { z } from 'zod';

import { additionalServices, frequencyOptions, quoteServiceOptions } from '@/content/services';

export const petOptions = ['No pets', 'Dog(s)', 'Cat(s)', 'Both', 'Other'] as const;

export const lastCleanedOptions = [
  'Never professionally cleaned',
  'Within the last month',
  '1–3 months ago',
  '3–6 months ago',
  'More than 6 months ago',
  "I'm not sure",
] as const;

const trimmed = (max: number) => z.string().trim().max(max);

/**
 * Shared by the client form and the API route, so the browser and the server
 * enforce exactly the same rules.
 */
export const quoteSchema = z.object({
  fullName: trimmed(120).min(2, 'Please enter your full name.'),

  phone: trimmed(32)
    .min(7, 'Please enter a phone number we can reach you on.')
    // Permissive on formatting, strict on having enough digits to be real.
    .refine((value) => (value.match(/\d/g) ?? []).length >= 10, {
      message: 'Please enter a valid 10-digit phone number.',
    }),

  email: trimmed(160).email('Please enter a valid email address.'),

  // Optional: ZIP is enough to locate the visitor, so city never blocks a lead.
  city: trimmed(80).optional().or(z.literal('')),

  zip: trimmed(12)
    .min(5, 'Please enter your ZIP code.')
    .refine((value) => /^\d{5}(-\d{4})?$/.test(value), {
      message: 'Please enter a valid US ZIP code.',
    }),

  serviceType: z.enum(quoteServiceOptions as unknown as [string, ...string[]], {
    message: 'Please choose the type of cleaning you need.',
  }),

  // Optional: a detail we can confirm later, so it never blocks a lead.
  frequency: z
    .enum(frequencyOptions as unknown as [string, ...string[]])
    .optional()
    .or(z.literal('')),

  bedrooms: trimmed(12).optional().or(z.literal('')),
  bathrooms: trimmed(12).optional().or(z.literal('')),
  squareFeet: trimmed(16).optional().or(z.literal('')),
  preferredDate: trimmed(24).optional().or(z.literal('')),

  pets: z.enum(petOptions as unknown as [string, ...string[]]).optional().or(z.literal('')),
  lastCleaned: z
    .enum(lastCleanedOptions as unknown as [string, ...string[]])
    .optional()
    .or(z.literal('')),

  addOns: z
    .array(z.enum(additionalServices as unknown as [string, ...string[]]))
    .max(additionalServices.length)
    .optional()
    .default([]),

  homeCondition: trimmed(1500).optional().or(z.literal('')),
  specialRequests: trimmed(1500).optional().or(z.literal('')),

  /**
   * Anti-spam. `company` is a hidden honeypot a human never sees, and
   * `startedAt` lets the server reject submissions completed impossibly fast.
   *
   * The honeypot deliberately accepts any value here: the API route inspects it
   * and answers 200 so the bot believes it succeeded and stops retrying.
   * Failing validation instead would tell the bot exactly which field gave it
   * away.
   */
  company: trimmed(200).optional().or(z.literal('')),
  startedAt: z.number().int().nonnegative().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const quoteFieldLabels: Record<string, string> = {
  fullName: 'Full name',
  phone: 'Phone',
  email: 'Email',
  city: 'City',
  zip: 'ZIP code',
  serviceType: 'Type of cleaning',
  frequency: 'Frequency',
  bedrooms: 'Bedrooms',
  bathrooms: 'Bathrooms',
  squareFeet: 'Approx. square footage',
  preferredDate: 'Preferred date',
  pets: 'Pets',
  lastCleaned: 'Last professionally cleaned',
  addOns: 'Additional services',
  homeCondition: 'Current condition',
  specialRequests: 'Special requests',
};
