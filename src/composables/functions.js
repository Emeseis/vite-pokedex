export const toFeetInch = (m) => {
  let cm = m*100;
  let realFeet = ((cm*0.393700) / 12);
  let feet = Math.floor(realFeet);
  let inches = Math.round((realFeet - feet) * 12);
  inches = zerofyInch(inches);
  if (inches == 12) { feet++; inches = '00'; }
  let number = `${feet}′${inches}″`
  return number;
};

export const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeWords = (string) => {
  let words = string.split('-');
  return words.map(word => capitalizeWord(word)).join(' ');
};

export const zerofy = (value) => {
  let zeroes = new Array(4).join("0");
  return (zeroes + value).slice(-3);
};

export const zerofyInch = (value) => {
  if (!value) return;
  let zeroes = new Array(3).join("0");
  return (zeroes + value).slice(-2);
};
  
export const getPokemonMultipliers = async (pokemon, typeList, typeDefenseList) => {
  let defense = {};

  const pokemonType = pokemon.types.map(type => type.type.name.toLowerCase());

  for await (const type of typeList) defense[type.title.toLowerCase()] = 1;

  for await (const type of pokemonType) {
    let damageRelations = typeDefenseList[type];
    let noDamage = damageRelations.defense.zero;
    let halfDamage = damageRelations.defense.half;
    let doubleDamage = damageRelations.defense.double;

    noDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 0.0 });
    halfDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 0.5 });
    doubleDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 2.0 });
  }

  return defense;
};
