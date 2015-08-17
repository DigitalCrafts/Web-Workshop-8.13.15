// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.

function initialize() {

    //initialize the variables
    var vars = [], hash, userZoom, lat, lon;
    //Split up the query variables
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    //Example with API key
    //var api_key = 'YOUR_GOOGLE_API_KEY';
    //var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + vars['location'] + "&sensor=false&key=" + api_key;

    //Go get the URL from Google
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + vars['location'] + "&sensor=false";
    $.getJSON(url, function(data) {
      //check to see if our location is undefined. If it is, don't bother parsing the object
      if(vars['location'] == undefined){
        //Set the lat/lon at the Iowa State Fair
        lat = 41.5908;
        lon = -93.6208;
      }else{
        //Get latitude from data object
        var lat = data.results[0].geometry.location.lat;
        //Get longitude from data object
        var lon = data.results[0].geometry.location.lng;
      }
      //Set up google maps object with our lat and lon
      var myLatlng = new google.maps.LatLng(lat, lon);

      //Check and see if the user entered a 'zoom.' If not, use 4
      if(vars['zoom'] == undefined){
        userZoom = 4;
      }else{
        userZoom = Number(decodeURIComponent(vars['zoom']));
      }

      var mapOptions = {
        zoom: userZoom,
        center: myLatlng
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var userString = decodeURIComponent(vars['location-marker-text']);
      contentString = userString.replace(/\+/g, " ");
      if (contentString == ''){
        contentString = "No text entered";
      }

      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: 'Iowa State Fair'
      });
      marker.addListener('click', toggleBounce);

/*
    unncomment here if you would like to make a second marker!
    var myLatlng2 = new google.maps.LatLng(41.5908, -91.3242);
     var marker = new google.maps.Marker({
          position: (myLatlng2),
          map: map,
          animation: google.maps.Animation.DROP,
          title: 'Iowa State Fair'
      });
      marker.addListener('click', toggleBounce);
*/
      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }      

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
  //End getJSON
  });
//End initialize function
}

//marker.addListener('click', toggleBounce);


google.maps.event.addDomListener(window, 'load', initialize);

