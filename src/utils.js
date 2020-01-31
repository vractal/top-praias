export const normalizeString = str => {
  if (typeof str !== "string") {
    return ""
  }
  
  str = str.toUpperCase()
  str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
  str = str.replace(/[ÈÉÊË]/,"E");
  str = str.replace(/[Ç]/,"C");
  str = str.replace(/[Í]/,"I");
  str = str.replace(/[ÓÔ]/,"O");

  return str.replace(/[^A-Z0-9]/gi,'');
}
