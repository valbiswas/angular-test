


let arrOfCities = [];

//Fetch to get data from cities
fetch("https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,6539761,5992500,1796236,1275004,3117735,2650225,2636432,1838524,2640358,3936456,3871336,2509954,935113,184745,3530597,1857910,2988507&units=metric&APPID=194333f5b09188fbda8c4a3bbfea30b2")
.then(response => response.json())
.then((allCityJson) => {
  //console.log(allCityJson.list);
  allCityJson.list.map(city => {   //push city weather objects to arrOfCities so there is no need to make multiple fetch requests
    arrOfCities.push(city);
    //return createCityWeatherDiv(city)
  });
});

setTimeout(() => {      //timeout so fetch can resolve before attempting to call createCityWeatherDiv func
  arrOfCities.map(city => createCityWeatherDiv(city));       //func that handles dom manipulation for each city
  console.log(arrOfCities);
}, 1000);





//Location-Btn Alphabetical Sort
const locationBtn = document.getElementById("location-btn");

let locationSortBool = false;  //flip switch for determining which way to sort

locationBtn.addEventListener("click", () => {
  const displayedNodeList = document.querySelectorAll(".city-weather");      //gets the node list of the current number of rows being displayed(either 5 10 or 20)
  const slicedArrOfCities = arrOfCities.slice(0, displayedNodeList.length);  //slice arrayOfCities from start up to the current length of node list on screen

    if(locationSortBool === false){ //sort one way
        const sortedArr = slicedArrOfCities.sort((a,b) => {
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
               return 1;
            }
  // names must be equal
            return 0;
        })

     //console.log(sortedArr)
        removeGridItems();
        sortedArr.map(city => createCityWeatherDiv(city));
        locationSortBool = true;

    } else if(locationSortBool === true){  //sort the other way
        const sortedArr = slicedArrOfCities.sort((a,b) => {
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        })

        // console.log(sortedArr)
        removeGridItems();
        sortedArr.map(city => createCityWeatherDiv(city));
        locationSortBool = false;
     }

 });




//DescriptionBtn Alphabetical Sort
const descriptionBtn = document.getElementById("description-btn");

let descriptionSortBool = false;

descriptionBtn.addEventListener("click", () => {
  const displayedNodeList = document.querySelectorAll(".city-weather");      //gets the node list of the current number of rows being displayed(either 5 10 or 20)
  const slicedArrOfCities = arrOfCities.slice(0, displayedNodeList.length);    //slice arrayOfCities from start up to the current length of node list on screen
  //console.log(slicedArrOfCities);
  if(descriptionSortBool === false){   //sort one way
      const sortedArr = slicedArrOfCities.sort((a,b) => {
          let nameA = a.weather[0].description.toUpperCase(); // ignore upper and lowercase
          let nameB = b.weather[0].description.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
             return 1;
          }
// names must be equal
          return 0;
      })

   //console.log(sortedArr)
      removeGridItems();
      sortedArr.map(city => createCityWeatherDiv(city));
      descriptionSortBool = true;

  } else if(descriptionSortBool === true){  //sort the other way
      const sortedArr = slicedArrOfCities.sort((a,b) => {
          let nameA = a.weather[0].description.toUpperCase(); // ignore upper and lowercase
          let nameB = b.weather[0].description.toUpperCase(); // ignore upper and lowercase
          if (nameA > nameB) {
              return -1;
          }
          if (nameA < nameB) {
              return 1;
          }
          // names must be equal
          return 0;
      })

      // console.log(sortedArr)
      removeGridItems();
      sortedArr.map(city => createCityWeatherDiv(city));
      descriptionSortBool = false;
   }

})



//TempBtn Numerical Sort
const tempBtn = document.getElementById("temp-btn");

let tempSortBool = false;

tempBtn.addEventListener("click", () => {
  const displayedNodeList = document.querySelectorAll(".city-weather");      //gets the node list of the current number of rows being displayed(either 5 10 or 20)
  const slicedArrOfCities = arrOfCities.slice(0, displayedNodeList.length);    //slice arrayOfCities from start up to the current length of node list on screen
      if(tempSortBool === false){
          const sortedArr = slicedArrOfCities.sort((a, b) => {
          return  b.main.temp - a.main.temp;
          })
          removeGridItems();
          sortedArr.map(city => createCityWeatherDiv(city));
          tempSortBool = true;
      } else if(tempSortBool === true){
          const sortedArr = slicedArrOfCities.sort((a, b) => {
          return  a.main.temp - b.main.temp;
          })
          removeGridItems();
          sortedArr.map(city => createCityWeatherDiv(city));
          tempSortBool = false;
      }
    });


//HumidityBtn Numerical Sort
const humidityBtn = document.getElementById("humidity-btn");

let humiditySortBool = false;

