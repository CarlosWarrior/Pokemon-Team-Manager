exports.isUrl = function isUrl(urlStr) {
    try {
    new URL(urlStr);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isColor = function isColor(colorStr) {
  return /^#[0-9A-F]{6}$/i.test(colorStr) || /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(colorStr)
}