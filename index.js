// Donations are welcome

// BNB
// bnb1eyvjl0zmp0wke36gxts4hu3wtgtnpw5dnj5ja3

// Ethereum / Ethereum Tokens / BNB / Binance Smart Chain Tokens
// 0x5Cd8C416d3061398b868dC2a5C835C9865caDc7E

// Litecoin
// ltc1qel8yaqz34pqqp87eey7zx0zz6jkk82wu65en6v

// Bitcoin
// bc1q75yh6ttwxazfhxnw3cwpqztvrkttjsh2a73mcy

const { AddressFinder } = require("./recoverFunds_manypaths");

// Fill in values for following variables:
// Enter the address you want to find (the one where your funds are):
const TARGET_ADDR = "REPLACETHISWITHTARGETADDRESS".toLowerCase();

// Fill in the Ledger Recovery Phrase (or other mnemonic, if relevant) below (24 words for example)
const MNEMONIC = "REPLACETHISWITHMNEMONIC";

// And optionally
// If you used a passphrase on your Ledger Device (the "25th" word),
// Enter it below or otherwise leave as is
// Leave unchanged if passphrase is not being used
const PASSPHRASE = "";

const MAX_DEPTH = 2;
const MAX_PATH_INDEX = 20;
const MAX_CHILD_INDEX = 20;

let finder = new AddressFinder(MNEMONIC, PASSPHRASE, MAX_DEPTH, MAX_PATH_INDEX, MAX_CHILD_INDEX);
finder.findAddress(TARGET_ADDR);