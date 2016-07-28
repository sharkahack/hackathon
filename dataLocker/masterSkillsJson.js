(function(){
  "use strict"
  angular.module('skillsMatrixApp').run(function($rootScope){
    $rootScope.dataLocker.masterSkills = [
      {id: 1, name: "Javascript"},
      {id: 2, name: "HTML"},
      {id: 3, name: "PhotoShop"},
      {id: 4, name: "CSS"},
      {id: 5, name: "Less"},
      {id: 6, name: "TypeScript"},
    ]
  });

})();
