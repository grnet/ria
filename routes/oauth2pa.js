const routes = require('express').Router();
const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args)); // consider upgrage nodejs to use internal fetch
const fxmlparser = require('fast-xml-parser');
let database = require('../services/database');

let debug = process.env.DEBUG || false;

//Settings
let gsisSetings = {
    path: process.env.OAUTH2PA_LOGIN_PATH,
    redirectUrl: process.env.SITE + process.env.OAUTH2PA_LOGIN_PATH,
    scope: "read",
    grant_type: "authorization_code",
    accessTokenUrl: process.env.GSIS_SITE + "/oauth2servergov/oauth/token",
    authorizationUrl: process.env.GSIS_SITE + "/oauth2servergov/oauth/authorize",
    profileUrl: process.env.GSIS_SITE + "/oauth2servergov/userinfo",
    clientId: process.env.CLIENT_ID_GOV,
    clientSecret: process.env.CLIENT_SECRET_GOV
}
////////////////////////////////////////////////////////////
const makeTag = () => {
    const length = 10
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const setTagCookie = (res, tag) => {
    const setCookie = "GSIS_TAG=" + tag + "; Secure; path=/;";
    res.setHeader('Set-Cookie', setCookie)
}

function getTagcookie(req) {
    const cookies = req.headers.cookie;
    const cookiesArr = cookies ? cookies.split('; ') : [];
    let retCookieVal = "undefined";
    cookiesArr.forEach((cookie, _index) => {
        const cookieArr = cookie ? cookie.split('=') : []
        if (cookieArr[0] === "GSIS_TAG") retCookieVal = cookieArr[1]
    })
    return retCookieVal
}

const makeQuery = (query_obj) => {
    let str = [];
    for (let p in query_obj)
        if (query_obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(query_obj[p]));
        }
    return str.join("&");
}

const postData = async (url = '', data = "") => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

