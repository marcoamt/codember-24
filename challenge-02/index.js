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

const instructionsList = lines.map((line) => line.split(" ").map(Number));

const steps = instructionsList.map((instruction) => {
  let instructionCopy = [...instruction];
  let firstInstruction = instructionCopy[0];
  if (firstInstruction[0] < 0) {
    return 1;
  }
  let rowSteps = 0;
  let index = 0;
  while (index < instructionCopy.length && index >= 0) {
    rowSteps++;
    const oldValue = instructionCopy[index];
    instructionCopy[index] += 1;
    index += oldValue;
  }

  return rowSteps;
});

const firstElements = [...steps].slice(undefined, steps.length);
const result = firstElements.reduce((acc, curr) => acc + curr, 0);
console.log({ result, last: steps[steps.length - 1] });
// 453-15 -> final result
