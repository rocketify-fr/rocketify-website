import queryString from 'query-string'

export const updateQuery = (location, payload) =>
  queryString.stringify({ ...queryString.parse(location.search), ...payload })
