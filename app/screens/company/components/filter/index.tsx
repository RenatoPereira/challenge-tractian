import { useFilterStore } from "~/stores/filter.store";
import { Button } from "~/components/button";
import {
  AiOutlineExclamationCircle,
  AiOutlineThunderbolt,
} from "react-icons/ai";
import type { AssetSensorType } from "~/libs/types/companies.type";

import s from "./filter.module.scss";

export const Filter = () => {
  const { filter, filterBy } = useFilterStore();

  const isActive = (by: AssetSensorType) => filter === by;

  const toggleFilter = (by: AssetSensorType) => {
    if (isActive(by)) {
      filterBy(null);
    } else {
      filterBy(by);
    }
  };

  return (
    <div className={s.filter}>
      <Button
        action={() => toggleFilter("energy")}
        icon={<AiOutlineThunderbolt />}
        label="Sensor de Energia"
        active={isActive("energy")}
      />
      <Button
        action={() => toggleFilter("vibration")}
        icon={<AiOutlineExclamationCircle />}
        label="Crítico"
        active={isActive("vibration")}
      />
    </div>
  );
};
