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
// npm install

const { HDKey } = require("ethereum-cryptography/hdkey");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { mnemonicToSeedSync } = require("ethereum-cryptography/bip39");
const { getPublicKey } = require("ethereum-cryptography/secp256k1");

const { toHex } = require("ethereum-cryptography/utils");

function getAddress(privateKey) {
  const uncomprPub = getPublicKey(privateKey, false);
  return `0x${toHex(keccak256(uncomprPub.slice(1)).slice(-20))}`;
}

function tryPath(parent, path, targetAddr, childIterations = 50) {
  parentAddr = getAddress(parent.privateKey);
  for(let j = 0; j < childIterations; j++) {
    child = parent.deriveChild(j);
    childAddr = getAddress(child.privateKey);
    if(childAddr == targetAddr) {
      console.log(`Parent address: ${parentAddr}`);
      console.log(`Derivation path ${path}/${child.index}`);
      console.log(`Child ${j} address: ${childAddr}`);
      console.log(`Child Private Key: 0x${toHex(child.privateKey)}`);
      console.log("---");
      return 1;
    }
  }
  return 0;
}

function findAddress(mnemonic, targetAddr, passphrase = "") {
  const pathIterations = 50;

  const seed = mnemonicToSeedSync(mnemonic, passphrase);
  const hdkey = HDKey.fromMasterSeed(seed);

  let path;
  let res;

  for(let k = 0; k < pathIterations; k++) {
    path = `m/44'/60'/${k}'`
    res = tryPath(hdkey.derive(path), path, targetAddr);
    if(res === 1) { return; }
    for(let i = 0; i < pathIterations; i++) {
      path = `m/44'/60'/${k}'/${i}`;
      res = tryPath(hdkey.derive(path), path, targetAddr);
      if(res === 1) { return; }
      for(let j = 0; j < pathIterations; j++) {
        path = `m/44'/60'/${k}'/${i}/${j}`;
        res = tryPath(path, targetAddr);
        if(res === 1) { return; }
      }
    }
  }
  console.log("Address was not found.");
}

module.exports = { findAddress }