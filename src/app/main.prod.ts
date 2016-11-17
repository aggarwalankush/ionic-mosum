import {platformBrowser} from "@angular/platform-browser";
import {enableProdMode} from "@angular/core";
//noinspection TypeScriptCheckImport
import {AppModuleNgFactory} from "./app.module.ngfactory";

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
