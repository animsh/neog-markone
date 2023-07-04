import chalk from "chalk";
import readlineSync from "readline-sync";

function createQuestion(question, answer, options) {
  return {
    question,
    answer,
    options,
  };
}

function createUser(name, score) {
  return {
    name,
    score,
  };
}

let score = 0;
let level = 0;
let otherUserScores = [createUser("Tanay", 2), createUser("Sagar", 4)];
let highestScore = false;

function play(question, answer, options) {
  let userAnswer;
  if (typeof answer === "boolean") {
    userAnswer = readlineSync.keyInYN(question);
  } else {
    userAnswer = readlineSync.keyInSelect(options, question);
  }
  userAnswer === answer
    ? console.log(
        chalk.green("You are right"),
        chalk.yellow("Score:"),
        ++score,
        chalk.green(`Level: ${Math.floor(score / 2)}`)
      )
    : console.log(
        chalk.red("You are wrong"),
        chalk.yellow("Score:"),
        --score,
        chalk.red(`Level: ${Math.floor(score / 2)}`)
      );

  level = Math.floor(score / 2);
  console.log("----------");
}

let userName = readlineSync.question("Hey, what is your name? ");
console.log(
  chalk.bgBlue("Welcome", userName, "Let's see if you really do know me :)")
);
console.log(chalk.bgBlue("even points can push your level by one"));
let cities = ["Pune", "Mumbai"];
let colors = ["Black", "Red"];
let months = ["Jan", "March", "Aug"];

let questions = [
  createQuestion("Where do I live? ", 0, cities),
  createQuestion("The color I like the most? ", 0, colors),
  createQuestion("Do I watch anime and read mangas?", true, []),
  createQuestion("Do I own vehicle?", true),
  createQuestion("Select my birth month:", 2, months),
  createQuestion("Am I introvert or extrovert?", 0, ["Introvert", "Extrovert"]),
];

for (let currentQuestion of questions) {
  play(
    currentQuestion.question,
    currentQuestion.answer,
    currentQuestion.options
  );
}

console.log("Final Score:", score);
console.log("Level Reached:", level);

for (let user of otherUserScores) {
  if (user.score > score) {
    highestScore = false;
  } else {
    highestScore = true;
  }
}

highestScore
  ? console.log(
      chalk.bgGreen(
        "Congrats! You have highest score among all the other users, send screenshot of this so that we can update our data!"
      )
    )
  : console.log(
      chalk.bgRed("Someone else have highest score :/ better luck next time")
    );
