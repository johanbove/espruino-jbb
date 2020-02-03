require("Storage").write("+jbm8b",{
  "name":"Magic 8-Ball",
  "src":"-jbm8b"
});

// @see https://en.wikipedia.org/wiki/Magic_8-Ball

require("Storage").write("-jbm8b",`
const affirmative = [
  'It is\ncertain.',
  'It is\ndicededly\nso.',
  'Without\na doubt.',
  'Yes\ndefinitely.',
  'You may\nrely\non it.',
  'As I see,\nit yes.',
  'Most\nlikely.',
  'Outlook\ngood.',
  'Yes.',
  'Signs point\nto yes.'
];
const nonCommittal = [
  'Reply hazy,\ntry again.',
  'Ask again\nlater.',
  'Better not\ntell you\nnow.',
  'Cannot\npredict\nnow.',
  'Concentrate\nand\nask again.'
];
const negative = [
  'Don\'t\ncount on it.',
  'My reply\nis no.',
  'My sources\nsay no.',
  'Outlook\nis not\nso\ngood.',
  'Very\ndoubtful.'
];

const answers = [affirmative, nonCommittal, negative];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function predict(button) {
  const a = Math.floor(getRandomArbitrary(0, 3));
  const b = (a === 0) ? Math.floor(getRandomArbitrary(0, 10)) : Math.floor(getRandomArbitrary(0, 5));
  const response = answers[a][b];
  return response;
}

function draw(msg) {
  g.clear();
  E.showMessage(msg, 'Magic 8 Ball');
}

function reply(button) {
  draw(predict(button));
}

function ask() {
  draw('Ask me a\nYes or No\nquestion\nand\ntouch the\nscreen');
}

Bangle.on('touch', (button) => reply(button));

setWatch(ask, BTN1, {repeat:true, edge:"falling"});

// Back to launcher
setWatch(Bangle.showLauncher, BTN2, {repeat:false, edge:"falling"});

ask();
`);