humidityBtn.addEventListener("click", () => {
  const displayedNodeList = document.querySelectorAll(".city-weather");      //gets the node list of the current number of rows being displayed(either 5 10 or 20)
  const slicedArrOfCities = arrOfCities.slice(0, displayedNodeList.length);    //slice arrayOfCities from start up to the current length of node list on screen
    if(humiditySortBool === false){
        const sortedArr = slicedArrOfCities.sort((a, b) => {
            return b.main.humidity - a.main.humidity;
        })
        removeGridItems();
        sortedArr.map(city => createCityWeatherDiv(city));
        humiditySortBool = true;
    } else if(humiditySortBool === true){
        const sortedArr = slicedArrOfCities.sort((a, b) => {
            return  a.main.humidity - b.main.humidity;
        })
        removeGridItems();
        sortedArr.map(city => createCityWeatherDiv(city));
        humiditySortBool = false;
     }
});



//WindBtn Numerical Sort
const windBtn = document.getElementById("wind-btn");

let windSortBool = false;

windBtn.addEventListener("click", () => {
  const displayedNodeList = document.querySelectorAll(".city-weather");      //gets the node list of the current number of rows being displayed(either 5 10 or 20)
  const slicedArrOfCities = arrOfCities.slice(0, displayedNodeList.length);    //slice arrayOfCities from start up to the current length of node list on screen
      if(windSortBool === false){
          const sortedArr = slicedArrOfCities.sort((a, b) => {
              return  b.wind.speed - a.wind.speed;
          })
          removeGridItems();
          sortedArr.map(city => createCityWeatherDiv(city));
          windSortBool = true;
      } else if(windSortBool === true){
          const sortedArr = slicedArrOfCities.sort((a, b) => {
              return  a.wind.speed - b.wind.speed;
          })
          removeGridItems();
          sortedArr.map(city => createCityWeatherDiv(city));
          windSortBool = false;
      }
});

//Sort rows by 5
const fiveBtn = document.getElementById("five-btn");
fiveBtn.addEventListener("click", () => {
  removeGridItems();
  for(let i = 0 ; i < 5 ; i++){
    createCityWeatherDiv(arrOfCities[i]);
  }
})

//Sort rows by 10
const tenBtn = document.getElementById("ten-btn");
tenBtn.addEventListener("click", () => {
  removeGridItems();
  for(let i = 0 ; i < 10 ; i++){
    createCityWeatherDiv(arrOfCities[i]);
  }
})

//Sort rows by 20
const twentyBtn = document.getElementById("twenty-btn");
twentyBtn.addEventListener("click", () => {
  removeGridItems();
  for(let i = 0 ; i < 20 ; i++){
    createCityWeatherDiv(arrOfCities[i]);
  }
})








//function for search box ...returns weather from searched city
document.getElementById("search-area").addEventListener("keypress", (e) => {
  var key = e.which || e.keyCode;
  if (key === 13) {
      e.preventDefault();

      const cityToSearch = document.getElementById("search-area").value;

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&units=metric&APPID=194333f5b09188fbda8c4a3bbfea30b2`)
      .then(response => response.json())
      .then((weatherForCity) => {
          //console.log(weatherForCity);
          removeGridItems();
          createCityWeatherDiv(weatherForCity);

      })
  }
});


//function that removes grid items
function removeGridItems(){
  const table = document.getElementById("table-grid")
  while(table.firstChild){
    table.firstChild.remove();
  }
}





//function that handles dom manipulation
function createCityWeatherDiv(jsonObj){
  const div = document.createElement("div");
  div.setAttribute("class", "city-weather");  //sets a class which is used to determine number of rows on screen so that filterable column functions know how many rows to repopulate
  const nameSpan = document.createElement("span");
  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("src", `weatherIcons/${jsonObj.weather[0].icon}.png`);
  weatherIcon.setAttribute("width", "40px");
  const h2 = document.createElement("h2");
  const h2Text = document.createTextNode(`${jsonObj.name}`);


  h2.appendChild(h2Text);
  nameSpan.appendChild(h2);
  nameSpan.appendChild(weatherIcon);


  div.appendChild(nameSpan);

  const descriptionSpan = document.createElement("span");
  const descriptionText = document.createTextNode(`${jsonObj.weather[0].description}`);
  descriptionSpan.appendChild(descriptionText);

  div.appendChild(descriptionSpan);


  const tempSpan = document.createElement("span");
  const tempText = document.createTextNode(`${Math.floor(jsonObj.main.temp)}`);
  tempSpan.appendChild(tempText);

  div.appendChild(tempSpan);

  const humiditySpan = document.createElement("span");
  const humidityText = document.createTextNode(`${jsonObj.main.humidity}`);
  humiditySpan.appendChild(humidityText);

  div.appendChild(humiditySpan);

  const windSpan = document.createElement("span");
  const windText = document.createTextNode(`${jsonObj.wind.speed}`);
  windSpan.appendChild(windText);

  div.appendChild(windSpan);

  document.getElementById("table-grid").appendChild(div);
}
