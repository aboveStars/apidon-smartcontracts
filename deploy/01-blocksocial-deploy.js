const { network } = require("hardhat");
const { verify } = require("../utils/verify");

const { localChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const blockSocial = await deploy("BlockSocialV2", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations,
  });

  if (!localChains.includes(network.name)) {
    await verify(blockSocial.address, []);
  }
};

module.exports.tags = ["all", "BlockSocial"];
