const router = new (require('restify-router')).Router();
const turf = require('@turf/helpers');
const pointInPolygon = require('@turf/boolean-point-in-polygon');

var POLYGONS=[]
var POINTS=[];

router.get('/', function (req, res, next) {
	const toGeoJson = require('@mapbox/togeojson'),
	fs = require('fs'),
	DOMParser = require('xmldom').DOMParser;
	let geoJSONdata;
	let kml = new DOMParser().parseFromString(fs.readFileSync('./FullStackTest_DeliveryAreas.kml', 'utf8'));
	geoJSONdata = toGeoJson.kml(kml,{ styles: true });
	

	//Create Turf objects
	for(let i=0; i<geoJSONdata.features.length;i++){
		if(geoJSONdata.features[i].geometry.type=='Polygon'){
			let temp={};
			temp.polygon = turf.polygon(geoJSONdata.features[i].geometry.coordinates);
			temp.points=[];
			POLYGONS.push(temp);
		}else if(geoJSONdata.features[i].geometry.type=='Point'){
			let temp={};
			temp.point = turf.point(geoJSONdata.features[i].geometry.coordinates);
			temp.name = geoJSONdata.features[i].properties.name;
			POINTS.push(temp); 
		}
	}

	//Associate points to polygons

	for(let i = 0; i < POINTS.length; i++){
		for(let j = 0; j < POLYGONS.length; j++){
			if(pointInPolygon.default(POINTS[i].point, POLYGONS[j].polygon)){
				POLYGONS[j].points.push(POINTS[i].name);
			}
		}
	}

	res.json({
		message: 'File Loaded Successfully.',
		query: req.query
	});

	next();
});

router.post('/find_outlet', function (req, res, next) {
	let longLat = req.body.long_lat;
	let message;
	longLat=longLat.split(',');
	
	//create a turf point
	let point = turf.point(longLat);
	//check if point lies in any polygon
	for(let i=0 ; i<POLYGONS.length;i++){
		if(pointInPolygon.default(point,POLYGONS[i].polygon)){
			message=POLYGONS[i].points.toString();
		}
	}
	if(message=='') message = 'No stores found';
	res.json({
		message: message,
		query: req.query
	})
	next();
});

module.exports = router;