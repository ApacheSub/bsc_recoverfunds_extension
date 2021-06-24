// Donations are welcomed

// BNB
// bnb1eyvjl0zmp0wke36gxts4hu3wtgtnpw5dnj5ja3

// Ethereum / Ethereum Tokens / BNB / Binance Smart Chain Tokens
// 0x5Cd8C416d3061398b868dC2a5C835C9865caDc7E

// Litecoin
// ltc1qel8yaqz34pqqp87eey7zx0zz6jkk82wu65en6v

// Bitcoin
// bc1q75yh6ttwxazfhxnw3cwpqztvrkttjsh2a73mcy

// Bruteforce version of the recover script

// NOTE!!! Unless you are 100% certain that your seed will not
// be compromised by this, it's best to setup a new seed after
// the process.

// Enter the following command to install required packages
// !!! Or preferably copy them over to an offline device safely
// npm install ethereum-cryptography

// Usage of tool:
// node recoverFunds_brute.js

const { HDKey } = require("ethereum-cryptography/hdkey");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { mnemonicToSeedSync } = require("ethereum-cryptography/bip39");
const { publicKeyConvert } = require("ethereum-cryptography/secp256k1");

// Fill in values for following variables:
// Enter the address you want to find (the one where your funds are):
const targetAddr = "".toLowerCase();
// Fill in the Ledger Recovery Phrase below (24 words)
const mnemonic = "";

// And optionally
// If you used a passphrase on your Ledger Device (the "25th" word),
// Enter it below or otherwise leave as is
const passphrase = "";

const pathIterations = 50;
const childIterations = 50;



const seed = mnemonicToSeedSync(mnemonic, passphrase);
const hdkey = HDKey.fromMasterSeed(seed);

function getAddress(comprPub) {
    const uncomprPub = Buffer.from(publicKeyConvert(comprPub, false));
    return `0x${keccak256(uncomprPub.slice(1)).toString("hex").slice(64-40)}`;
}

let path;
let parent;
let parentAddr;
let child;
let childAddr;

for(let k = 0; k < pathIterations; k++) {
    for(let i = 0; i < pathIterations; i++) {
        // If unlucky with this derivation path, one can try to mess around with different derivation paths
        path = `m/44'/60'/${k}'/${i}`;
        parent = hdkey.derive(path);
        parentAddr = getAddress(parent.publicKey);
        for(let j = 0; j < childIterations; j++) {
            child = parent.deriveChild(j);
            childAddr = getAddress(child.publicKey);
            if(childAddr == targetAddr) {
              console.log(`Parent address: ${parentAddr}`);
              console.log(`Derivation path ${path}`);
              console.log(`Child ${j} address: ${childAddr}`);
              console.log(`Child Private Key: ${child.privateKey.toString("hex")}`);
              console.log("---");
              return;
            }
          }
    }
}
