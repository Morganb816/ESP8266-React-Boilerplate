# ESP8266 Web Server Boilerplate
Boilerplate code to start a web server for a ESP8266 chip. This boilerplate has a react front end.

## Start Developing
To start development create a directory called secrets in production with a file secrets.h inside. The contents of secret.h should be the following along with any other definitions that need to be kept secret. Be sure to import this library into your Arduino project how ever you normally would wether that be through the Arduino IDE or another way.

```
#define SSID_SECRET "Your WiFi's SSID"
#define PASSWORD_SECRET "Your WiFi's Password"
```