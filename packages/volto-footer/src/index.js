import footerInherit from './reducers';

const applyConfig = (config) => {
  // Add footer inherit reducer
  config.addonReducers = {
    ...config.addonReducers,
    footerInherit,
  };

  return config;
};

export default applyConfig;
export { getFooterInherit } from './actions';
