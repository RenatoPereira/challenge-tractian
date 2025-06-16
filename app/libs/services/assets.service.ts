import type { Asset, AssetSensorType } from "../types/companies.type";

export class AssetsService {
  constructor() {}

  static prepareAssets = (assets: Asset[]) => {
    const mapAssets = new Map<string, Partial<Asset>>();

    assets.forEach((asset) => {
      this.insertItem(mapAssets, asset);

      if (asset.parentId || asset.locationId) {
        this.insertItem(mapAssets, {
          id: (asset.parentId || asset.locationId)!,
          hasChildren: true,
        });
      }
    });

    return mapAssets as Map<string, Asset>;
  };

  static applyFilter = (
    assets: Map<string, Asset>,
    filter: AssetSensorType
  ) => {
    const mapAssets = new Map<string, Asset>();
    const filteredAssets: Asset[] = [];

    assets.forEach((item) => {
      if (item.sensorType === filter) {
        filteredAssets.push(item);
      }
    });

    filteredAssets.forEach((asset) => {
      this.insertItem(mapAssets, asset);

      let parentId = asset.locationId || asset.parentId;

      while (parentId) {
        if (assets.has(parentId)) {
          const parentItem = assets.get(parentId);
          this.insertItem(mapAssets, parentItem!);

          parentId = (parentItem?.locationId || parentItem?.parentId)!;
        } else {
          parentId = null;
        }
      }
    });

    return mapAssets;
  };

  private static insertItem(
    map: Map<string, Partial<Asset>>,
    item: Partial<Asset>
  ) {
    if (!item.id) throw new Error("ID not defined");

    if (map.has(item.id)) {
      const tmpItem = map.get(item.id);

      map.set(item.id, {
        ...tmpItem,
        ...item,
      });
    } else {
      map.set(item.id, item);
    }
  }

  static getParents(items: Map<string, Asset>) {
    const parents: Asset[] = [];

    items.forEach((value) => {
      if (!value.parentId && !value.locationId) {
        parents.push(value);
      }
    });

    return parents;
  }

  static getChildren(
    id: string,
    items: Map<string, Asset>,
    filter: AssetSensorType | null,
    parentLevel = 0
  ) {
    const parents: Asset[] = [];

    const parent = items.get(id);

    if (!parent) return;

    items.forEach((value) => {
      const itemToAdd = {
        ...value,
        parentLevel: parentLevel + 1,
      };

      const hasParent = value.parentId === id || value.locationId === id;
      const compareWithoutFilter = !filter && hasParent;
      const compareWithFilter =
        filter &&
        hasParent &&
        (value.hasChildren || value.sensorType === filter);

      if (compareWithoutFilter || compareWithFilter) {
        parents.push(itemToAdd);
      }
    });

    return parents;
  }

  static searchBy(
    by: string,
    assets: Asset[],
    filter: AssetSensorType | null = null
  ) {
    return assets.filter((item) => {
      if (filter) {
        return (
          item.name.toLocaleLowerCase().includes(by.toLocaleLowerCase()) &&
          item.sensorType === filter
        );
      }

      return item.name.toLocaleLowerCase().includes(by.toLocaleLowerCase());
    });
  }
}
