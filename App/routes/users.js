/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();
var permit = require("../permit-utils");
var fetch = require('../fetch');

var { GRAPH_ME_ENDPOINT } = require('../authConfig');

// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        /**
         * Use Permit to check if user has permissions to access the API
         * Function: permit.check(authenticated user id, the req method, the "id" resource)
         */
        const permitted = await permit.check(req.session.account.idTokenClaims["sub"], req.method, "id")
        if(permitted){
            res.render('id', { idTokenClaims: req.session.account.idTokenClaims });
        }
        else {
            res.status(401).send();
        }
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        /**
         * Use Permit to check if user has permissions to access the API
         * Function: permit.check(authenticated user id, the req method, the "id" resource)
         */
        const permitted = await permit.check(req.session.account.idTokenClaims["sub"], req.method, "profile")
        if(permitted){
            try {
                const graphResponse = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
                res.render('profile', { profile: graphResponse });
            } catch (error) {
                next(error);
            }
        }
        else {
            res.status(401).send();
        }
        
    }
);

module.exports = router;
