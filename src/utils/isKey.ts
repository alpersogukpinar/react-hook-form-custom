import { REGEX_IS_DEEP_PROP, REGEX_IS_PLAIN_PROP } from '../constants';
import isArray from './isArray';

export default (value: [] | string) =>
  !isArray(value) &&
  (REGEX_IS_PLAIN_PROP.test(value) || !REGEX_IS_DEEP_PROP.test(value));
