import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import Contact from './components/Contact'
import Filter from './components/Filter';
import contactService from './services/contact'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchPerson, setSearchPerson] = useState([])
    //console.log(searchPerson);
    const [search, setNewSearch] = useState(' ')
    const [statusSearch, setStatusSearch] = useState (false)

//traer los valores desde el json
useEffect(()=>{
  contactService
  .getAll()
  .then(contact =>{
   // console.log(contact);
    setPersons(contact)
  }).catch(err=> console.log(err))


},[])


    //Función para que el formulario no recargue la página
const noRecharge = (event) => event.preventDefault()




const handleName = (event) =>{
    setNewName(event.target.value)
    
    //console.log(newName);
    
}

const handleNumber = (event) =>{
    setNewNumber(event.target.value)
    
    //console.log(newNumber);
} 

const handleFilter = (event) =>{
    setNewSearch(event.target.value)
    
    //console.log(search);
    const searchPersons = persons.filter((person)=>person.name.toLowerCase().includes(search.toLowerCase()))
    //console.log(searchPersons);
    setSearchPerson(searchPersons)

    if(searchPerson.length === 0){
        //console.log("esta vacio, no hay mounstros aqui");
    setStatusSearch(false)
    //console.log(statusSearch);
    //console.log(searchPerson.length);
}
    else{
        //console.log("hay mounstros aqui");
    setStatusSearch(true)
    
   // console.log(statusSearch);
    }

}
const addName = (event) => {
    
    event.preventDefault()
    const nameObj ={
        name: newName,
        num: newNumber
    }
    //  console.log(persons);
 
    if(persons.find((elemento)=>elemento.name === newName ) ){
      
      const confirm =window.confirm(`${newName} is already added to  phonebook, do you want to replace the old number? `)
      if(confirm){
        const person = persons.find((person)=>person.name === newName )
        console.log(person, newNumber, 'nuevoNumero');
        
        const newData ={
            name: person.name,
            num: newNumber
        }
        contactService
        .update(person.id, newData)
        .then(res=>{
          console.log(res, 'desde update')
          setPersons(persons.map(person => person.id !== res.id ? person : res))
        })
        .catch(err=> console.log(err))
        
        setNewName('')
        setNewNumber('')
        setNewSearch('')
      }
      else{
        setNewNumber('')
        setNewSearch('')
      }
    }
    else{
    contactService
    .create(nameObj)
    .then(contact =>{
      setPersons(persons.concat(contact))
      setNewName('')
      setNewNumber('')
    })

    /*
    setPersons(persons.concat(nameObj))
    setNewName('')
    setNewNumber('')
    */
    //console.log(persons);
    }
}

const remove = (id) =>{

  
  const person = persons.find((person)=>person.id ===id )
const confirm = window.confirm(`Are u shure u want to remove ${person.name} ?`)

if(confirm){

  contactService
  .remove(id)
  .then(
    setPersons(persons.filter(person => person.id != id))
  )
  .catch(err=> console.log(err))
}



}



if(statusSearch === false){

return(
    <div>
        <h2>PhoneBook</h2>
        <form onSubmit={noRecharge}>
            <div>
            <Filter handleFilter={handleFilter} />
                
            </div>
        <h2>Add a new</h2>
            <div >
                Name:  <input value={newName} onChange={handleName} />                
                <br/>
                Number: <input value={newNumber} onChange={handleNumber} />
            </div>
                
            <div>
                <button type="submit" onClick={addName}>add</button>
            </div>
        </form>
    <h2>Numbers</h2>
        <div>
            {persons.map((person, index) => <div key={index}><Contact name={person.name} num={person.num} remove={()=>remove(person.id)} />
            
            </div>)}
            
            
        </div>



    </div>
)
}
else{
    console.log(searchPerson);
    return(
        <div>
            <h2>PhoneBook</h2>
            <form onSubmit={noRecharge}>
                <div>
                <Filter handleFilter={handleFilter} />
                </div>
            <h2>Add a new</h2>
                <div >
                    Name:  <input value={newName} onChange={handleName} />                
                    <br/>
                    Number: <input value={newNumber} onChange={handleNumber} />
                </div>
                    
                <div>
                    <button type="submit" onClick={addName}>add</button>
                </div>
            </form>
        <h2>Numbers</h2>
            <div>
                {searchPerson.map((person, index) => <div key={index}><Contact name={person.name} num={person.num} />
                
                </div>)}
                
                
            </div>
    
    
    
        </div>
    )
}


}


export default App;