
(function() {

  angular
    .module('skillsMatrixApp')
    .factory('queryBuilder', queryBuilder);

  queryBuilder.$inject = ['$rootScope'];

  function queryBuilder($rootScope) {

    var masterSkills = $rootScope.dataLocker.masterSkills;
    var savedQueries = $rootScope.dataLocker.savedQuerys;

    var service = {
      Build: build
    };

    return service;

    function build(qn, type) {

      if(!qn) {
        console.error('Missing query name parameter');
        return;
      }

      var query = queryLookUp(qn);

      if (!query) {
        console.error('Query not found');
        return;
      }

      var monsterUrl = 'http://www.monster.com/jobs/search/?q=';
      var indeedUrl = 'http://www.indeed.com/jobs?';

      var loc = query.location ? query.location : 'Boston, MA';

      var indeedLoc = 'l=' + encodeURIComponent(loc);
      var monsterLoc = 'where=' + encodeURIComponent(loc);

      var isIndeed = type === 'indeed';

      if (!query.hasOwnProperty('required')) {
        console.error('Missing required keywords');
        return;
      }

      var url = isIndeed ? indeedUrl : monsterUrl;
      var locParam = isIndeed ? indeedLoc : monsterLoc;

      var requiredParams = generateRequired(query.required);

      var optionalParams = generateOptional(query.optional);

      url += requiredParams;
      url += requiredParams == '' || !isIndeed ? optionalParams : '&' + optionalParams;
      url += requiredParams == '' && optionalParams == '' ? loc : '&' + locParam;

      return url;

      function generateRequired(required) {
        var params = '';

        if (!(required instanceof Array) || required.length === 0)
          return params;

        params = isIndeed ? 'as_and=' + encodeURIComponent(skillNameLookUp(required[0])) : encodeURIComponent(skillNameLookUp(required[0]));

        var concatSymbol = isIndeed ? '+' : '-';

        for (var i = 1; i < required.length; i++) {
          params += concatSymbol + encodeURIComponent(skillNameLookUp(required[i]));
        }
        return params;
      }

      function generateOptional(optional) {
        var params = '';

        if (!(optional instanceof Array) || optional.length === 0)
          return params;

        params = isIndeed ? 'as_any=' + encodeURIComponent(skillNameLookUp(optional[0])) : '-' + encodeURIComponent(skillNameLookUp(optional[0]));

        var concatSymbol = isIndeed ? '+' : '-';

        for (var i = 1; i < optional.length; i++) {
          params += concatSymbol + encodeURIComponent(skillNameLookUp(optional[i]));
        }

        return params;
      }

      function queryLookUp(qn) {
        return savedQueries[qn] ? savedQueries[qn] : undefined;
      }

      function skillNameLookUp(id) {
        for (var i = 0; i < masterSkills.length; i++) {
          if (masterSkills[i].id === id)
            return masterSkills[i].name;
        }
        return '';
      }
    }
  }
})();