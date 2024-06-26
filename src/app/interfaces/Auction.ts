export interface IAuction {
  brandName: string;
  modelName: string;
  chassisNumber: string;
  auctionDate: string;
  yearOfProduction: string;
  providerMileage: string;
  providerId: string;
  auctionImages: Array<string>;
  auctionName: string;
  lotNumber: string;
  providerBrandId: string;
  providerModelId: string;
  engineSizeCc: string;
  power: string;
  modelGrade: string;
  exteriorColorName: string;
  transmissionType: string;
  providerTransmissionTypeId: string;
  wheelDrive: string;
  equipment: string;
  auctionScore: string;
  auctionStartPrice: string;
  auctionEndPrice: string;
  auctionStatus: string;
  providerAuctionAverageEndPrice: string;
  providerAuctionAverageEndPriceString: string;
  serial: string;
  info: string;
  watchlist: boolean;
}

export interface IAuctionFilters {
  auctionDates?: string[] | undefined;
  engineSizeCc?: number[] | undefined;
  exteriorColorNames?: string[] | undefined;
  providerMileage?: number[] | undefined;
  transmissionTypes?: string[] | undefined;
  yearOfProduction?: number[] | undefined;
}
