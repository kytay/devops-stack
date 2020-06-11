// Core Libraries
const FS = require('fs');
const PATH = require('path');
const HTTP = require('http');
const QUERYSTRING = require('querystring');

// Additional Libraries
const HANDLERBARS = require('handlebars');
const YAML = require('js-yaml');

const TEMPLATE_RELATIVE_DIR = '../tpl';
const OUTPUT_RELATIVE_DIR = '../output';
const HANDLERBARS_TEMPLATE_EXTENSION = '.handlebars';


function generateScanToken(globalProperties, projectProperties) {

    let postData = QUERYSTRING.stringify({
        name: projectProperties.project.sonar.projectKey + "_TOKEN"
    });

    let generateScanTokenReq = HTTP.request({
        protocol: globalProperties.sonar.request.protocol,
        host: globalProperties.global.sonar.request.host,
        port: globalProperties.global.sonar.request.port,
        method: 'POST',
        path: globalProperties.global.sonar.request.generateUserTokenPath,
        headers: {
            auth: globalProperties.global.sonar.request.apiToken + ":",
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }, (res) => {

    });
}

function generateSonarGlobalProperties() {

}

function generateNewSonarPropertiesIfNotExist() {
    //FS.readFileSync('../../sonar-project.properties');
}

function bootstrapDevOps() {

}

try {

    const DEVOPS_PROPERTIES = YAML.safeLoad(FS.readFileSync('../conf/project.yaml', 'utf8'));

    // Read all templates from "../tpl" directory
    let listOfTemplates = FS.readdirSync(TEMPLATE_RELATIVE_DIR);

    listOfTemplates.forEach(fileName => {

        console.log(fileName);

        if(HANDLERBARS_TEMPLATE_EXTENSION === PATH.extname(fileName)) {
            let filePath = PATH.resolve(TEMPLATE_RELATIVE_DIR + '/' + fileName);
            let tplContent = FS.readFileSync(filePath, 'utf-8');
            let tplCtx = HANDLERBARS.compile(tplContent);
            console.log(tplCtx(DEVOPS_PROPERTIES));
            console.log(filePath);
        }
    })

    console.log(DEVOPS_PROPERTIES);
} catch (ex) {
    console.log(ex);
}