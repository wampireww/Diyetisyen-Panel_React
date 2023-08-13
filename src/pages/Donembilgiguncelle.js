import React, { useEffect, useState } from 'react'
import './yeninot.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { _Donemguncelle, _Notekle, _Paketlistele } from '../components/Firebaseislemleri';
import CircularProgress from '@mui/material/CircularProgress';
import SettingsIcon from '@mui/icons-material/Settings';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

const Donembilgiguncelle=()=> {

    const navigate=useNavigate();
    const {state}=useLocation();

    const[Progress,setprogress]=useState(false)
    const[Paketliste,setpaketliste]=useState([]);
    const[Paket,setpaket]=useState("")
    const[Kontrol,setkontrol]=useState(false);
    const[Durum,setdurum]=useState(state.durum);



    useEffect(()=>{

      _Paketlistele(setpaketliste)

    },[])

    const onChange=(checked)=>{
      setkontrol(checked);
    }

    const Donemguncelle=()=>{
        if(Kontrol==false && Paket==""){
        }
        else{
          _Donemguncelle(state.dankey,state.danid,state.donemisim,Durum,Paket,navigate,setprogress,Kontrol,state.paketisim,state.fiyat)
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
        <SettingsIcon style={{fontSize:20,marginRight:5,color:"#333333"}}/>
      <h4 style={{fontSize:17,color:"#FF0000",marginRight:5}}>{state.isim +" "+state.soyisim}</h4>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Kayıtlı Danışanın Dönem</h4>
      <h4 style={{fontSize:17,color:"#FF0000",marginRight:5,marginLeft:5}}>{state.donemisim}</h4>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Kayıtlı Dönem Bilgilerini Güncelle</h4>
        </span>
      <hr className='yeninot-hr'></hr>

        <span style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:0}}>
        <span style={{display:"flex",flexDirection:"row"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10}} >Mevcut Paket : </h4>
        <h4 style={{fontSize:15,color:"#FF0000",marginLeft:5,marginTop:10}} >{state.paketisim} - {state.fiyat} TL</h4>
        </span>
        <span style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:0}} >Mevcut paket ile devam et </h4>
        <Checkbox
      checked={Kontrol}
      onChange={(e)=>onChange(e.target.checked)}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </span>
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
         
       <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:0}} >Paket Seçin</h4>
       <Select
        disabled={Kontrol}
       multiple={false}
       defaultValue={"bos"}
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
       <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
         
         <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10}} >Dönem Devam Durumu Seçin</h4>
         <Select
         multiple={false}
         defaultValue={state.durum}
         size='small'
         style={{width:150,marginTop:10,height:30,fontSize:15}}
         labelId="demo-select-small"
         id="demo-select-small"
         value={Durum}
          onChange={(e)=>setdurum(e.target.value)}  
         >
            {/* <MenuItem value="">
           <em></em>
         </MenuItem> */}
             
         <MenuItem style={{fontSize:14}} value={"Devam ediyor"}>Devam Ediyor</MenuItem>
         <MenuItem style={{fontSize:14}} value={"Devametmedi"}>Devam Etmedi</MenuItem>
         <MenuItem style={{fontSize:14}} value={"Tamamlandi"}>Tamamlandı</MenuItem>
         </Select>
         </span> 
      

      
        <span style={{flexDirection:"row",display:'flex',justifyContent:"flex-end",alignItems:"center",width:"100%",marginTop:10}}>
          {Progress==true &&
        <CircularProgress style={{marginRight:10}} size={30}/>
      }
        <Button onClick={()=>Donemguncelle()} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#B0BEC5"}} color="success" variant="contained" startIcon={<SaveIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Güncelle Ve Kaydet</h4>
      </Button>
        </span>
      </div>
    </div>
  )
}

export default Donembilgiguncelle