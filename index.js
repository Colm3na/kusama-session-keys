const { ApiPromise, WsProvider } = require('@polkadot/api');
const keyring = require('@polkadot/ui-keyring').default;
keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
const fs = require('fs');

if (process.argv.length !== 4) {
  console.error('Usage: node index.js keystores/controller.json 1234567890');
  process.exit(1);
}

// Account file param
const accountJSON = (process.argv[2] || `keystores/controller.json`);

// Password param
const password = (process.argv[3] || ``);

// Node websocket
const wsProvider = `ws://localhost:9944`;

const main = async () => {

  // Read and import account using provided password
  let raw = fs.readFileSync(accountJSON, { encoding: 'utf-8' });
  const account = JSON.parse(raw);
  const address = account.address;
  console.log(`Importing account`, address)
  const signer = keyring.restoreAccount(account, password); 
  signer.decodePkcs8(password);

  // Connect to node
  const provider = new WsProvider(wsProvider);
  const api = await ApiPromise.create({ provider });
  console.log(`Connected to node websocket`, wsProvider);

  // Get new session keys
  const newKeys = await api.rpc.author.rotateKeys();
  console.log(`New generated keys are`, newKeys.toHex());

  // Get account nonce
  const nonce = (await api.derive.balances.account(address)).accountNonce
  console.log(`Account nonce is`, nonce.toHuman());

  // Send set keys tx
  const hash = await api.tx.session.setKeys(
    newKeys,
    [0],
  ).signAndSend(signer, { nonce });
  console.log(`success! tx hash is`, hash.toString());

  process.exit(1);
  
}

try {
  main();
} catch (ERR) {
  console.error(ERR);
}