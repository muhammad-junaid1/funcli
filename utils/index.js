import fs from "fs";
import path from "path";
import chalk from "chalk";
import boxen from "boxen";
import ora from "ora";
import jokes from "../data/jokes.js";
import facts from "../data/facts.js";

const emojis = {
  joke: ["😂", "🤣", "😁", "😅", "😆", "😹", "🤪"],
  fact: ["📚", "🧐", "🧠", "💡", "🌐", "📊", "🧪"],
};

const log = (text, type) => {
  const randEmoji =
    emojis[type][Math.floor(Math.random() * emojis[type].length)];
  const styledText = chalk.yellow.bold(`${text} ${randEmoji}`);
  const boxedText = boxen(styledText, {
    padding: 1,
    margin: 1,
    borderStyle: "double",
  });

  console.log(boxedText);
};

export default async function showData(type, category) {
  const spinner = ora(`Loading a ${type}`).start();
     const imports = {
        joke: jokes, 
        fact: facts
     };
      const content = imports[type];
      setTimeout(() => {
        spinner.stop();

        if (category) {
          const categoryContent = content?.filter(
            (c) => c?.category === category
          );
          const randomCategoryContent =
            categoryContent[Math.floor(Math.random() * categoryContent.length)]
              .text;
          log(randomCategoryContent, type);
        } else {
          const randomContent =
            content[Math.floor(Math.random() * content.length)].text;
          log(randomContent, type);
        }
      }, 1000);
}
