import { addons } from "@storybook/manager-api";
import { ADDON_ID } from "./constants";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

addons.setConfig({
  refs: {},
});
// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.setConfig({
    refs: {
      uniqueRefKey: {
        id: "uniqueRefKey",
        title: "Stories (remote)",
        url: `${document.location.protocol}//${document.location.hostname}`,
        type: "server-checked",
      },
    },
  });

  var originalSetConfig = addons.setConfig.bind(addons);
  addons.setConfig = (values) => {
    if (values.refs && !values.refs.devremote) delete values.refs;
    originalSetConfig(values);
  };
});
