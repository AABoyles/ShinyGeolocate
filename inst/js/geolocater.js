(function() {

  coordinatesBinding = new Shiny.InputBinding();

  $.extend(coordinatesBinding, {
    initialize: function() {
      if ("geolocation" in navigator) {
        console.log("Initialized Geolocater!");
      } else {
        console.error("Unable to retrieve your location!");
      }
    },
    find: function() {
      return null;
    },
    getValue: function() {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          return(position.coords);
        }, function(){
          console.error("Unable to retrieve your location");
        });
      } else {
        console.error("Unable to retrieve your location");
      }
    },
    getType: function() {
      return "geolocater";
    },
    setValue: function() {
      return null;
    },
    subscribe: function(el, callback) {
      watchId = navigator.geolocation.watchPosition(function(position) {
        callback(position.coords);
      });
    },
    unsubscribe: function() {
      if(window.watchId){
        clearWatch(watchId);
      }
    },
    receiveMessage: function() {
      return;
    }
  });

  Shiny.inputBindings.register(coordinatesBinding);

})();
