import * as repl from 'repl';

const replServer = repl.start({
  prompt: '> ',
});

replServer.defineCommand('customer', {
  help: 'Show existing list of customers',
  action() {
    this.clearBufferedCommand();

    console.log('Hello');

    this.displayPrompt();
  },
});

replServer.defineCommand('cruiser', {
  help: 'Show existing list of cruisers',
  action() {
    console.log('cruiser');
  },
});

replServer.defineCommand('match', {
  help: `- Show each customer and assigned driver
- List of failed fulfilment customers if any exists.
- List of idle drivers if any exist.`,
  action() {
    console.log('match');
  },
});

replServer.defineCommand('manual', {
  help: 'Show this help.',
  action() {
    console.log('manual');
  },
});

replServer.defineCommand('exit', {
  help: 'Kill the CLI (and the rest of the application)',
  action() {
    console.log('exit');
  },
});
