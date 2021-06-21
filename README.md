# bsc_recoverfunds_extension
A repository for tool(s) to recover access to funds lost due to Binance Chain Wallet extension

This tool will help users who have lost funds due to the Binance Chain Wallet extension where
it generated addresses from Ledger that users could not spend from.

The tool is simple but requires the Ledger Recovery Phrase. It's recommended to do it on an offline device. It's preferred to use
a live OS such as Tails OS to do this with networking disabled.

Donations are always welcomed as I do not ask any payment to release this.

There is users on Reddit who charge money AND ask your ledger seed to recover their funds. This is what motivated
me to release it for everyone.

// BNB
// bnb1eyvjl0zmp0wke36gxts4hu3wtgtnpw5dnj5ja3

// Ethereum / Ethereum Tokens / BNB / Binance Smart Chain Tokens
// 0x5Cd8C416d3061398b868dC2a5C835C9865caDc7E

// Litecoin
// ltc1qel8yaqz34pqqp87eey7zx0zz6jkk82wu65en6v

// Bitcoin
// bc1q75yh6ttwxazfhxnw3cwpqztvrkttjsh2a73mcy

The tool was writted in NodeJS and is very simple to use.

You need to have NodeJS installed (and npm with it)

First go to the folder where recoverFunds.js is.

If you have networking, simply install required dependency:

npm install ethereum-cryptography

Then:

node recoverFunds.js

If you do not have networking enabled, you could install the dependencies on another machine and safely move the node_modules folder or get the files from https://github.com/ethereum/js-ethereum-cryptography. Please note you might need to manually get the dependencies for that library aswell which is otherwise done by npm.
