import AssetIcon from "~/assets/icons/asset.svg";
import AttentionIcon from "~/assets/icons/attention.svg";
import BoxIcon from "~/assets/icons/box.svg";
import EnergyIcon from "~/assets/icons/energy.svg";
import GoldIcon from "~/assets/icons/gold.svg";
import LocationIcon from "~/assets/icons/location.svg";
import RouterIcon from "~/assets/icons/router.svg";
import SearchIcon from "~/assets/icons/search.svg";
import SensorIcon from "~/assets/icons/sensor.svg";

export type IconName =
  | "asset"
  | "attention"
  | "box"
  | "energy"
  | "gold"
  | "location"
  | "router"
  | "search"
  | "sensor";

type Props = {
  name: IconName;
};

const ICON_DICTIONARY = {
  asset: AssetIcon,
  attention: AttentionIcon,
  box: BoxIcon,
  energy: EnergyIcon,
  gold: GoldIcon,
  location: LocationIcon,
  router: RouterIcon,
  search: SearchIcon,
  sensor: SensorIcon,

  default: AttentionIcon,
};

export const Icon = ({ name }: Props) => {
  return (
    <img src={ICON_DICTIONARY[name] || ICON_DICTIONARY.default} alt={name} />
  );
};
