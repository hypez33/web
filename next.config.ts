import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "url";
import path from "path";

const withNextIntl = createNextIntlPlugin("./i18n/config.ts");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../");

export default withNextIntl({
  turbopack: {
    root
  }
});
