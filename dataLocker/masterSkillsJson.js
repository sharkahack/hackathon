(function(){
  "use strict"
  angular.module('skillsMatrixApp').run(function($rootScope){
    $rootScope.dataLocker.masterSkills = [
      "Javascript",
      "HTML",
      "PhotoShop",
      "CSS",
      "Less",
      "TypeScript",
    ]
  });

})();
