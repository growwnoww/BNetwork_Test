export interface UserTypes {
    id: string;
    bn_id: string | null;
    wallet_address: string;
    sponser_address: string | null;
    directTeam_Count: number | null;
    totalTeam_Count: number | null;
    directEarning:number | null;
    levelEarning:number | null;
    upgradeEarning:number | null;
    isRegistered: boolean | null;
    lastestPlanetName:string | null;
    myLaps: number | null;
} 