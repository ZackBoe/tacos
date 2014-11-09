var client = new Keen({
  projectId: "545f4515709a3903dab21f97",
  readKey: "1a4694db231c3f86a236e1e66d85aef17709733ab7d2d55f4adc422f17a3db97e146cbab44e18ec8276b2032064de36459da9a37d4128fed6074361f9036cd78d6b51b258ef134daebbb14863850768ae6a925bbcc5d33b5c294067800e10c34a7acec9eb88b1511d55c9d8e56bad4a1"
});


var tacoSauceAllOverTheKeyboard =  window.navigator.userAgent.indexOf("Valve Steam GameOverlay") > -1 ? true : false;
if (tacoSauceAllOverTheKeyboard) {
  $('.navbar').after("<div class='alert alert-info' role='alert'><strong>Man, checking out stats ingame?</strong> You must be a true lover of Tacos. <a href='../'>Wanna grab one?</a></div>");
}

Keen.ready(function(){

  // ----------------------------------------
  // Total Taco Fans
  // ----------------------------------------
  var tacoCravers = new Keen.Query("count", {
    eventCollection: "grabbedATaco"
  });
  client.draw(tacoCravers, document.getElementById("count-totalCravers"), {
    chartType: "metric",
    title: "Visited TenderAlmonds.com",
    chartOptions: { suffix: " Taco Cravers" },
    colors: ["#49c5b1"],
    width: 'auto'
  });

  // ----------------------------------------
  // Ingame Taco Fans
  // ----------------------------------------
  var tacoCravers = new Keen.Query("count", {
    eventCollection: "grabbedATaco",
    filters: [{"property_name": "tacoSauceAllOverTheKeyboard", "operator": "eq", "property_value": true}]
  });
  client.draw(tacoCravers, document.getElementById("count-inGame"), {
    chartType: "metric",
    title: "Visted during a game",
    chartOptions: { suffix: " Taco Fanatics" },
    colors: ["#49c5b1"],
    width: 'auto'
  });




  // ----------------------------------------
  // Taco Providers Bar Chart
  // ----------------------------------------
  var tacoProviders = new Keen.Query("count", {
    eventCollection: "grabbedATaco",
    groupBy: "tacoChoice"
  });
  client.draw(tacoProviders, document.getElementById("chart-tacoProviders"), {
    chartType: "barchart",
    title: false,
    height: 250,
    width: "auto",
    labelMapping: {
      "http://tacobell.com": "Taco Bell",
      "http://chipotle.com": "Chipotle",
      "http://deltaco.com": "Del Taco",
      "http://mightytaco.com": "Mighty Taco"
    },
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "10%",
        top: "5%",
        width: "100%"
      },
      isStacked: true,
      legend: { position: "fixed", width: 200 }
    }
  });



  // ----------------------------------------
  // Visitors line chart
  // ----------------------------------------
  var tacoVisitors = new Keen.Query("count", {
    eventCollection: "grabbedATaco",
    interval: "hourly",
    timeframe: "previous_week",
  });
  client.draw(tacoVisitors, document.getElementById("chart-visitorHitChart"), {
    chartType: "areachart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "80%"
      },
      isStacked: true
    }
  });



  // ----------------------------------------
  // Visitors by Country Bar Chart
  // ----------------------------------------
  var tacoCountry = new Keen.Query("count", {
    eventCollection: "grabbedATaco",
    groupBy: "tacoLocation.country"
  });
  client.draw(tacoCountry, document.getElementById("chart-visitorCountryChart"), {
    chartType: "barchart",
    title: false,
    height: 250,
    width: "auto",
    labelMapping:{
      "null": "Not Set"
    },
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "10%",
        top: "5%",
        width: "100%"
      },
      isStacked: true
    }
  });


});
