const { ApiPromise, WsProvider } = require('@polkadot/api');
const keyring = require('@polkadot/ui-keyring').default;
keyring.initKeyring({
  isDevelopment: false,
});
const fs = require('fs');
const prompts = require('prompts');

if (process.argv.length !== 3) {
  console.error('Usage: node index.js <account_json_export_file_path>');
  console.error('Example: node index.js keystores/controller.json');
  process.exit(1);
}

// Account file param
const accountJSON = (process.argv[2] || `keystores/controller.json`);

// Password param
const password = (process.argv[3] || ``);

// Node websocket
const wsProvider = `ws://localhost:9944`;

const main = async () => {

  console.log("\n\x1b[45m\x1b[1m Rotate Kusama validator session keys \x1b[0m\n");
  console.log("\x1b[1m - Check source at https://github.com/Colm3na/kusama-session-keys\x1b[0m");
  console.log("\x1b[32m\x1b[1m - Made with love in La Colmena Labs https://colmenalabs.org/\x1b[0m\n");

  let raw = fs.readFileSync(accountJSON, { encoding: 'utf-8' });
  const account = JSON.parse(raw);
  const address = account.address;
  
  // Prompt user to enter password
  const { password } = await prompts({
    type: 'password',
    name: 'password',
    message: `Enter password for ${address}:`
  });

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

    // Send set keys tx
    const hash = await api.tx.session.setKeys(
      newKeys,
      [0],
    ).signAndSend(signer, { nonce });
    console.log(`\n\x1b[32m\x1b[1mSuccess! \x1b[37mCheck tx in PolkaScan: https://polkascan.io/pre/kusama/transaction/${hash.toString()}\x1b[0m\n`);

    process.exit(1);
  }

  process.exit();
}

try {
  main();
} catch (error) {
  console.error(error);
}