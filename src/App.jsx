import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import NameCountry from './components/NameCountry'
import UniqueCountry from './components/UniqueCountry'

const countriesInfo = []


const App = () =>{
  const [countries, setCountries] = useState([])
  const [load, setLoad] = useState(true)
  const [search, setSearch] = useState('')
  const [showCountries, setShowCountries] = useState([])
  const [uniqueCountry, setUniqueCountry] = useState([
    {
      name: '',
      capital: '',
      population: '',
      languages: '',
      flag: ''
    }
  ])

 const [languages, setLanguages] = useState([])

useEffect(()=>{
  console.log('effect')
  
  axios
  .get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(res =>  {
   //console.log('promise fulfilled', res.data[0])
    countriesInfo.name = res.data.map(country => country.name.common)
    countriesInfo.capital = res.data.map(country =>country.capital)
    countriesInfo.population = res.data.map(country => country.population) 
    countriesInfo.languages = res.data.map(country => country.languages)
    countriesInfo.flag = res.data.map(country => country.flags.png)
   // console.log(countriesInfo.flag, 'desde then')
    
  })
  .then(()=>{
    setCountries(countriesInfo)
    setLoad(false)})
  
  .catch(error =>{
    console.log(error);
  })
////////Request Api clima//////////
//console.log(import.meta.env.VITE_WEATHER_KEY, 'VARIABLE DE ENTORNO')
//const api_key = import.meta.env.VITE_WEATHER_KEY
const api_key = import.meta.env.VITE_WEATHER_KEY
fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api_key}`)
.then(res =>{
  console.log(res.url, 'desde weather res');
})



},[])
//console.log(countries, 'desde countries');

const handleSearcher = (event) =>{
    setSearch(event.target.value)
    event.preventDefault()

const showCountry = countries.name.filter(country => country.toLowerCase().includes(search.toLowerCase()))


if(showCountry.length > 10){
  setShowCountries(['Too many matches, specify another filter'])
  setUniqueCountry([
    {
      name: '',
      capital: '',
      population: '',
      languages: '',
      flag: ''
    }
  ])
  setLanguages([])
}
else if(showCountry.length<= 10 && showCountry.length >1){
setUniqueCountry([
  {
    name: '',
    capital: '',
    population: '',
    languages: '',
    flag: ''
  }
])
setShowCountries(showCountry)
//console.log(showCountry.length, 'desde show');
//console.log(showCountries, 'desde show')
setLanguages([])


  //console.log(search);
}else if(showCountry.length == 1){
  console.log('solo hay uno ');
setShowCountries([])
//console.log(countries, 'desde countries');
const showUniqueCountry = countries.name.findIndex(country => country == showCountry)
//console.log(showUniqueCountry, 'el');

const theCountry = {
  name: countries.name[showUniqueCountry],
  capital: countries.capital[showUniqueCountry],
  population: countries.population[showUniqueCountry],
  languages: countries.languages[showUniqueCountry],
  flag: countries.flag[showUniqueCountry]
}
//console.log(theCountry, 'desde obj country');

const theLanguages = countries.languages[showUniqueCountry]


//console.log(theLanguages);
//console.log(showUniqueCountry, 'probando el find');
  setUniqueCountry(theCountry)
  
  
  const languagesList = Object.values (theLanguages)

  setLanguages(languagesList)
  //console.log(languagesList, 'desde languages');

}
}


const  showThis = (i) =>{

  
  //console.log(i, 'index del comp');
//console.log(showCountries, 'desde function ');
const thisCountry = showCountries[i]
const searchThis = countries.name.findIndex(element => element == thisCountry)
//console.log(searchThis, 'desde el find');
if(searchThis >= 0){

const showUniqueCountry = searchThis

const theCountry = {
  name: countries.name[showUniqueCountry],
  capital: countries.capital[showUniqueCountry],
  population: countries.population[showUniqueCountry],
  languages: countries.languages[showUniqueCountry],
  flag: countries.flag[showUniqueCountry]
}
//console.log(theCountry, 'desde obj country');   

const theLanguages = countries.languages[showUniqueCountry]


//console.log(theLanguages);
//console.log(showUniqueCountry, 'probando el find');
setShowCountries([])  
setUniqueCountry(theCountry)

const languagesList = Object.values (theLanguages)

setLanguages(languagesList)

setSearch('')
}else{
  alert('aquí no hay nada para mostrar')
}


}



//console.log(countriesInfo.name);


if(load){
  return(
    <div>
      <h2>Cargando...</h2>
    </div>
  )
}
else{
  return(
    <div>
      <form>
        <p>Find country</p>
      <input value={search} onChange={handleSearcher} />
      </form>
      {showCountries.map((country, i)=><NameCountry key={i} name={country} show={()=>showThis(i) } />)}
      <div>
        <p>{uniqueCountry.name}</p>
        <p>{uniqueCountry.capital}</p>
        <p>{uniqueCountry.population}</p>
        <ul>
         {languages.map((language, i)=><li key={i}>{language} </li>)}
        </ul>
        <img src={uniqueCountry.flag} />
      </div>
      
    </div>
    )
  }
}

export default App


/*
const showUniqueCountry = i

const theCountry = {
  name: countries.name[showUniqueCountry],
  capital: countries.capital[showUniqueCountry],
  population: countries.population[showUniqueCountry],
  languages: countries.languages[showUniqueCountry],
  flag: countries.flag[showUniqueCountry]
}
console.log(theCountry, 'desde obj country');

const theLanguages = countries.languages[showUniqueCountry]


console.log(theLanguages);
//console.log(showUniqueCountry, 'probando el find');
setShowCountries([])  
setUniqueCountry(theCountry)

const languagesList = Object.values (theLanguages)

setLanguages(languagesList)



*/