/**
* Copyright 2016-2019, Mojtaba Samimi @solarchvision
* All rights reserved.
*
* Licensed under GPL.v2.0
*/

var exec = require('child_process').exec;
var fs = require('fs');

// var twit = require('twit');
// var configTwitter = require('./twitterConfig.js');
// var newTwit = new twit(configTwitter);

// var wordpress = require('wordpress');
// var configWordpress = require('./wordpressConfig.js');
// var wordpressClient = wordpress.createClient(configWordpress);

const deltaTime = 6; // i.e. the delay needed for the input models to be available on the web
const modelTime = new Date();
modelTime.setHours(modelTime.getHours() - deltaTime);

const YEAR = modelTime.getUTCFullYear();
const MONTH = modelTime.getUTCMonth() + 1;
const DAY = modelTime.getUTCDate();
const HOUR = modelTime.getUTCHours();
//console.log(YEAR, MONTH, DAY, HOUR);

const YYYY = String('0000' + YEAR).slice(-4);
const DD = String('00' + DAY).slice(-2);
const MM = String('00' + MONTH).slice(-2);
const HH = String('00' + HOUR).slice(-2);
console.log(YYYY, MM, DD, HH);

const allParameters = [
  { name: 'APCP-006-0700cutoff_SFC_0', descr: '#accumulated #precipitation' },
  { name: 'SOLAR_S00', descr: '#solar #radiation #southFacing' },
  { name: 'SOLAR_E00', descr: '#solar #radiation #eastFacing' },
  { name: 'SOLAR_W00', descr: '#solar #radiation #westFacing' },
  { name: 'SOLAR_HOR', descr: '#solar #radiation #roof' },
  { name: 'SOLAR_TRK', descr: '#solar #radiation #sunTracking' },
  { name: 'SOLAR_DIR', descr: '#solar #radiation direct,' },
  { name: 'TCDC_SFC_0', descr: '#clouds' },
  { name: 'SWELL_SFC_0', descr: 'significant height of #swell #waves' },
  { name: 'WVPER_SFC_0', descr: 'mean period of #wind #waves' },
  { name: 'FLOWxPRM_TGL_10', descr: '#winds, #air #pressure' },
  { name: 'WIND_TGL_10', descr: '#wind #speed,' },
  { name: 'EFFECT_DIR', descr: '#solarEffect #performance #comfort' },
  { name: 'TMP_TGL_2', descr: '#air #temperature,' },
  { name: 'FLOWxPCP_TGL_10', descr: '#winds, #precipitation' },
  { name: 'RH_TGL_2', descr: '#relative #humidity,' }
];

const allDomains = [
  //  {run:'00Z', type: 'GDWPS', name: 'GDWPS',                descr:'#global',        period:'#forecast: #tomorrow #today', source:'#ECCC #Environment #ClimateChange #Canada'},
  //  {run:'00Z', type: 'RDWPS', name: 'RDWPS_north_pacific',  descr:'#northPacific',  period:'#forecast: #tomorrow #today', source:'#ECCC #Environment #ClimateChange #Canada'},
  //  {run:'00Z', type: 'RDWPS', name: 'RDWPS_north_atlantic', descr:'#northAtlantic', period:'#forecast: #tomorrow #today', source:'#ECCC #Environment #ClimateChange #Canada'},
  //  {run:'00Z', type: 'RDPA',  name: 'RDPA',                 descr:'#CaPA',          period:'#analysis: #past3days',       source:'#ECCC #Environment #ClimateChange #Canada'},
  //  {run:'00Z', type: 'HRDPA', name: 'HRDPA',                descr:'#CaPA',          period:'#analysis: #past3days',       source:'#ECCC #Environment #ClimateChange #Canada'},
  { run: '00Z', type: 'HRDPS', name: 'HRDPS_west', descr: '#west', period: '#forecast: #tomorrow #today', source: '#ECCC #Environment #ClimateChange #Canada' },
  { run: '00Z', type: 'HRDPS', name: 'HRDPS_east', descr: '#east', period: '#forecast: #tomorrow #today', source: '#ECCC #Environment #ClimateChange #Canada' },
  { run: '00Z', type: 'HRDPS', name: 'HRDPS_maritimes', descr: '#maritimes', period: '#forecast: #tomorrow #today', source: '#ECCC #Environment #ClimateChange #Canada' },
  { run: '00Z', type: 'RDPS', name: 'RDPS', descr: '#regional', period: '#forecast: #tomorrow', source: '#ECCC #Environment #ClimateChange #Canada' },
  { run: '00Z', type: 'GDPS', name: 'GDPS', descr: '#global', period: '#forecast: #tomorrow', source: '#ECCC #Environment #ClimateChange #Canada' },
  { run: '00Z', type: 'HRRR', name: 'HRRR', descr: '#northAmerica', period: '#forecast: #today', source: '#NOAA #NCEP' }
];

