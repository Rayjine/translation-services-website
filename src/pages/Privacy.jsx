import { useTranslation } from 'react-i18next';
import LegalDocument from '../components/legal/LegalDocument';

const Privacy = () => {
  const { t } = useTranslation();
  const c = (key) => `privacy.content.${key}`;
  const list = (key, extra = {}) => ({ type: 'list', items: t(c(key), { returnObjects: true }), ...extra });
  const subsection = (key) => [
    { type: 'h3', text: t(c(`${key}.title`)) },
    { type: 'p', text: t(c(`${key}.description`)) },
  ];

  const sections = [
    {
      id: 'introduction',
      title: t(c('intro.title')),
      blocks: [
        { type: 'p', text: t(c('intro.description1')) },
        { type: 'p', text: t(c('intro.description2')) },
      ],
    },
    {
      id: 'information-we-collect',
      title: t(c('collect.title')),
      blocks: [
        { type: 'h3', text: t(c('collect.personal.title')) },
        { type: 'p', text: t(c('collect.personal.intro')) },
        list('collect.personal.list'),
        { type: 'p', text: t(c('collect.personal.details')) },
        { type: 'h3', text: t(c('collect.nonPersonal.title')) },
        { type: 'p', text: t(c('collect.nonPersonal.intro')) },
        list('collect.nonPersonal.list', { columns: true }),
        ...subsection('collect.translation'),
      ],
    },
    {
      id: 'how-we-use-information',
      title: t(c('usage.title')),
      blocks: [
        { type: 'p', text: t(c('usage.intro')) },
        list('usage.list'),
      ],
    },
    {
      id: 'sharing',
      title: t(c('sharing.title')),
      blocks: [
        { type: 'p', text: t(c('sharing.intro')) },
        ...subsection('sharing.providers'),
        ...subsection('sharing.transfers'),
        ...subsection('sharing.legal'),
        ...subsection('sharing.consent'),
      ],
    },
    {
      id: 'data-security',
      title: t(c('security.title')),
      blocks: [
        { type: 'p', text: t(c('security.measures')) },
        { type: 'p', text: t(c('security.confidentiality')) },
      ],
    },
    {
      id: 'data-retention',
      title: t(c('retention.title')),
      blocks: [
        { type: 'p', text: t(c('retention.period')) },
        { type: 'p', text: t(c('retention.translation')) },
      ],
    },
    {
      id: 'your-rights',
      title: t(c('rights.title')),
      blocks: [
        { type: 'p', text: t(c('rights.intro')) },
        list('rights.list', { variant: 'cards' }),
        { type: 'p', text: t(c('rights.exercise')) },
      ],
    },
    {
      id: 'cookies',
      title: t(c('cookies.title')),
      blocks: [
        { type: 'p', text: t(c('cookies.description')) },
        { type: 'p', text: t(c('cookies.types')) },
        list('cookies.list', { variant: 'stack', html: true }),
        { type: 'p', text: t(c('cookies.management')) },
      ],
    },
    {
      id: 'third-party-websites',
      title: t(c('thirdParty.title')),
      blocks: [{ type: 'p', text: t(c('thirdParty.description')) }],
    },
    {
      id: 'childrens-privacy',
      title: t(c('children.title')),
      blocks: [{ type: 'p', text: t(c('children.description')) }],
    },
    {
      id: 'changes',
      title: t(c('changes.title')),
      blocks: [{ type: 'p', text: t(c('changes.description')) }],
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
      title={t('privacy.pageTitle')}
      ogham="Privacy"
      updatedLabel={t('privacy.lastUpdated')}
      date={t('terms.date')}
      homeLabel={t('terms.breadcrumbs.home')}
      sections={sections}
    />
  );
};

export default Privacy;
