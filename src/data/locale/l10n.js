import LocalizedStrings from 'react-localization';
import { id } from './language/id';
import { en } from './language/en';
import { vi } from './language/vi';
import { ta } from './language/ta';

let strings = new LocalizedStrings({
  id, en, vi, ta,
});

export default strings;