'use strict';

// process.argv is a built-in array Node.js fills with the command-line
// arguments that were passed when the script was launched.
//   - argv[0] = the absolute path to the Node.js executable
//   - argv[1] = the absolute path to the script being run (index.js)
//   - argv[2] = the first real argument the user typed (name)
//   - argv[3] = the second real argument the user typed (mood)
//   - later entries = any additional arguments, including flags like --mode
const args = process.argv.slice(2);

function getGreeting(mood) {
  const greetings = {
    cheerful: 'Bright greetings to you, my ever-sunny friend!',
    sassy: 'Well, well, look who finally showed up.',
    default: 'Hello, friend!',
  };
  return greetings[mood] || greetings.default;
}

function getJoke(mood) {
  const jokes = {
    cheerful: [
      "Why don't scientists trust atoms? Because they make up everything!",
      'What do you call a bear with no teeth? A gummy bear!',
    ],
    sassy: [
      "You're not a morning person... you're barely a person at all.",
      "I'd agree with you, but then we'd both be wrong.",
    ],
    default: [
      'Why did the scarecrow win an award? Because he was outstanding in his field!',
      'How does a programmer celebrate a birthday? With a cake and mince pies!',
    ],
  };
  const pool = jokes[mood] || jokes.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getRoast() {
  const roasts = [
    'Your code only runs because it is scared of being refactored.',
    "Your bug reports are so detailed, the developers still can't reproduce them.",
    'Your commit messages describe what you WANTED to do, not what you did.',
    'Your infinite loop is the one thing in your computer that never gets stuck.',
  ];
  return roasts[Math.floor(Math.random() * roasts.length)];
}

function getDadJoke() {
  const dadJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    'I told my computer I needed a break. Now it will not stop sending me KitKat ads.',
    'Why did the Java developer wear glasses? Because he could not C#!',
    'There are only 10 kinds of people: those who understand binary and those who do not.',
  ];
  return dadJokes[Math.floor(Math.random() * dadJokes.length)];
}

// The core conditional: --mode wins over the mood-based pool.
function pickJoke(mode, mood) {
  if (mode === 'roast') {
    return getRoast();
  }
  if (mode === 'dadjoke') {
    return getDadJoke();
  }
  return getJoke(mood);
}

function makeJoke(name, mode, mood) {
  // Friendly fallback if the name was never supplied, per the project rules.
  const displayName = (name || 'stranger').trim();
  const greeting = getGreeting(mood);
  const joke = pickJoke(mode, mood);
  return `${greeting}, ${displayName}!\n\n${joke}`;
}

// Parse args: strip the --mode flag, keep the rest as positionals.
let mode;
const positionals = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--mode') {
    mode = args[i + 1];
    i++; // skip the flag's value
  } else {
    positionals.push(args[i]);
  }
}

// Validate --mode before running any joke logic.
if (mode && mode !== 'roast' && mode !== 'dadjoke') {
  console.error('Unknown --mode. Usage: node index.js <name> [mood] --mode <roast|dadjoke>');
  process.exit(1);
}

if (positionals.length > 2) {
  console.error('Too many arguments. Usage: node index.js <name> [mood] --mode <roast|dadjoke>');
  process.exit(1);
}

// positionals[0] is the name, positionals[1] is the mood.
const [name, mood] = positionals;

console.log(makeJoke(name, mode, mood));