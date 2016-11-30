import {Component, Input, OnInit, OnDestroy, EventEmitter} from "@angular/core";
import {NavController} from "ionic-angular";
import {
  UtilService,
  ForecastService,
  Forecast,
  DatabaseService,
  Metrics,
  DataPoint,
  Location,
  DEFAULT_METRICS,
  CONFIG
} from "../providers";
import {WeatherDetailPage} from "../weather-detail/weather-detail";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'weather-list',
  templateUrl: 'weather-list.template.html',
  styles: [`
    button[ion-item], ion-item {
        border: 0 !important;
    }
  `]
})
export class WeatherListTemplate implements OnInit, OnDestroy {
  @Input() onInitEmitter: EventEmitter<string>;
  @Input() onDestroyEmitter: EventEmitter<string>;
  @Input() location: Location;
  forecast: Forecast;
  metrics: Metrics;
  todayForecast: DataPoint;
  forecastSubscriber: Subscription;

  constructor(public navCtrl: NavController,
              public forecastService: ForecastService,
              public databaseService: DatabaseService,
              public utilService: UtilService) {
  }

  itemClicked(item: any) {
    this.navCtrl.push(WeatherDetailPage, {
      forecast: this.forecast,
      currentForecast: item,
      currentLocation: this.location,
      metrics: this.metrics
    });
  }

  ngOnInit() {
    //these emitters are used to programmatically activate lifecycle events
    //because in Ionic 2, changing tabs doesn't activate lifecycle of templates
    if (this.onInitEmitter) {
      this.onInitEmitter.subscribe(() => this.init());
    }
    if (this.onDestroyEmitter) {
      this.onDestroyEmitter.subscribe(() => this.destroy());
    }
    this.init();
  }

  init() {
    let self = this;
    if (self.location) {
      self.getForecast(self.location);
    }
    this.databaseService.getJson(CONFIG.METRICS).then(data => {
      if (data === null) {
        self.databaseService.setJson(CONFIG.METRICS, DEFAULT_METRICS);
        self.metrics = DEFAULT_METRICS;
      } else {
        self.metrics = data;
      }
    });
  }

  getForecast(location: Location) {
    let self = this;
    this.forecastSubscriber = self.forecastService.getForecast(location)
      .subscribe((data: Forecast) => {
        self.forecast = data;
        if (self.forecast && self.forecast.daily && self.forecast.daily.data) {
          self.todayForecast = self.forecast.daily.data[0];
        }
      }, err => {
        console.error(err);
      });
  }

  ngOnDestroy() {
    this.destroy();
  }

  destroy() {
    if (this.forecastSubscriber) {
      this.forecastSubscriber.unsubscribe();
    }
  }
}
