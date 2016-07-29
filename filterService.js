(function(){
  "use strict"

  angular
    .module('skillsMatrixApp')
    .factory('filterService', filterService);

  filterService.$inject = ['$rootScope'];

  function filterService($rootScope) {

    var keywordLibrary = $rootScope.dataLocker.keywordLibrary;

    var service = {
      Filter: filter
    };
    return service;

    function filter(keywords) {

      if (!(keywords instanceof Array))
        return keywords;

      var newKeywords = keywords.slice(0);

      for (var i = 0; i < newKeywords.length; i++) {
        newKeywords[i] = updateRelevance(newKeywords[i]);
      }

      return sortByRelevance(newKeywords);
    }

    function sortByRelevance(arr) {
      return arr.sort(function(a, b) {
        return parseFloat(b.relevance) -  parseFloat(a.relevance)
      });
    }

    function updateRelevance(keyword) {

      var lKeyword = keyword.text.toLowerCase();

      var replace = {
        text: keyword.text,
        relevance: keyword.relevance
      }

      for (var i = 0; i < keywordLibrary.length; i++) {
        var boostFactor = 0;
        var libKeywords = keywordLibrary[i].text.toLowerCase().split(" ");

        var prevMatch;

        for (var j = 0; j < libKeywords.length; j++)  {
          if (prevMatch) {
            prevMatch += " " + libKeywords[j].toLowerCase();
          } else {
            prevMatch = libKeywords[j].toLowerCase();
          }

          var addBoost = prevMatch.split(" ").length;

          if (lKeyword.indexOf(prevMatch) > -1)
            boostFactor += addBoost;
          else if (lKeyword.indexOf(libKeywords[j]) > -1) {
            boostFactor++;
            prevMatch = libKeywords[j];
          } else {
            prevMatch = undefined;
          }
        }

        var relevance = parseFloat(keyword.relevance);
        relevance += (0.5 * boostFactor);
        replace.relevance = relevance.toString();
      }
      return replace;
    }
  }

})()

