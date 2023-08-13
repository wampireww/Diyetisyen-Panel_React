import React, { useState } from 'react'
import './yeninot.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { _Notekle, _Tahsilatekle } from '../components/Firebaseislemleri';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';


const Tahsilatekle=()=> {

    const navigate=useNavigate();
    const {state}=useLocation();

    const[Miktar,setmiktar]=useState("");
    const[Progress,setprogress]=useState(false)

    const Notekle=()=>{
      
      if(Miktar==""){
        
      }
      else{
            _Tahsilatekle(state.dankey,state.danid,state.donemisim,Miktar,setprogress,navigate)
      }

    }

  return (
    <div className='yeninot'>
      <Button onClick={()=>navigate("/Admin/Danisanlarim/"+state.danid+"/"+state.donemisim)} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#4CAF50"}} color="success" variant="contained" startIcon={<ArrowBackIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Geri Dön</h4>
      </Button>
      <hr className='notlarim-hr'></hr>
      <div className='notforum'>
      <span style={{flexDirection:"row",display:'flex',alignItems:"center",width:"99%",backgroundColor:"#4CAF50",padding:10,justifyItems:"center"}}>
        <PaidOutlinedIcon style={{fontSize:25,marginRight:5,color:"#333333"}}/>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Tahsilat Ekle</h4>
        </span>
      <hr className='yeninot-hr'></hr>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"50%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Miktarı Girin </h4>
      <TextField
      value={Miktar}
      onChange={(text)=>setmiktar(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen miktarı giriniz.'
          id="outlined-size-small"
          size="small"
          color="success"
        />
        </span>
               <span style={{flexDirection:"row",display:'flex',justifyContent:"flex-end",alignItems:"center",width:"100%",marginTop:10}}>
          {Progress==true &&
        <CircularProgress style={{marginRight:10}} size={30}/>
      }
        <Button onClick={()=>Notekle()} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#B0BEC5"}} color="success" variant="contained" startIcon={<SaveIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Kaydet</h4>
      </Button>
        </span>
      </div>
    </div>
  )
}

export default Tahsilatekle