# Rotate your Kusama validator session keys in one shot

Rotate session keys for your Kusama validator node with a single command.

Based on a [script](https://paste.ubuntu.com/p/MhKM8vjVcD/) from [@fgimenez](https://github.com/fgimenez). Thank you!

Made with ❤️ from ColmenaLabs_SVQ!

## Install

First of all, you need nodejs (>= v10.20.1) installed, check https://nodejs.org/en/download/ to install it in your platform.

Clone the repository and install the needed dependencies:

```
git clone https://github.com/Colm3na/kusama-session-keys.git
cd kusama-session-keys
npm install
```

Go to [Polkadot JS UI](https://polkadot.js.org/apps/#/accounts) and export the controller account of your validator to json format, then copy the json file/s in the `keystores` folder.

## Usage

```
$ node rotatekeys.js --help
node rotatekeys.js -c controller.json -p password

Options:
  --controller, -c  Controller account json file path        [string] [required]
  --password, -p    Controller account password, or stdin if this is not set
                                                                        [string]
  --log, -l         log (append) session keys to sessionkeys.log file  [boolean]
  --lastkeys, -k    Save last session keys to lastkeys.log file        [boolean]
  --help, -h        Show help                                          [boolean]
  --version, -v     Show version number                                [boolean]
```

Example (will ask the password from stdin):

```
node rotatekeys.js -c keystores/controller.json
```

Output:

```
 Rotate Kusama validator session keys

 - Check source at https://github.com/Colm3na/kusama-session-keys
 - Made with love from ColmenaLabs_SVQ https://colmenalabs.org/

✔ Enter password for GTzRQPzkcuynHgkEHhsPBFpKdh4sAacVRsnd8vYfPpTMeEY: … ***************

 -> Importing account GTzRQPzkcuynHgkEHhsPBFpKdh4sAacVRsnd8vYfPpTMeEY
 -> Connecting to ws://localhost:9944
 -> New session keys is 0xa18528958ede14b1a5291da42d885ce50a9bff8581c31f3e5e05b699e081c9d76451c394e0c68c1ffc2a11d7d7465126b434c58f8fcf305de2fc76c94a218b55a85dbc2306f43798deb72e9688fa18d5ba8c1a646f2a140accd3cfcc39bdb90a1e998e6ec3cea48a831485a67df264f33bccc27fa5bb1bb3646b0f1002b7fe389c42f566a3f1fd22d090a1fc5f2373661d1f213d9562a44d5e7daf16eb0e3a12

Success! Check tx in PolkaScan: https://polkascan.io/pre/kusama/transaction/0x5368509f08e622ddd7552c8cf73a306e7d8672688d9ff8f790c42831652f6130

```

## Bonus track

Thanks to @derfredy we include the script `author_hasSessionKeys.sh`. 

We can use this script in conjunction with the `rotatekeys.js` script using the `-k` flag to know if 
the local node is using the provided session keys. 

It's useful when you have several validator nodes in a active/passive setup 
(only one node is actively validating). You can promote a node to validator using `rotatekeys.js` at any time.
just by executing the script in the node you want to promote.

How to use it?

1. Rotate the session keys as usual but adding `-k flag`. I.e: `node rotatekeys.js -c keystores/controller.json -k`.
2. To check if the local node is validating execute `./author_hasSessionKeys.sh`.
3. Profit! Use it in your own scripts or automations.