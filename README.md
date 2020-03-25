# Kusama Session Keys

Rotate session keys for your Kusama validator node with a single command!

Based on a [script](https://paste.ubuntu.com/p/MhKM8vjVcD/) from [@fgimenez](https://github.com/fgimenez).

## Install

```
git clone https://github.com/Colm3na/kusama-session-keys.git
cd kusama-session-keys
npm install
```

## Usage

From [Polkadot JS UI](https://polkadot.js.org/apps/#/accounts) export your account to json format and copy to keystores folder.

**NOTE:** Remember to [clear bash history](https://askubuntu.com/questions/191999/how-to-clear-bash-history-completely) after execution to ensure your password is not stored anywhere.

**Usage:**

```
node index.js <account-export.json> <account-password>
```

**Example:**

```
node index.js keystores/controller.json 1234567890
```

Output:

```
Importing account GTzRQPzkcuynHgkEHhsPBFpKdh4sAacVRsnd8vYfPpTMeEY
Connected to node websocket ws://localhost:9944
New generated keys are 0xaaa287115f15d66cdae2dcf0e0416bd89a221c4dc62b6cc40bdbbc224e72f2fc5a382991d73337d051b95cd61a193fe2a4ab47087ed15d1d9e47fdd1eb8e390e94a682cbe5b5194bbba9d06a33e9c89d13ec05b0ac26bdb446d4521581bf1a2b4cfc4f58da7336c6728bcbc57f64d4189d02bc624de88c85f29331b1f7fad01a7692b9d4a4655fd4f49e624536f272bd1f564e2957eebfe8ae170b26c7507371
Account nonce is 84
Success transaction! tx hash is 0x66729ba1a1ce4400cb70a98bd27980fe178084b3ccc80207f8af4b024ccbb23d
```