var baseFolder = 'C:/SOLARCHVISION/grib2_solarchvision';
var run_grib2_solarchvision = [
  'processing-java',
  '--force --output=' + baseFolder + '/scripts/node/code_output',
  '--run --sketch=' + baseFolder
].join(' ');

var tmpDir = baseFolder + '/temp/';
var outDir = baseFolder + '/output/';

var allCommands = [];

for (let i = 0; i < allDomains.length; i++) {

  domain = allDomains[i];

  var set_otherDirectives = [
    'year=' + YEAR,
    'month=' + MONTH,
    'day=' + DAY,
    'run=' + domain.run,
    'tmpdir=' + tmpDir,
    'outdir=' + outDir
  ].join(' ');

  allCommands.push(
    'copy /Y gridConfig_' + domain.name + '.txt gridConfig.txt',
    'echo ' + set_otherDirectives + ' >> gridConfig.txt',
    run_grib2_solarchvision
  );

}
//console.log(allCommands);

runCommands(); // start with the first one then continue with the rest

function runCommands(item = 0) {

  let numberOfItems = allCommands.length;

  function callNext() {
    item++;

    if (item < numberOfItems) {
      runCommands(item);
    }
    else {
      //uploadImages('twitter'); // start with the first one then continue with the rest
    }
  }

  var command = allCommands[item];

  console.log('Start of ' + command);
  exec(command, { maxBuffer: 8 * 1024 * 1024 }, function (error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) {
      console.log('exec error: ', error);

      process.exit(); // this is to stop the whole script in case of any error.
    }
    else {
      console.log('End of ' + command);

      callNext();
    }
  });
}

function uploadImages(targetWebsite, item = 0) {
  let numberOfItems = allDomains.length * allParameters.length;

  function callNext() {
    item++;

    if (item < numberOfItems) {
      uploadImages(targetWebsite, item);
    }
    else {
      console.log('End.');
    }
  }

  var div = allDomains.length;
  var domain = allDomains[Math.floor(item % div)];
  var parameter = allParameters[Math.floor(item / div)];

  var fileName = YYYY + MM + DD + '_' + domain.name + domain.run + '_' + parameter.name + '.gif';
  var imageFile = outDir + YYYY + MM + DD + '_' + domain.type + domain.run + '/' + fileName;

  var imageStatus = domain.period + ' #weather ' + domain.descr + ' #model #' + domain.type + ':' + domain.run + ' ' + parameter.descr + ' #grib2 #data: ' + domain.source + ' post-processing: #solarchvision ' + YYYY + '-' + MM + '-' + DD;

  if (fs.existsSync(imageFile) === false) {
    //console.log('File not found:', imageFile);
    callNext();
  }
  else {

    if (targetWebsite === 'twitter') {
      if (newTwit !== undefined) {

        console.log('Uploading to:', targetWebsite, ' file:', imageFile);

        var b64 = fs.readFileSync(imageFile, { encoding: 'base64' });

        newTwit.post('media/upload', { media_data: b64 }, uploadedTo_twitter);

        function uploadedTo_twitter(error, data, response) {

          if (error != null) {
            console.log('upload error: ', error);

            process.exit(); // this is to stop the whole script in case of any error here.
          }
          else {
            console.log('uploaded:', imageFile);

            id1 = data.media_id_string;

            var myTweet = {
              media_ids: [id1],
              status: imageStatus
            }

            newTwit.post('statuses/update', myTweet, tweeted);

            function tweeted(error, data, response) {
              if (error != null) {
                console.log('Something went wrong!');
                console.log(error);
              }
              else {
                console.log('Posted to twitter.')
              }

              callNext();
            }
          }
        }
      }
    }

    if (targetWebsite === 'wordpress') {
      if (wordpressClient !== undefined) {

        console.log('Uploading to:', targetWebsite, ' file:', imageFile);

        wordpressClient.uploadFile({
          name: fileName,
          type: 'image/gif',
          bits: fs.readFileSync(imageFile)
        },
          uploadedTo_wordpress
        );

        function uploadedTo_wordpress(error, data, response) {

          if (error != null) {
            console.log('upload error: ', error);

            process.exit(); // this is to stop the whole script in case of any error here.
          }
          else {
            console.log('uploaded:', imageFile);

            callNext();
          }
        }
      }
    }
  }
}
