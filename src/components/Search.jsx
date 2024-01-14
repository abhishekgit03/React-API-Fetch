import React from 'react'
import {useGlobalContext} from "../context/context";

function Search() {
  const {query,searchPost} =useGlobalContext()
  return (
    <>
    <h1>News Website</h1>
    <form onSubmit={(e)=> e.preventDefault()}>
      <div style={{marginBottom:"5vh"}}>
        <input
          type="text"
          placeholder="search here"
          value={query}
          onChange={(e)=>searchPost(e.target.value)}/>
      </div>
    </form>
    </>
    
  )
}

export default Search