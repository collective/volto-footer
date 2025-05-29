import { GET_FOOTER_INHERIT } from '../constants';

export const getFooterInherit = (url) => ({
  type: GET_FOOTER_INHERIT,
  request: {
    op: 'get',
    path: `${url}/@inherit?field=footer`,
  },
});
