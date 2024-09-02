import cosmosAbi from '@/contract/cosmosnetwork/cosmosAbi.json';
import { BLOCHAIN_CHAIN_ID } from '@/lib/secret';


export const cosmosnetworkAbi = cosmosAbi;
export const cosmosnetworkAddress =  process.env.COSMOSNETWORK_CONTRACT!;
const CHAINSTACK_ID = BLOCHAIN_CHAIN_ID;




//event to get registered user on blockchain




