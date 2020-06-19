const path = require("path");

module.exports.getAllLayoutsData = () => {
    const glob = require("glob");

    let allLayoutsString = "";
    const layoutFileArray = glob.sync("./src/layouts/**/*.data.js");

    layoutFileArray.forEach(function (file) {
        let queryString = require(path.resolve(file));

        //get layout type from file name
        let layoutType = path.basename(file, path.extname(file));

        //remove .data from file name
        layoutType = layoutType.substr(0, layoutType.indexOf('.'));

        //nest component file array loop
        let allComponentString = "";
        const componentsFileArray = glob.sync("./src/components/**/*.data.js");

        componentsFileArray.forEach(function (file) {
            let queryString = require(path.resolve(file));
            allComponentString = allComponentString + queryString(layoutType) + " \n ";
        });

        allLayoutsString = allLayoutsString + queryString(allComponentString) + " \n ";
    });

    return allLayoutsString
};

module.exports.createPageBuilderFragment = ({writeFilePath, fragmentTemplatePath, pageBuilderLayouts}) => {
    return new Promise((resolve) => {
        const fs = require("fs");

        const fragmentTemplate = require(fragmentTemplatePath);
        const pageBuilderFragment = fragmentTemplate(pageBuilderLayouts);

        fs.writeFile(writeFilePath, pageBuilderFragment, "utf8", (err) => {
            if (err) throw "Error writing page builder template: " + err;

            console.log("Successfully created page builder template.");
            resolve()
        });

    })
};