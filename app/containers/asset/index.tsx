import { Border } from "~/components/border";
import { Title } from "~/components/title";
import { Item } from "~/components/item";
import { ImageUpload } from "~/components/image-upload";
import { MdOutlineRouter, MdOutlineWifiTethering } from "react-icons/md";
import { useAssetStore } from "~/stores/asset.store";
import { AssetStatus } from "~/components/asset-status";

import s from "./asset.module.scss";
import { IconLetter } from "~/components/icon-letter";

export const AssetContainer = () => {
  const asset = useAssetStore((store) => store.asset);

  return (
    <section className={s.body}>
      {!asset ? (
        <section className={s.empty}>
          <p className={s.text}>Please select a asset</p>
        </section>
      ) : (
        <>
          <header className={s.header}>
            <Title>{asset.name}</Title>
            <AssetStatus status={asset.status} sensorType={asset.sensorType} />
          </header>

          <div className={s.container}>
            <div className={s.content}>
              <div className={s.figure}>
                <ImageUpload image={""} action={() => {}} />
              </div>

              <div className={s.details}>
                <Item
                  title="Tipo de Equipamento"
                  description="Motor Elétrico (Trifásico)"
                />
                <Border />
                <Item
                  title="Responsáveis"
                  description="Elétrica"
                  icon={<IconLetter word={"Elétrica"} />}
                />
              </div>
            </div>

            {(asset.sensorId || asset.gatewayId) && (
              <>
                <Border />

                <ul className={s.list}>
                  {asset.sensorId && (
                    <li className={s.item}>
                      <Item
                        title="Sensor"
                        description={asset.sensorId ?? ""}
                        icon={<MdOutlineWifiTethering />}
                      />
                    </li>
                  )}
                  {asset.gatewayId && (
                    <li className={s.item}>
                      <Item
                        title="Receptor"
                        description={asset.gatewayId ?? ""}
                        icon={<MdOutlineRouter />}
                      />
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};
