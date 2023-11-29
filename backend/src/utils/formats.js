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

exports.isNumber = function isNumber(value){
  return (typeof value === 'number' || (typeof value === 'string' && !isNaN(+value)));
}

const _stats = Object.freeze([
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
])
exports.isStats = function validateStats(statsObject){
  if(!statsObject)
    return false
  const stats = Object.keys(statsObject)
  if(stats.length != _stats.length)
    return false
  for (let statIndex = 0; statIndex < _stats.length; statIndex++) {
    const stat = _stats[statIndex];
    if(!stats.includes(stat) || !isNumber(statsObject[stat]))
      return false
  }
}