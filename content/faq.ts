/**
 * FAQ answers as written/approved by the owners.
 *
 * Not published yet, on the owners' instruction: the cancellation /
 * rescheduling policy and any satisfaction guarantee. Add them here once the
 * rules are formally established — they will flow into the page and the FAQPage
 * structured data automatically.
 */
export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: 'How does the quote process work?',
    answer:
      'Every home is different. Our quotes are personalized based on the size of the property, current condition, type of cleaning, frequency and any additional services requested. Estimates are free with no obligation.',
  },
  {
    question: 'Do you bring your own cleaning products and equipment?',
    answer:
      'Yes. We bring the cleaning products and equipment needed to perform the service. Hypoallergenic and fragrance-free options may also be available upon request.',
  },
  {
    question: 'Do I need to be home during the cleaning?',
    answer:
      'No. You do not need to be home during the cleaning. Clients may provide appropriate access instructions when necessary.',
  },
  {
    question: 'How many people will clean my home?',
    answer:
      'The number of cleaning professionals depends on the size and needs of the job. Most residential cleanings are completed by a two-person team.',
  },
  {
    question: 'How long does cleaning take?',
    answer:
      'Cleaning time varies depending on the size and condition of the home, the type of service and any additional services requested.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We currently accept Zelle, check and cash.',
  },
  {
    question: 'Are you pet friendly?',
    answer:
      'Yes. We are happy to work in homes with pets. Please let us know about your pets when requesting your quote so we can provide the best possible experience.',
  },
  {
    question: 'Do you work on weekends?',
    answer:
      'Saturday appointments may be available depending on our schedule. Please contact us to check availability.',
  },
  {
    question: 'Do you clean carpets?',
    answer:
      'We do not offer professional carpet shampooing. Carpet vacuuming is included as part of the cleaning where applicable.',
  },
  {
    question: 'Are you insured?',
    answer:
      "Yes. Dolane Cleaning Services carries commercial general liability insurance and Ohio workers' compensation coverage. Certificates of insurance can be provided to clients on request.",
  },
];
