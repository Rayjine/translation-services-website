import { useTranslation } from 'react-i18next';

import celiaBrodardImg from '../../assets/images/team/celia_brodard.webp';
import celiaBrodardThumb from '../../assets/images/team/celia_brodard-thumb.webp';
import markusBrunnerImg from '../../assets/images/team/markus_brunner.webp';
import markusBrunnerThumb from '../../assets/images/team/markus_brunner-thumb.webp';
import alessandraContiImg from '../../assets/images/team/alessandra_conti.webp';
import alessandraContiThumb from '../../assets/images/team/alessandra_conti-thumb.webp';
import claudioCereghettiImg from '../../assets/images/team/claudio_cereghetti.webp';
import claudioCereghettiThumb from '../../assets/images/team/claudio_cereghetti-thumb.webp';
import robertAinsworthImg from '../../assets/images/team/robert_ainsworth.webp';
import robertAinsworthThumb from '../../assets/images/team/robert_ainsworth-thumb.webp';
import olenaKovalenkoImg from '../../assets/images/team/olena_kovalenko.webp';
import olenaKovalenkoThumb from '../../assets/images/team/olena_kovalenko-thumb.webp';
import inesFerreiraImg from '../../assets/images/team/ines_ferreira.webp';
import inesFerreiraThumb from '../../assets/images/team/ines_ferreira-thumb.webp';
import jianChenImg from '../../assets/images/team/jian_chen.webp';
import jianChenThumb from '../../assets/images/team/jian_chen-thumb.webp';
import emikoShimizuImg from '../../assets/images/team/emiko_shimizu.webp';
import emikoShimizuThumb from '../../assets/images/team/emiko_shimizu-thumb.webp';
import salehAlOtaibiImg from '../../assets/images/team/saleh_al-otaibi.webp';
import salehAlOtaibiThumb from '../../assets/images/team/saleh_al-otaibi-thumb.webp';

// Same order as `team.members` in the locale files. `ogham` is the Latin first name,
// carved decoratively on the portrait (names may be transliterated in some locales).
const PORTRAITS = [
  { image: celiaBrodardImg, thumb: celiaBrodardThumb, ogham: 'Celine' },
  { image: markusBrunnerImg, thumb: markusBrunnerThumb, ogham: 'Markus' },
  { image: inesFerreiraImg, thumb: inesFerreiraThumb, ogham: 'Ines' },
  { image: jianChenImg, thumb: jianChenThumb, ogham: 'Jian' },
  { image: alessandraContiImg, thumb: alessandraContiThumb, ogham: 'Alessandra' },
  { image: emikoShimizuImg, thumb: emikoShimizuThumb, ogham: 'Emiko' },
  { image: olenaKovalenkoImg, thumb: olenaKovalenkoThumb, ogham: 'Olena' },
  { image: robertAinsworthImg, thumb: robertAinsworthThumb, ogham: 'Robert' },
  { image: claudioCereghettiImg, thumb: claudioCereghettiThumb, ogham: 'Claudio' },
  { image: salehAlOtaibiImg, thumb: salehAlOtaibiThumb, ogham: 'Saleh' },
];

// "Degree – Institution; Degree – Institution" → [{ degree, place }]
// Handles Latin, CJK and Arabic semicolons. The institution follows the first en/em dash
// (even unspaced: "Communication– University"), so "Lisans - Dilbilim – Lizbon …" keeps
// "Lisans - Dilbilim" as the degree. Without one, a spaced hyphen separates (zh); a bare
// hyphen ("Al-Otaibi") never does.
export const splitEducation = (education = '') =>
  education
    .split(/[;；؛]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const separator = /[–—]/.test(part) ? /\s*[–—]\s*/ : /\s-\s/;
      const at = part.search(separator);
      if (at < 0) return { degree: part, place: '' };
      const [sep] = part.slice(at).match(separator);
      return { degree: part.slice(0, at).trim(), place: part.slice(at + sep.length).trim() };
    });

/** Team members from translations, enriched with portraits; plus the union of their languages. */
const useTeamMembers = () => {
  const { t } = useTranslation();
  const raw = t('team.members', { returnObjects: true });
  const members = (Array.isArray(raw) ? raw : []).map((member, index) => ({
    ...member,
    languages: Array.isArray(member.languages) ? member.languages : [],
    specialties: Array.isArray(member.specialties) ? member.specialties : [],
    image: PORTRAITS[index]?.image,
    thumb: PORTRAITS[index]?.thumb,
    ogham: PORTRAITS[index]?.ogham ?? '',
  }));
  const languages = [...new Set(members.flatMap((m) => m.languages))];
  return { members, languages };
};

export default useTeamMembers;
