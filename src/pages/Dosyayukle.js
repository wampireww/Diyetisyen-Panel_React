import React, { useState } from 'react'
import './yeninot.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { _Dosyayukle, _Notekle } from '../components/Firebaseislemleri';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';


const Dosyayukle=()=> {

    const navigate=useNavigate();
    const {state}=useLocation();

    const[Dosyanot,setdosyanot]=useState("");
    const[Dosyadiyetliste,setdosyadiyetliste]=useState([]);
    const[Dosyavucutanaliz,setdosyavucutanaliz]=useState([]);
    const[Progress,setprogress]=useState(false)

    const Dosyalariyukle=()=>{

      if(Dosyadiyetliste.length==0 && Dosyavucutanaliz.length==0){

      }
      else{
        _Dosyayukle(state.dankey,state.danid,state.donemisim,Dosyanot,Dosyadiyetliste,Dosyavucutanaliz,navigate,setprogress)
      
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
        <DriveFolderUploadOutlinedIcon style={{fontSize:25,marginRight:5,color:"#333333"}}/>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Diyet Listesi Ve Vücut Analizi Yükle</h4>
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:5}}>
        <h4 style={{fontSize:14,color:"#D13A00",marginBottom:5,marginTop:0}} > Uyarı :</h4>
        <h4 style={{fontSize:14,color:"#D13A00",marginBottom:5,marginTop:0}} >* Her bir dosya boyutu 28 Mb ı geçmemelidir.</h4>
        <h4 style={{fontSize:14,color:"#D13A00",marginBottom:5,marginTop:0}} >* 28 Mb ı geçen dosyalar yüklenmeyecektir.</h4>
        <h4 style={{fontSize:14,color:"#D13A00",marginBottom:0,marginTop:0}} >* Dosya notu boş bırakılabilir.</h4>
        </span>
        <hr className='yeninot-hr'></hr>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"35%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Dosya Notu Girin</h4>
      <TextField
      value={Dosyanot}
      onChange={(text)=>setdosyanot(text.target.value)}
      style={{width:"100%"}}
        placeholder='Dosya notu giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"50%",marginTop:20,backgroundColor:"#90CAF9",padding:20,borderRadius:10}}>
        <h4 style={{fontSize:14,color:"#333333",marginBottom:10,marginTop:0}} >Diyet Listesi Yükle</h4>
        <input onChange={(file)=>setdosyadiyetliste(file.target.files)} style={{}} className='input-resim'  multiple type="file" />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"50%",marginTop:20,backgroundColor:"#90CAF9",padding:20,borderRadius:10}}>
        <h4 style={{fontSize:14,color:"#333333",marginBottom:10,marginTop:0}} >Vücut Analizi Yükle</h4>
        <input onChange={(file)=>setdosyavucutanaliz(file.target.files)} style={{}} className='input-resim'  multiple type="file" />
        </span>
        <span style={{flexDirection:"row",display:'flex',justifyContent:"flex-end",alignItems:"center",width:"100%",marginTop:10}}>
          {Progress==true &&
        <CircularProgress style={{marginRight:10}} size={30}/>
      }
        <Button onClick={()=>Dosyalariyukle()} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#B0BEC5"}} color="success" variant="contained" startIcon={<SaveIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Yükle</h4>
      </Button>
        </span>
      </div>
    </div>
  )
}

export default Dosyayukle