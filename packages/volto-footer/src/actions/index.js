import { GET_FOOTER_INHERIT } from '../constants';

export const getFooterInherit = (url) => {
  let cleanedUrl = url;
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
