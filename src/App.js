import React, { useEffect, useState } from 'react';

import Countries from './components/Countries'
import './app.css'
import Search from './components/Search';

const url = "https://restcountries.com/v3.1/all";
function App() {
  const[isLoading,setIsLoading] = useState(true);
  const[error,setError] = useState(null);
  const[countries,setCountries] = useState([]);
  const[filteredCountries,setFilteredCountries] = useState(countries);

  const fetchData = async (url) =>{
     setIsLoading(true);
     try
     {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
      //console.log(data);
     }
     catch(error)
     {
      setIsLoading(false);
      setError(error);
     }
  }

  useEffect(()=>{
    fetchData(url);
  },[]);

  const onRemoveCountry = (name) =>{
    const filter = filteredCountries.filter((country)=>country.name.common!==name);
    setFilteredCountries(filter);
  }
  
  const handleSearch = (searchValue) =>{
   
   let value = searchValue.toLowerCase();
   const newCountries = countries.filter((country)=>{
    const countryName = country.name.common.toLowerCase();
    return countryName.startsWith(value);
   });
   setFilteredCountries(newCountries);
  }
  return (
    <>
        <h1>Country App</h1>
        <Search onSearch={handleSearch}/>    
        {isLoading && <h2>Loading......</h2>}
        {error && <h3>{error.message}</h3>}
        {countries && <Countries countries={filteredCountries} onRemoveCountry={onRemoveCountry}/>}
    </>
  );
}

export default App;
