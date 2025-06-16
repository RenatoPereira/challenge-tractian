import { render, screen } from "@testing-library/react";
import { AssetsService } from "~/libs/services/assets.service";
import { ItemTree } from ".";
import userEvent from "@testing-library/user-event";
import { ALL_ASSETS, LOCATIONS, ASSETS } from "~/tests/assets.test.helper";

describe("Item component test", () => {
  const assets = AssetsService.prepareAssets(ALL_ASSETS);
  const showAction = vitest.fn();
  const hideAction = vitest.fn();

  beforeEach(() => {
    showAction.mockClear();
    hideAction.mockClear();
  });

  test("Render an location correctly", async () => {
    await render(
      <ItemTree
        asset={assets.get(LOCATIONS[0].id)!}
        showAction={showAction}
        hideAction={hideAction}
      />
    );
    expect(screen.getByText(LOCATIONS[0].name)).toBeInTheDocument();
    expect(screen.getByTestId("icon-location")).toBeInTheDocument();
  });

  test("Render an asset correctly", async () => {
    await render(
      <ItemTree
        asset={assets.get(ASSETS[1].id)!}
        showAction={showAction}
        hideAction={hideAction}
      />
    );
    expect(screen.getByText(ASSETS[1].name)).toBeInTheDocument();
    expect(screen.getByTestId("icon-asset")).toBeInTheDocument();
  });

  test("Render an asset group correctly", async () => {
    await render(
      <ItemTree
        asset={assets.get(ASSETS[0].id)!}
        showAction={showAction}
        hideAction={hideAction}
      />
    );
    expect(screen.getByText(ASSETS[0].name)).toBeInTheDocument();
    expect(screen.getByTestId("icon-asset-group")).toBeInTheDocument();
  });

  test("Should toggle showAction and hideAction on click if asset has children", async () => {
    await render(
      <ItemTree
        asset={assets.get(ASSETS[0].id)!}
        showAction={showAction}
        hideAction={hideAction}
      />
    );
    const item = screen.getByText(ASSETS[0].name);
    const user = userEvent.setup();

    await user.click(item);
    expect(showAction).toHaveBeenCalledWith(ASSETS[0].id);

    await user.click(item);
    expect(hideAction).toHaveBeenCalledWith(ASSETS[0].id);

    expect(hideAction).toHaveBeenCalledTimes(1);
    expect(showAction).toHaveBeenCalledTimes(1);
  });

  test("Shouldn't call showAction or hideAction for leafs", async () => {
    await render(
      <ItemTree
        asset={assets.get(ASSETS[1].id)!}
        showAction={showAction}
        hideAction={hideAction}
      />
    );

    const item = screen.getByText(ASSETS[1].name);
    item.click();

    expect(showAction).not.toBeCalled();
    expect(hideAction).not.toBeCalled();
  });
});
