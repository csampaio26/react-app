import { PaletteMode } from '@mui/material';
import { StoreAuto } from './storeauto';

export type ConfigProps = {
  fontFamily: string;
  borderRadius: number;
  outlinedFilled: boolean;
  navType: PaletteMode;
  presetColor: string;
  locale: string;
  rtlLayout: boolean;
  storeAuto?: StoreAuto;
};

export type CustomizationProps = {
  fontFamily: string;
  borderRadius: number;
  outlinedFilled: boolean;
  navType: PaletteMode;
  presetColor: string;
  locale: string;
  rtlLayout: boolean;
  container: boolean;
  storeAuto?: StoreAuto;
  onChangeLocale: (locale: string) => void;
  onChangestoreAuto: (storeAuto: StoreAuto) => void;
};
