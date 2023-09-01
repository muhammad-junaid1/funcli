#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import showData from "./utils/index.js";

const printHelp = () => {
  console.log(
    boxen(chalk.blueBright("funcli") + " - Say bye-bye to boredom!", {
      borderStyle: "classic",
      padding: "1",
    })
  );
  console.log(`
${chalk.green("Usage:")} funcli [random] [content]

[content] can be either 'joke', 'fact' or 'quote'

${chalk.green("Description:")}
  Get random jokes, quotes, facts, etc. or select a specific category.

${chalk.green("Options:")}
  <content>                   Get content (i.e joke, fact, quote) from a specific category
  random <content>            Get random content (i.e joke, fact, quote)

${chalk.green("Examples:")}
  $ funcli random joke      # Get a random joke.
  $ funcli random quote     # Get a random quote.
  $ funcli random fact      # Get a random fact.
  $ funcli joke             # Get a joke by selecting a specific category
  `);
};

const allCommands = ["joke", "fact", "quote"];

const allChoices = {
  joke: [
    "Programming",
    "Animal",
    "Relationship",
    "Study",
    "Science",
    "Dad",
  ],
};

const cli = () => {
  const argument = process.argv.slice(2);
  const command = argument[0];
  const randomArg = argument[1];

  if (command === "help") {
    printHelp();
  } else if (command === "random") {
    if(allCommands.includes(randomArg)) {
      showData(randomArg, null);
    } else {
      // Handle invalid random argument
    }
  } else if (allCommands.includes(command)) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "category",
          message: "Choose a Category",
          choices: allChoices[command],
        },
      ])
      .then((answers) => {
        const selectedCategory = answers.category.toLowerCase();
        showData(command, selectedCategory);
      });
  }
};



cli();