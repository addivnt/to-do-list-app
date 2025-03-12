const getHeaders = () => {
  const headers = new Headers();
  headers.set("content-type", "application/json");
  return headers;
};

export { getHeaders };
