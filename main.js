require("Storage").write("+jbm8b",{
  "name":"Magic 8-Ball",
  "src":"-jbm8b"
});

// @see https://en.wikipedia.org/wiki/Magic_8-Ball

require("Storage").write("-jbm8b",`
const affirmative = [
  'It is certain.',
  'It is\ndicededly\nso.',
  'Without a doubt.',
  'Yes definitely.',
  'You may rely\non it.',
  'As I see,\nit yes',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point\nto yes.'
];
const nonCommittal = [
  'Reply hazy,\ntry again.',
  'Ask again\nlater.',
  'Better not\ntell you now.',
  'Cannot\npredict now.',
  'Concentrate\nand ask again.'
];
const negative = [
  'Don\'t\ncount on it.',
  'My reply is no.',
  'My sources\nsay no.',
  'Outlook is\nnot so good.',
  'Very doubtful'
];

const answers = [affirmative, nonCommittal, negative];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function predict(button) {
  const a = Math.floor(getRandomArbitrary(0, 3));
  const b = (a === 0) ? Math.floor(getRandomArbitrary(0, 10)) : Math.floor(getRandomArbitrary(0, 5));
  const response = answers[a][b];
  // console.log('Response:', response, button);
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
  // console.log('Ask me a Yes or No question...');
  draw('Ask me a\nYes or No\nquestion\nand\ntouch the\nscreen');
}

Bangle.on('touch', (button) => reply(button));

setWatch(ask, BTN1, {repeat:true, edge:"falling"});

// Back to launcher
setWatch(Bangle.showLauncher, BTN2, {repeat:false, edge:"falling"});

ask();
`);
