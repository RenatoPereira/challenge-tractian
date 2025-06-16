import { AssetsService } from "./assets.service";
import { ALL_ASSETS, LOCATIONS, ASSETS } from "~/tests/assets.test.helper";

describe("Asset service test", () => {
  test("prepareAssets", () => {
    const result = AssetsService.prepareAssets(ALL_ASSETS);
    expect(result).toHaveLength(ALL_ASSETS.length);
  });

  test("getParents", () => {
    const assets = AssetsService.prepareAssets(ALL_ASSETS);
    const parents = AssetsService.getParents(assets);

    expect(parents).toHaveLength(4);
    expect(parents).toEqual([
      { ...LOCATIONS[3], hasChildren: true },
      { ...LOCATIONS[1] },
      { ...LOCATIONS[2], hasChildren: true },
      { ...ASSETS[1] },
    ]);
  });

  test("getChildren", () => {
    const assets = AssetsService.prepareAssets(ALL_ASSETS);
    const children = AssetsService.getChildren(LOCATIONS[0].id, assets, null);

    expect(children).toHaveLength(1);
    expect(children).toEqual([
      { ...ASSETS[0], hasChildren: true, parentLevel: 1 },
    ]);
  });

  test("applyFilter 'energy'", () => {
    const assets = AssetsService.prepareAssets(ALL_ASSETS);
    const filtered = AssetsService.applyFilter(assets, "energy");

    expect(filtered).toHaveLength(1);
    expect(filtered.get(ASSETS[1].id)).toBeDefined();
  });

  test("applyFilter 'vibration'", () => {
    const assets = AssetsService.prepareAssets(ALL_ASSETS);
    const filtered = AssetsService.applyFilter(assets, "vibration");

    expect(filtered).toHaveLength(10);
    expect(filtered.get(ASSETS[1].id)).toBeUndefined();
    expect(filtered.get(LOCATIONS[1].id)).toBeUndefined();
  });

  test("searchBy 'Fan - External'", () => {
    const search = ASSETS[1].name;
    const filtered = AssetsService.searchBy(search, ALL_ASSETS);

    expect(filtered).toHaveLength(1);
    expect(filtered.find((item) => item.id === ASSETS[1].id)).toBeDefined();
    expect(
      filtered.find((item) => item.id === LOCATIONS[1].id)
    ).toBeUndefined();
  });

  test("searchBy 'Fan - External' with filter 'vibration' applied", () => {
    const search = ASSETS[1].name;
    const filtered = AssetsService.searchBy(search, ALL_ASSETS, "vibration");

    expect(filtered).toHaveLength(0);
    expect(filtered.find((item) => item.id === ASSETS[1].id)).toBeUndefined();
    expect(
      filtered.find((item) => item.id === LOCATIONS[1].id)
    ).toBeUndefined();
  });

  test("searchBy 'Fan - External' with filter 'energy' applied", () => {
    const search = ASSETS[1].name;
    const filtered = AssetsService.searchBy(search, ALL_ASSETS, "energy");

    expect(filtered).toHaveLength(1);
    expect(filtered.find((item) => item.id === ASSETS[1].id)).toBeDefined();
    expect(
      filtered.find((item) => item.id === LOCATIONS[1].id)
    ).toBeUndefined();
  });

  test("searchBy 'Non-existing asset'", () => {
    const search = "Non-existing asset";
    const filtered = AssetsService.searchBy(search, ALL_ASSETS);

    expect(filtered).toHaveLength(0);
  });
});
