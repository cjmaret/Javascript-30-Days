
const god = document.querySelector('.ohgod');
const runForHelp = document.querySelector('.run')
const prank = document.querySelector('.prank');

const pressed = [];
const secretCode = 'ihateunicorns';

window.addEventListener('keyup', (e) => {
  console.log(e.key);

  pressed.push(e.key);
  pressed.splice(-secretCode.length -1, pressed.length - secretCode.length);

  if (pressed.join('').includes(secretCode)) {
    console.log('hooray!');
    for (let i = 0; i < 100; i++) {
        cornify_add();
    }
    timer(prank);
  }

  console.log(pressed);
})

function makeUnicorn() {
    cornify_add();
}


function timer(e) {
    if (e === god) {
        window.setTimeout( function() {e.style.opacity = 1;}, 3500);
    } else if (e === runForHelp) {
        window.setTimeout( function() {e.style.opacity = 1;}, 5000);
    } else {
        window.setTimeout( function() {e.style.opacity = 1;}, 3000);
    }
};

timer(god);

timer(runForHelp);


window.setInterval(makeUnicorn, 3000);



