const Success = ({complete}) =>{
    const successStyle = {
        color: "green",
        backgroundColor: 'gray',
        border: 'solid 3px green',
        height: '100px',
        fontSize: 12
    }

    if(complete== null){
    return null
}

    return(
        <div style={successStyle}>
            <h2>Added {complete} successfully</h2>
        </div>
    )
}

export default Success