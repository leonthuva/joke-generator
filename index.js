'use strict';

// process.argv is a built-in array Node.js fills with the command-line
// arguments that were passed when the script was launched.
//   - argv[0] = the absolute path to the Node.js executable
//   - argv[1] = the absolute path to the script being run (index.js)
//   - argv[2] = the first real argument the user typed (name)
//   - argv[3] = the second real argument the user typed (mood)
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

function makeJoke(name, mood) {
  // Friendly fallback if the name was never supplied, per the project rules.
  const displayName = (name || 'stranger').trim();
  const greeting = getGreeting(mood);
  const joke = getJoke(mood);
  return `${greeting}, ${displayName}!\n\n${joke}`;
}

// args[0] is the name, args[1] is the mood (e.g. "cheerful" or "sassy").
const [name, mood] = args;

if (args.length > 2) {
  console.error('Too many arguments. Usage: node index.js <name> [mood]');
  process.exit(1);
}

console.log(makeJoke(name, mood));