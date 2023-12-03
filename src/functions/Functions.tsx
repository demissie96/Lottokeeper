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

export async function canYouBet(): Promise<boolean> {
  try {
    const response = await fetch(
      "https://lottokeeperbackend.johannesdemissi.repl.co/winner_numbers"
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch winner numbers. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data.length === 0;
  } catch (error) {
    console.error("Error checking if you can bet:", error);
    throw error; // Rethrow the error to let the calling code handle it
  }
}
