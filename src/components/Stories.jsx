import React,{useState,useEffect} from 'react'
import {useGlobalContext } from '../context/context'

function Stories() {
    const {hits,nbPages,isloading,objectID,removePost} = useGlobalContext();
    if(isloading)
    {
      return(
        <>
        <h1>Loading....</h1>
        </>
      )
    }
  return (
    <>
      <div className="stories-div" key={objectID}>
      {hits.map((curPost) => {
      const { title, author, url, source,description,content} = curPost;
      return (
      <div className="card" key={objectID}>
      <h2 style={{color:'black'}}>{title}</h2>
      <p>
      By <span> {author}</span> | <span> Source {source.id===null ? "unknown" : source.id} </span>
      </p>
      <p style={{color:'black'}}>{description}</p>
      <div className="card-button">
      <a href={url} class="button-link" target="_blank">
      Read More
      </a>
        </div>
      </div>
      );
      })}
          </div>
    </>
  )
}

export default Stories