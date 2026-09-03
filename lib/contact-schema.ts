import { z } from 'zod';

const trimmed = (max: number) => z.string().trim().max(max);

/**
 * The short message left through the on-site chat widget. Deliberately lighter
 * than the full quote form — just enough for us to reply. Shared by the client
 * widget and the API route so both enforce the same rules.
 */
export const contactSchema = z.object({
  name: trimmed(120).min(2, 'Please enter your name.'),

  // One reachable channel — a phone number or an email — is required.
  contact: trimmed(160)
    .min(5, 'Add a phone number or email so we can reply.')
    .refine(
      (value) =>
        /\S+@\S+\.\S+/.test(value) || (value.match(/\d/g) ?? []).length >= 7,
      { message: 'Enter a valid phone number or email.' },
    ),

  message: trimmed(1500).min(2, 'Let us know how we can help.'),

  // Anti-spam, mirroring the quote form: a hidden honeypot and a time trap.
  company: trimmed(200).optional().or(z.literal('')),
  startedAt: z.number().int().nonnegative().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
