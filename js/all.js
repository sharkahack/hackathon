(function(){

  // adds a filter to cross refrence master -> query data
  angular.module('skillsMatrixApp').filter('crossref', function ($rootScope) {
      return function (val) {
        for(x in $rootScope.dataLocker.masterSkills){
            if (val == $rootScope.dataLocker.masterSkills[x].id){
              return $rootScope.dataLocker.masterSkills[x].name;
            }
          }
      };
  });


  // add the page controller
  angular.module('skillsMatrixApp').controller('landingPageCtrl',['$scope', '$rootScope', '$http', 'queryBuilder','$window', controllerFunction]);
  function controllerFunction($scope, $rootScope, $http, queryBuilder, $window){



    $scope.pageURL = localStorage.getItem('refferingURL');
    //$scope.pageURL = 'http://www.indeed.com/jobs?as_and=Javascript+HTML&as_any=PhotoShop&l=Boston,%20Ma';

    $scope.tempSkill = "";
    $scope.addSkill = function(){
      $rootScope.dataLocker.masterSkills.push($scope.tempSkill);
    };

    $scope.showMe = 0;
    $scope.next = function(){
      console.log("next");
      $scope.showMe = $scope.showMe + 1;
    };

    $scope.priv = function(){
      console.log("next");
      $scope.showMe = $scope.showMe - 1;
    };



    $scope.launchSearch = function(){
        console.log("Search launched");
        var q = queryBuilder.Build(''+$scope.showMe,'indeed');
        $window.open(q);

    };


    $scope.deDupe = function(array){
      var unequeList = [];
      for (var x in array){

        var found = false;
        for(y in unequeList){
          if (unequeList[y] == array[x]){
            found = true;
          }
        }

        if (found == false){unequeList.push(array[x])};

      }
      return unequeList;
    };

    $scope.$watch('dataLocker.masterSkills', function (newValue, oldValue) {
        $rootScope.dataLocker.masterSkills = $scope.deDupe(newValue);
    },true);

    $scope.$watch('dataLocker.api', function (newValue, oldValue) {
        $rootScope.dataLocker.api = $scope.deDupe(newValue);
    },true);



    // this needs to be made dynamic
    $scope.$watch("dataLocker.savedQuerys['0'].required", function (newValue, oldValue) { $rootScope.dataLocker.savedQuerys['0'].required = $scope.deDupe(newValue);  },true);
    $scope.$watch("dataLocker.savedQuerys['0'].optional", function (newValue, oldValue) {console.log("optioal changed");$rootScope.dataLocker.savedQuerys['0'].optional = $scope.deDupe(newValue);},true);

    $scope.$watch("dataLocker.savedQuerys['1'].required", function (newValue, oldValue) { $rootScope.dataLocker.savedQuerys['1'].required = $scope.deDupe(newValue);  },true);
    $scope.$watch("dataLocker.savedQuerys['1'].optional", function (newValue, oldValue) {console.log("optioal changed");$rootScope.dataLocker.savedQuerys['1'].optional = $scope.deDupe(newValue);},true);

    $scope.$watch("dataLocker.savedQuerys['2'].required", function (newValue, oldValue) { $rootScope.dataLocker.savedQuerys['2'].required = $scope.deDupe(newValue);  },true);
    $scope.$watch("dataLocker.savedQuerys['2'].optional", function (newValue, oldValue) {console.log("optioal changed");$rootScope.dataLocker.savedQuerys['2'].optional = $scope.deDupe(newValue);},true);

    $scope.$watch("dataLocker.savedQuerys['3'].required", function (newValue, oldValue) { $rootScope.dataLocker.savedQuerys['2'].required = $scope.deDupe(newValue);  },true);
    $scope.$watch("dataLocker.savedQuerys['4'].optional", function (newValue, oldValue) {console.log("optioal changed");$rootScope.dataLocker.savedQuerys['2'].optional = $scope.deDupe(newValue);},true);

    $scope.$watch("dataLocker.savedQuerys['4'].required", function (newValue, oldValue) { $rootScope.dataLocker.savedQuerys['3'].required = $scope.deDupe(newValue);  },true);
    $scope.$watch("dataLocker.savedQuerys['5'].optional", function (newValue, oldValue) {console.log("optioal changed");$rootScope.dataLocker.savedQuerys['3'].optional = $scope.deDupe(newValue);},true);




    $scope.refrenceSkills = function(){
        //console.log($root.dataLocker.masterSkills);
    };

    console.log($rootScope.dataLocker.masterSkills);
    $scope.APIUrl = "https://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords?apikey=e1988a049c6961aca0a370068dcf5a0140521026&outputMode=json&url="
    $scope.showRankedKeywords = false;

    $scope.showIt = function(){
      $scope.showRankedKeywords = true;
      $scope.jobUrl = $scope.APIUrl.concat($scope.jobUrl);

      $http.get($scope.jobUrl).then(function(response) {
        var temp = response.data.keywords;
        $rootScope.dataLocker.api = [];
        var count = 0;
        for (var t in temp){
          count++;
          if(count < 8){
            $rootScope.dataLocker.api.push(temp[t].text);
          }
        }
      });
    }


    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      console.log(tabs[0]);
      var ele = document.getElementById('hackForm');
      console.log(ele);
      //ele.value = tabs[0].url;
      $scope.jobUrl = tabs[0].url;

      $scope.showIt();

    });

    //console.log($rootScope.dataLocker);
  };
})();


(function(){

  angular.module('skillsMatrixApp').controller('sortableController', function ($scope) {
    'use strict';
    $scope.sortableOptions = {
      stop: function(e, ui) {

      }
    };
  });

  angular.module('skillsMatrixApp').controller('connectedController', function ($scope) {
    $scope.masterList = [];
    $scope.apiList = [];
    $scope.sortableOptions = {
      connectWith: '.connectedItemsExample .list',
      stop: function(e, ui) {
        //console.log(ui);
      }
    };
  });

})();



