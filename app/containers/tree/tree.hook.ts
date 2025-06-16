import { useEffect, useRef, useState } from "react";
import { AssetsService } from "~/libs/services/assets.service";
import type { Asset, AssetSensorType } from "~/libs/types/companies.type";
import { useFilterStore } from "~/stores/filter.store";
import { useSearchStore } from "~/stores/search.store";

export const useAssets = (assets: Asset[]) => {
  const map = useRef<Map<string, Asset> | null>(null);
  const mapFiltered = useRef<Map<string, Asset> | null>(null);
  const [visibleAssets, setVisibleAssets] = useState<Asset[]>([]);

  const searchValue = useSearchStore((store) => store.search);
  const filterValue = useFilterStore((store) => store.filter);

  const addChildren = (id: string) => {
    const newAssets = [...visibleAssets];
    const parent = newAssets.find((item) => item.id === id);
    const indexOfParent = newAssets.findIndex((item) => item.id === id);

    const children = AssetsService.getChildren(
      id,
      mapFiltered.current!,
      filterValue,
      parent?.parentLevel
    );

    newAssets.splice(indexOfParent + 1, 0, ...children!);

    setVisibleAssets(newAssets);
  };

  const removeChildren = (id: string) => {
    const newAssets = [...visibleAssets];
    const indexOfParent = newAssets.findIndex((item) => item.id === id);
    const indexNextParent = newAssets.findIndex(
      (item, index) =>
        !item.parentId && !item.locationId && index > indexOfParent
    );

    newAssets.splice(
      indexOfParent + 1,
      (indexNextParent || newAssets.length) - indexOfParent - 1
    );

    setVisibleAssets(newAssets);
  };

  const prepareAssets = (items: Asset[]) => {
    const mapAssets = AssetsService.prepareAssets(items);

    setVisibleAssets(AssetsService.getParents(mapAssets));

    mapFiltered.current = mapAssets;

    return mapAssets;
  };

  const applyFilter = (filter: AssetSensorType) => {
    const filteredAssets = AssetsService.applyFilter(map.current!, filter);
    mapFiltered.current = filteredAssets;
    setVisibleAssets(AssetsService.getParents(filteredAssets));
  };

  useEffect(() => {
    const mapAssets = prepareAssets(assets);
    map.current = mapAssets;
  }, [assets]);

  useEffect(() => {
    if (searchValue === "") {
      if (filterValue === null) {
        prepareAssets(assets);
      } else {
        applyFilter(filterValue);
      }
    } else {
      setVisibleAssets(
        AssetsService.searchBy(searchValue, assets, filterValue)
      );
    }
  }, [searchValue]);

  useEffect(() => {
    if (filterValue === null) {
      prepareAssets(assets);
    } else {
      applyFilter(filterValue);
    }
  }, [filterValue]);

  return {
    visibleAssets,
    addChildren,
    removeChildren,
  };
};
