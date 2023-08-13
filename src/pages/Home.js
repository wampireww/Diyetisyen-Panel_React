import React, { useEffect, useState } from 'react'
import './home.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppleIcon from '@mui/icons-material/Apple';
import { _Girisyap } from '../components/Firebaseislemleri';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Home=()=>{

    const[Kuladi,setkuladi]=useState("");
    const[Sifre,setsifre]=useState("");
   
    const navigate=useNavigate();
    const [searchParams] = useSearchParams();


    useEffect(()=>{
      if(localStorage.getItem("login")=="true"){
        navigate("/admin")
      }

    },[])

    
    const Girisyap=()=>{
      if(Kuladi=="" || Sifre==""){

      }
      else{
        _Girisyap(Kuladi,Sifre,navigate)

      }

    }

  return (
    <div className='home' >
      <span style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",paddingInline:20}}>
      <AppleIcon style={{fontSize:40,marginRight:5,color:"#43A047"}} />
        <h1>Diyetisyen Admin Panel</h1>
      </span>
        <hr className='home-hr'></hr>
        <TextField
        value={Kuladi}
        onChange={(e)=>setkuladi(e.target.value)}
        style={{marginTop:10,width:"50%"}}
          id="standard-multiline-flexible"
          label="Kullanıcı Adı"

          variant="standard"
        />
         <TextField
          value={Sifre}
          onChange={(e)=>setsifre(e.target.value)}
         style={{marginTop:10,width:"50%"}}
          id="standard-multiline-flexible"
          label="Şifre"
          variant="standard"
        />
        {searchParams.get("giris") == "basarisiz" && 
        <h4 style={{fontSize: 15, color: "#FF5722",marginTop:10}}>* Kullanıcı Adı veya Şifreniz Hatalı !</h4>
      }
     <Button onClick={()=>Girisyap()} style={{marginTop:10,textTransform:"none"}} variant="contained">Giriş Yap</Button>
    </div>
  )
}

export default Home