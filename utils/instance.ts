import { type SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { type Permission } from "@luxfhe/sdk/node";
import { type HardhatRuntimeEnvironment } from "hardhat/types/runtime";

export const getTokensFromFaucet = async (
  hre: HardhatRuntimeEnvironment,
  address: string,
) => {
  if (hre.network.name === "localluxfhe") {
    if ((await hre.ethers.provider.getBalance(address)).toString() === "0") {
      await hre.luxfhe.getFunds(address);
    }
  }
};

export const createPermissionForContract = async (
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
  contractAddress: string,
): Promise<Permission> => {
  const provider = hre.ethers.provider;

  const permit = await hre.luxfhe.generatePermit(
    contractAddress,
    provider,
    signer,
  );
  const permission = hre.luxfhe.extractPermitPermission(permit);

  return permission;
};
