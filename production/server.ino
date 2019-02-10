#include <ESP8266WiFi.h> // Lets us to conenct to wifi
#include <ESP8266mDNS.h> // Lets us create a DNS responder 
#include <ESP8266WebServer.h> // Lets us create a web server
#include <WiFiClient.h> // handles clients
#include <FS.h> // manages uploaded files

// Define wifi name and password
const char* ssid = "Datbois home";
const char* pass = "Nagrom1996!";

// HANDLE FILES
String getContentType(String filename); // convert the file extension to the MIME type
bool handleFileRead(String path); // send the right file to the client (if it exists)

// Initialize a instance of the WebServer class
ESP8266WebServer server(80);

void setup() {
  // Set up serial connection
  Serial.begin(115200);
  delay(10);
  Serial.println("\n");

  // Connect to WiFi network
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  Serial.println(" Connecting ...");

  // Wait for connection
  int i = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    i = i + 1;
    Serial.print(i);
    Serial.print('... '); 
  }

  // Print successfull conection data
  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());

  // Start the mDNS responder
  if (MDNS.begin("myhome")) {
    Serial.println("mDNS responder started");
  } else {
    Serial.println("Error setting up MDNS responder!");
  }

  // Start the SPI Flash Files System
  SPIFFS.begin();
  
  // Initialize server
  server.on("/", []() {
    handleFileRead("/index.html"); 
  });

  server.onNotFound([]() {
    if (!handleFileRead(server.uri())) {
      server.send(404, "text/plain", "404: Not Found"); 
    }
  });
  
  server.begin();
  Serial.println("HTTP Server Started");
}

void loop() {
  MDNS.update();

  server.handleClient();
}

String getContentType(String filename) { // convert the file extension to the MIME type
  if (filename.endsWith(".html")) return "text/html";
  else if (filename.endsWith(".css")) return "text/css";
  else if (filename.endsWith(".js")) return "application/javascript";
  else if (filename.endsWith(".ico")) return "image/x-icon";
  else if(filename.endsWith(".gz")) return "application/x-gzip";
  return "text/plain";
}

bool handleFileRead(String path){  // send the right file to the client (if it exists)
  Serial.println("handleFileRead: " + path);
  if(path.endsWith("/")) path += "index.html";           // If a folder is requested, send the index file
  String contentType = getContentType(path);             // Get the MIME type
  String pathWithGz = path + ".gz";
  if(SPIFFS.exists(pathWithGz) || SPIFFS.exists(path)){  // If the file exists, either as a compressed archive, or normal
    if(SPIFFS.exists(pathWithGz))                          // If there's a compressed version available
      path += ".gz";                                         // Use the compressed version
    File file = SPIFFS.open(path, "r");                    // Open the file
    size_t sent = server.streamFile(file, contentType);    // Send it to the client
    file.close();                                          // Close the file again
    Serial.println(String("\tSent file: ") + path);
    return true;
  }
  Serial.println(String("\tFile Not Found: ") + path);
  return false;                                          // If the file doesn't exist, return false
}
