import BlogDetai from "./BlogDetai.jsx"
import { useState } from "react";
function AllBlogs({data,fn}) {
  return (
    <div>
      
      <ul>
        {data.map((e,i)=>{
          return(
          <li key={i}><BlogDetai data={e} fn={fn}/></li>

          )
          
        })}
      </ul>
    </div>
  )
}

export default AllBlogs

