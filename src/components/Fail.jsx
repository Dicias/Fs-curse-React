const Fail = ({fail}) =>{
const failStyle = {
    color: 'red',
    backgroundColor: 'gray',
    border: 'solid 3px red',
    padding: '5px'
}

    if (fail == null){
    return null
}

    return(
        <div style={failStyle}>
            <p>Information of {fail} has already been removed from server</p>
        </div>
    )
}
export default Fail