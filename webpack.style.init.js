const fs = require("fs")
const sass = require('sass');

const input = `
h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}`;

// const result = sass.compile("./src/styles-extension.scss");

const result = sass.compileString(input);
// console.log(result.css);

// const compressed = sass.compile("./src/styles-extension.scss", {style: "compressed"});


// fs.mkdir('build/static/css', { recursive: true }, ()=>{
//     fs.writeFileSync("./build/static/css/styles_extension.css", result.css)
// });
