var dvc = {};
dvc.initialYear = 1951;
dvc.finalYear = 2180;
dvc.maxAgetoConsider = 125;
dvc.boolHasError = false;
var regExp = /[0-9]{1,3}/;
dvc.selectedGender = "";
var $graphic = $("#chart6");
var bodyElement = $('body');
var $picto = $("#picto");
var graphic = $('#chart');
var graphicDivWidth = $picto.width();
var graphicDivHeight = $picto.height();
var bodyWidth = bodyElement.width();
var margin = {
  top: 35,
  bottom: 65,
  left: 30,
  right: 25
};
var graphic_aspect_width = 16;
var graphic_aspect_height = 7;
var mobile_threshold = 600;
$(window).resize(function() {
  graphicDivWidth = $picto.width();
  graphicDivHeight = $picto.height();
  bodyWidth = bodyElement.width();
  var width = $picto.width() - margin.left - margin.right;
  if (width < 768) {
    var graphic_aspect_width = 16;
    var graphic_aspect_height = 10;
    var height = (Math.ceil((width * graphic_aspect_height) / graphic_aspect_width) - margin.top - margin.bottom + 40);
  } else {
    var graphic_aspect_width = 16;
    var graphic_aspect_height = 7;
    var height = Math.ceil((width * graphic_aspect_height) / graphic_aspect_width) - margin.top - margin.bottom + 40;
  }
  d3.select("#picto");
});
$('.btn-default').on('click', function() {
  if ($(this).find('input').attr('id') == "option1") {
    dvc.selectedGender = "male";
  } else {
    dvc.selectedGender = "female";
  }
  if (dvc.selectedGender != "" && regExp.test($("#currentAge").val()) == true) {
    d3.select("#compareBtn").attr("class", "btn btn-primary");
  }
});
if (Modernizr.inlinesvg) {
  $(document).ready(function() {
    loadchartData();
    onSubmit();
    dvc.firstYear = 1951;
    dvc.lastYear = 2180;
    dvc.currentYear = 2016;
    pymChild = new pym.Child();
    pymChild.sendHeight();

    function loadchartData() {
      d3.csv("./lib/table1_male.csv", function(error, data) {
        dvc.data1 = data;
      });
      d3.csv("./lib/table1_female.csv", function(error, data) {
        dvc.data2 = data;
      });
      d3.csv("./lib/table2_male_QX.csv", function(error, data) {
        dvc.data3 = data;
      });
      d3.csv("./lib/table2_female_QX.csv", function(error, data) {
        dvc.data4 = data;
      });
    }

    function onSubmit() {
      $("#longevityCalculator").submit(function(event) {
        event.preventDefault();
        event.stopPropagation();
        onblurYourAge();
        dvc.myCurrentAge = $("#currentAge").val();
        getValues();
        return;
      });
    }

    function getValues() {
      d3.select("#quizContent").style("display", "inline");
      $("#LE").show();
      $("#picto").show();
      $("#pictoText").show();
      $("#introLine1").show();
      $("#introLine2").show();
      $("#introLine4").show();
      $("#introLine5").show();
      $("#introLine3a").show();
      $(".breakReturn").show();
      $("#yearsFromNow").show();
      $("#yearsFromNow2").show();
      dvc.YearOfBirth = dvc.currentYear - dvc.myCurrentAge;
      var yourSPAArray = {
        "features": [{
          "properties": {
            "birthYear": "1890",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1891",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1892",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1893",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1894",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1895",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1896",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1897",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1898",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1899",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1900",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1901",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1902",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1903",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1904",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1905",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1906",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1907",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1908",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1909",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1910",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1911",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1912",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1913",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1914",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1915",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1916",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1917",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1918",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1919",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1920",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1921",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1922",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1923",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1924",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1925",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1926",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1927",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1928",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1929",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1930",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1931",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1932",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1933",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1934",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1935",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1936",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1937",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1938",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1939",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1940",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1941",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1942",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1943",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1944",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1945",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1946",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1947",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1948",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1949",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1950",
            "male": "65",
            "female": "60"
          }
        }, {
          "properties": {
            "birthYear": "1951",
            "male": "65",
            "female": "61"
          }
        }, {
          "properties": {
            "birthYear": "1952",
            "male": "65",
            "female": "62"
          }
        }, {
          "properties": {
            "birthYear": "1953",
            "male": "65",
            "female": "63"
          }
        }, {
          "properties": {
            "birthYear": "1954",
            "male": "66",
            "female": "65"
          }
        }, {
          "properties": {
            "birthYear": "1955",
            "male": "66",
            "female": "66"
          }
        }, {
          "properties": {
            "birthYear": "1956",
            "male": "66",
            "female": "66"
          }
        }, {
          "properties": {
            "birthYear": "1957",
            "male": "66",
            "female": "66"
          }
        }, {
          "properties": {
            "birthYear": "1958",
            "male": "66",
            "female": "66"
          }
        }, {
          "properties": {
            "birthYear": "1959",
            "male": "66",
            "female": "66"
          }
        }, {
          "properties": {
            "birthYear": "1960",
            "male": "66",
            "female": "66"
          }
        }, {
          "properties": {
            "birthYear": "1961",
            "male": "66",
            "female": "66"
          }
        }, {
          "properties": {
            "birthYear": "1962",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1963",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1964",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1965",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1966",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1967",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1968",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1969",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1970",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1971",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1972",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1973",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1974",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1975",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1976",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1977",
            "male": "67",
            "female": "67"
          }
        }, {
          "properties": {
            "birthYear": "1978",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1979",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1980",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1981",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1982",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1983",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1984",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1985",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1986",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1987",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1988",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1989",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1990",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1991",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1992",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1993",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1994",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1995",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1996",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1997",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1998",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "1999",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2000",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2001",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2002",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2003",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2004",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2005",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2006",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2007",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2008",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2009",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2010",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2011",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2012",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2013",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2014",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2015",
            "male": "68",
            "female": "68"
          }
        }, {
          "properties": {
            "birthYear": "2016",
            "male": "68",
            "female": "68"
          }
        }, ]
      };
      if (dvc.selectedGender == "male") {
        dvc.yearData = dvc.data1.filter(function(d) {
          return d.year == dvc.YearOfBirth;
        });
        dvc.QXData = dvc.data3;
        dvc.SPAtoUse = yourSPAArray.features[dvc.YearOfBirth - 1890].properties.male;
        dvc.plineColor = "#008cba";
      } else {
        dvc.yearData = dvc.data2.filter(function(d) {
          return d.year == dvc.YearOfBirth;
        });
        dvc.QXData = dvc.data4;
        dvc.SPAtoUse = yourSPAArray.features[dvc.YearOfBirth - 1890].properties.female;
        dvc.plineColor = "#008cba";
      }
      calculateEXProbs();
      return;
    }

    function calculateEXProbs() {
      var genderSpecificQX;
      var tempArray;
      dvc.timeArray = [];
      dvc.ageArray = [];
      dvc.QX_LEprobArray = [];
      dvc.LX_LEprobArray = [];
      dvc.LXL0_LEprobArray = [];
      dvc.DX_LEprobArray = [];
      dvc.EX_LEprobArray = [];
      dvc.EX_LEprobArray1in2 = [];
      dvc.EX_LEprobArray1in4 = [];
      dvc.EX_LEprobArray1in10 = [];
      dvc.birthYearIndex = dvc.YearOfBirth - dvc.initialYear;
      for (var i = dvc.myCurrentAge; i <= dvc.maxAgetoConsider; i++) {
        j = i - dvc.myCurrentAge;
        var yearIndex = parseInt(parseInt(i) + parseInt(dvc.YearOfBirth)) - dvc.initialYear;
        var QXstr = "genderSpecificQX = dvc.QXData[" + (yearIndex) + "].Y" + i;
        eval(QXstr);
        dvc.QX_LEprobArray[j] = (parseFloat(genderSpecificQX)) / 100000;
        if (i == dvc.myCurrentAge) {
          dvc.LX_LEprobArray[j] = 100000;
          dvc.LXL0_LEprobArray[j] = 100.00;
          dvc.DX_LEprobArray[j] = dvc.QX_LEprobArray[j] * dvc.LX_LEprobArray[j];
        } else {
          dvc.LX_LEprobArray[j] = (((1 - dvc.QX_LEprobArray[j - 1]) * dvc.LX_LEprobArray[j - 1])).toFixed(0);
          dvc.LXL0_LEprobArray[j] = ((dvc.LX_LEprobArray[j] / dvc.LX_LEprobArray[0]) * 100.00).toFixed(1);
          dvc.DX_LEprobArray[j] = (dvc.QX_LEprobArray[j] * dvc.LX_LEprobArray[j]).toFixed(0);
        }
        dvc.timeArray[j] = parseInt(dvc.initialYear + yearIndex);
        dvc.ageArray[j] = parseInt(j) + parseInt(dvc.myCurrentAge);
      }
      for (var i = dvc.myCurrentAge; i <= dvc.maxAgetoConsider; i++) {
        j = i - dvc.myCurrentAge;
        tempArray = dvc.LX_LEprobArray.slice(j, (dvc.LX_LEprobArray.length));
        var sumOfArray = (d3.sum(tempArray));
        dvc.EX_LEprobArray[j] = (sumOfArray / dvc.LX_LEprobArray[j]) - 0.5;
      }
      dvc.timeArrayINVERTED = dvc.timeArray.slice();
      dvc.timeArrayINVERTED.reverse();
      dvc.ageArrayINVERTED = dvc.ageArray.slice();
      dvc.ageArrayINVERTED.reverse();
      dvc.QX_LEprobArrayINVERTED = dvc.QX_LEprobArray.slice();
      dvc.QX_LEprobArrayINVERTED.reverse();
      dvc.LX_LEprobArrayINVERTED = dvc.LX_LEprobArray.slice();
      dvc.LX_LEprobArrayINVERTED.reverse();
      dvc.LXL0_LEprobArrayINVERTED = dvc.LXL0_LEprobArray.slice();
      dvc.LXL0_LEprobArrayINVERTED.reverse();
      dvc.DX_LEprobArrayINVERTED = dvc.DX_LEprobArray.slice();
      dvc.DX_LEprobArrayINVERTED.reverse();
      var Age_LXL0_DataArray = d3.zip(dvc.LXL0_LEprobArray, dvc.ageArray);
      dvc.hundredYearProb = Age_LXL0_DataArray[100 - dvc.myCurrentAge];
      var myAge = parseInt(dvc.myCurrentAge);
      var mySPAAge = parseInt(dvc.SPAtoUse);
      if (parseInt(myAge) <= parseInt(mySPAAge)) {
        dvc.SPAProb = Age_LXL0_DataArray[dvc.SPAtoUse - dvc.myCurrentAge];
      }
      var Age_LX_DataArray = d3.zip(dvc.LX_LEprobArrayINVERTED, dvc.ageArrayINVERTED);
      var Age_QX_LX_DataArray = d3.zip(dvc.ageArray, dvc.QX_LEprobArray, dvc.LX_LEprobArray);
      dvc.probArray = [50000, 25000, 10000];
      dvc.mySpecificProbArray = [];
      dvc.val1;
      dvc.val2;
      for (var p = 0; p < dvc.probArray.length; p++) {
        dvc.mySpecificProbArray[p] = [
          [],
          []
        ];
        for (var i = 0; i < Age_LX_DataArray.length; i++) {
          if (parseInt(Age_LX_DataArray[i][0]) < dvc.probArray[p]) {
            dvc.val1 = parseInt(Age_LX_DataArray[i][1]);
            dvc.val8 = Age_LX_DataArray[i][1] - 1;
          } else {
            continue;
          }
        }
        for (var i = 0; i < Age_QX_LX_DataArray.length; i++) {
          if (parseInt(Age_QX_LX_DataArray[i][0]) < dvc.val1) {
            dvc.val2 = Age_QX_LX_DataArray[i][2];
          } else if (parseInt(Age_QX_LX_DataArray[i][0]) == dvc.val1) {
            dvc.val7 = Age_QX_LX_DataArray[i][2];
          } else {
            continue;
          }
        }
        dvc.val3 = dvc.val2 - dvc.probArray[p];
        dvc.val4 = dvc.val1;
        dvc.val5 = dvc.val2;
        dvc.val6 = dvc.val1;
        dvc.val9 = (dvc.val3 / (dvc.val5 - dvc.val7)) + dvc.val8;
        dvc.mySpecificProbArray[p][0] = dvc.val9;
        dvc.mySpecificProbArray[p][1] = (parseFloat(dvc.myCurrentAge) + parseFloat(dvc.val9));
      }
      dvc.LE = parseFloat(parseFloat(dvc.EX_LEprobArray[0]) + parseFloat(dvc.myCurrentAge)).toFixed(0);
      dvc.YrsPastSPA = (parseFloat(dvc.LE) - parseFloat(dvc.SPAtoUse));
      dvc.pc50 = parseFloat(dvc.mySpecificProbArray[0][0]).toFixed(2);
      dvc.pc50YrsPastSPA = (parseFloat(dvc.pc50) - parseFloat(dvc.SPAtoUse)).toFixed(2);
      dvc.pc25 = parseFloat(dvc.mySpecificProbArray[1][0]).toFixed(2);
      dvc.pc25YrsPastSPA = (parseFloat(dvc.pc25) - parseFloat(dvc.SPAtoUse)).toFixed(2);
      dvc.pc10 = parseFloat(dvc.mySpecificProbArray[2][0]).toFixed(2);
      dvc.pc10YrsPastSPA = (parseFloat(dvc.pc10) - parseFloat(dvc.SPAtoUse)).toFixed(2);
      dvc.yearsFromNow = (dvc.LE - dvc.myCurrentAge).toFixed(0);
      dvc.var1 = parseFloat(dvc.mySpecificProbArray[1][0]).toFixed(0);
      dvc.var2 = parseFloat(dvc.mySpecificProbArray[2][0]).toFixed(0);
      d3.select("#LE").text(dvc.LE).style("color", "white");
      d3.select("#yearsFromNow").html("This is <span id='YFN'>" + dvc.yearsFromNow + "</span> years from now").style("color", "#007298");
      var myAge = parseInt(dvc.myCurrentAge);
      var mySPAAge = parseInt(dvc.SPAtoUse);
      if (parseInt(myAge) <= 100) {
        d3.select("#actualDiv").attr("class", "labels col-sm-2p col-xs-8p show");
        d3.select("#actualDiv2").attr("class", "labels col-sm-2p col-xs-4p show");
        d3.select("#natDiv").attr("class", "labels col-sm-2p col-xs-8p show");
        d3.select("#natDiv2").attr("class", "labels col-sm-2p col-xs-4p show");
        d3.select("#guessDiv").attr("class", "labels col-sm-2p col-xs-8p show");
        d3.select("#guessDiv2").attr("class", "labels col-sm-2p col-xs-4p show");
        d3.select("#pictoGuessValue").html(dvc.hundredYearProb[0] + "<span class='spanClass'>%</span>");
      } else {
        d3.select("#actualDiv").attr("class", "labels col-sm-6p col-xs-12p");
        d3.select("#actualDiv2").attr("class", "labels col-sm-6p col-xs-12p");
        d3.select("#natDiv").attr("class", "labels col-sm-6p col-xs-12p");
        d3.select("#natDiv2").attr("class", "labels col-sm-6p col-xs-12p");
        d3.select("#guessDiv").attr("class", "labels col-sm-4p col-xs-12p hide");
        d3.select("#guessDiv2").attr("class", "labels col-sm-4p col-xs-12p hide");
      }
      d3.select("#pictoActualValue").html(dvc.var1);
      d3.select("#pictoNatValue").html(dvc.var2);
      pymChild = new pym.Child({
        renderCallback: makeChart
      });
      pymChild.sendHeight();
      return;
    }
  })
} else {
  $("#pictoError").attr("class", "col-sm-12p col-xs-12p show");
  $('#pictoError').append('<img id="ieMsg" src="./images/fallback.png" />');
  $("#footnotes").attr("class", "col-sm-12 col-xs-12 hide");
  pymChild = new pym.Child();
  if (pymChild) {
    pymChild.sendHeight();
  }
}

