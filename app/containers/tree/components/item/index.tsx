import { useState } from "react";
import { AiOutlineCodepen } from "react-icons/ai";
import { GoChevronDown, GoLocation } from "react-icons/go";
import { IoCubeOutline } from "react-icons/io5";
import type { Asset } from "~/libs/types/companies.type";
import { AssetStatus } from "~/components/asset-status";
import { useAssetStore } from "~/stores/asset.store";

import s from "./item.module.scss";

type Props = {
  asset: Asset;
  showAction: (id: string) => void;
  hideAction: (id: string) => void;
};

export const ItemTree = ({ asset, showAction, hideAction }: Props) => {
  const [visible, setVisible] = useState(false);

  const setAsset = useAssetStore((store) => store.setAsset);
  const selectedAsset = useAssetStore((store) => store.asset);

  const toggleDisplay = () => {
    if (visible) {
      hideAction(asset.id);
    } else {
      showAction(asset.id);
    }

    setVisible((state) => {
      return !state;
    });
  };

  const openAction = () => {
    setAsset(asset);
  };

  const getIcon = () => {
    if (typeof asset.sensorType === "undefined") {
      return <GoLocation data-testid="icon-location" />;
    }
    if (asset.hasChildren) {
      return <IoCubeOutline data-testid="icon-asset-group" />;
    }

    return <AiOutlineCodepen data-testid="icon-asset" />;
  };

  return (
    <button
      onClick={asset.hasChildren ? toggleDisplay : openAction}
      className={`${s.item} ${selectedAsset?.id === asset.id ? s.active : ""}`}
      style={{
        marginLeft:
          (asset.hasChildren ? 0 : 26) + (asset.parentLevel || 0) * 28,
      }}
    >
      {asset.hasChildren ? (
        <span className={`${s.arrow} ${visible ? s.rotate : ""}`}>
          <GoChevronDown />
        </span>
      ) : (
        <></>
      )}
      <span className={s.icon}>{getIcon()}</span>
      {asset.name}{" "}
      <span className={s.status}>
        <AssetStatus status={asset.status} sensorType={asset.sensorType} />
      </span>
    </button>
  );
};
