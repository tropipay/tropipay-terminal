/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require("ksmf");
const axios = require("axios");
const qs = require("qs");

class DefaultController extends KsMf.app.Controller {
  init() {
    const Logger = this.helper.get("logger.class");
    this.logger = new Logger({
      prefix: "Security.DefaultController",
      level: this.opt.srv.log,
    });
    this.tropipay = this.helper.get("TropiPay");
  }

  async oauthResponse(req, res) {
    try {
      const oauth_token =
        process.env["URL_TROPIPAY"] + process.env["OAUTH_URL_TOKEN"];
      //... verify the state value
      if (req.query["state"] !== process.env["OAUTH_STATE"]) {
        this.logger.error("NOT secure, the state value not match");
      }
      //... confifure options for get authorization code
      const param = {
        grant_type: "authorization_code",
        code: req.query["code"],
        client_id: process.env["OAUTH_CLIENT_ID"],
        client_secret: process.env["OAUTH_CLIENT_SECRET"],
        redirect_uri: process.env["OAUTH_REDIRECT_URI"],
        code_verifier: process.env["OAUTH_CODE_VERIFIER"],
        scope: process.env["OAUTH_SCOPE"],
      };
      //... save authorization code
      const token = await axios.post(oauth_token, param);
      const old = req.cookies.session
        ? typeof req.cookies.session === "string"
          ? JSON.parse(req.cookies.session)
          : req.cookies.session
        : {};
      const ses = {
        //...old,
        access_token: token.data.access_token,
        refresh_token: token.data.refresh_token,
        token_type: token.data.token_type,
        expires_in: token.data.expires_in,
      };
      res.cookie("session", JSON.stringify(ses), {
        maxAge: 864000000,
      });
      this.logger.info("session", ses);
      this.logger.info("redirect", process.env["URL_TERMINAL"]);
      res.redirect(process.env["URL_TERMINAL"]);
    } catch (error) {
      this.logger.error("Error", error);
      res.end("OAUTH: Not authorize");
    }
  }

  async oauthConnect(req, res) {
    const oauth_authorize =
      process.env["URL_TROPIPAY"] + process.env["OAUTH_URL_AUTHORIZE"];
    const param = qs.stringify({
      response_type: "code",
      client_id: process.env["OAUTH_CLIENT_ID"],
      // client_secret: process.env['OAUTH_CLIENT_SECRET'],
      redirect_uri: process.env["OAUTH_REDIRECT_URI"],
      code_challenge: process.env["OAUTH_CODE_CHALLENGE"],
      code_challenge_method: process.env["OAUTH_CODE_CHALLENGE_METHOD"],
      state: process.env["OAUTH_STATE"],
      scope: process.env["OAUTH_SCOPE"],
    });
    this.logger.info("connected_view", oauth_authorize + "?" + param);
    res.redirect(oauth_authorize + "?" + param);
  }

  async getProfile(req, res) {
    const result = await this.tropipay
      .set({
        token: req.token,
      })
      .getProfile();
    if (result.error) {
      res.status(401);
      res.json({
        error: "unauthorized",
      });
    } else {
      res.json(result.data);
    }
  }

  async getPageURL(req, res) {
    this.tropipay.set({
      token: req.token,
    });
    const url = this.tropipay.getPageURL();
    res.json({
      url,
    });
  }
}
module.exports = DefaultController;
