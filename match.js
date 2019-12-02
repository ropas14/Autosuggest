var fs = require('fs');
var stringify = require('csv-stringify');
var jsonfile = require('jsonfile');
let information = [];

let mobileappData = fs.readFileSync('modelBrands.json');
let mbapp = JSON.parse(mobileappData);

let appData = fs.readFileSync('modelBrands.json');
let data = JSON.parse(appData);