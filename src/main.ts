import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import {onRequest} from "firebase-functions/v2/https";
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import * as logger from "firebase-functions/logger";
import 'hammerjs';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
