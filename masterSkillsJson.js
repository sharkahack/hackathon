



function rankedKeywords()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords?apikey=e1988a049c6961aca0a370068dcf5a0140521026&outputMode=json&url=http://jobview.monster.com/Senior-IT-Database-Analyst-Multiple-Locations-Job-Boston-MA-US-170200057.aspx?mescoid=1500142001001&jobPosition=1", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
