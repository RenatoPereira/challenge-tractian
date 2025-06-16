import { render, screen, renderHook } from "@testing-library/react";
import { AssetContainer } from ".";
import { useAssetStore } from "~/stores/asset.store";

describe("Asset container test", () => {
  test("should render Asset container correctly", () => {
    render(<AssetContainer />);

    expect(screen.getByText("Please select a asset")).toBeInTheDocument();
  });

  test("Should display a seleted asset", async () => {
    renderHook(() => {
      const setAsset = useAssetStore((store) => store.setAsset);
      setAsset({
        id: "1",
        name: "Test Asset",
        status: "alert",
        sensorType: "energy",
        sensorId: "sensor-123",
        gatewayId: "gateway-456",
        hasChildren: false,
        parentLevel: 0,
        parentId: null,
      });
    });

    render(<AssetContainer />);

    expect(screen.getByText("Test Asset")).toBeInTheDocument();
    expect(screen.getByText("sensor-123")).toBeInTheDocument();
    expect(screen.getByText("gateway-456")).toBeInTheDocument();
    expect(screen.getByTestId("icon-energy")).toBeInTheDocument();
  });
});
