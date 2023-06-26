
const Filter = ({handleFilter, search}) => <div><p>Filter shown with: </p>
    <input value={search} onChange={handleFilter}/>
     </div>

export default Filter


//filter shown with <input onChange={handleFilter} />