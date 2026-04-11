// data_checker.js, used to check if there are missing images
// Run with the command `node data_checker.js`

const fs = require("fs");

async function main() {
  const files = fs.readdirSync("./data/recipes");
  const images = fs.readdirSync("./data/images");
  for (const file of files) {
    if (!file.match(/.*recipes.*/gi)) continue;
    console.log(`Checking ${file} for inconsistent data...`);
    const data = fs.readFileSync(`./data/recipes/${file}`, "utf8");
    const json = JSON.parse(data);
    for (const recipe of json) {
      for (const img of recipe.images) {
        if (images.indexOf(img) === -1) console.log("\t", img);
      }
    }
  }
}

main();
