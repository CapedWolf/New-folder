"use strict";
exports.__esModule = true;
var queryString = window.location.search;
//3762 20 nw edmonton, t6t1r8 | 608 Windross Crescent NW, Edmonton, AB T6T 1X9
var urlParams = new URLSearchParams(queryString);
var str = urlParams.get('code') || '';
var arr = str.split("|");
console.log(arr);
var addresses = arr;
var latarray = [];
var geocoder;
// const express = require('express');
// const app = express();
// const port = 5000;
// app.listen(3000);
// function codeAddress(geocoder, map) {
//   geocoder.geocode({'address': address}, function(results, status) {
//     if (status === 'OK') {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(-33.92, 151.25),
        zoom: 13,
        mapTypeId: "roadmap"
    });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var locations = [
        ['Bondi Beach', '-33.890542', '151.274856', '4'],
        ['Coogee Beach', '-33.923036', '151.259052', '5'],
        ['Cronulla Beach', '-34.028249', '151.157507', '3'],
        ['Manly Beach', '-33.80010128657071', '151.28747820854187', '2'],
        ['Maroubra Beach', '-33.950198', '151.259302', '1']
    ];
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(locations[i][1]), Number(locations[i][2])),
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            };
        })(marker, i));
    }
    // Create the search box and link it to the UI element.
    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();
        if (places != null && places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        if (places) {
            places.forEach(function (place) {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                }
                else {
                    bounds.extend(place.geometry.location);
                }
            });
        }
        map.fitBounds(bounds);
    });
}
window.initAutocomplete = initAutocomplete;
