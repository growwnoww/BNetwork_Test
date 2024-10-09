// nftContract.ts
'use client';

import nft_abi from '@/contract/royaltynfts/nft-contract-abi.json';

import { ethers5Adapter } from 'thirdweb/adapters/ethers5';
import { chainId, client } from '@/lib/client';
import { ethers } from 'ethers';
import { redirect } from 'next/navigation';
import { Account } from 'thirdweb/wallets';


export const nft_contract_abi = nft_abi;
export const nft_contract_address = '0x7b8F7e6849027bEbFf2c826bD729c689Db7c97bA';


export const getNftContractInstance = async (
  activeAccount: Account
) => {
  try {
    


    const signer = await ethers5Adapter.signer.toEthers({
      client,
      chain: chainId,
      account: activeAccount,
    });




    const nftContractInstance = new ethers.Contract(
      nft_contract_address,
      nft_contract_abi,
      signer
    ) 




    return nftContractInstance!
  } catch (error) {
    console.error('Failed to initialize the contract instance:', error);
    redirect('/')

  }
};

