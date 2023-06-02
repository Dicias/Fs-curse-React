const UniqueCountry = ({country}) =>{
    return(
        <div>
            <h1>{country.name}</h1>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <ul>
                <li>{}</li>
            </ul>
            <img  src={country.flag} />
        </div>
    )

}

export default UniqueCountry

