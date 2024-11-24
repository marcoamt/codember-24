import { readFile } from "fs/promises";

async function parseFile() {
  try {
    const file = await readFile("./log.txt", "utf8");
    return file.split("\n");
  } catch (error) {
    console.error(error);
  }
}

const lines = await parseFile();

const codes = lines.map((line) => line.trim());

const numbersRegex = /^[0-9]+$/;

const isDigit = (char) => numbersRegex.test(char);

const validCodes = codes.filter((code) => {
  //regex for lowercase letters and digits
  const regex = /^[a-z0-9]+$/;
  const satisfyRegex = regex.test(code);
  if (!satisfyRegex) {
    return false;
  }

  const chars = code.split("");

  for (let i = 0; i < chars.length; i++) {
    if (i >= chars.length - 1) {
      return true;
    }
    const isNumber = isDigit(chars[i]);
    const isNextNumber = isDigit(chars[i + 1]);

    //Nunca usa dígitos después de una letra (Una vez aparecen letras, la contraseña debe continuar solo con letras)
    const case1 = !isNumber && isNextNumber ? false : true;
    //Si usa dígitos, siempre los usa de forma igual o creciente (si sale un 3, ya no usará después un número menor)
    const case2 = isNumber && isNextNumber ? chars[i] <= chars[i + 1] : true;
    //Si usa letras, siempre las usa en orden alfabético igual o creciente (si sale una "b" ya no podrá usar una "a", por ejemplo)
    const case3 = !isNumber && !isNextNumber ? chars[i] <= chars[i + 1] : true;

    const res = case1 && case2 && case3;
    if (!res) {
      return false;
    }
  }
  return true;
});

const validCodesLength = validCodes.length;
const notValidCodesLength = codes.length - validCodesLength;

console.log({
  validCodesLength, //299
  notValidCodesLength, //198
});
