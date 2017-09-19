$(document).ready(function(){



$("#submit-button").click(function searchCity(){
   var citySearch= $("input.city-name").val();
    $("#city-display").text(citySearch);
    $("form")[0].reset();


var apiURL="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+citySearch+"%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"




$.ajax(
   {
  url: apiURL,
    method: "GET",
    success: function(data){

    var conditionResult = data.query.results.channel.item.condition.text;
      $("#conditions").text(conditionResult);

    var tempCurrentResult = data.query.results.channel.item.condition.temp;
      $("#temp-current").html(tempCurrentResult+"&#176");

    var tempHighResult = data.query.results.channel.item.forecast[0].high;
      $("#temp-high").html(tempHighResult+"&#176");

    var tempLowResult = data.query.results.channel.item.forecast[0].low;
      $("#temp-low").html(tempLowResult+"&#176");

    },
    error: function(error){
      var message = "An error has occured. Data cannot be retrieved, or you entered the name of the city incorrectly.";
     alert(message)
     console.log(error,message);
    }
 });
});

$('input.city-name').keypress(function (e) {
  if (e.which == 13) {
    $('#submit-button').click();
    return false;
  }
});



});
