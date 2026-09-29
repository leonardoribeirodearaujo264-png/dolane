-- ===========================================================================
-- Dolane Cleaning — add offer/consent columns to the leads table.
--
-- Run this ONCE in the Supabase dashboard (SQL Editor → New query → Run).
-- Until it runs, leads still save (the site drops these three fields on the
-- retry) and the coupon + consent are still shown in the notification email —
-- but they will not be queryable in the table. Run it so they are stored too.
-- ===========================================================================

alter table public.leads
  add column if not exists coupon_code       text,
  add column if not exists sms_email_consent boolean,
  add column if not exists consent_at        timestamptz;
