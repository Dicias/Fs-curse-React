
const Contact = ({name, num, remove}) =><p className="contact">  {name}: {num} 
<button onClick={remove}> delete </button>
</p> 

export default Contact