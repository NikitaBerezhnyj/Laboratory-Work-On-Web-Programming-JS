function convert(years) {
  let tens;
  let units = years % 10;
  let result;

  switch (Math.floor(years / 10)) {
    case 2:
      tens = "двадцять";
      break;
    case 3:
      tens = "тридцять";
      break;
    case 4:
      tens = "сорок";
      break;
    case 5:
      tens = "п'ятдесят";
      break;
    case 6:
      tens = "шістдесят";
      break;
    case 7:
      tens = "сімдесят";
      break;
    case 8:
      tens = "вісімдесят";
      break;
    case 9:
      tens = "дев'яносто";
      break;
  }

  switch (units) {
    case 1:
      result = "один";
      break;
    case 2:
      result = "два";
      break;
    case 3:
      result = "три";
      break;
    case 4:
      result = "чотири";
      break;
    case 5:
      result = "п'ять";
      break;
    case 6:
      result = "шість";
      break;
    case 7:
      result = "сім";
      break;
    case 8:
      result = "вісім";
      break;
    case 9:
      result = "дев'ять";
      break;
  }

  let text = tens;
  if (units !== 0) {
    text += " " + result;
  }

  let yearsWord =
    units === 1 ? "рік" : units >= 2 && units <= 4 ? "роки" : "років";

  return text + " " + yearsWord;
}
