import { GetNFTSTypes } from '@/actions/royaltynft/types';
import {atom} from 'recoil'



export const disableIdsAtom = atom<number[]>({
    key: 'disableIdsAtom',
    default: [],
  });


export const selectNFT2 = atom({
    key:"selectNFTs2",
    default:false
})

export const selectNFT3 = atom({
    key:"selectNFTs3",
    default:false
})

export const nft2Info = atom<GetNFTSTypes | null>({
    key:"nft2Info",
    default:null
})

export const nft3Info = atom<GetNFTSTypes | null>({
    key:"nft3Info",
    default:null
})