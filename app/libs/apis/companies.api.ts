import { AssetsService } from "../services/assets.service";

export class CompaniesApi {
  static url = import.meta.env.VITE_API_URL + "/companies";

  constructor() {}

  static async getAll() {
    try {
      const response = await fetch(this.url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  static async getAssets(id: string) {
    try {
      const locationsPromise = fetch(`${this.url}/${id}/locations`);
      const assetsPromise = fetch(`${this.url}/${id}/assets`);

      const [locationsResponse, assetsResponse] = await Promise.all([
        locationsPromise,
        assetsPromise,
      ]);

      if (!locationsResponse.ok) {
        throw new Error(
          `Locations response status: ${locationsResponse.status}`
        );
      }

      if (!assetsResponse.ok) {
        throw new Error(`Assets response status: ${assetsResponse.status}`);
      }

      const locationsTmp = await locationsResponse.json();
      const assetsTmp = await assetsResponse.json();

      return [...locationsTmp, ...assetsTmp];
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }
}
