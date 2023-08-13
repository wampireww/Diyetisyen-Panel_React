import React, { useState } from 'react'
import './yeninot.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { _Notekle, _Notgüncelle, _Notsil } from '../components/Firebaseislemleri';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


const Notid=()=> {

    const navigate=useNavigate();
    const {state}=useLocation();
    const [searchParams] = useSearchParams();


    const[Notbaslik,setnotbaslik]=useState(state.baslik);
    const[Notgovde,setnotgovde]=useState(state.govde);
    const[Notdosya,setnotdosya]=useState([]);
    const[Notresim,setnotresim]=useState(state.dosyalar)
    const[Progress,setprogress]=useState(false)


    const Notguncelle=(Notkey)=>{
      
      if(Notbaslik=="" && Notgovde==""){
        
      }
      else{
        _Notgüncelle(Notkey,Notbaslik,navigate,Notgovde,Notdosya,setprogress,state.notid)
      }

    }

   
  return (
    <div className='yeninot'>
      <Button onClick={()=>navigate("/Admin/Notlarim")} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#4CAF50"}} color="success" variant="contained" startIcon={<ArrowBackIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Geri Dön</h4>
      </Button>
      <hr className='notlarim-hr'></hr>
      <div className='notforum'>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",backgroundColor:"#ECEFF1",marginTop:-10}} >
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:0,marginTop:5}} >Uyarı :</h4>
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:0,marginTop:5,textAlign:"start"}} >* Güncelleme yaparken var olan yüklediğiniz dosyalar otomatik olarak güncellenmez. Dosyaları seç kısmından tekrardan seçip yüklemeniz gerekir.</h4>
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:0,marginTop:5}} > * Her bir dosya boyutu 28 Mb ı geçmemelidir.Aksi takdirde yüklenmeyecektir.</h4>
        </span> 
      <span style={{flexDirection:"row",display:'flex',alignItems:"center",justifyItems:"center",width:"100%",marginTop:15,marginBottom:-10}}>
      <h4 style={{fontSize:15,color:"#333333",marginBottom:10}}>Oluşturma Tarihi :</h4>
      <h4 style={{fontSize:15,color:"#333333",marginBottom:10,marginLeft:10}}>{state.tarih}</h4>
      <h4 style={{fontSize:15,color:"#333333",marginBottom:10,marginLeft:20}}>Güncelleme Tarihi :</h4>
      <h4 style={{fontSize:15,color:"#333333",marginBottom:10,marginLeft:10}}>{state.guncelleme}</h4>
        </span>
            <hr className='yeninot-hr'></hr>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:-5}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Not Başlığı</h4>
        <TextField
      value={Notbaslik}
      onChange={(text)=>setnotbaslik(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen notunuzu giriniz.'
          id="outlined-size-small"
          size="small"
          color="success"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:10}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Not</h4>
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
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Dosya veya Fotoğraf Ekleyin</h4>
        <input onChange={(file)=>setnotdosya(file.target.files)} className='input-resim'  multiple type="file" />
        </span>{Notresim==null ? <p style={{fontSize:15,color:"red",marginTop:10}}>-Bu Nota ait herhangi bir dosya veya fotoğraf bulunamadı !</p> : 
        <span style={{flexDirection:"row",display:'flex',alignItems:"flex-start",width:"100%",marginTop:10,marginBottom:20,flexWrap:'wrap'}} >
            {Notresim.map(item=><span style={{display:'flex',flexDirection:"column",alignItems:"center"}} >
        <><img className='buyukresimdiv' style={{ objectFit: "contain" ,marginLeft:10}} height={100} width={100} src={item} /><a style={{fontSize:17}} target={"_blank"} rel={"noreferrer"} href={item}>İndir</a></></span>
        )}
        </span>
        }
        <span style={{flexDirection:"row",display:'flex',alignItems:"center",justifyContent:"flex-end",width:"100%",marginTop:10}}>
              <Button onClick={()=>Notguncelle(state.key)} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#B0BEC5"}} color="success" variant="contained" startIcon={<SaveIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Güncelle ve Kaydet</h4>
      </Button>
      {Progress==true &&
        <CircularProgress style={{marginLeft:10}} size={30}/>
      }
        </span>
      </div>
    </div>
  )
}

export default Notid