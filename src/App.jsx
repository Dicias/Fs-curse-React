import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import Note from "./components/Note";
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer';

const App = () => {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('new note...')
const [showAll, setShowAll] = useState(true)
const [errorMessage, setErrorMessage] = useState(null)
//console.log(props);


useEffect(()=>{
  /*
  console.log('effect')
  axios.get('http://localhost:3001/notes')
  .then(res =>{
    console.log('promise fulfilled')
    setNotes(res.data)
  })*/
  noteService
  .getAll()
  .then(initialNotes =>{
    setNotes(initialNotes)
  })
},[])

console.log('render ', notes.length, 'notes');

const addNote = (event) =>{
  event.preventDefault();
  const noteObject = {
    content: newNote,
    date: new Date().toISOString(),
    important: Math.random() <0.5, 
    id: notes.length + 1,
  }
/*
  axios
  .post('http://localhost:3001/notes', noteObject)
  .then(res=>{
    console.log(res);
    setNotes(notes.concat(noteObject))
    setNewNote('')
  })
*/
noteService
.create(noteObject)
.then(returnNote =>{
  setNotes(notes.concat(returnNote))
  setNewNote('')
})
}

const handleNoteChange = (event) =>{
  console.log(event.target.value)
  setNewNote(event.target.value)
}

const toggleImportanceOf = (id) =>{
const url = `http://localhost:3001/notes/${id}`
const note = notes.find(n => n.id === id)
const changedNote = {...note, important: !note.important}

noteService
.update(id, changedNote)
.then(returnNote => {
  setNotes(notes.map(note => note.id !== id ? note : returnNote))
})
.catch(error =>{
  setErrorMessage(`${note.content} was already removed from server`)
  setTimeout(()=>{
    setErrorMessage(null)
  },3000)
  setNotes(notes.filter(n => n.id !== id))

})
}

const notesToShow = showAll
? notes
: notes.filter(note => note.important === true)


return(
  <div>
    <h1>Notes</h1>
    <Notification message={errorMessage} />
    <div>
  <button onClick={()=>setShowAll(!showAll)}> 
    show {showAll ? 'important' : 'all'}
  </button>
    </div>

    <ul>
      {notesToShow.map((note) => <Note
       key={note.id}
        note={note.content}
        toggleImportance={()=>toggleImportanceOf(note.id)}
        />)}
    </ul>
  <form onSubmit={addNote}>
    <input value={newNote} onChange={handleNoteChange} />
    <button type="submit">save</button>
  </form>

<Footer />
  </div>
)
}

export default App