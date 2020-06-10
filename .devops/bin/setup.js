const HANDLERBARS = require('handlebars');
const YAML = require('js-yaml');
const FS = require('fs');
const PATH = require('path');

const TEMPLATE_RELATIVE_DIR = '../tpl';
const OUTPUT_RELATIVE_DIR = '../output';

const HANDLERBARS_TEMPLATE_EXTENSION = '.handlebars';

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