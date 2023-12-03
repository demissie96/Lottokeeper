function randomNumber() {
  return Math.floor(Math.random() * (40 - 1) + 1);
}

export function generateFiveNumber(): Array<number> {
  let randomNumList: Array<number> = [];

  for (let index = 0; index < 5; index++) {
    let generatedNumber: number = randomNumber();

    while (randomNumList.includes(generatedNumber)) {
      generatedNumber = randomNumber();
    }

    randomNumList.push(generatedNumber);
  }

  randomNumList = randomNumList.sort((n1: any, n2: any) => n1 - n2);

  return randomNumList;
}
