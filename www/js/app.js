// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services', 'ui.router', 'ngCordova', 'ngSanitize', 'ui.calendar'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    /*var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
      var payload = notification.payload;
        console.log("onNotification: "+notification, payload);
      },
      "onRegister": function(data) {
        console.log("onRegisterToken: "+data.token);
      }
    });
 
    push.register(function(token) {
      console.log("My Device token: ", token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
    });*/
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $logProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $logProvider.debugEnabled(true);
  $ionicConfigProvider.views.forwardCache(true);
  $ionicConfigProvider.views.maxCache(10);

  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/dash',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.new-tweet', {
      url: '/new-tweet',
      views: {
        'tab-home': {
          templateUrl: 'templates/new-tweet.html',
          controller: 'NewTweetCtrl'
        }
      }
    })

   .state('tab.about', {
      url: '/about',
      views: {
        'tab-home': {
          templateUrl: 'templates/about.html',
          controller: 'AboutCtrl'
        }
      }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/ethic.html',
        controller: 'AccountCtrl'
      }
    }})

  .state('tab.events', {
    url: '/events',
    views: {
      'tab-events': {
        templateUrl: 'templates/tab-events.html',
        controller: 'EventsCtrl'
      }
    }})

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }})

  .state('request', {
      url: '/request',
      templateUrl: 'templates/request.html',
      controller: 'RequestCtrl'
  })

  .state('wait', {
      url: '/wait',
      templateUrl: 'templates/wait.html',
      controller: 'WaitCtrl'
  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
