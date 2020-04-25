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

  console.log("Rotate Kusama validator session keys [https://github.com/Colm3na/kusama-session-keys]");

  let raw = fs.readFileSync(accountJSON, { encoding: 'utf-8' });
  const account = JSON.parse(raw);
  const address = account.address;
  
  // Prompt user to enter password
  const password = await prompts({
    type: 'text',
    name: 'password',
    message: `Enter password for ${address}:`
  });
  console.log(`password:`, password);

  if (password) {
    
    console.log(`Importing account ${address}`, address)
    const signer = keyring.restoreAccount(account, password); 
    signer.decodePkcs8(password);

    // Connect to node
    console.log(`Connecting to`, wsProvider);
    const provider = new WsProvider(wsProvider);
    const api = await ApiPromise.create({ provider });
    
    // Get new session keys
    const newKeys = await api.rpc.author.rotateKeys();
    console.log(`New session keys`, newKeys.toHex());

    // Get account nonce
    const nonce = (await api.derive.balances.account(address)).accountNonce
    console.log(`Account nonce is`, nonce.toHuman());

    // Send set keys tx
    const hash = await api.tx.session.setKeys(
      newKeys,
      [0],
    ).signAndSend(signer, { nonce });
    console.log(`Success! tx hash is ${hash.toString()}, check tx in https://polkascan.io/pre/kusama/transaction/${hash.toString()}`);

    process.exit(1);
  }

  process.exit();
}

try {
  main();
} catch (error) {
  console.error(error);
}