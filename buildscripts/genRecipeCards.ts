import * as fs from "fs"

const jsonRe = /recipes.*\.json$/
const recipePath = "/srv/csc391support/files/dataset/complete_recipes/"
fs.readdirSync(recipePath)
    .filter(name => name.search(jsonRe) != -1)