function makeChart() {
  graphic.empty();
  $picto.empty();
  d3.select("#tweetSub").attr("class", "col-sm-12 col-xs-12 show");
  var width = $picto.width() - margin.left - margin.right;
  if (width < 500) {
    var graphic_aspect_width = 16;
    var graphic_aspect_height = 7;
    var height = 160;
  } else {
    var graphic_aspect_width = 16;
    var graphic_aspect_height = 7;
    var height = Math.ceil((width * graphic_aspect_height) / graphic_aspect_width) - margin.top - margin.bottom + 120;
  }
  var num_ticks = 10;
  if (width < mobile_threshold) {
    num_ticks = 10;
  }
  var x = d3.scale.linear().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);
  var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format(",.0f")).tickPadding(10);
  var yAxis = d3.svg.axis().scale(y).orient("left").ticks(num_ticks).tickPadding(10).tickValues([25, 50, 75, 100]).tickSize(-width);
  var line = d3.svg.line().x(function(d) {
    return x(d.date);
  }).y(function(d) {
    return y(d.close);
  });
  var svgDocP = d3.select("#picto").append("svg").attr("id", "svgpicto").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  svgDocP.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", width).attr("height", height);
  var arrData = d3.zip(dvc.ageArray, dvc.LXL0_LEprobArray);
  arrData.forEach(function(d, i) {
    if (isNaN(arrData[i][1]) == true) {
      arrData[i][1] = 0.0;
    }
  });
  var data = arrData.map(function(d) {
    return {
      date: d[0],
      close: d[1]
    };
  });
  y.domain([0, 100]);
  x.domain([dvc.myCurrentAge, 125]);
  svgDocP.append("g").attr("class", "x axis").attr("id", "xAxis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "graphText").attr("is", "xAxisTitle").attr("transform", "rotate(0)").attr("transform", "translate(" + (width - 0) + ", 30)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr("id", "xAxisTitle").text("Age");
  svgDocP.append("g").attr("class", "y axis").attr("id", "yAxis").call(yAxis).append("text").attr("class", "graphText").attr("id", "yAxisTitle").attr("transform", "rotate(0)").attr("transform", "translate(-30, -30)").attr("y", 0).attr("dy", ".71em").style("text-anchor", "start").text("Chance of reaching age (%)");
  var yticks = svgDocP.selectAll('#yAxis').selectAll('.tick');
  yticks.append('svg:line').attr('class', "tick").attr('y0', 0).attr('y1', 0).attr('x1', -5).attr('x2', width / 2);
  var area = d3.svg.area().x(function(d) {
    return x(d.date);
  }).y0(height).y1(function(d) {
    return y(d.close);
  });
  svgDocP.append("path").datum(data).attr("class", "area").style("fill", dvc.plineColor).style("opacity", 0.50).attr("d", area);
  svgDocP.append("path").datum(data).attr("stroke", dvc.plineColor).attr("class", "line").attr("id", "probabilityLine").attr("clip-path", "url(#clip)").attr("d", line);
  svgDocP.append("circle").attr("id", "circle25pc").attr("class", "circlesBtns").attr("cx", x(dvc.pc25)).attr("cy", y(25)).attr("r", 12).style("fill", "white").style("fill-opacity", 0.0).style("stroke", "#090").style("stroke-width", "2px").style("display", "none").style("stroke-dasharray", "5,5");
  svgDocP.append("circle").attr("id", "innerCircle25pc").attr("class", "circlesBtns").attr("cx", x(dvc.pc25)).attr("cy", y(25)).attr("r", 7).style("fill", "#090").style("stroke", "#090").style("stroke-width", "0px");
  svgDocP.append("text").attr("id", "OneInFourLabel").attr("x", x(dvc.pc25) + 7).attr("y", y(25) - 7).style("fill", "#090").style("stroke", "#090").style("stroke-width", "0px").text("1 in 4");
  svgDocP.append("circle").attr("id", "circle10pc").attr("class", "circlesBtns").attr("cx", x(dvc.pc10)).attr("cy", y(10)).attr("r", 12).style("fill", "white").style("fill-opacity", 0.0).style("stroke", "#F5A529").style("display", "none").style("stroke-width", "2px").style("stroke-dasharray", "5,5");
  svgDocP.append("circle").attr("id", "innerCircle10pc").attr("class", "circlesBtns").attr("cx", x(dvc.pc10)).attr("cy", y(10)).attr("r", 7).style("fill", "#F5A529").style("stroke", "#F5A529").style("stroke-width", "0px");
  svgDocP.append("text").attr("id", "OneInTenLabel").attr("x", x(dvc.pc10) + 7).attr("y", y(10) - 7).style("fill", "#F5A529").style("stroke", "#F5A529").style("stroke-width", "0px").text("1 in 10");
  var myAge = parseInt(dvc.myCurrentAge);
  var mySPAAge = parseInt(dvc.SPAtoUse);
  if (parseInt(myAge) <= parseInt(mySPAAge)) {
    svgDocP.append("circle").attr("id", "circleSPA").attr("class", "circlesBtns").attr("cx", x(dvc.SPAtoUse)).attr("cy", y(dvc.SPAProb[0])).attr("r", 12).style("fill", "white").style("fill-opacity", 0.0).style("stroke", "rgb(5, 48, 73)").style("display", "none").style("stroke-width", "2px").style("stroke-dasharray", "5,5");
    svgDocP.append("circle").attr("id", "innercircleSPA").attr("class", "circlesBtns").attr("cx", x(dvc.SPAtoUse)).attr("cy", y(dvc.SPAProb[0])).attr("r", 7).style("fill", "rgb(5, 48, 73)").style("stroke", "rgb(5, 48, 73)").style("stroke-width", "0px");
    svgDocP.append("text").attr("class", "graphSubText legendHide").attr("id", "idYourSPA").attr("y", y(dvc.SPAProb[0]) - 45).append("tspan").style("text-anchor", "middle").attr("x", x(dvc.SPAtoUse)).attr("dy", "1.2em").text("Your State");
    d3.select("#idYourSPA").append("tspan").style("text-anchor", "middle").attr("x", x(dvc.SPAtoUse)).attr("dy", "1.2em").text("Pension Age");
  }
  svgDocP.append("line").attr("id", "centreline").attr('y1', y(0)).attr('y2', y(0)).attr('x1', -5).attr('x2', width);
  svgDocP.append("text").attr("class", "graphSubText legendHide").attr("id", "idYourAge").attr("x", x(dvc.myCurrentAge)).attr("y", height + 50).style("text-anchor", "start").text("Your Age Now");
  svgDocP.append("line").attr("class", "vertLines").attr("id", "myAgeLine").attr('y1', height + 35).attr('y2', height).style("display", "inline").attr('x1', x(dvc.myCurrentAge)).attr('x2', x(dvc.myCurrentAge)).style("pointer-events", "none");
  svgDocP.append("line").attr("class", "vertLines").attr("id", "LELine").attr('y1', 0).attr('y2', height).attr('x1', x(dvc.LE)).attr('x2', x(dvc.LE)).style("pointer-events", "none");
  svgDocP.append("text").attr("class", "graphSubText legendHide").attr("id", "idYourLE").attr("x", x(dvc.LE)).attr("y", -5).style("text-anchor", "middle").text("Your Life Expectancy");
  pymChild.sendHeight();
  return;
}

function onblurYourAge() {
  var regExp = /[0-9]{1,3}/;
  var regExp2 = /[ ]+/;
  var valueToCheck = document.getElementById("currentAge").value;
  dvc.boolHasError = false;
  d3.select("#byear").attr("class", "form-group");
  if ((regExp.test(valueToCheck) == true && valueToCheck.length < 4 && valueToCheck >= 0) || valueToCheck == '') {
    d3.select("#compareBtn").attr("class", "btn btn-primary");
  } else {
    d3.select("#byear").attr("class", "form-group has-error");
    dvc.boolHasError = true;
  }
  return;
}
