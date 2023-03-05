import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { ethers } from "ethers";
import abi from "../../contracts/sugarcaneManagerPrimaryBaseAbi";

const smartContractAddress = process.env.GOERLI_MANAGER_SMART_CONTRACT_ADDRESS;

const goerliApiKey = process.env.OZ_DEFENDER_GOERLI_RELAY_API_KEY || "";
const goerliApiSecret = process.env.OZ_DEFENDER_GOERLI_RELAY_API_SECRET || "";
const defenderCredentials = {
  apiKey: goerliApiKey,
  apiSecret: goerliApiSecret,
};

const provider = new DefenderRelayProvider(defenderCredentials);
const signer = new DefenderRelaySigner(defenderCredentials, provider, {
  speed: "fast",
});

export const onboardAccount = async (address: string) => {
  //@ts-ignore
  const contract = new ethers.Contract(smartContractAddress, abi, signer);
  console.log({ address });
  await contract.onboardAccount(address);
  console.log(`Done onboarding ${address} to goerli`);
};
