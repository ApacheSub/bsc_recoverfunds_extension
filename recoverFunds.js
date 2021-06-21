// Donations are welcomed

// BNB
// bnb1eyvjl0zmp0wke36gxts4hu3wtgtnpw5dnj5ja3

// Ethereum / Ethereum Tokens / BNB / Binance Smart Chain Tokens
// 0x5Cd8C416d3061398b868dC2a5C835C9865caDc7E

// Litecoin
// ltc1qel8yaqz34pqqp87eey7zx0zz6jkk82wu65en6v

// Bitcoin
// bc1q75yh6ttwxazfhxnw3cwpqztvrkttjsh2a73mcy

// NOTE!!! Unless you are 100% certain that your seed will not
// be compromised by this, it's best to setup a new seed after
// the process.

// Enter the following command to install required packages
// !!! Or preferably copy them over to an offline device safely
// npm install ethereum-cryptography

// Usage of tool:
// node recoverFunds.js

const { HDKey } = require("ethereum-cryptography/hdkey");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { mnemonicToSeedSync } = require("ethereum-cryptography/bip39");
const { publicKeyConvert } = require("ethereum-cryptography/secp256k1");

// Fill in the Ledger Recovery Phrase below (24 words)
const mnemonic = "";
// If you used a passphrase on your Ledger Device (the "25th" word),
// Enter it below or otherwise leave as is
const passphrase = "";

const seed = mnemonicToSeedSync(mnemonic, passphrase);
const hdkey = HDKey.fromMasterSeed(seed);

function getAddress(comprPub) {
    const uncomprPub = Buffer.from(publicKeyConvert(comprPub, false));
    return `0x${keccak256(uncomprPub.slice(1)).toString("hex").slice(64-40)}`;
}

const parent = hdkey.derive("m/44'/60'/0'/4");
const parentAddr = getAddress(parent.publicKey);
const child = parent.deriveChild(0);
const childAddr = getAddress(child.publicKey);
console.log(`Parent address: ${parentAddr}`);
console.log(`Child address: ${childAddr}`);
console.log(`Private Key: ${child.privateKey.toString("hex")}`);
