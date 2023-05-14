import React from "react";

const Header = ({courses}) =><div key={courses.id}><h1>{courses.name}</h1></div>

export default Header