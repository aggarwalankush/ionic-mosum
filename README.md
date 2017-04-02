# ionic2-mosum
Ionic 2 Weather App
- Android - https://play.google.com/store/apps/details?id=com.aggarwalankush.mosum

## Getting Started

* Clone this repository

* Install Ionic, cordova and node_modules

    ```bash
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
