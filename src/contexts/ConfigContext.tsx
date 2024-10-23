import { createContext, ReactNode } from 'react';

// project import
import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

// types
import { CustomizationProps } from 'types/config';
import { StoreAuto } from 'types/storeauto';

// initial state
const initialState: CustomizationProps = {
  ...defaultConfig,
  container: false,
  onChangeLocale: () => {},
  onChangestoreAuto: () => {},
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage('storeauto-config', {
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    outlinedFilled: initialState.outlinedFilled,
    navType: initialState.navType,
    presetColor: initialState.presetColor,
    locale: initialState.locale,
    rtlLayout: initialState.rtlLayout,
    storeAuto: initialState.storeAuto,
  });

  const onChangeLocale = (locale: string) => {
    setConfig({
      ...config,
      locale,
    });
  };

  const onChangestoreAuto = (storeAuto: StoreAuto) => {
    setConfig({
      ...config,
      storeAuto,
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLocale,
        onChangestoreAuto,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
