const { network } = require("hardhat");
const { verify } = require("../utils/verify");

const { localChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const blockSocialv2simplepayment = await deploy(
    "BlockSocialV2SimplePayment",
    {
      from: deployer,
      args: [],
      log: true,
      waitConfirmations: network.config.blockConfirmations,
    }
  );

  if (!localChains.includes(network.name)) {
    await verify(blockSocialv2simplepayment.address, []);
  }
};

module.exports.tags = ["all", "BlockSocialV2SimplePayment"];
