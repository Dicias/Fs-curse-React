import React from "react";
import Header from "./Header";
import Content from "./Content";
///////////////

const Course = ({ courses}) =>{

    //console.log(courses, "desde course");
    return(
        
        <div>
            
            {courses.map((header, i)=>(
            <div key={i}>
            <Header key={i} courses={header} />  
            <Content  courses={header}/>
             </div>) 
            
            )}
         </div>
        )

}

export default Course
