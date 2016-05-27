angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http, $window, 
  $rootScope, $ionicLoading, $timeout, $interval, $state, $cordovaDevice, $ionicModal) {

  $ionicModal.fromTemplateUrl('image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      //console.log('Modal is shown!');
    });

    $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';

    $scope.showImage = function(data) {
      //console.log(data);
      $scope.imageSrc = data;
      $scope.openModal();
    }

    $scope.get_comments = function(tweet_id, user_id) {

      $scope.modalCom.show();

      if(tweet_id){
        window.localStorage.setItem('uid', ''+user_id);
        window.localStorage.setItem('tid', ''+tweet_id);

          //console.log(window.localStorage.getItem( 'uid' ));
          //console.log(window.localStorage.getItem( 'tid' ));
        }else{

          tweet_id = window.localStorage.getItem( 'tid' );
          user_id = window.localStorage.getItem( 'uid' );

          //console.log(window.localStorage.getItem( 'uid' ));
          //console.log(window.localStorage.getItem( 'tid' ));
        }

        //console.log(id_tweet);

        var url = 'http://portal.daabon.com.co/family_app/getComments.php?tweet_id='+tweet_id+'&limit='+100+'&offset='+0;

        //console.log(url);


        $http.get(url).
        success(function(data) {
                // here the data from the api is assigned to a variable named users
                $scope.comments = data;

                //console.log(JSON.stringify(data));
              })
      };

      $scope.init = function(){
  //var uuid = $cordovaDevice.getUUID();
  //window.localStorage.setItem('uuid', ''+uuid);
  window.localStorage.setItem('uuid', 'b5cce5dd43ead8ab');
  var uuid = window.localStorage.getItem( 'uuid' );
  //alert(uuid);
  var php_url ='http://portal.daabon.com.co/family_app/get_user.php?uuid='+uuid;

    //console.log(php_url);

    $http.get(php_url).
    success(function(data) {
              // here the data from the api is assigned to a variable named users
              if(data.length==0){
                $state.go('request');
                    //console.log("Request");
                  }else{
                    $scope.user = data;
                    //console.log($scope.user[0].id);
                    //alert("Todo OK");
                  }
                });
  }

  $scope.init();

  $ionicModal.fromTemplateUrl('templates/comments.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCom = modal;
  });
  $scope.openModalCom = function(){
    $scope.modalCom.show();
  }
  $scope.closeModalCom = function(){
    $scope.modalCom.hide();
  }

  $scope.refreshTasks = function() {
    $timeout(function(){
      $scope.refresh();
    }, 800)
  };

  $scope.get_emojis = function(){
    var link = 'http://portal.daabon.com.co/family_app/get_emojis.php';

    $http.get(link).success(function (res){
      $scope.emojis = res;
        //console.log(res);
      });
  }

  $scope.get_tweets = function() {
    $scope.get_emojis();

    var lim = 10;
    var oset = 0;
    $http.get('http://portal.daabon.com.co/family_app/get_tweets.php?limit='+lim+'&offset='+oset).
    success(function(data) {

      $scope.tweets = data;

    }).then(function(){
      $ionicLoading.hide();
    })

  };

  $scope.openURL = function(urlString) {

   var myURL = encodeURI(urlString);
       //console.log(urlString);
       window.open(myURL, '_system');

     };

     $scope.refresh = function () {
    //console.log('refresh');

    $ionicLoading.show({
      template: '<ion-spinner icon="crescent" class="spinner-royal"></ion-spinner>',
      content: 'Loading Data',
      animation: 'fade-out',
      showBackdrop: true,
      showDelay: 0
    });
    $scope.get_tweets();
    $state.go($state.current, {}, {reload: true});
  }

  $scope.get_tweets();


  $scope.submit_comment = function(obj) {


    var uid = window.localStorage.getItem( 'uid' );
    var tid = window.localStorage.getItem( 'tid' );
    var comment = obj.comment;

    $("#inputComment").val("");

        //console.log(uid+" - "+tid);
        //console.log(obj.message);

        var php_url = 'http://portal.daabon.com.co/family_app/new_comment.php';

        $http.post(php_url, {user_id : uid, comment : comment, tweet_id : tid}).then(function (res){
          $scope.response = res.data;

          //console.log(res.data);
          //$scope.modal.hide();

          $scope.get_comments();
        });
      }

      $scope.showPopup = function() {

       $scope.data = {}

       if($scope.link==null){
        //console.log($scope.data);
      }else{
        $scope.link;
        //console.log($scope.link);
      }
      
   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     templateUrl: 'templates/hiperlink.html',
     title: 'Enlace',
     scope: $scope,
     buttons: [
     { text: 'Cancelar' },
     {
       text: '<b>Ok</b>',
       type: 'button-positive',
       onTap: function(e) {

        var enlace = $scope.data.link;
                    //console.log(enlace);
                    $scope.link = enlace;
                  }
                },
                ]
              });
   myPopup.then(function(res) {
     //console.log('Tapped!', res);
     myPopup.close();
   });
 };

})

