import localConfigJson from "./local.json";
import productionConfigJson from "./production.json";

type ProductionConfig = typeof productionConfigJson;
type ProductionConfigKey = keyof ProductionConfig;
type ProductionConfigValue = ProductionConfig[ProductionConfigKey];

type LocalConfig = typeof localConfigJson;

const localConfig: ProductionConfig & LocalConfig = {
  ...productionConfigJson,
  ...localConfigJson,
};

const createConfig = (env: string = "dev") => {
  return (key: ProductionConfigKey): ProductionConfigValue => {
    switch (env) {
      case "production":
        return productionConfigJson[key];
      default:
        return localConfig[key];
    }
  };
};

export default createConfig;
