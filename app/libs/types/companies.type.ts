export type Company = {
  id: string;
  name: string;
};

export type Location = {
  id: string;
  name: string;
  parentId: string | null;
};

export type Asset = {
  id: string;
  name: string;
  parentId: string | null;
  sensorId: string | null;
  sensorType: AssetSensorType | null;
  status: AssetStatus | null;
  gatewayId: string | null;
  locationId: string | null;
  hasChildren?: boolean;
  parentLevel?: number;
};

export type AssetStatus = "operating" | "alert";
export type AssetSensorType = "energy" | "vibration";
