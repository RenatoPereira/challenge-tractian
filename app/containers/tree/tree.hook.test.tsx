import { act, renderHook, waitFor } from "@testing-library/react";
import { useAssets } from "./tree.hook";
import { ALL_ASSETS, ASSETS } from "~/tests/assets.test.helper";
import { AssetsService } from "~/libs/services/assets.service";
import { useFilterStore } from "~/stores/filter.store";
import { useSearchStore } from "~/stores/search.store";

describe("Tree hook test", () => {
  const mapAssets = AssetsService.prepareAssets(ALL_ASSETS);
  const parents = AssetsService.getParents(mapAssets);

  const children = AssetsService.getChildren(
    parents[0].id,
    AssetsService.prepareAssets(ALL_ASSETS),
    null
  );

  beforeEach(async () => {
    renderHook(async () => {
      const filterBy = useFilterStore((store) => store.filterBy);
      await act(() => filterBy(null));
    });

    renderHook(async () => {
      const searchBy = useSearchStore((store) => store.searchBy);
      await act(() => searchBy(""));
    });
  });

  test("should return visibleAssets", async () => {
    const { result } = renderHook(() => useAssets(ALL_ASSETS));
    expect(result.current.visibleAssets).toEqual(parents);
  });

  test("should return visibleAssets filtered", async () => {
    const { result } = renderHook(() => useAssets(ALL_ASSETS));

    renderHook(async () => {
      const filterBy = useFilterStore((store) => store.filterBy);
      await act(() => filterBy("energy"));
    });

    waitFor(() => {
      expect(result.current.visibleAssets).toEqual(mapAssets.get(ASSETS[1].id));
    });
  });

  test("should return visibleAssets after a search", async () => {
    const { result } = renderHook(() => useAssets(ALL_ASSETS));
    renderHook(async () => {
      const searchBy = useSearchStore((store) => store.searchBy);
      await act(() => searchBy("fan"));
    });

    waitFor(() => {
      expect(result.current.visibleAssets).toEqual(ASSETS[1]);
    });
  });

  test("should return visibleAssets with the children", async () => {
    const { result } = renderHook(() => useAssets(ALL_ASSETS));

    act(() => {
      result.current.addChildren(parents[0].id);
    });

    expect(result.current.visibleAssets).toEqual([
      ...parents.slice(0, 1),
      ...children!,
      ...parents.slice(1),
    ]);
  });

  test("should return visibleAssets closing parent", async () => {
    const { result } = renderHook(() => useAssets(ALL_ASSETS));

    act(() => {
      result.current.addChildren(parents[0].id);
      result.current.addChildren(children![0].id);
      result.current.removeChildren(parents[0].id);
    });

    expect(result.current.visibleAssets).toEqual(parents);
  });
});
