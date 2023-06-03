const Footer = () =>{
    const footerStyle ={
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        backgroundColor: 'white'
    }

    return(
        <div style={footerStyle}>
            <p>
                Note app, Department of Computer Science, University of Helsinki 2021
            </p>
        </div>
    )
}

export default Footer