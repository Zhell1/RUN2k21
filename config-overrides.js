const { useBabelRc } = require("customize-cra");

module.exports = function override(config, env) {

    useBabelRc()

    if (!config.externals) config.externals = {};

    config.externals = {
        ...config.externals,
        
      Run: 'Run',
      bsv: 'bsv', // 1.5
      bsvjs: 'bsvjs', // 2.0
      Presto: "Presto",
      embed: "embed",
      // if you have issues with the bsv-lib version (run requires 1.5 and paypresto 2.0 for example)
      //    remove all "bsv" at the root package.json and go to paypresto folder and "npm i bsv@2.0"
    };
    console.log("config.externals = ",config.externals)
    return config;
}
