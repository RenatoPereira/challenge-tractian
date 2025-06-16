import type { Asset } from "~/libs/types/companies.type";
import { useAssets } from "./tree.hook";
import { ItemTree } from "./components/item";
import { Search } from "./components/search";

import s from "./tree.module.scss";

type Props = {
  assets: Asset[];
};

export const TreeContainer = ({ assets }: Props) => {
  const { visibleAssets, addChildren, removeChildren } = useAssets(assets);

  return (
    <div>
      <Search />

      <ul className={s.list}>
        {visibleAssets.map((asset) => {
          return (
            <ItemTree
              key={asset.id}
              asset={asset}
              showAction={addChildren}
              hideAction={removeChildren}
            />
          );
        })}
      </ul>
    </div>
  );
};
