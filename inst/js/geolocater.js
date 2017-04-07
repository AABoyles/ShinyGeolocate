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
        var temp;
        navigator.geolocation.getCurrentPosition(function(position){
          temp = position.coords;
        }, function(){
          console.error("Unable to retrieve your location");
        });
        return temp;
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

  function getip() {
    ip = null;
    $.getJSON("http://jsonip.com?callback=?",
      function(data){
        ip = data.ip;
        $(".ipaddr").attr("value", ip);
        $(".ipaddr").trigger("change");
      }
    );
  }
  var inputIpBinding = new Shiny.InputBinding();
  $.extend(inputIpBinding, {
    find: function(scope) {
      return $.find('.ipaddr');
    },
    getValue: function(el) {
      return $(el).val();
    },
    setValue: function(el, values) {
      $(el).attr("value", getip())
      $(el).trigger("change");
    },
    subscribe: function(el, callback) {
      $(el).on("change.inputIpBinding", function(e) {
        callback();
      });
    },
    unsubscribe: function(el) {
      $(el).off(".inputIpBinding");
    }
  });
  Shiny.inputBindings.register(inputIpBinding);

})();
