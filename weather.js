const weather = document.querySelector(".js-weather");
const API_KEY = "c3f8530210996da1acf0066ef25ef386";
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temp = json.main.temp;
            const place = json.name;
            weather.innerText = `${temp} @ ${place}`;    
        }); // 그 이전 함수가 끝나고 실행할 함수 .then(함수)
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccees(position) {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude,
       longitude // 변수명과 객체명이 같을 때는 한번만 써줘도 됨 
   };
   saveCoords(coordsObj);
   getWeather(latitude, longitude)
}

function handleGeoError(position) {
    console.log("Cant access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccees, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init() {
    loadCoords();
}

init(); 