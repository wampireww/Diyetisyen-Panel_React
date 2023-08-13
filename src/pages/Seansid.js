import React, { useState } from 'react'
import './yeninot.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { _Notekle, _Seansekle } from '../components/Firebaseislemleri';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const Seansid=()=> {

    const navigate=useNavigate();
    const {state}=useLocation();

  
    const[Seansnot,setseansnot]=useState(state.seansnot);

    
  return (
    <div className='yeninot'>
      <Button onClick={()=>navigate("/Admin/Danisanlarim/"+state.danid+"/"+state.donemisim)} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#039BE5"}} color="success" variant="contained" startIcon={<ArrowBackIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Geri Dön</h4>
      </Button>
      <hr className='notlarim-hr'></hr>
      <div className='notforum'>
      <span style={{flexDirection:"row",display:'flex',alignItems:"center",width:"99%",backgroundColor:"#4CAF50",padding:10,justifyItems:"center"}}>
        <AssessmentOutlinedIcon style={{fontSize:20,marginRight:5,color:"#333333"}}/>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Seans Bilgileri</h4>
        </span>
      <hr className='yeninot-hr'></hr>
      <span style={{flexDirection:"row",display:'flex',alignItems:"flex-start",width:"50%",marginTop:0,padding:5}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Seans Tarihi :</h4>
        <h4 style={{fontSize:15,color:"#CE3700",marginBottom:5,marginLeft:10}} >{state.tarih}</h4>
        </span>
      <span style={{flexDirection:"row",display:'flex',alignItems:"flex-start",width:"50%",marginTop:0,padding:5}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Seans Adı :</h4>
        <h4 style={{fontSize:15,color:"#CE3700",marginBottom:5,marginLeft:10}} >{state.seansadi}</h4>
        </span>
      <span style={{flexDirection:"row",display:'flex',alignItems:"flex-start",width:"100%",marginTop:0,padding:5}}>
        
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:0}} >Seans Türü :</h4>
        <h4 style={{fontSize:15,color:"#CE3700",marginBottom:5,marginLeft:10}} >{state.seanstur}</h4>
        </span>
        <span style={{flexDirection:"row",display:'flex',alignItems:"flex-start",width:"50%",marginTop:0,padding:5   }}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Danışan Tartım Kilosu :</h4>
        <h4 style={{fontSize:15,color:"#CE3700",marginBottom:5,marginLeft:10}} >{state.kilo}</h4>
        </span> 
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:0,padding:5}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Seans Notu</h4>
      <TextField
      InputProps={{
        readOnly: true,
      }}
    
      value={Seansnot}
      onChange={(text)=>setseansnot(text.target.value)}
      style={{width:"100%"}}
        placeholder=""
          id="outlined-size-small"
          size="small"
          color="success"
          multiline
          minRows={5}
        />
        </span>
      </div>
    </div>
  )
}

export default Seansid