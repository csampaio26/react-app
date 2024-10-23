// types
import { ConfigProps } from './types/config';

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/´material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/';

const config: ConfigProps = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: 'light', // light, dark
  presetColor: 'theme5', // default, theme1, theme2, theme3, theme4, theme5, theme6
  locale: 'pt',
  rtlLayout: false,
  storeAuto: undefined,
};

export default config;
