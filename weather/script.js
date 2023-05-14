const temperaturefield = document.querySelector(".weather1");
const cityfield = document.querySelector(".weather2 p");
const datefield = document.querySelector(".weather2 span");
const emojifield = document.querySelector(".weather3 img");
const weatherfield = document.querySelector(".weather3 span");
const searchfield = document.querySelector(".searchfield"); //text milega
const form = document.querySelector("form");

let target = "delhi";

//function to fetch data from api
const fetchdata = async () => {
  const url = `https://api.weatherapi.com/v1/current.json?key=5d642ccea0fa451d8aa141431231405&q=${target}`;
  const respone = await fetch(url);
  const data = await respone.json();

  //destructuring
  console.log(data);
  const {
    current: {
      temp_c,
      condition: { text, icon },
    },
    location: { name, localtime },
  } = data;
  updatedom(data.current.temp_c, data.location.name, localtime, icon, text);
};

function updatedom(temperature, city, time, emoji, text) {
  temperaturefield.textContent = temperature;
  cityfield.textContent = city;
  emojifield.src = emoji;
  weatherfield.textContent = text;
  const exacttime = time.split(" ")[1];
  const exactdate = time.split(" ")[0];

  const exactday = new Date(exactdate).getDay();

  datefield.textContent = `${exacttime} - ${getdayfullname(
    exactday
  )}  ${exactdate}`;
}

fetchdata(target);

function getdayfullname(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tueday";
    case 3:
      return "Wedday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Satday";
    default:
      return "dont know";
      break;
  }
}
const search = (e) => {
  e.preventDefault();
  target = searchfield.value;
  console.log(target);
  fetchdata(target);
};
form.addEventListener("submit", search);
