import localConfigJson from "./local.json";
import productionConfigJson from "./production.json";

type ProductionConfig = typeof productionConfigJson;
type ProductionConfigKey = keyof ProductionConfig;
type ProductionConfigValue = ProductionConfig[ProductionConfigKey];

type LocalConfig = typeof localConfigJson;
type LocalConfigKey = keyof LocalConfig;
type LocalConfigValue = LocalConfig[LocalConfigKey];

const localConfig: ProductionConfig | LocalConfig = {
  ...productionConfigJson,
  ...localConfigJson,
};

const createConfig = (env: string = "dev") => {
  return (
    key: ProductionConfigKey | LocalConfigKey,
  ): ProductionConfigValue | LocalConfigValue => {
    switch (env) {
      case "production":
        return productionConfigJson[key];
      default:
        return localConfig[key];
    }
  };
};

export default createConfig;