.controller('GetTweets', function($scope, $http, $cordovaDevice) {
  $scope.get_tweets = function() {
    var lim = 10;
    var oset = 0;
    var url = 'http://portal.daabon.com.co/family_app/get_tweets.php?limit='+lim+'&offset='+oset;

    //console.log(url);

    $http.get(url).
    success(function(data) {
            // here the data from the api is assigned to a variable named users
            $scope.tweets = data;

            //console.log(data);
          })

  };

  $scope.get_tweets();
})

.controller('GetUser', function($scope, $http) {

  $scope.get_user = function() {
    var uuid = window.localStorage.getItem( 'uuid' );
    $http.get('http://portal.daabon.com.co/family_app/get_user.php?uuid='+uuid).
    success(function(data) {
            // here the data from the api is assigned to a variable named users
            $scope.user = data;

            //console.log(data);
          });
  };

  $scope.get_user();

})

.controller('NewTweetCtrl', function($scope, $http, $ionicPopup, $state, $rootScope, 
  $cordovaCamera, $ionicActionSheet, $cordovaFileTransfer) {

  $scope.openPhotoLibrary = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {

            //console.log(imageData);
            //console.log(options);   
            var image = document.getElementById('tempImage');
            image.src = imageData;  

            var server = "http://portal.daabon.com.co/family_app/upload.php",
            filePath = imageData;

            var date = new Date();

            var options = {
              fileKey: "file",
              fileName: imageData.substr(imageData.lastIndexOf('/') + 1),
              chunkedMode: false,
              mimeType: "image/jpg"
            };

            $cordovaFileTransfer.upload(server, filePath, options).then(function(result) {
              console.log("SUCCESS: " + JSON.stringify(result.response));
              console.log('Result_' + result.response[0] + '_ending');
              alert("success");
              alert(JSON.stringify(result.response));

            }, function(err) {
              console.log("ERROR: " + JSON.stringify(err));
              alert(JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
              });


          }, function(err) {
            // error
            console.log(err);
          })
  }

  $scope.submit = function(obj) {

        //console.log($("#user_id").val());
        var uid = $("#user_id").val();
        //console.log(obj.message);

        var link = $scope.link;

        //console.log("LINK: "+link);

        var php_url = 'http://portal.daabon.com.co/family_app/new_tweet.php';

        $http.post(php_url, {user_id : uid, message : obj.message, link : link}).then(function (res){
          $scope.response = res.data;

          //console.log(res.data);

          $state.go('tab.home').then(function() {
            $rootScope.$emit("Refresh", {});
          });
        });
      }

      $scope.showPopup = function() {

       $scope.data = {}

       if($scope.link==null){
        //console.log($scope.data);
      }else{
        $scope.link;
        //console.log($scope.link);
      }
      
   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     templateUrl: 'templates/hiperlink.html',
     title: 'Enlace',
     scope: $scope,
     buttons: [
     { text: 'Cancelar' },
     {
       text: '<b>Ok</b>',
       type: 'button-positive',
       onTap: function(e) {

        var enlace = $scope.data.link;
                    //console.log(enlace);
                    $scope.link = enlace;
                  }
                },
                ]
              });
   myPopup.then(function(res) {
     //console.log('Tapped!', res);
     myPopup.close();
   });
 };

})


.controller('AccountCtrl', function($scope, $state, $cordovaDevice) {

  $scope.settings = {
    enableFriends: true
  };

  $scope.goRequest = function() {
    $state.go('request');
  };

  $scope.goWait = function() {
    $state.go('wait');
  };

})

.controller('AboutCtrl', function($scope, $state, $cordovaDevice) {

})


.controller('RequestCtrl', function($scope, $http, $cordovaDevice) {

  $scope.sendRequest = function(data){
      //var uuid =  $cordovaDevice.getUUID();
      var uuid =  'adjfhdjgasg'
      var first_name = data.first_name;
      var last_name = data.last_name;
      var php_url = "http://portal.daabon.com.co/family_app/sendRequest.php";

      $http.post(php_url, {first_name : first_name, last_name : last_name, uuid : uuid}).then(function (res){
        $scope.response = res.data;

        alert(res.data, "Confirmado", "Aceptar");


      });
    }

  })

