// Install These packages
//sudo npm install -g newman
//sudo npm install -g node-slack
// For mac set either $NODE_PATH or use the function below
module.paths.push('/usr/local/lib/node_modules');
var fs = require('fs');
var newman = require('newman');
var Slack = require('node-slack');
var slack = new Slack(`'${proccess.env.SLACK_WEBHOOK}','${process.env.SLACK_TOKEN}'`); // setup Incomin Web Hooks and token is at the end of the url

// read the collectionjson file
var collectionJson = JSON.parse(fs.readFileSync("./sample_files/geonetwork_validation.json", 'utf8'));

// define newman options
newmanOptions = {
    envJson: JSON.parse(fs.readFileSync("./sample_files/prd.json", "utf-8")), // environment file (in parsed json format)
    //dataFile: data.csv,                    // data file if required
    iterationCount: 1,                    	 // define the number of times the runner should run
    outputFile: "outfile.json",            // the file to export to
    responseHandler: "TestResponseHandler",  // the response handler to use
    asLibrary: true,                         // this makes sure the exit code is returned as an argument to the callback function
    stopOnError: true
}

// Optional Callback function which will be executed once newman is done executing all its tasks.
newman.execute(collectionJson, newmanOptions, function(){
	console.log('process has been completed. posting on slack now...');
	var out = JSON.parse(fs.readFileSync('outfile.json','utf8'));
	var body = out["collection"]["name"] + " via " + out["environment"]["name"] + "\n";
	var totalP = 0;
	var totalF = 0;
	for (var i=0; i<out["results"].length; i++) {
		var res = out["results"][i];
		body += res["name"] + " - " + res["url"] + " (" + res["totalTime"] + "ms) ... Response "+res["responseCode"]["code"]+" \n";
		var pc = res["totalPassFailCounts"]["pass"];
		var fc = res["totalPassFailCounts"]["fail"]; 
		totalP += pc;
		totalF = fc;
		body += "Pass / Fail : " + pc + " / " + fc + " ("+ (100 * pc / (pc+fc)) +"%)\n"; 
		if (fc > 0) {
			for (var key in res["allTests"]) {
				body += "    " + key + " : " + (res["allTests"][key])?"PASS":"FAIL\n";
			}
		}
	}
	body += "--------------------------------------------\n";
	body += "Summary:\n";
	body += "Overall Pass / Fail : " + totalP + " / " + totalF + " ("+ (100 * totalP / (totalP + totalF)) +"%)\n"; 

	slack.send({
		text: body,
		channel: '#general',
		username: 'postman',
		icon_emoji: ':postbox:'
	});
});
