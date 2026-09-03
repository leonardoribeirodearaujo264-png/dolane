import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { InstagramIcon } from '@/components/ui/SocialIcons';
import { site } from '@/lib/site';

/**
 * A live look at the Instagram profile via Instagram's own /embed view.
 *
 * This needs no API token: the iframe renders the public profile preview
 * (avatar, follower count and the most recent posts). The whole section is
 * skipped unless a real Instagram URL is configured, and a follow button sits
 * beneath the frame so the section is still useful if the embed fails to load.
 */
export default function InstagramFeed() {
  const profileUrl = site.social.instagram;
  if (!profileUrl) return null;

  // The /embed view is what Instagram serves for inline profile previews.
  const embedUrl = `${profileUrl.replace(/\/$/, '')}/embed`;

  return (
    <section id="instagram" className="bg-sand py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Follow us"
          title="See our work on Instagram"
          intro="Before-and-afters, tips and a look behind the scenes — follow along and see the difference we make in real homes."
        />

        <Reveal className="mx-auto mt-14 max-w-md lg:mt-16">
          <div className="overflow-hidden rounded-[1.75rem] border border-forest-900/10 bg-white shadow-lift">
            <iframe
              src={embedUrl}
              title={`${site.name} on Instagram`}
              loading="lazy"
              scrolling="no"
              className="h-[540px] w-full border-0"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10 text-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-forest-900 px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-forest-800"
          >
            <InstagramIcon className="size-[1.15rem]" />
            Follow @dolanecleaning
          </a>
        </Reveal>
      </div>
    </section>
  );
}