.controller('ProfileCtrl', function($scope, $http) {

  $scope.get_user = function() {
   var uuid = window.localStorage.getItem( 'uuid' );
   $http.get('http://portal.daabon.com.co/family_app/get_user.php?uuid='+uuid).
   success(function(data) {
              // here the data from the api is assigned to a variable named users
              $scope.user = data;

              //console.log(data);
            });
 };

 $scope.get_user();
 
})

.controller('EventsCtrl', function($scope, $http, $timeout, $ionicPopup, $cordovaLocalNotification, 
  $rootScope, $ionicPlatform, uiCalendarConfig, $compile) {

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.events = [];

  var url = 'http://portal.daabon.com.co/family_app/get_events.php';


  $http.get(url).success(function(data) {
    $scope.dbdata = data;
    $scope.cargarEventos();

    if(window.localStorage.getItem('schedule')!=null){
      console.log('PROGRAMAR EVENTOS');
      $ionicLoading.show({
        template: '<ion-spinner icon="crescent" class="spinner-royal"></ion-spinner>',
        content: 'Programando Eventos',
        animation: 'fade-out',
        showBackdrop: true,
        showDelay: 0
      });

      $scope.programarEventos().success(function(){
        $ionicLoading.hide();
      });
    }else{
      console.log('EVENTOS YA PROGRAMADOS');
      $cordovaLocalNotification.getAll(function (notifications) {
          console.log(JSON.stringify(notifications));
      });

      if($scope.dbdata.length>window.localStorage.getItem('schedule')){
        $cordovaLocalNotification.cancelAll();
        $ionicLoading.show({
          template: '<ion-spinner icon="crescent" class="spinner-royal"></ion-spinner>',
          content: 'Programando Eventos',
          animation: 'fade-out',
          showBackdrop: true,
          showDelay: 0
        });

        $scope.programarEventos().success(function(){
          $ionicLoading.hide();
        });
      }
    }
  })

  var cal = document.getElementById("calendar");

  Hammer(cal).on('swiperight', function(ev) {
   $('#calendar').fullCalendar('prev');
 });

  Hammer(cal).on('swipeleft', function(ev) {
   $('#calendar').fullCalendar('next');
 });

  $scope.cargarEventos = function(){
    angular.forEach($scope.dbdata, function(event){
      var fecha = $("#calendar").fullCalendar('getDate');
      fecha = new Date(fecha);

      var month_int = fecha.getMonth()+1;
      if(month_int<10){
        month_int = "0"+month_int;
      }

      if(event.start.substring(0,3)==(month_int+"/")){

          /*console.log(event.title);
          console.log(event.start);
          console.log(event.type);*/

          var imgURL = 'img/event.png';
          if(event.type=='birthday'){

            var numImg = Math.floor((Math.random() * 4) + 1);

            imgURL = 'img/birthday-'+numImg+'.png';
          }else if(event.type=='lunch'){
            imgURL = 'img/lunch.png';
          }else if(event.type=='meeting'){
            imgURL = 'img/meeting.png';
          }else if(event.type=='anniversary'){
            imgURL = 'img/anniversary-2.png';
          }else if(event.type=='xmas'){
            imgURL = 'img/xmas.png';
          }

          $scope.events.push({
            id : event.id,
            title: event.title,
            start: new Date(y+"/"+event.start),
            end: new Date(event.end),
            imageurl: imgURL
          })
        }
      })
  }

  $scope.viewRender = function(view, element) {
      //console.log('SE CAMBIO DE MES');
      $scope.cargarEventos();
      $('#calendar').fullCalendar('refetchEvents');
    };

    $scope.eventRender = function(event, element, view){
      if (event.imageurl) {
        element.find("div.fc-content").prepend("<center><img src='" + event.imageurl +"' width='30' height='30'></center>");
      }
    }

    $scope.alertOnEventClick = function( date, jsEvent, view){
        //alert(date.title, "Información", "Aceptar");
        //console.log(date.title + ' was clicked ');

        $scope.currentEvent = date;

        var myPopup = $ionicPopup.show({
         templateUrl: 'templates/event.html',
         title: 'Evento',
         scope: $scope,
         buttons: [
         {
           text: '<b>Ok</b>',
           type: 'button-positive',
         },
         ]
       });
        myPopup.then(function(res) {
         myPopup.close();
       });

      };

      $scope.uiConfig = {
        calendar:{
          lang: 'es',
          height: 450,
          eventColor: 'white',
          editable: false,
          header:{
            left: 'prev',
            center: 'month basicWeek basicDay agendaWeek agendaDay',
            center: 'title',
            right: 'today,next'
          },
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender,
          viewRender: $scope.viewRender
        }
      }

      $scope.eventSources = [$scope.events];

      $scope.programarEventos = function(){
        angular.forEach($scope.dbdata, function(event){
          $ionicPlatform.ready(function () {
            $cordovaLocalNotification.schedule({
              id: evento.id,
              title: 'Eventos Hoy',
              text: evento.title,
              at: new Date(y+"/"+event.start)
            })

            $rootScope.$on('$cordovaLocalNotification:click', function(event, notification, state) {
               console.log('ENTRO')
              if(notification.id = evento.id){
                console.log('OK');
              }else{
                console.log('NOPE');
              }
            })
          })
        })

        window.localStorage.setItem('schedule', $scope.dbdata.length);
      }

    })

