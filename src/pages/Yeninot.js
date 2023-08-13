import React, { useState } from 'react'
import './yeninot.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { _Notekle } from '../components/Firebaseislemleri';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


const Yeninot=()=> {

    const navigate=useNavigate();

    const[Notbaslik,setnotbaslik]=useState("");
    const[Notgovde,setnotgovde]=useState("");
    const[Notdosya,setnotdosya]=useState([]);
    const[Progress,setprogress]=useState(false)

    const Notekle=()=>{
      
      if(Notbaslik=="" || Notgovde==""){
        
      }
      else{
        _Notekle(Notbaslik,Notgovde,Notdosya,navigate,setprogress)
      }

    }

  return (
    <div className='yeninot'>
      <Button onClick={()=>navigate("/Admin/Notlarim")} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#4CAF50"}} color="success" variant="contained" startIcon={<ArrowBackIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Geri Dön</h4>
      </Button>
      <hr className='notlarim-hr'></hr>
      <div className='notforum'>
      <span style={{flexDirection:"row",display:'flex',alignItems:"center",width:"99%",backgroundColor:"#4CAF50",padding:10,justifyItems:"center"}}>
        <CreateIcon style={{fontSize:20,marginRight:5,color:"#333333"}}/>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Yeni Not Ekle</h4>
        </span>
      <hr className='yeninot-hr'></hr>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Not Başlığı Girin </h4>
      <TextField
      value={Notbaslik}
      onChange={(text)=>setnotbaslik(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen bir not başlığı giriniz.'
          id="outlined-size-small"
          size="small"
          color="success"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:10}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Notunuzu Girin</h4>
      <TextField
      value={Notgovde}
      onChange={(text)=>setnotgovde(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen notunuzu giriniz.'
          id="outlined-size-small"
          size="small"
          color="success"
          multiline
          minRows={10}
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:10}}>
        <h4 style={{fontSize:14,color:"#D13A00",marginBottom:5,marginTop:0}} > Uyarı :</h4>
        <h4 style={{fontSize:14,color:"#D13A00",marginBottom:5,marginTop:0}} >* Her bir dosya boyutu 28 Mb ı geçmemelidir.</h4>
        <h4 style={{fontSize:14,color:"#D13A00",marginBottom:10,marginTop:0}} >* 28 Mb ı geçen dosyalar yüklenmeyecektir.</h4>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Dosya veya Fotoğraf Ekleyin</h4>
        <input onChange={(file)=>setnotdosya(file.target.files)} className='input-resim'  multiple type="file" />
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

export default Yeninot