//////////////////////////////////////////////////////////////////
const step4 = (_req, res, userXML) => {
    if (debug) console.log("ON STEP 4");
    //To keimeno edo exei toso entities oso kai UTF-8 keimeno!!!!!!
    //<root><userinfo userid="User068933130   " taxid="068933130   " lastname="&#914;&#913;&#914;&#927;&#933;&#923;&#913;" firstname="ΕΥΤΥΧΙΑ" fathername="ΕΜΜΑΝΟΥΗΛ" mothername="ΑΝΝΑ" birthyear="1950"/></root>
    //episis exei kena sta values pou prepei na ta kano trim!!!!!
    const options = {
        attributeNamePrefix: "",
        ignoreAttributes: false,
        ignoreNameSpace: true,
        parseNodeValue: true,
        parseAttributeValue: true,
        trimValues: true,
        parseTrueNumberOnly: true,
        attrValueProcessor: (val, _attrName) => he.decode(val, { isAttributeValue: true }),
    };
    try {
        const parser = new fxmlparser.XMLParser(options);
        const user = parser.parse(userXML).root.userinfo;
        let session = {
            taxid: "" + user.taxid,//make it sure taxid is string!
            lastname: "" + user.lastname,
            firstname: "" + user.firstname
        }
        if (debug) console.log("STEP4: ", session)
        return session
    } catch (error) {
        if (debug) console.log(error)
        res.status(400).json("ERR: 009 Problem in userinfo from the systems of the General Secretariat for Information Systems.");
        res.end();
        return;
    }
}
////////////////////////////////////////////////////////////////////
const step2 = async (req, res, GSIS_TAG) => {
    if (debug) console.log("ON STEP2")
    const querys = req.query;
    const code = querys ? querys.code ? querys.code : undefined : undefined
    const state = querys ? querys.state ? querys.state : undefined : undefined
    const qerror = querys ? querys.error ? querys.error : undefined : undefined
    const qerror_description = querys ? querys.error_description ? querys.error_description : undefined : undefined

    // step2 success get token with code.
    if (typeof code !== "undefined" && typeof state !== "undefined") {
        if (debug) console.log("ON STEP2 with code and state", code, state)
        //check our tag
        if (state !== GSIS_TAG) {
            if (debug) console.log("ERR: 002", state, GSIS_TAG)
            res.status(400).json("ERR: 002 Problem in response to the systems of the General Secretariat for Information Systems.");
            res.end();
            return;
        }

        const data = {
            'code': "" + code,
            'redirect_uri': gsisSetings.redirectUrl,
            'client_id': "" + gsisSetings.clientId,
            'client_secret': "" + gsisSetings.clientSecret,
            'scope': '',
            'grant_type': 'authorization_code',
        };
        const body_content = makeQuery(data)

        if (debug) console.log("ON STEP2 before post", body_content)

        try {
            const tokenjson = await postData(gsisSetings.accessTokenUrl, body_content)
            if (debug) console.log("ON STEP2 after post", tokenjson);
            if (!tokenjson) {
                res.status(400).json("ERR: 006 Problem of entering data from the General Secretariat of Information Systems.");
                res.end()
                return;
            }
            if (tokenjson.error) {
                if (debug) console.log(tokenjson)
                res.status(400).json("ERR: 007 Data entry problem by the General Secretariat of Information Systems.");;
                res.end()
                return;
            }
            //call step3
            if (debug) console.log("ON STEP2 before 3", tokenjson.access_token);
            return step3(req, res, tokenjson.access_token)
        } catch (error) {
            if (debug) console.log(error.message)
            res.status(500).json("ERR: 008 Unknown error.");
            res.end()
            return;
        }
    } else {

        if (qerror) {
            res.redirect("/?error=" + qerror + "&error_description=" + qerror_description + "&state=" + state)
            res.end();
            return
        }

        // Step 1
        const path = gsisSetings.authorizationUrl + '?client_id=' + gsisSetings.clientId + '&redirect_uri=' + gsisSetings.redirectUrl + '&response_type=code&scope=read&state=' + GSIS_TAG;
        if (debug) console.log("ON STEP 1 redirect to gsis server", path, GSIS_TAG)
        //const redirectTo = '<html><head><meta http-equiv="Refresh" content="30; URL="'+path+'"></head><a href="'+path+'">'+path+'</a></html>'
        res.redirect(path)
        res.end();
        return
    }
}
////////////////////////////////////////////////////////////
const step3 = async (req, res, access_token) => {
    try {
        const getuserurl = gsisSetings.profileUrl + "?format=xml&access_token=" + access_token;
        const xml = await fetch(getuserurl)
        const userXML = await xml.text()
        if (debug) console.log("BEFORE step 4", userXML)
        return step4(req, res, userXML)
    } catch (error) {
        // In case of error gsis sends JSON !!!
        if (debug) console.log(error)
        res.status(400).json("ERR: 005 Data collection problem from the General Secretariat of Information Systems.")
        res.end();
        return;
    }
}
////////////////////////////////////////////////////////////
const gsis_flow = async (req, res, GSIS_TAG) => {
    //Step2 //Step1 //Step3 //Step4 
    return await step2(req, res, GSIS_TAG)
}

////////////////////////////////////////////////////////////
const gsispa = async (req, res) => {
    //  set tag cookie if not exist 
    let GSIS_TAG = "" + getTagcookie(req)
    if (GSIS_TAG === undefined || GSIS_TAG === "undefined") {
        GSIS_TAG = makeTag()
        setTagCookie(res, GSIS_TAG)
        if (debug) console.log('Set GSIS_TAG cookie', GSIS_TAG)
    }
    if (debug) console.log('start oauthpa2 flow')
    const userinfo = await gsis_flow(req, res, GSIS_TAG)
    if (debug) console.log("GSIS UserInfo", userinfo)
    if (userinfo) {
        //chect to db if user exist
        //if not create user?
        //if yes update user?
        let user = await database.user.findOne({//find a user with matching username & password
            where: {
                username: userinfo.taxid,
            }
        })
        if (debug) console.log("App UserInfo", user)
        if (user && user.dataValues) {
            req.session.user = user;
            req.session.username = user.username;//store data to session variables
            req.session.fname = user.fname;
            req.session.lname = user.lname;
            req.session.isAdmin = isAdmin;
            req.session.role = user.role;
            if (debug) console.log("App Session", req.session)
            res.redirect(302, "/user_views/dashboard?ref=gsis");
        } else {
            req.session.errors.push({ msg: 'Δε βρέθηκε χρήστης με αυτό το ΑΦΜ.' })//custom error message
            res.redirect(302, "./login");//redirect and display errors
        }
    }
    res.end();
};

routes.get('/', async function (req, res, next) {
    req.session.errors = null;
    gsispa(req, res)
});

module.exports = routes;