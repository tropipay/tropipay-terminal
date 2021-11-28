/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
const path = require('path');
class AppModule extends KsMf.app.Module {
    async initApp() {
        const app = this.helper.get('app').web;
        app.get(/\/((?!(api|forest)).)*/, (req, res) => {
            const index = path.join(__dirname, '../../../client/build', 'index.html');
            res.sendFile(index);
        });
    }
}
module.exports = AppModule;