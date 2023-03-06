const { findAddress } = require("./recoverFunds_manypaths");

// Fill in values for following variables:
// Enter the address you want to find (the one where your funds are):
const targetAddr = "0xc79bfC83D301031FE4aC559F66a0e1a7D20f4c38".toLowerCase();
// Fill in the Ledger Recovery Phrase (or other mnemonic, if relevant) below (24 words)
const mnemonic = "congress fury organ twenty text cruise sample ugly butter dog until air already flock stool master foil jaguar hint trophy brief remind cake bridge";
// And optionally
// If you used a passphrase on your Ledger Device (the "25th" word),
// Enter it below or otherwise leave as is
const passphrase = "";

findAddress(mnemonic, targetAddr, passphrase);