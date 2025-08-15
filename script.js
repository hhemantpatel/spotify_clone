let a = document.getElementById("div");

// Object to hold interval IDs by class name
const intervalIds = {};

async function add(name, clas) {
  let time = Math.random();
  time = (7 * time) * 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      a.insertAdjacentHTML("beforeend", `<p class="${clas}">${name}</p>`);
      resolve();
    }, time);
  });
}

async function main() {
  let arr = [
    "initializing Hacking",
    "reading your file",
    "password file detected",
    "sending all password and personal file to server",
    "cleaning up",
    "Task Completed"
  ];
  let num = 1;

  for (let value of arr) {
    await add(value, `a${num}`);
if(num != 6){
dot(`a${num}`);
}
    

    // Clear previous interval if exists
    if (num > 1 && intervalIds[`a${num - 1}`]) {
      clearInterval(intervalIds[`a${num - 1}`]);
      delete intervalIds[`a${num - 1}`]; // optional cleanup
    }

    num += 1;
  }

  console.log("is this working");
}

function dot(clas) {
  let element = document.getElementsByClassName(clas)[0];

  if (!element) {
    console.error("Element not found for class:", clas);
    return;
  }

  // intervalIds[clas] = setInterval(() => {
  //   element.insertAdjacentHTML("beforeend", "<span>.</span>");
  // }, 1000);



  let count = 0;
const maxDots = 3;

intervalIds[clas] = setInterval(() => {
  count = (count + 1) % (maxDots + 1);  // cycles 0 → 1 → 2 → 3 → 0 ...
  let dots = '.'.repeat(count);

  let dotsSpan = element.querySelector('span');
  if (!dotsSpan) {
    dotsSpan = document.createElement('span');
    element.appendChild(dotsSpan);
  }
  dotsSpan.textContent = dots;
}, 500);

}


main();
