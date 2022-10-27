class Quizz {
  score = 0;
  questions = [
    {
      question:
        "How many countries are there in the world?: a(54), b(154), c(45), d(256)",
      answer: "d",
    },
    {
      question:
        "How many weeks are there in a year?: a(56), b(48), c(52), d(92)",
      answer: "c",
    },
    {
      question:
        "How many metres are there in a kilometre?: a(1000), b(100), c(10000), d(500)",
      answer: "a",
    },
    {
      question:
        "What is the name of a dog offspring?: a(puppy), b(kitten), c(mice), d(calf)",
      answer: "a",
    },
  ];

  constructor() {
    this.startQuizz();
  }
  displayScore() {
    const repeat = prompt(
      `Your score is ${this.score}. Wanna play again? [y/n]: `
    );
    if (repeat == "y") {
      this.startQuizz();
    }
    console.log(`Final score ${this.score} Game ended...`);
  }
  startQuizz() {
    this.questions.forEach((question) => {
      const answer = prompt(question.question);
      if (answer === question.answer) {
        this.score += 1;
      }
    });
    this.displayScore();
  }
}

const quizz = new Quizz();
