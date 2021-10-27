const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');

router.use(express.json());

const url_terminal = process.env.URL_TERMINAL; 
const url_tropipay = process.env.URL_TROPIPAY; 
const oauth_authorize = url_tropipay + process.env.OAUTH_URL_AUTHORIZE; 
const oauth_token = url_tropipay + process.env.OAUTH_URL_TOKEN; 
const redirect_uri = url_terminal + process.env.OAUTH_REDIRECT_URI; 

const client_id = process.env.OAUTH_CLIENT_ID; 
const client_secret = process.env.OAUTH_CLIENT_SECRET; 
const scope = process.env.OAUTH_SCOPE; 
const state = process.env.OAUTH_STATE; 
const code_verifier = process.env.OAUTH_CODE_VERIFIER; 
const code_challenge = process.env.OAUTH_CODE_CHALLENGE; 
const code_challenge_method = process.env.OAUTH_CODE_CHALLENGE_METHOD; 

router.get('/user/connected_view', (req, res, next) => {
    const param = qs.stringify({
        response_type: "code",
        client_id,
        client_secret,
        redirect_uri,
        code_challenge,
        code_challenge_method,
        state,
        scope
    });
    res.redirect(oauth_authorize + "?" + param);
});
//...................................................... ROUTE OAUTH STEP 2
router.get('/oauth/response', async (req, res, next) => {
    console.log("/oauth/response");
    try {
        //... verify the state value
        if (req.query['state'] !== state) {
            console.log('NOT secure, the state value not match');
        }
        //... confifure options for get authorization code
        const param = {
            grant_type: "authorization_code",
            code: req.query['code'],
            client_id,
            client_secret,
            redirect_uri,
            code_verifier,
            scope
        };
        //... save authorization code 
        const token = await axios.post(oauth_token, param);
        const old = req.cookies.session ? (typeof (req.cookies.session) === 'string' ? JSON.parse(req.cookies.session) : req.cookies.session) : {};
        const ses = {
            ...old,
            ...token.data
        };
        res.cookie('session', JSON.stringify(ses), {
            maxAge: 86400000
        });
        console.log('session', ses);
        const from = ses.from || "";
        res.redirect(url_terminal + from);
    } catch (error) {
        console.log("Error", error);
        res.end('OAUTH: Not authorize');
    }
});

module.exports = router;