const HANDLERBARS = require("handlebars");
const YAML = require('js-yaml');
const FS = require('fs');

try {
    const DOC = YAML.safeLoad(FS.readFileSync('../conf/project.yaml', 'utf8'));
    console.log(DOC);
} catch (ex) {
    console.log(ex);
}