.filter('emoji', function($timeout) {

  return function(input, scope){
    var out = input;
    angular.forEach(input, function(tweet){

      var emojis = scope.emojis;
      var str = tweet.message;

      for(var i = 0; i<emojis.length; i++){
        if(str.indexOf(emojis[i].preg)>= 0){
          tweet.message = str.replace(emojis[i].preg, "<img class='emoji' src='"+emojis[i].image+"'>");
        }else{
                  //tweet.message = str;
                }
              }

            })
    return out;
  }

})

.filter('emojiComment', function($timeout) {
  return function(input, scope){
    var out = input;
    angular.forEach(input, function(comment){
      var emojis = scope.emojis;
      var str = comment.comment;

      for(var i = 0; i<emojis.length; i++){
        if(str.indexOf(emojis[i].preg)>= 0){
          comment.comment = str.replace(emojis[i].preg, "<img class='emoji' src='"+emojis[i].image+"'>");
        }else{
                  //tweet.message = str;
                }
              }

            })
    return out;
  }

})

.directive('likeSwitcher', function($http) {

  return {
    restrict : 'A',
    
    link : function(scope, elem, attrs) {

      var currentState = true;
      
      elem.on('click', function() {

        if(angular.element(elem).hasClass('ion-ios-heart-outline')){
          var uid = scope.tweet.user_id;
          var tid = scope.tweet.id_tweet;

          //console.log(uid);
          //console.log(tid);

          angular.element(elem).removeClass(attrs.offLike);
          angular.element(elem).addClass(attrs.onLike);

          var num_likes = angular.element(elem).text();
          num_likes++;
          angular.element(elem).text(num_likes);

          var link = 'http://portal.daabon.com.co/family_app/new_like.php';
          
          $http.post(link, {user_id : uid, tweet_id : tid, action : 2}).then(function (res){
            scope.response = res.data;

            //console.log(scope.response);

          });

        }else{
          var uid = scope.tweet.user_id;
          var tid = scope.tweet.id_tweet;

          //console.log(uid);
          //console.log(tid);

          angular.element(elem).removeClass(attrs.onLike);
          angular.element(elem).addClass(attrs.offLike);

          var num_likes = angular.element(elem).text();
          num_likes--;
          angular.element(elem).text(num_likes);

          var link = 'http://portal.daabon.com.co/family_app/new_like.php';
          
          $http.post(link, {user_id : uid, tweet_id : tid, action : 1}).then(function (res){
            scope.response = res.data;

            //console.log(scope.response);

          });
        }

        currentState = !currentState

      });
      
      
    }
  };
})

.directive('likeWatcher', function($timeout, $http) {

  return {
    restrict : 'A',
    
    link : function(scope, elem, attrs) {

      $timeout(function(){

        var currentState = true;

        var tweet_id = scope.tweet.id_tweet;
        var user_id = scope.tweet.user_id;

        //console.log(tweet_id+" - "+user_id);

        var url = 'http://portal.daabon.com.co/family_app/get_likes.php?tweet_id='+tweet_id+'&user_id='+user_id;

        //console.log(url);

        $http.get(url).
        success(function(data_likes) {

          if(data_likes.length>0){
            angular.element(elem).removeClass(attrs.offLike);
            angular.element(elem).addClass(attrs.onLike);
                //console.log("Pon Like si no tiene");
              }else{
                angular.element(elem).removeClass(attrs.onLike);
                angular.element(elem).addClass(attrs.offLike);
                //console.log("Quita Like :v");
              }
            })

        currentState = !currentState

      });
    }
  };
})

.directive('enterDisable', function() {

  return {
    restrict : 'A',
    
    link : function(scope, elem, attrs) {


    }
  };
});





