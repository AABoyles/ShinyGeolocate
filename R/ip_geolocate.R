
ip_geolocate <- function(ip){
  url <- paste0("http://ip-api.com/json/", ip)
  ip_json <- readLines(curl::curl(url))
  jsonlite::fromJSON(ip_json)
}
