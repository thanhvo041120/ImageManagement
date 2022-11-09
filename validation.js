export const validateUrl = (url) => {
  const urlPattern = new RegExp(
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i
  );
  const isValid = urlPattern.test(url);
  return isValid;
};
