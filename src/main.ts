import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import Theme from "@nativescript/theme";

import { AppModule } from './app/app.module';

Theme.setMode(Theme.Light);
runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

