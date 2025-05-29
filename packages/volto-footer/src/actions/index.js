import { GET_FOOTER_INHERIT } from '../constants';
import config from '@plone/registry';
const isUrlExcluded = (url) => {
  const { nonContentRoutes = [], addonRoutes = [] } = config.settings;
  const matchesNonContent = nonContentRoutes.some((route) =>
    route instanceof RegExp ? route.test(url) : false,
  );
  const matchesAddon = addonRoutes.some((route) =>
    typeof route.path === 'string' ? url.startsWith(route.path) : false,
  );

  return matchesNonContent || matchesAddon;
};
export const getFooterInherit = (url) => {
  let cleanedUrl = url;
  if (isUrlExcluded(url) || url.includes('/controlpanel'))
    cleanedUrl = window.location.origin + '/++api++';
  if (url.endsWith('/edit')) {
    cleanedUrl = url.slice(0, -'/edit'.length);
  }
  return {
    type: GET_FOOTER_INHERIT,
    request: {
      op: 'get',
      path: `${cleanedUrl}/@inherit?expand.inherit.behaviors=collective.volto.footer.editable`,
    },
  };
};
