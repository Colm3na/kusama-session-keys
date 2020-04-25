# Rotate your Kusama validator session keys in one shot

Rotate session keys for your Kusama validator node with a single command. This is intented to run locally on validator node.

Based on a [script](https://paste.ubuntu.com/p/MhKM8vjVcD/) from [@fgimenez](https://github.com/fgimenez). Thank you!

## Install

You need npm installed. This works for ubuntu 18.04

```
apt update
apt install npm
```

```
git clone https://github.com/Colm3na/kusama-session-keys.git
cd kusama-session-keys
npm install
```

## Usage

From [Polkadot JS UI](https://polkadot.js.org/apps/#/accounts) export your account to json format and copy the file in `keystores` folder.

**Usage:**

```
node index.js <account_json_export_file_path>
```

**Example:**

```
node index.js keystores/controller.json
```

Output:

```
 Rotate Kusama validator session keys

 - Check source at https://github.com/Colm3na/kusama-session-keys
 - Made with love in La Colmena Labs https://colmenalabs.org/

✔ Enter password for GTzRQPzkcuynHgkEHhsPBFpKdh4sAacVRsnd8vYfPpTMeEY: … ***************

 -> Importing account GTzRQPzkcuynHgkEHhsPBFpKdh4sAacVRsnd8vYfPpTMeEY
 -> Connecting to ws://localhost:9944
 -> New session keys is 0xa18528958ede14b1a5291da42d885ce50a9bff8581c31f3e5e05b699e081c9d76451c394e0c68c1ffc2a11d7d7465126b434c58f8fcf305de2fc76c94a218b55a85dbc2306f43798deb72e9688fa18d5ba8c1a646f2a140accd3cfcc39bdb90a1e998e6ec3cea48a831485a67df264f33bccc27fa5bb1bb3646b0f1002b7fe389c42f566a3f1fd22d090a1fc5f2373661d1f213d9562a44d5e7daf16eb0e3a12

Success! Check tx in PolkaScan: https://polkascan.io/pre/kusama/transaction/0x5368509f08e622ddd7552c8cf73a306e7d8672688d9ff8f790c42831652f6130

```
