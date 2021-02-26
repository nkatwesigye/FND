
//const baseurl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid='
const baseurl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = 'af56247f090daf77a20a0a2540c88a74'


//api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}

//api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

//const urlcomplete = baseurl+apikey
//console.log("testing logging")

// Async POST
// const postData = async ( url = '', data = {})=>{

//    const response = await fetch(url, {
//    method: 'POST', 
//    credentials: 'same-origin', 
//    headers: {
//        'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(data), // body data type must match "Content-Type" header        
//  });

//    try {
//      const newData = await response.json();
//      return newData;
//    }catch(error) {
//    console.log("error", error);
//    }
// };

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

console.log("Getting Month:   " ,d.getMonth)

// Async GET
const retrieveweatherData = async (url='') =>{ 
 const request = await fetch(url)
 try {
 // Transform into JSON
 const allData = await request.json()
 return allData;
 //console.log(allData);
 
      }
 catch(error) {
   console.log("error", error);
   // appropriately handle the error
        }
};

//get user input from UI
const getUserData= async function() {
   const zip = document.getElementById('zip').value;
   const feeling = document.getElementById('feelings').value;
   const urlcomplete = `${baseurl}${zip}&APPID=${apikey}`;
   if (zip.length === 0 || feelings.length === 0) {
     alert("Values not updated!");
     return
   }

   const weatherData = await retrieveweatherData(urlcomplete);
   //console.log(weatherData);

   const temp = weatherData.main.temp;

   const data = {
     date: newDate,
     temp: temp,
     feeling: feeling,
   }
   console.log("Calling post data!!",data);
   await postData("http://localhost:8000/projectData", data);
   //const show = await console.log(data);

   //Update UI
  updateUI();
};

// async function fetchMovies() {
//    const response = await fetch('/movies');
//    // waits until the request completes...
//    console.log(response);
//  }xz`,
 
 
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
 //console.log("Showing feelings:  "+content);
// // TODO-Chain your async functions to post an animal then GET the resulting data

// // TODO-Call the chained function 
// function postGet(){
//   postData('/animal',{fav:'lion'})     
//     .then( function(data){
//       retrieveData('/all')
      
//   })
    
// }

// postGet()

const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', getUserData);