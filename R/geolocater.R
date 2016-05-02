#' Geolocater Widget
#'
#' @param id
#'
#' @return
#' @export
#'
#' @examples
geolocater <- function() {
  shiny::tagList(
    shiny::singleton(
      shiny::tags$head(
        shiny::tags$script(
          paste(readLines(system.file("js/geolocater.js", package = "ShinyGeolocate")), collapse = "")
        )
      )
    )
  )
}

shiny::registerInputHandler("geolocater", function(data, session, name){data})
