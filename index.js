const {findAddress} = require("./recoverFunds_manypaths");

// Fill in values for following variables:
// Enter the address you want to find (the one where your funds are):
const targetAddr = "REPLACETHISWITHTARGETADDRESS".toLowerCase();

// Fill in the Ledger Recovery Phrase (or other mnemonic, if relevant) below (24 words)
const mnemonic = "REPLACETHISWITHMNEMONIC";

// And optionally
// If you used a passphrase on your Ledger Device (the "25th" word),
// Enter it below or otherwise leave as is
// Leave unchanged if passphrase is not being used
const passphrase = "";

findAddress(mnemonic, targetAddr, passphrase);