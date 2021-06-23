# bsc_recoverfunds_extension
A repository for tool(s) to recover access to funds lost due to Binance Chain Wallet extension

This tool will help if you have generated an address on the Binance Chain Wallet that does not let you spend the money although it will request Ledger to approve the transaction. It's due to the fact that in some cases the extension will generate an address using a different derivation path than intended. This tool will likely help give users recover that money.

Discussion about issue:

https://old.reddit.com/r/ledgerwallet/comments/nmr43f/psa_bug_in_binance_chain_wallet_chrome_extension/

https://old.reddit.com/r/ledgerwallet/comments/mnj9vx/missing_address_for_binance_smart_chain_generated/

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

There is two versions of the script. recoverFunds.js that only checks the 0 index address (it is the one that I personally found the address with) and recoverFunds_brute.js that checks as many child addresses as needed.

First go to the folder where recoverFunds.js or recoverFunds_bruteis.

Then edit the file recoverFunds*.js by adding your ledger recovery phrase (the 24 words) to it's place by editing the mnemonic variable. Optionally also add the passphrase incase you used a "25th" word on your ledger.

If you're using the brute version of the script, do the aforementioned steps and then also enter target address as well as how many iterations you wish to run. Currently the script will be able to try different path values each ranging from 0...pathIterations. 0...childIterations children is derived for each path. If needed, it might be worthwhile to experiment with different kinds of paths depending on the use case. This script should give a good idea on how it all works.

If you have networking enabled, simply install required dependency:
```
npm install ethereum-cryptography
```
Then run the script:
```
node recoverFunds.js
```
OR
```
node recoverFunds_brute.js
```

Ensure that the address printed is correct and then proceed to import the private key to a wallet you prefer. I would recommend Metamask.

If you do not have networking enabled, you could install the dependencies on another machine and safely move the node_modules folder or get the files from https://github.com/ethereum/js-ethereum-cryptography. Please note you might need to manually get the dependencies for that library aswell which is otherwise done by npm.
