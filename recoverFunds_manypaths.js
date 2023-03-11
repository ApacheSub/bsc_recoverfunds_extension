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

class AddressFinder {
  #seed;
  #hdkey;

  #maxDepth;
  #maxPathIndex;
  #maxChildIndex;
  
  // Not needed currently
  //#alphabet = [...Array(26).keys()].map((n) => String.fromCharCode(97 + n));
  #regularPaths = [
    // Derivation path not supported by the ethereum-cryptography library
    ["m/44'/60'/0'/", ""],
    ["m/44'/60'/", "'/0/0"],
    ["m/44'/60'/0'/0/", ""]
  ];

  constructor(mnemonic, passphrase, maxDepth=2, maxPathIndex=100, maxChildIndex=100) {
    this.#seed = mnemonicToSeedSync(mnemonic, passphrase);
    this.#hdkey = HDKey.fromMasterSeed(this.#seed);
    this.#maxDepth = maxDepth;
    this.#maxPathIndex = maxPathIndex;
    this.#maxChildIndex = maxChildIndex;
  }

  #printResult(addr, path, privKey) {
    console.log("---");
    console.log(`Address: ${addr}`);
    console.log(`Derivation path ${path}`);
    console.log(`Private Key: 0x${toHex(privKey)}`);
    console.log("---");
  }

  #getAddress(privateKey) {
    const uncomprPub = getPublicKey(privateKey, false);
    return `0x${toHex(keccak256(uncomprPub.slice(1)).slice(-20))}`;
  }

  #tryPath(path, targetAddr) {
    let parent = this.#hdkey.derive(path);
    let parentAddr = this.#getAddress(parent.privateKey);
    if(parentAddr === targetAddr) { 
      this.#printResult(parentAddr, path, parent.privateKey);
      return 1;
    }
    let child, childAddr;
    for(let j = 0; j <= this.#maxChildIndex; j++) {
      child = parent.deriveChild(j);
      childAddr = this.#getAddress(child.privateKey);
      if(childAddr === targetAddr) {
        this.#printResult(childAddr, `${path}/${child.index}`, child.privateKey);
        return 1;
      }
    }
    return 0;
  }

  #tryRegularPaths(targetAddr) {
    for(const element of this.#regularPaths) {
      for(let i = 0; i <= this.#maxPathIndex; i++) {
        if(this.#tryPath(element[0] + i + element[1], targetAddr) === 1) {
          return;     
        };
      }
    };
  }

  #recurseIrregularPaths(targetAddr, paths = [["m/44'/60'/", 0, 0]]) {
    if(paths.length > 0) {
      const [path, index, depth] = paths.pop();
      if(index <= this.#maxPathIndex) {
        if(this.#tryPath(`${path}${index}`, targetAddr) === 1 ||
        this.#tryPath(`${path}${index}'`, targetAddr) === 1) {
          return;
        }
        // Add path back to the array as long as maxPathIndex 
        // will not be exceeded
        if(index < this.#maxPathIndex) { paths.push([path, index+1, depth]); }
        // Increase depth of current path if maxDepth not exceeded
        if(depth <= this.#maxDepth) {
          paths.push([`${path}${index}/`, 0, depth+1]);
          paths.push([`${path}${index}'/`, 0, depth+1]);
        }
        return this.#recurseIrregularPaths(targetAddr, paths);
      }
    } else {
      return;
    }
  }

  findAddress(targetAddr) {
    this.#tryRegularPaths(targetAddr);
    this.#recurseIrregularPaths(targetAddr);
    // Example of adding another coin type to be recursed
    //this.#recurseIrregularPaths(targetAddr, [["m/44'/60'/", 0, 0], ["m/44'/61'/", 0, 0]]);
  }

}

module.exports = { AddressFinder }