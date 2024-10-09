import toast from "react-hot-toast";

export function shortenAddress(address: string, startChars: number = 8, endChars: number = 6): string {
  if(!address){
    return '';
  }
    if (address.length <= (startChars + endChars)) {
      return address; 
    }
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  }
  
 export const handleCopy = (textToCopy:string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Address Copied!");
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };


export const getNFTName = (tokenType: number): string => {
  switch (tokenType) {
      case 0:
          return "Just Spaceship";
      case 1:
          return "EarthNFT";
      case 2:
          return "MarsNFT";
      case 3:
          return "VenusNFT";
      case 4:
          return "SaturnNFT";
      case 5:
          return "NeptuneNFT";
      default:
          return "UnknownNFT";
  }
}
export const getNftNumber = (tokenType: string): number => {
  switch (tokenType) {
      case "Just Spaceship":
          return 0;
      case "EarthNFT":
          return 1;
      case "MarsNFT":
          return 2;
      case "VenusNFT":
          return 3;
      case "SaturnNFT":
          return 4;
      case "NeptuneNFT":
          return 5;
      default:
          return -1;
  }
}
