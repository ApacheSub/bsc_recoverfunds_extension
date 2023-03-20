const assert = require('assert');
const AddressFinder = require("../recoverFunds_manypaths");
const { expect } = require('chai');
describe('AddressFinder', function() {
    const TARGET_ADDR = "0xc79bfC83D301031FE4aC559F66a0e1a7D20f4c38".toLowerCase();
    const MNEMONIC = "congress fury organ twenty text cruise sample ugly butter dog until air already flock stool master foil jaguar hint trophy brief remind cake bridge";
    const PASSPHRASE = "";

    const MAX_DEPTH = 2;
    const MAX_PATH_INDEX = 20;
    const MAX_CHILD_INDEX = 20;

    let finder = new AddressFinder(MNEMONIC, PASSPHRASE, MAX_DEPTH, MAX_PATH_INDEX, MAX_CHILD_INDEX);

    describe('#findAddress()', function() {
        it('address should be found and true should be returned', function() {
            expect(finder.findAddress(TARGET_ADDR)).to.be.true;
        });
    });
});
