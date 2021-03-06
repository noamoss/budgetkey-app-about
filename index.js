'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const nunjucks = require('nunjucks');

const basePath = process.env.BASE_PATH || '/';
const rootPath = path.resolve(__dirname, './dist');
const disableCache = process.env.DISABLE_CACHE || false;

const app = express();
if (disableCache) {
  app.disable('view cache');
}

nunjucks.configure(rootPath, {
  autoescape: true,
  noCache: disableCache,
  express: app
});

app.set('port', process.env.PORT || 8000);

app.get(basePath + '*', function(req, res) {
  var filePath = path.resolve(rootPath, req.params[0]);
  if (fs.existsSync(filePath)) {
    var stats = fs.lstatSync(filePath);
    if (stats.isFile()) {
      return res.sendFile(filePath);
    }
  }

  var theme = typeof(req.query.theme) !== "undefined" ? req.query.theme : '';
  var themeFileName = theme !== '' ? 'theme.'+req.query.theme+'.json' : null;
  var themeScript = '';
  var themeJson = null;
  if (themeFileName) {
    // try the themes root directory first - this allows mount multiple themes in a single shared docker volume
    if (fs.existsSync(path.resolve('/themes', themeFileName))) {
      themeJson = JSON.parse(fs.readFileSync(path.resolve('/themes', themeFileName)));
      // fallback to local file - for local development / testing
    } else if (fs.existsSync(path.resolve(__dirname, themeFileName))) {
      themeJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, themeFileName)));
    }
    if (themeJson) {
      for (var key in themeJson) {
        themeScript += key+"="+JSON.stringify(themeJson[key])+";";
      }
      themeScript += "BUDGETKEY_THEME_ID=" + JSON.stringify(req.query.theme) + ";";
    }
  }

  var siteName = (themeJson && themeJson.BUDGETKEY_APP_GENERIC_ITEM_THEME) ? themeJson.BUDGETKEY_APP_GENERIC_ITEM_THEME.siteName : 'מפתח התקציב'
  var title = 'אודות ' + siteName;
  res.render('index.html', {
    themeScript: themeScript, base: basePath, title: title,
    authServerUrl: process.env.AUTH_SERVER_URL
  });
});

app.listen(app.get('port'), function() {
  console.log('Listening port ' + app.get('port'));
});
