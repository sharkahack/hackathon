(function(){
  "use strict"
  angular.module('skillsMatrixApp').run(function($rootScope){
    $rootScope.dataLocker.api = [
      "Javascript Developer",
      "Fun",
      "Hard Worker",
      "XML",
      "Cross-Site-Scripting",
    ]
  });

})();
