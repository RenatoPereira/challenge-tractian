import { TreeContainer } from "~/containers/tree";
import { AssetContainer } from "~/containers/asset";
import { Filter } from "./components/filter";
import { use } from "react";
import type { Asset } from "~/libs/types/companies.type";
import { CompanyTitle } from "./components/title";

import s from "./company.module.scss";

type Props = {
  companyId: string;
  promise: Promise<Asset[] | undefined>;
};

export const CompanyScreen = ({ companyId, promise }: Props) => {
  const assets = use(promise);

  return (
    <section className={s.screen}>
      <header className={s.header}>
        <CompanyTitle companyId={companyId} />

        <Filter />
      </header>

      <div className={s.container}>
        <aside className={s.aside}>
          {assets ? <TreeContainer assets={assets} /> : <></>}
        </aside>

        <section className={s.content}>
          <AssetContainer />
        </section>
      </div>
    </section>
  );
};
