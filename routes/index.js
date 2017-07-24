var express = require('express');
var router = express.Router();
var app = require('../public/build/es5/serverapp');

var React = require('react');
var ReactRouter = require('react-router');
var ReactDOMServer = require('react-dom/server');

var serverapp = require('../public/build/es5/serverapp');
var Home = require('../public/build/es5/components/layout/Home');

var store = require('../public/build/es5/stores/store');
var AccountController = require('../controllers/AccountController');
var controllers = require('../controllers');

var ProfileInfo = require('../public/build/es5/components/layout/ProfileInfo');

matchRoutes = function(req, routes) {
  return new Promise(function(resolve, reject) {
    ReactRouter.match({
      routes: routes,
      location: req.url
    }, function(error, redirectLocation, renderProps) {
      if (error) {
        reject(error);
        return;
      }
      resolve(renderProps);
      return;
    })
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {

  var initialStore = null;
  var reducers = {};

  AccountController.currentUser(req).then(function(result) {
    //console.log('CURRENT USER: ' + JSON.stringify(result));
    reducers['account'] = {
      user: result
    }

    return controllers.zone.find(null);
  }).then(function(zones) {

    reducers['zone'] = {
      selectedZone: 0,
      list: zones,
      appStatus: 'ready'
    }
  }).then(function() {
    initialStore = store.configureStore(reducers);
    var routes = {
      path: '/',
      component: serverapp,
      initial: initialStore,
      indexRoute: {
        component: Home
      }
    }
    return matchRoutes(req, routes)
  })
  .then(function(renderProps) {
    var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps));
    console.log("1" + html);
    res.render('index', {
      react: html,
      preloadedState: JSON.stringify(initialStore.getState())
    })
  }).catch(function(err) {
    console.log('NOT LOGGED IN' + JSON.stringify(err));
  });
});

router.get('/:page/:slug', function(req, res, next) {
  var page = req.params.page;
  var slug = req.params.slug;

  var initialStore = null;
  var reducers = {};

  if (page == 'api' || page == 'account') {
    next();
    return;
  }

  controllers.profile.find({username: slug})
    .then(function(profiles){
      var profile = profiles[0];
      var profileMap = {};
      profileMap[slug] = profile;

      reducers['profile'] = {
        list: [profile],
        map: profileMap,
        appStatus: 'ready'
      }

      initialStore = store.configureStore(reducers);

      var routes = {
        path: '/profile/:username',
        component: serverapp,
        initial: initialStore,
        indexRoute: {
          component: ProfileInfo
        }
      }

      return matchRoutes(req, routes);
    })
    .then(function(renderProps){
      var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps));
      console.log("2" + html);
      res.render('index', {
        react: html,
        preloadedState: JSON.stringify(initialStore.getState())
      })
    })
    .catch(function(err){
      console.log('err:' + err);
    });
});

router.get('/createzone', function(req, res, next) {
  res.render('createzone');
});

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment');
});

module.exports = router;
