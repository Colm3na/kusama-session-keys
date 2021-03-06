/**
 * rotatekeys.js
 *  
 * Rotate your Kusama validator session keys in one shot.
 *
 * https://github.com/Colm3na/kusama-session-keys
 * 
 * Author: Mario Pino | @mariopino:matrix.org
 */

const { ApiPromise, WsProvider } = require('@polkadot/api');
const keyring = require('@polkadot/ui-keyring').default;
keyring.initKeyring({
  isDevelopment: false,
});
const fs = require('fs');
const prompts = require('prompts');
const yargs = require('yargs');

const argv = yargs
  .scriptName("rotatekeys.js")
  .option('controller', {
    alias: 'c',
    description: 'Controller account json file path',
    type: 'string',
  })
  .option('password', {
      alias: 'p',
      description: 'Controller account password, or stdin if this is not set',
      type: 'string',
  })
  .option('log', {
    alias: 'l',
    description: 'log (append) session keys to sessionkeys.log file',
    type: 'boolean',
  })
  .option('lastkeys', {
    alias: 'k',
    description: 'Save last session keys to lastkeys.log file',
    type: 'boolean',
  })
  .demandOption(['controller'], 'Please provide the controller account json file path')
  .usage("node rotatekeys.js -c controller.json -p password")
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .argv;

// Controller account json file
const controller = argv.controller;

// Password param
let password = argv.password || false;

// Logging to file param
const log = argv.log || false;

// Logging to file param
const lastkeys = argv.lastkeys || false;

// Node websocket
const wsProvider = `ws://localhost:9944`;

const main = async () => {

  console.log("\n\x1b[45m\x1b[1m Rotate Kusama validator session keys \x1b[0m\n");
  console.log("\x1b[1m - Check source at https://github.com/Colm3na/kusama-session-keys\x1b[0m");
  console.log("\x1b[32m\x1b[1m - Made with love from ColmenaLabs_SVQ https://colmenalabs.org/\x1b[0m\n");

  let raw = fs.readFileSync(controller, { encoding: 'utf-8' });
  const account = JSON.parse(raw);
  const address = account.address;
  
  // Prompt user to enter password
  if (!password) {
    const response = await prompts({
      type: 'password',
      name: 'password',
      message: `Enter password for ${address}:`
    });
    password = response.password;
  }

  if (password) {

    console.log(`\n\x1b[1m -> Importing account\x1b[0m`, address)
    const signer = keyring.restoreAccount(account, password); 
    signer.decodePkcs8(password);

    // Connect to node
    console.log(`\x1b[1m -> Connecting to\x1b[0m`, wsProvider);
    const provider = new WsProvider(wsProvider);
    const api = await ApiPromise.create({ provider });
    
    // Get new session keys
    const newKeys = await api.rpc.author.rotateKeys();
    console.log(`\x1b[1m -> New session keys is\x1b[0m`, newKeys.toHex());

    // Get account nonce
    const nonce = (await api.derive.balances.account(address)).accountNonce

    // Sign and send setKeys tx
    const hash = await api.tx.session.setKeys(
      newKeys,
      [0],
    ).signAndSend(signer, { nonce });
    console.log(`\n\x1b[32m\x1b[1mSuccess! \x1b[37mCheck tx in PolkaScan: https://polkascan.io/pre/kusama/transaction/${hash.toString()}\x1b[0m\n`);

    if (log) {
      fs.appendFileSync(`sessionkeys.log`, `${new Date()} - ${newKeys.toHex()}`);
    }

    if (lastkeys) {
      fs.writeFileSync(`lastkeys.log`, newKeys.toHex());
    }

    process.exit(1);
  }

  process.exit();
}

try {
  main();
} catch (error) {
  console.error(error);
}