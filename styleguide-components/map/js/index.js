var infowindow;

function initialize() {
      var styledMapType = new google.maps.StyledMapType(
           [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
, {
                name: 'Styled Map'
            }
        );
        var myLatlng = new google.maps.LatLng(59.270707, 18.288472);
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 16,
            center: myLatlng,
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map'
                ]
            }
        });
        var contentString = "Office Address"
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
			
        });
 
	
	
	 var marker = new google.maps.Marker({
     position: map.getCenter(),
    map: map,
	     title: 'Globuzzer Office address',

    icon: {
		url: 'images/pin.png',
		scaledSize: new google.maps.Size(64, 64)
    }
  });
  
  
  infowindow = new google.maps.InfoWindow({
    content: " "
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<b>Skyttevägen 29,' + ' </br>' + '133 36 Saltsjöbaden, Sweden</b>' +
      '<p>Time: ' + this.time + '</p>');
    infowindow.open(map, this);
  });
  google.maps.event.trigger(marker, 'click');
  
  map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
        infowindow.open(map, marker);
  
}


google.maps.event.addDomListener(window, "load", initialize);

