import React, { useEffect, useState } from 'react'
import './yeninot.css';
import './donemekle.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { _Donemekle, _Notekle, _Paketlistele } from '../components/Firebaseislemleri';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';


const Donemekle=()=> {

    const {state}=useLocation();

    const navigate=useNavigate();

    const[Donemadi,setdonemadi]=useState("");
    const[Paket,setpaket]=useState("");
    const[Paketliste,setpaketliste]=useState([]);
    const[alert,setalert]=useState(false);
    const[Progress,setprogress]=useState(false)

    useEffect(()=>{
        _Paketlistele(setpaketliste);
    },[])

  
    const Donemekle=()=>{
      
      if(Donemadi=="" || Paket==""){
        
      } 
      else{

        _Donemekle(Donemadi,Paket,navigate,state.key,state.id,setalert,setprogress)
     
      }

    }   

  return (
    <div className='yeninot'>
      <Button onClick={()=>navigate("/Admin/Danisanlarim/"+state.id)} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#039BE5"}} color="success" variant="contained" startIcon={<ArrowBackIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Geri Dön</h4>
      </Button>
      <hr className='notlarim-hr'></hr>
      <div className='donemekle'>
      <span style={{flexDirection:"row",display:'flex',alignItems:"center",width:"99%",backgroundColor:"#039BE5",padding:5,justifyItems:"center"}}>
        <NoteOutlinedIcon style={{fontSize:20,marginRight:5,color:"#333333",backgroundColor:"#4CAF50",borderRadius:20,padding:4}}/>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Yeni Dönem Ekle</h4>
        </span>
      <hr className='yeninot-hr'></hr>
      {alert==true && 
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"99%",backgroundColor:"#ECEFF1",padding:5,justifyContent:"flex-start",marginBottom:10}}>
      <h4 style={{fontSize:16,color:"#FF0000",marginBottom:0}}>* Girdiğiniz dönem adı kullanılıyor.Lütfen başka bir ad giriniz.</h4>
        </span>
        }
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Dönem Adı </h4>
      <TextField
      value={Donemadi}
      onChange={(text)=>setdonemadi(text.target.value)}
      style={{width:"100%"}}
        placeholder='Dönem adını giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        {/* <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:10}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Danışan Kilosu </h4>
      <TextField
      value={Kilo}
      onChange={(text)=>setkilo(text.target.value)}
      style={{width:"100%"}}
        placeholder='kg yazmadan sadece sayı olarak giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span> */}
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10}} >Paket Seçin</h4>
        <Select
        multiple={false}
        defaultValue={[""]}
        size='small'
        style={{width:150,marginTop:10,height:30,fontSize:15}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={Paket}
         onChange={(e)=>setpaket(e.target.value)}  
        >
           {/* <MenuItem value="">
          <em></em>
        </MenuItem> */}
            {Paketliste.map(item=>
        <MenuItem style={{fontSize:14}} value={item.isim}>{item.isim+" - "+item.fiyat+"TL"}</MenuItem>
        )}
        </Select>
        </span> 
        <span style={{flexDirection:"row",display:'flex',alignItems:"center",justifyContent:"flex-end",width:"100%",marginTop:10}}>
        <Button onClick={()=>Donemekle()} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#B0BEC5"}} color="success" variant="contained" startIcon={<AddCircleOutlineOutlinedIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold",marginLeft:-5}}>Ekle</h4>
      </Button>
      {Progress==true &&
        <CircularProgress style={{marginLeft:10}} size={30}/>
      }
        </span>
      </div>
    </div>
  )
}

export default Donemekle