const { deployments, ethers } = require("hardhat");
const { assert } = require("chai");

describe("BlockSocialV2Tests", async () => {
  let blockSocialV2;
  beforeEach(async () => {
    await deployments.fixture(["all"]);
    blockSocialV2 = await ethers.getContract("BlockSocialV2");
  });

  describe("Is NFT Minting working right?", async () => {
    it("Is token counting working right?", async () => {
      await new Promise(async (resolve) => {
        blockSocialV2.once("Minted", async () => {
          try {
            const currentTokenCount = await blockSocialV2.getTokenCount();
            const expectedTokenCount = 1;
            assert.equal(currentTokenCount, expectedTokenCount);
            resolve()
          } catch (error) {
            console.error(error);
          }
        });
        const fakeUri = "fakeuri";
        const tx = await blockSocialV2.mint(fakeUri);
        await tx.wait(1);
      });
    });
    it("Is token uri working right?", async () => {
      await new Promise(async (resolve) => {
        blockSocialV2.once("Minted", async () => {
          try {
            const currentTokenUri = await blockSocialV2.tokenURI(0);
            const expectedTokenUri = "fakeuri";
            assert.equal(currentTokenUri, expectedTokenUri);
            resolve()
          } catch (error) {
            console.error(error);
          }
        });
        const fakeUri = "fakeuri";
        const tx = await blockSocialV2.mint(fakeUri);
        await tx.wait(1);
      });
    });
  });
});
