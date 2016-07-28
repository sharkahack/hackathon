(function(){
  "use strict"
  angular.module('skillsMatrixApp').run(function($rootScope){
    $rootScope.dataLocker.savedQuerys = {
      query1: {
        location: 'Boston, Ma',
        required: [1,2],
        optional: [3]
      },
      query2: {
        location: 'Las Vegas, NV',
        required: [3],
        optional: [1,2]
      }
    }
  });

})();
