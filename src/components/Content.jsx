import React from "react";
import Part from "./Part";

const Content = ({courses}) =>{
//console.log(courses.parts, "desde content")

const sumExe = courses.parts.map((prt)=> prt.exercises )
const sumExercise = sumExe.reduce(
    (accumulator, part) => accumulator + part, 0)

    return(
        <div>
            {courses.parts.map((part, i)=>(<Part key={i} partCourse={part} />))}
            <b>Total: {sumExercise} exercises</b>
        </div>
    )

}

export default Content