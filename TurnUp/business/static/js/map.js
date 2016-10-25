var $ = jQuery.noConflict();

var map, mapCenter, doc, lab, six;

function initialize() {

    mapCenter = new google.maps.LatLng(40.7831, -73.9712);

    var mapCanvas = document.getElementById('map-canvas');
      var mapOptions = {
          center: mapCenter,
          scrollwheel: false,
          navigationControl: false,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          streetViewControl: false,
          disableDoubleClickZoom: true,
          zoomControl: false,
          scaleControl: false,
          draggable: false
      };

    map = new google.maps.Map(mapCanvas, mapOptions);

    if ( $(window).width() <= 991) {
        map.setZoom(11);
    } else { map.setZoom(12)}

    var image = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#14148c',
        fillOpacity: 1,
        scale: 8,
        strokeColor: 'white',
        strokeWeight: 2
        };

    var marker = new google.maps.Marker({
        position: mapCenter,
        map: map,
        icon: image
    });
    doc = new google.maps.Circle({
        map: map,
        radius: 11265.408,
        strokeWeight: 1,
        strokeColor: '##009ee0',
        strokeOpacity: 0.1,
        fillColor: '#009ee0',
        fillOpacity: 0.3
    });
    lab = new google.maps.Circle({
        map: map,
        radius: 8046.72,
        strokeWeight: 1,
        strokeColor: '##009ee0',
        strokeOpacity: 0,
        fillColor: '#009ee0',
        fillOpacity: 0
    });
    six = new google.maps.Circle({
        map: map,
        radius: 4828.03,
        strokeWeight: 1,
        strokeColor: '##009ee0',
        strokeOpacity: 0,
        fillColor: '#009ee0',
        fillOpacity: 0
    });
    doc.bindTo('center', marker, 'position');
    lab.bindTo('center', marker, 'position');
    six.bindTo('center', marker, 'position');
}
function checkStatus () {
    var a = document.getElementById('deliver-doc');
    var b = document.getElementById('deliver-lab');
    var c = document.getElementById('deliver-six');
    if (document.getElementById('doc').checked == true) {
        a.setAttribute("style", "-webkit-filter: opacity(0.9); filter: opacity(90%)");
        b.setAttribute("style", "-webkit-filter: opacity(0.7)");
        c.setAttribute("style", "-webkit-filter: opacity(0.7)");
    } else if (document.getElementById('lab').checked == true) {
        a.setAttribute("style", "-webkit-filter: opacity(0.7)");
        b.setAttribute("style", "-webkit-filter: opacity(0.9); filter: opacity(90%)");
        c.setAttribute("style", "-webkit-filter: opacity(0.7)");
    } else {
        a.setAttribute("style", "-webkit-filter: opacity(0.7)");
        b.setAttribute("style", "-webkit-filter: opacity(0.7)");
        c.setAttribute("style", "-webkit-filter: opacity(0.9); filter: opacity(90%)");
    }
}
function showHideCircle (type) {
    if (type == 1) {
        doc.setOptions({fillOpacity:0.3, strokeOpacity:0.1});
        lab.setOptions({fillOpacity:0, strokeOpacity:0});
        six.setOptions({fillOpacity:0, strokeOpacity:0});
    }
    else if (type == 2) {
        doc.setOptions({fillOpacity:0, strokeOpacity:0});
        lab.setOptions({fillOpacity:0.3, strokeOpacity:0.1});
        six.setOptions({fillOpacity:0, strokeOpacity:0});
    }
    else {
        doc.setOptions({fillOpacity:0, strokeOpacity:0});
        lab.setOptions({fillOpacity:0, strokeOpacity:0});
        six.setOptions({fillOpacity:0.3, strokeOpacity:0.1});
    }
}
function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=&callback=initialize';
    document.body.appendChild(script);
}
$(window).on('load', function () {
    loadScript();
    checkStatus();
});