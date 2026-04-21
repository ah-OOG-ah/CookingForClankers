// data_checker.js, used to check if there are missing images
// Run with the command `node data_checker.js`
import fs from "fs";

const files = fs.readdirSync("./data/recipes");
const images = fs.readdirSync("./data/images");

for (const file of files) {
  if (!file.match(/.*recipes.*/gi)) continue;

  const data = fs.readFileSync(`./data/recipes/${file}`, "utf8");
  /** @type {Recipe[]} **/
  const json = JSON.parse(data);
  const missing = json.flatMap((recipe) =>
    recipe.images.filter((s) => images.indexOf(s) === -1),
  );

  if (missing.length > 0) {
    console.error(`${file} is missing:\n\t${missing.join("\n\t")}\n`);
  }
}
