export const getAuthRedirect = (state) => {
  const returnTo = state?.returnTo;
  return typeof returnTo === "string" && /^\/movie\/\d+$/.test(returnTo)
    ? returnTo
    : "/";
};
