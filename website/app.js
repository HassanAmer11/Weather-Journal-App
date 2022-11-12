
//#region Global Variables
    const d = new Date();
    const newDate = d.getDate()+'/'+ (d.getMonth()+1)+'/'+ d.getFullYear(); //format todate 
    const messageError = document.getElementById("messageError"); // message if zip code not valid
    const opGridView = document.getElementById('GridView'); // show grid view that present data
//#endregion

//#region get data from openweathermap api
    const runApiWeather = async(zipCode)=>{  // async funcation that get data from api
        const apiKey = 'c75967657a7b3728dad840fb5f6b4370&units=imperial';  //metric
        let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
        try{
            const apiResponce = await fetch(url); // get (The default method ) data from api with api url
            let data = await apiResponce.json(); // converte promise data to json
            if(data.cod !="200"){       //  if not success    
                messageError.textContent= data.message; // message error
                throw data.message; // throw exception
            }
            return data;  // success to get data
        }
        catch(error){
            console.log(error); // print console error
        }
    };

    generateWeatherData = () => {  // on click genrete button
        messageError.textContent="";  // set message error empty
        opGridView.style.opacity = 0; // hide previous data
        let zipCode = document.getElementById("zip").value;  // to get zip code
        const fetchApiObj = runApiWeather(zipCode);  // get api data

        fetchApiObj.then(async (respoObj)=>{  // after get data from api
            if(respoObj){
            let temp =  Math.round(respoObj.main.temp);  // get temperature
            let feeling = document.getElementById("feelings").value;  // get feelings from textarea
            let Obj = {
                temp,
                newDate,
                feeling,
                city :respoObj.name
            };
            SendDataToServer("/reseviceData",Obj);  // post data to server
            retrieveData();  // get data from server
        }
        });
    };
        
    document.getElementById("generate").addEventListener('click',generateWeatherData);

//#endregion

//#region post data to  local server

/*
    // to post data to server with two parameter  method url and data as object
    // fetch with two parameter method url and object contain custom settings 
*/
const SendDataToServer = async ( routeUrl = '', data = {})=>{  
      const response = await fetch(routeUrl, {
      method: 'POST',  //request method
      credentials: 'same-origin', // Tells browsers to include credentials with requests to same-origin URLs http://localhost:8000/reseviceData
      headers: {
          'Content-Type': 'application/json',  // data in json form
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data),  //send data in json form
    });
      try {
        const newData = await response.json(); // get response from server
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

//#endregion

//#region present Data in ui
const retrieveData = async () => {  // to get data from server and present it in User interface
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ '&degF';
    document.getElementById('city').innerHTML = allData.city;
    document.getElementById('content').innerHTML = allData.feeling;
    document.getElementById("date").innerHTML =allData.newDate;
    opGridView.style.opacity = 1;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }

   //#endregion