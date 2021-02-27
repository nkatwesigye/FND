
//Create url & api key to connect to openweather api
const baseurl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = 'af56247f090daf77a20a0a2540c88a74'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//console.log("Getting Month:   " ,d.getMonth)

// Retrieve Weather Adata from OpenApi
const retrieveweatherData = async (url='') =>{ 
try{
 const request = await fetch(url)
 if (request.ok) {
    const allData = await request.json()
    return allData;
      } else {
        console.log("Incorrect or unsported Zip Code");  
     }  
 }catch(error){
  console.log("error", error);
 }
   
};


//Validate Zipcode
function checkZip(value) {
  return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
};

//&& checkZip(zip)
console.log(checkZip(64544))
//get user input from UI
const getUserData= async function() {
   const zip = document.getElementById('zip').value;
   const feeling = document.getElementById('feelings').value;
   const urlcomplete = `${baseurl}${zip}&APPID=${apikey}`;
   if (zip.length === 0 && feelings.length === 0  ) {
     alert("Values not updated!");
     return
   }
  try {
    //Use user input to make a call to openapi
   const weatherData = await retrieveweatherData(urlcomplete);
   //console.log(weatherData);
   const temp = await weatherData.main.temp;
   const data = {
     date: newDate,
     temp: temp,
     feeling: feeling,
   }
       
   //Post weather Data to local server
   //console.log("Calling post data!!",data);
   await postData("http://localhost:8000/projectData", data);
   //const show = await console.log(data);

  //Update UI
  updateUI();
} catch(error) {
  return alert("No Weather Data for the Specified ZIP CODE,\
                \nPlease try a different zip Code");
     // appropriately handle the error
         };
};

// Function to post data to local server
async function postData(url,data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  //console.log(response.json());
  return await response.json(); 
}

//Function to update local server ui
const updateUI= async function() {
  const dateDiv = document.getElementById('date');
  const tempDiv = document.getElementById('temp');
  const contentDiv = document.getElementById('content');

  //call Get data from our local server
  let uiData = await getData("http://localhost:8000/projectData");

  //Updating the UI
  dateDiv.innerText = "Date: "+ uiData.date;
  tempDiv.innerText = "Temprature: "+ uiData.temp;
  contentDiv.innerText = "Feelings: "+ uiData.content;
}

//Get Data from  local server instance 
const getData= async function(url) {
  let response = await fetch(url)
  try {
    let data = response.json();
    console.log(data);
    return data;
  } catch(err){
    console.log(err);
  }
 
}

const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', getUserData);