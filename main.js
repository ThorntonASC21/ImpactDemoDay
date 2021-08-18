let country = document.getElementById("country");
let state = document.getElementById("states");
let city = document.getElementById("city");
let submit = document.getElementById("submit");
let radius = document.getElementById("radius");
let clear = document.getElementById("clear");
let mainDiv = document.getElementById("main");
let id = [];
let limit = 0;


function onClick() {
  event.preventDefault();
  console.log(state.value);
  console.log(city.value);
  limit = radius.value;
  fetch(
    "https://universities-and-colleges.p.rapidapi.com/universities?page=20&countryCode=US&limit=" + radius,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bca2f689b4msh9e4d0b181517549p11e401jsncdb67e6ba90e",
        "x-rapidapi-host": "universities-and-colleges.p.rapidapi.com",
      },
    }
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (returnedJson) {
      for (let i = 0; i < returnedJson.length; i++) {
        id.push(returnedJson[i].id);
        fetch(
          "https://universities-and-colleges.p.rapidapi.com/universities-by-id?id=" +
            id[i],
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "bca2f689b4msh9e4d0b181517549p11e401jsncdb67e6ba90e",
              "x-rapidapi-host": "universities-and-colleges.p.rapidapi.com",
            },
          }
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (returnedJson) {        
              if(state.value == returnedJson.stateCode){
                console.log(returnedJson);
                let newDiv = document.createElement("div");
                let newP = document.createElement("p");
                let newP2 = document.createElement("p");
                let newP3 = document.createElement("p");
                newP.innerHTMl = returnedJson.name;
                newDiv.appendChild(newP);
                newDiv.appendChild(newP2);
                newDiv.appendChild(newP3);
                newDiv.style.textAlign = "center";
                newDiv.style.margin = "50px";
                mainDiv.appendChild(newDiv);
              }
          });
      }
    });
}


//clear button
function clearing(events) {
  events.preventDefault();
  document.body = "";
}
