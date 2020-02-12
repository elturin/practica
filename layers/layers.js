var wms_layers = [];

        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_geocerca_1 = new ol.format.GeoJSON();
var features_geocerca_1 = format_geocerca_1.readFeatures(json_geocerca_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_geocerca_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_geocerca_1.addFeatures(features_geocerca_1);
var lyr_geocerca_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_geocerca_1, 
                style: style_geocerca_1,
                interactive: true,
                title: '<img src="styles/legend/geocerca_1.png" /> geocerca'
            });

					 var urlSWrest = "http://localhost/service/json/";
 var datax;
 var json_mercados_2;
 var get_departamento = function() {
    $.ajax({
        url: urlSWrest+"puntoInteres.php",
		/*headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },*/
        type: "GET",
		//crossDomain: true,
        datatype: 'json',
        success: function(data) {
			//datax=data;
			//json_mercados_2=JSON.stringify(data["PUNTOS"]);
			json_mercados_2=data;
			//alert(json_mercados_2);
            cargar_select(data, "#selectDepartamento");
        },
        error: function(obj, err, oterr) {
        }
    });
 };
  var cargar_select = function (data, select_id) {

    //$(select_id).find('value').remove().end();
	$(select_id).val(JSON.stringify(data["PUNTOS"]));
    };
get_departamento();
//alert(json_mercados_2);
//alert($('#selectDepartamento').val());
//alert(json_mercados_2);
			
/*var format_mercados_2 = new ol.format.GeoJSON();
var features_mercados_2 = format_mercados_2.readFeatures(json_mercados_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_mercados_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_mercados_2.addFeatures(features_mercados_2);*/
/***/
 /*var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'http://localhost/web/service/json/puntoInteres.php',
          format: new ol.format.GeoJSON()
        })
      });*/
	  
var fill = new ol.style.Fill({
   color: 'rgba(255,255,255,0.4)'
 });
 var stroke = new ol.style.Stroke({
   color: '#3399CC',
   width: 1.25
 });

 var image = new ol.style.Circle({
       fill: fill,
       stroke: stroke,
       radius: 5
 });

 var icon = new ol.style.Icon({
          /*anchor: [0.5, 0.5],
          size: [52, 52],
          offset: [52, 0],
          opacity: 0.8,
          scale: 1.0,*/
		  anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
          src: "./images/auto.png"
 });

 var myStyle = new ol.style.Style({
     image: icon//,  // this works, but when I use image: icon, nothing is displayed
     //fill: fill,
     //stroke: stroke
   }); 
	  
 var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
         //projection : 'EPSG:4326',
		 
         url: 'http://localhost/service/json/puntoInteres.php',
		 format: new ol.format.GeoJSON()
		 
      }),
	  style: myStyle
  });
  
vector2 = new ol.layer.Vector({
              title: 'Taxi',
              source: new ol.source.Vector({
                 //projection : 'EPSG:4326',
                 url: 'https://geoidep.gob.pe/georreferencia/bus.php',
				 //url: 'https://openlayers.org/en/v5.1.3/examples/data/geojson/countries.geojson',
				 format: new ol.format.GeoJSON()
              }),style: myStyle
           });
  
  
/*	  
 var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'https://openlayers.org/en/v5.1.3/examples/data/geojson/countries.geojson',
          format: new ol.format.GeoJSON()
        })
      });/*
	  
/***/
/*var lyr_mercados_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_mercados_2, 
                style: style_mercados_2,
                interactive: true,
                title: '<img src="styles/legend/mercados_2.png" /> mercados'
            });*/
			
lyr_OpenStreetMap_0.setVisible(true);lyr_geocerca_1.setVisible(true);vector2.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_geocerca_1, vector2];
vector2.set('fieldAliases', {'placa': 'placa', 'fecha': 'fecha','velocidad': 'velocidad','orientacion': 'orientacion','distrito': 'distrito','intersecta': 'intersecta',});
vector2.set('fieldImages', {'placa': 'TextEdit', 'fecha': 'TextEdit','velocidad': 'TextEdit','orientacion': 'TextEdit','distrito': 'TextEdit','intersecta': 'TextEdit',});
vector2.set('fieldLabels', {'placa': 'inline label', 'fecha': 'inline label','velocidad': 'inline label','orientacion': 'inline label','distrito': 'inline label','intersecta': 'inline label',});
vector2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});