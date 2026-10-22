import { useTranslation } from 'react-i18next';
import LegalDocument from '../components/legal/LegalDocument';

// [section id, translation group, clause keys]. Clause strings carry their own
// "3.1. <strong>…</strong>" numbering and inline markup.
const CLAUSES = [
  ['ordering', 'ordering', ['quotes', 'confirmation', 'delivery', 'format']],
  ['payment', 'payment', ['pricing', 'terms', 'latePayment']],
  ['revisions', 'revisions', ['guarantee', 'scope', 'refund']],
  ['confidentiality', 'confidentiality', ['confidentiality', 'dataProtection', 'security']],
  ['intellectual-property', 'intellectual', ['ownership', 'memory', 'reference']],
  ['liability', 'liability', ['service', 'content', 'timeSensitive']],
  ['termination', 'termination', ['byClient', 'byCompany']],
  ['governing-law', 'governing', ['law', 'resolution']],
];

const Terms = () => {
  const { t, i18n } = useTranslation();
  const c = (key) => `terms.content.${key}`;
  // Some clauses are not translated yet; skip them instead of printing raw keys.
  const clause = (key) => (i18n.exists(c(key)) ? [{ type: 'p', html: true, text: t(c(key)) }] : []);

  const sections = [
    {
      id: 'introduction',
      title: t(c('intro.title')),
      blocks: [
        { type: 'p', text: t(c('intro.welcome')) },
        { type: 'p', text: t(c('intro.agreement')) },
      ],
    },
    {
      id: 'services',
      title: t(c('services.title')),
      blocks: [
        { type: 'p', text: t(c('services.description')) },
        { type: 'p', text: t(c('services.translators')) },
      ],
    },
    ...CLAUSES.map(([id, group, keys]) => ({
      id,
      title: t(c(`${group}.title`)),
      blocks: keys.flatMap((key) => clause(`${group}.${key}`)),
    })),
    {
      id: 'modifications',
      title: t(c('modifications.title')),
      blocks: [{ type: 'p', text: t(c('modifications.description')) }],
    },
    {
      id: 'contact',
      title: t(c('contact.title')),
      blocks: [
        {
          type: 'contact',
          description: t(c('contact.description')),
          emailLabel: t(c('contact.email')).replace(/[:：]\s*$/, ''),
          email: t(c('contact.emailAddress')),
        },
      ],
    },
  ];

  return (
    <LegalDocument
      title={t('terms.pageTitle')}
      ogham="Terms"
      updatedLabel={t('terms.lastUpdated')}
      date={t('terms.date')}
      homeLabel={t('terms.breadcrumbs.home')}
      currentLabel={t('terms.breadcrumbs.terms')}
      sections={sections}
    />
  );
};

export default Terms;
