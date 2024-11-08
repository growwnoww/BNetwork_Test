interface PlanetDetails {
  planetNum: number;
  planetName: string;
  planetPrice: number;
  rewardCoinAmount:number
}

export interface cosmosautpoolType {
  id: string;
  recycleNumber: number;
  reg_user_address: string;
  bn_id: string;
  planetName: string;
  amount: number;
  currentPosition: number;
  currentLevel: number;
  timestamp: Date;
  autoPoolId: string;
}

export interface AncestorsArrayTypes {
  id: string;
  ancestorsNumber: number;
  wallet_address: string;
  userId: string;
}


export interface BulkPlanetBuyTypes{
    wallet_address:string;
    planetNum:number;
  }

export const PlanetDetailsMap: Record<number, PlanetDetails> = {
  1: { planetNum: 1, planetName: "Earth", planetPrice: 5, rewardCoinAmount:0.10 },
  2: { planetNum: 2, planetName: "Moon", planetPrice: 10,rewardCoinAmount:0.20 },
  3: { planetNum: 3, planetName: "Mars", planetPrice: 25 ,rewardCoinAmount:0.40},
  4: { planetNum: 4, planetName: "Mercury", planetPrice: 50, rewardCoinAmount:0.80},
  5: { planetNum: 5, planetName: "Venus", planetPrice:100 , rewardCoinAmount:1.60 },
  6: { planetNum: 6, planetName: "Jupiter", planetPrice: 250 ,rewardCoinAmount:3.20},
  7: { planetNum: 1, planetName: "Saturn", planetPrice: 500 ,rewardCoinAmount:6.40},
  8: { planetNum: 2, planetName: "Uranus", planetPrice: 1000 ,rewardCoinAmount:12.80},
  9: { planetNum: 3, planetName: "Neptune", planetPrice: 2500,rewardCoinAmount:15.00 },
  10: { planetNum: 4, planetName: "Pluto", planetPrice: 5000,rewardCoinAmount:20.00 },
};

export const getPlanetDetailsById = (planetId: number): PlanetDetails => {
  return PlanetDetailsMap[planetId] || null;
};
