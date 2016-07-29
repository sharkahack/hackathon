(function(){
  "use strict"
  angular.module('skillsMatrixApp').run(function($rootScope){
    $rootScope.dataLocker.savedQuerys = {
      0: {
        queryname: "query0",
        location: 'Boston, Ma',
        required: [
          "Javascript",
          "HTML",
        ],
        optional: [
          "PhotoShop",
        ]
      },
      1: {
        queryname: "query1",
        location: 'Las Vegas, NV',
        required: [
        ],
        optional: [
        ]
      }
    }
  });

})();
