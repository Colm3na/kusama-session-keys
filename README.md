# Kusama Session Keys

Rotate session keys for your Kusama validator node with a single command!

## Install

```
git clone https://github.com/Colm3na/kusama-session-keys.git
cd kusama-session-keys
npm install
```

## Usage

From [Polkadot JS UI](https://polkadot.js.org/apps/#/accounts) export your account to json format and copy to keystores folder.

Usage:

```
node index.js <account-export.json> <account-password>
```

Example:

```
node index.js keystores/controller.json 1234567890
```