const { Permit } = require("permitio");
require('dotenv').config({ path: '.env.dev' });


const permit = new Permit({
    // your API Key
    token: process.env.PERMIT_API_KEY,
  
    // in production, you might need to change this url to fit your deployment
    pdp: process.env.PERMIT_PDP_URL,
  
    // if you want the SDK to emit logs, uncomment this:
    log: {
      level: "debug",
    },
  
    // The SDK returns false if you get a timeout / network error
    // if you want it to throw an error instead, and let you handle this, uncomment this:
    // throwOnError: true,
  });



  module.exports = permit;