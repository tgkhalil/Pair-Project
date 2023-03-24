import { useState,useEffect } from 'react';
import NavBar from './component/NavBar';
import './App.css';
import AllBlogs from './component/AllBlogs';
import axios from 'axios';
import Create from './component/Create.jsx';
import Login from './component/Login';
function App() {
  const[data,setData]=useState([]);
  const [view , setView] = useState('login');

  const create=(view)=>{
    changeView(view)
  }
  const changeView=(x)=>{
    console.log("change")
    setView(x);
  }
  useEffect(()=>{axios.get("http://localhost:8000/blogs").then((response)=>{setData((response.data))})
.catch((err)=>{console.log(err)})
},[])
console.log(data)
 
  return (
    <div className="App">
   <div>
   {view ==="login" ? <Login fn={create}/>:<NavBar fn={create}/>} 
   </div>
   <div>
    
   {view==="Allblogs" &&<AllBlogs data={data} fn={create} />}
   {view ==="create" && <Create />}
   
   </div>
      
    
    </div>
  );
}

export default App;
