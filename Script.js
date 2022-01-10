let loc=document.getElementById("location");
let tempIcon;
let tempval=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");

searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
})

const getWeather=async(city)=>{
    
    try{
        const response=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid={api key}`);
        const weatherData=await response.json();
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{icon,main=weatherData}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempval.textContent=Math.round(feels_like-273);
        document.getElementById("temp-icon").src="http://openweathermap.org/img/wn/"+icon+".png";
    }catch(error){
        alert(error);
    }
}

window.addEventListener("load",()=>{
    let long;
    let lat;
    
    
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        long=position.coords.longitude;
        lat=position.coords.latitude;
        

        const api= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={api key}`
 
        fetch(api).then((response)=>{
            return response.json();
        })

    .then(data=>{
            const{name}=data;
            const{feels_like}=data.main;
            const{icon,main}=data.weather[0];

            loc.textContent=name;
            climate.textContent=main;
            tempval.textContent=Math.round(feels_like-273);
            document.getElementById("temp-icon").src="http://openweathermap.org/img/wn/"+icon+".png";
    })
        

    })
}
})
