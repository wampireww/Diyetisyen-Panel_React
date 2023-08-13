import React, { useState } from 'react'
import './yeninot.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { _Notekle, _Seansekle } from '../components/Firebaseislemleri';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Seansekle=()=> {

    const navigate=useNavigate();
    const {state}=useLocation();

  
    const[Progress,setprogress]=useState(false)
    const[Seanstur,setseanstur]=useState("");
    const[Kilo,setkilodegisimi]=useState(state.kilo)
    const[Seansnot,setseansnot]=useState("");
    const[Seansadi,setseansadi]=useState("");

    const Seansekle=()=>{
      
      if(Seanstur=="" || Kilo==""){
        
      }
      else{
            
        _Seansekle(state.key,state.donemisim,state.danid,navigate,Seansnot,Seanstur,Kilo,setprogress,Seansadi)

      }

    }

  return (
    <div className='yeninot'>
      <Button onClick={()=>navigate("/Admin/Danisanlarim/"+state.danid+"/"+state.donemisim)} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#039BE5"}} color="success" variant="contained" startIcon={<ArrowBackIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Geri Dön</h4>
      </Button>
      <hr className='notlarim-hr'></hr>
      <div className='notforum'>
      <span style={{flexDirection:"row",display:'flex',alignItems:"center",width:"99%",backgroundColor:"#4CAF50",padding:10,justifyItems:"center"}}>
        <AssessmentOutlinedIcon style={{fontSize:20,marginRight:5,color:"#333333"}}/>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Yeni Seans Ekle</h4>
        </span>
      <hr className='yeninot-hr'></hr>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",backgroundColor:"#ECEFF1",padding:0}} >
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:0,marginTop:0}} >Uyarı : </h4>
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:0,marginTop:2}} >* Seans Adı ve Seans Notu boş bırakılabilir.</h4>
        </span>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"50%",marginTop:10}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Seans Adını Girin </h4>
      <TextField
      value={Seansadi}
      defaultValue={""}
      onChange={(text)=>setseansadi(text.target.value)}
      style={{width:"100%"}}
        placeholder='Seans adını giriniz.'
          id="outlined-size-small"
          size="small"
          color="success"
        />
        </span>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:10}}>
        
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:0}} >Seans Türü Seçin</h4>
        <Select
        color='success'
        multiple={false}
        defaultValue={""}
        size='small'
        style={{width:150,marginTop:10,height:30,fontSize:15}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={Seanstur}    
         onChange={(e)=>setseanstur(e.target.value)}  
        >
        <MenuItem style={{fontSize:14}} value={"Kontrol"}>Kontrol</MenuItem>
        <MenuItem style={{fontSize:14}} value={"Diger"}>Diğer</MenuItem>
        </Select>
        </span> 
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:10}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Seans Notunuzu Girin</h4>
      <TextField
      value={Seansnot}
      onChange={(text)=>setseansnot(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen notunuzu giriniz.'
          id="outlined-size-small"
          size="small"
          color="success"
          multiline
          minRows={5}
        />
        </span>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"50%",marginTop:10}}>
            <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Danışanın Kilosunu Girin </h4>
      <TextField
      value={Kilo}
      defaultValue={""}
      onChange={(text)=>setkilodegisimi(text.target.value)}
      style={{width:"100%"}}
        placeholder='Kilo değişimini giriniz.'
          id="outlined-size-small"
          size="small"
          color="success"
        />
        </span>
        <span style={{flexDirection:"row",display:'flex',justifyContent:"flex-end",alignItems:"center",width:"100%",marginTop:10}}>
          {Progress==true &&
        <CircularProgress style={{marginRight:10}} size={30}/>
      }
        <Button onClick={()=>Seansekle()} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#B0BEC5"}} color="success" variant="contained" startIcon={<SaveIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Kaydet</h4>
      </Button>
        </span>
      </div>
    </div>
  )
}

export default Seansekle