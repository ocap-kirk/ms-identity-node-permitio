const { Permit } = require("permitio");

const permit = new Permit({
    // your API Key
    token: "permit_key_OGlobhtyMADeNNCIHVifYR8kRE1zuUL82FnlhY9scGhUHC2BTgGze144SYH3UNsPxveFZmUZlhlaAREFCrPbEj",
  
    // in production, you might need to change this url to fit your deployment
    pdp: "http://localhost:7766",
  
    // if you want the SDK to emit logs, uncomment this:
    log: {
      level: "debug",
    },
  
    // The SDK returns false if you get a timeout / network error
    // if you want it to throw an error instead, and let you handle this, uncomment this:
    // throwOnError: true,
  });



  module.exports = permit;