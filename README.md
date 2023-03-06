# bsc_recoverfunds_extension

A repository for tool(s) to recover access to funds lost due to Binance Chain Wallet extension

This tool will help if you have generated an address on the Binance Chain Wallet that does not let you spend the money although it will request Ledger to approve the transaction. It's due to the fact that in some cases the extension will generate an address using a different derivation path than intended. This tool will likely help give users recover that money.

**NOTE: The tool may be helpful in other scenarios also, for example, when seeking an ethereum address path that was used and can't be found otherwise**

## Discussion about issue:

https://old.reddit.com/r/ledgerwallet/comments/nmr43f/psa_bug_in_binance_chain_wallet_chrome_extension/

https://old.reddit.com/r/ledgerwallet/comments/mnj9vx/missing_address_for_binance_smart_chain_generated/

This tool will help users who have lost funds due to the Binance Chain Wallet extension where
it generated addresses from Ledger that users could not spend from.

The tool is simple but requires the Ledger Recovery Phrase. It's recommended to do it on an offline device. It's preferred to use
a live OS such as Tails OS to do this with networking disabled.

## Donations

// BNB
bnb1eyvjl0zmp0wke36gxts4hu3wtgtnpw5dnj5ja3

// Ethereum / Ethereum Tokens / BNB / Binance Smart Chain Tokens
0x5Cd8C416d3061398b868dC2a5C835C9865caDc7E

// Litecoin
ltc1qel8yaqz34pqqp87eey7zx0zz6jkk82wu65en6v

// Bitcoin
bc1q75yh6ttwxazfhxnw3cwpqztvrkttjsh2a73mcy

## Instructions

The tool was written in NodeJS and is very simple to use.

You need to have NodeJS installed (and npm with it)

First go to the folder where index.js is

1. Open index.js in your favorite text editor
2. Edit the targetAddr variable with the address your funds are in e.g. the address you need private key for
3. Add your ledger recovery phrase (the 24 words) to its place by editing the mnemonic variable
4. Optionally also add the passphrase incase you used a "25th" word on your ledger.
5. Save the file
6. 
If you have networking enabled, simply install required dependencies:
```
npm install
```

Then run the script:
```
node index.js
```

OR the example script
```
node example_index.js
```

Ensure that the address printed is correct and then proceed to import the private key to a wallet you prefer. I would recommend Metamask.

If you do not have networking enabled, you could install the dependencies on another machine and safely move the node_modules folder or get the files from https://github.com/ethereum/js-ethereum-cryptography. Please note you might need to manually get the dependencies for that library aswell which is otherwise done by npm.