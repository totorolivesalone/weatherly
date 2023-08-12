const options=config.options;
const option2 = config.option2;
const key=config.key;
var weatherAttr=[];
var micro=['bacteria','viruses','fungi','mites'];
var microPercent=['<30% or >70%','<40% ','>60%','>50%'];
function airqualitycontrol(air,response)
{
    var str="";
    PM2.innerHTML=response['PM2.5'].concentration;
    PM10.innerHTML=response.PM10.concentration;
    SO2.innerHTML=response.SO2.concentration;
    CO.innerHTML=response.CO.concentration;
    const airlevel=parseInt(air);
    if(airlevel<100)
    {
        str="Air quality is good!"
        document.getElementById("airbody").style.backgroundColor="Lightgreen";

    }
    else if(airlevel>=100 && airlevel<300)
    {
        str="Air quality is bad. Use masks outdoors.People with respiratory illnesses might experience flare-ups.";
        document.getElementById("airbody").style.backgroundColor="yellow";
    }
    else
    {
        str="Air quality is hazardous. Stay indoors.People with respiratory and cardiovascular illnesses should take extra precautions.";
        document.getElementById("airbody").style.backgroundColor="Orangered";
    }
    airquality.innerHTML=str;
}
function analyzeWeather()
{
    var report="";
    if(parseInt(weatherAttr['temp'])>50)
    {
        report=report+"Dangerously high temperature. Hydrate yourself and stay indoors.<br/>";

    }
    else if((parseInt(weatherAttr['temp']))>-10)
    {
        if(parseInt(weatherAttr['humidity'])>60)
        {
            report=report+"People with asthma might experience discomfort and are advised to use dehumidifier<br/>";
        }
        else if(parseInt(weatherAttr['humidity'])<35)
        {
            report=report+"People with allergic rhinitis and chronic sinusitus may experience discomfort and are advised to use humidifier<br/>";
        }
        else
        {
            report=report+"Good humidity levels.<br/>";
        }
        if(parseInt(weatherAttr['temp'])>40)
        {
            report=report+'People with auto-immune disorders(MS,lupus,Gout,etc) might experience flare-ups and are advised to use Indoor cooling.<br/>';

        }
        else if(parseInt(weatherAttr['temp'])<5)
        {
            report=report+'People with cardiovascular disorders,respiratory disorders and skin conditions may experience discomfort due to dropping temperature<br/>';
            report=report+'Mental health may be negatively affected.<br/>'

        }
        else
        {
            report=report+'Temperature is moderate<br/>';
        }




    }else
    {
        report=report+"Temperatures are dangerously low.Stay indoors and use appropriate heating measures.Use humidifiers<br/>";
    }
    if((parseInt(weatherAttr['max_temp']))-(parseInt(weatherAttr['min_temp']))>10)
    {
        report=report+"People with Arthritis might experience flare-ups.<br/>";
    }
    if(parseInt(weatherAttr['wind_speed'])>17)
    {
        report=report+"Dangerously high wind speed. Check local news for updates from authorities!";

    }
    document.getElementById('weatherReport').innerHTML=report;



    
    var microTable=document.createElement('table');
    let row=microTable.insertRow(0);
    let c1=row.insertCell(0);
    let c2=row.insertCell(1);
    microTable.style.border='solid 1px black';
    c1.innerHTML="Pathogen";
    c1.style.backgroundColor="cyan";
    c2.style.backgroundColor="cyan";
    c2.innerHTML="Humidity % ideal for growth";
    c1.style.border='solid 1px black';
    c2.style.border='solid 1px black';
    for(var i=1;i<=4;i++)
    {
        row=microTable.insertRow(i);
        c1=row.insertCell(0);
        c2=row.insertCell(1);
        c1.innerHTML=micro[i-1];
        c2.innerHTML=microPercent[i-1];
        c1.style.border='solid 1px black';
        c2.style.border='solid 1px black';

    }
    document.getElementById('microgen').replaceChildren(microTable);




}

const getWeather = (city) =>

{
    
    cityName.innerHTML=city;
fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city, options)
	.then(response => response.json())
	.then(response => 
        {console.log(response);
            cloud_pct.innerHTML=response.cloud_pct;
            humidity.innerHTML=response.humidity;
            weatherAttr['humidity']=response.humidity;
            wind_degrees.innerHTML=response.wind_degrees;
            wind_speed.innerHTML=response.wind_speed;
            weatherAttr['wind_speed']=response.wind_speed;
            temp.innerHTML=response.temp;
            weatherAttr['temp']=response.temp;
            max_temp.innerHTML=response.max_temp;
            weatherAttr['max_temp']=response.max_temp;
            min_temp.innerHTML=response.min_temp;
            weatherAttr['min_temp']=response.min_temp;
            feels_like.innerHTML=response.feels_like;
            analyzeWeather();
            
        })
	.catch(err => {console.error(err);
        
        return;
    });


    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+key)
        .then(response => response.json())
        .then(response => {console.log(response);
          console.log(response);
          console.log(response['weather'][0]['description']);
          console.log(response['weather'][0]['icon']);
          descr.innerHTML=response['weather'][0]['description'];

          weathercon.innerHTML ="<img src='https://openweathermap.org/img/wn/"+response['weather'][0]['icon']+"@2x.png' />";
          
          
        })
        .catch(err => console.error(err));


    
    fetch('https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city='+city, option2)
        .then(response => response.json())
        .then(response => {console.log(response);
            overall_aqi.innerHTML=response.overall_aqi;
            airqualitycontrol(response.overall_aqi,response);
            
        }
          )
        .catch((err) => console.error(err));
     
        
        
        
    
}


submit.addEventListener("click",(e)=>
{
    e.preventDefault();
    getWeather(city.value);
}
    
);
getWeather("Delhi");
