function mergeQueryParameters(originalUrl, newQueryParams) {
  const url = new URL(originalUrl);
  for (const [key, value] of Object.entries(newQueryParams)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

module.exports = {
  mergeQueryParameters,
};
