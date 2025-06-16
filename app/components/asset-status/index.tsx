import { FaBolt } from "react-icons/fa6";

import s from "./asset-status.module.scss";
import type {
  AssetSensorType,
  AssetStatus as AssetStatusType,
} from "~/libs/types/companies.type";

type Props = {
  sensorType?: AssetSensorType | null;
  status: AssetStatusType | null;
};

export const AssetStatus = ({ sensorType, status }: Props) => {
  if (!sensorType || !status) return null;

  return (
    <span className={s[status]}>
      {sensorType === "energy" ? (
        <span className={s.energy}>
          <FaBolt data-testid="icon-energy" />
        </span>
      ) : (
        <span className={s.circle} data-testid="icon-status" />
      )}
    </span>
  );
};
