# ionic2-mosum
Ionic 2 Weather App
- iOS - https://itunes.apple.com/us/app/mosum/id1182452609
- Android - https://play.google.com/store/apps/details?id=com.aggarwalankush.mosum

## Getting Started

* Clone this repository

* Install Ionic, cordova and node_modules

    ```bash
    $ npm install -g ionic
    $ sudo npm install -g cordova@6.3.1
    $ npm install
    ```
* Get weather API key from [DarkSky](https://darksky.net)
  * Replace API_KEY in `src/pages/providers/constants.ts`
  ```js
  export const FORECAST_CONFIG = {
    API_ENDPOINT: 'https://api.darksky.net/forecast/'
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
    $ ionic build android
    $ ionic run android
```

### iOS
```bash
    $ ionic platform add ios
    $ ionic build ios
```    
    Run using XCode
    
### icon resources
Run post_install script
```bash
    $ ./post_install.sh
```    
    
