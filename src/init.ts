import {
  backButton,
  viewport,
  // themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Add Eruda if needed.
  debug &&
    import("eruda").then((lib) => lib.default.init()).catch(console.error);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc. Also, configure
  // the package.
  initSDK();

  // Mount all components used in the project.
  backButton.isSupported() && backButton.mount();
  miniApp.mount();
  // themeParams.mount();
  initData.restore();
  const test = retrieveLaunchParams();
  void viewport
    .mount()
    .then(() => {
      // Define components-related CSS variables.
      viewport.bindCssVars();
      miniApp.bindCssVars();
      // themeParams.bindCssVars();
      console.log(test.platform);
      if (test.platform !== "tdesktop") {
        viewport.requestFullscreen();
      }
    })
    .catch((e: unknown) => {
      console.error("Something went wrong mounting the viewport", e);
    });
}
