# ionic2-mosum
Ionic 2 Weather App - The goal of this weather app is to demo different ionic component in a nice working app. Contributions are welcome for any good feature.
- Android - https://play.google.com/store/apps/details?id=com.aggarwalankush.mosum

## Prerequisites
- Download nodejs from https://nodejs.org/en/download/current/ It will install `node` and `npm`
```bash
node -v
 - should be >= 6.0.0
npm -v
 - should be >= 3.0.0
```
- For iOS, update XCode version to 8.0 or higher

## Getting Started

* Clone this repository

* Install Ionic, cordova and node_modules

    ```bash
    $ npm uninstall -g ionic cordova
    $ npm install -g ionic cordova
    $ npm install
    ```
* Get weather API key from [DarkSky](https://darksky.net)
  * Replace API_KEY in `src/pages/providers/constants.ts`
  ```js
  export const FORECAST_CONFIG = {
    API_ENDPOINT: 'https://api.darksky.net/forecast/',
    API_KEY: '9bb59ff3063ac4930fc96890570b0c6f'
  };
  ```
* Get google API key from [Google Developers Console](https://console.developers.google.com/apis/credentials)
  * Replace key in `src/index.html`
  ```html
  <script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAZL0jdvdtBV_DmzLZ8yW53GHnhlRrbIAY&libraries=places">
  </script>
  ```

## Run

#### Browser
```bash
    # iOS 
    ionic serve --platform ios
    # Android
    ionic serve --platform android
    # All Platforms(iOS, Android and Windows)
    ionic serve --lab
```

### Android

```bash
    $ ionic platform add android
    $ ionic build android --prod
    $ ionic run android --prod
```

### iOS
```bash
    $ ionic platform add ios
    $ ionic build ios --prod
```    
    Run using XCode
    
### icon resources
Run post_install script
```bash
    $ ./post_install.sh
```    
    
### Screenshots

* Phone

  <img src="screenshots/phone1.png" alt="phone1" width="250"/>
  <img src="screenshots/phone2.png" alt="phone2" width="250"/>
  
* Tablet
  
  <img src="screenshots/tablet1.png" alt="tablet1" width="350"/>
  <img src="screenshots/tablet2.png" alt="tablet2" width="350"/>

## Existing Features

* Tabs, Side Menu with image
* Various Animations
* Infinite scroll
* Google Maps API
* SQL Database and WebSQL in browser
* Weather caching to avoid redundant http requests
* 3rd party libraries - lodash, moment, moment-timezone
* Works in all timezones 

## Contribution
Contributions are welcome!

See [features planned for future](https://github.com/aggarwalankush/ionic2-mosum/issues/2) to get contributing ideas.

* Report issues
* Open pull request with improvements
* Spread the word

## License
ionic2-mosum is available under the MIT license. See the LICENSE file for more info.
