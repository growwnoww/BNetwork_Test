import cosmosAbi from "@/contract/cosmosnetwork/cosmosAbi.json";
import { BLOCHAIN_CHAIN_ID } from "@/lib/secret";
import usdtAbi from "@/contract/cosmosnetwork/usdtAbi.json";
import { Account } from "thirdweb/wallets";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";
import { chainId, client, TestnetChain } from "@/lib/client";
import { ethers } from "ethers";
import { redirect } from "next/navigation";


export const cosmosnetworkAbi = cosmosAbi;
export const cosmosnetworkAddress ="0x5ea64Ab084722Fa8092969ED45642706978631BD";

const CHAINSTACK_ID = BLOCHAIN_CHAIN_ID;

export const getCosmosContractInstance = async (activeAccount: Account) => {
  try {
    const signer = await ethers5Adapter.signer.toEthers({
      client,
      chain: chainId,
      account: activeAccount,
    });



    const cosmosContractInstance = new ethers.Contract(
      cosmosnetworkAddress,
      cosmosnetworkAbi,
      signer
    );

    return cosmosContractInstance;
  } catch (error) {
    console.error(
      "Failed to initialize the cosmosContractInstance contract instance:",
      error
    );
    redirect('/')
  }
};

export const getGasPrice = async (activeAccount: Account) =>{
  try {
    const signer = await ethers5Adapter.signer.toEthers({
      client,
      chain: chainId,
      account: activeAccount,
    });


    return signer.getGasPrice;

    
  } catch (error) {
    console.error(
      "Failed to initialize the getGasPrice  instance:",
      error
    );
    redirect('/')

  }
}


