export function isPositiveNumeric(n) {
  if(!isNaN(parseInt(n)) && isFinite(n)) {
    return (parseInt(n) > 0);
  } else {
    return false;
  }
}
