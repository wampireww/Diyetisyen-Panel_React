import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { _Danisanekle, _Danisanguncelle, _Danisanlisteleidyegore, _Notekle, _Paketlistele } from '../components/Firebaseislemleri';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './yenidanisan.css';
import DatePicker from "react-datepicker";
import SettingsIcon from '@mui/icons-material/Settings';
import CircularProgress from '@mui/material/CircularProgress';

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import tr from 'date-fns/locale/tr';
registerLocale('tr', tr)


const Danisanguncelle=()=> {


    const navigate=useNavigate();
    const {state}=useLocation();

   // const[Danisanliste,setdanisanliste]=useState([]);

    const[Ad,setad]=useState(state.isim);
    const[Soyad,setsoyad]=useState(state.soyisim);
    const[Tckimlik,settckimlik]=useState(state.tckimlik);
    const[Cinsiyet,setcinsiyet]=useState(state.cinsiyet);
    const[Telefon,settelefon]=useState(state.telefon);
    const[Mail,setmail]=useState(state.mail);
    const[Meslek,setmeslek]=useState(state.meslek);
    const[Boy,setboy]=useState(state.boy);
    const[Kilo,setkilo]=useState(state.kilo);
    const[Sigarakullanimi,setsigarakullanimi]=useState(state.sigara);
    const[Alkolkullanimi,setalkolkullanimi]=useState(state.alkol);
    const[Kangrubu,setkangrubu]=useState(state.kangrubu);

    const [startDate, setStartDate] = useState(new Date());
    const[Dogumtarih,setdogumtarih]=useState({gun:"",ay:"",yil:""});
    const[Progress,setprogress]=useState(false)


    const Danisanguncelle=()=>{ 


      if(Ad=="" || Soyad=="" ||  Tckimlik=="" ||  Cinsiyet=="" ||  Telefon=="" ||  Mail=="" ||   Meslek=="" ||  Boy=="" ||   Kilo=="" ||  Sigarakullanimi==""
      ||  Alkolkullanimi=="" ||  Kangrubu=="" ||  Dogumtarih=={gun:"",ay:"",yil:""}){
    
      }
      else{
        _Danisanguncelle(Ad,Soyad,Tckimlik,Cinsiyet,Telefon,Mail,Meslek,Boy,Kilo,Sigarakullanimi,Alkolkullanimi,Kangrubu,Dogumtarih,navigate,state.dankey,state.danid,setprogress)
      }

    }


  return (
    <div className='yenidanisan'>
        <span style={{display:"flex",flexDirection:"column",width:"100%"}}>
      <Button onClick={()=>navigate("/Admin/Danisanlarim/"+state.danid)} style={{textTransform: 'none',width:130,fontSize:15,color:"#333333",backgroundColor:"#039BE5"}} color="success" variant="contained" startIcon={<ArrowBackIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Geri Dön</h4>
      </Button>
      <hr className='danisan-hr'></hr>
      </span>
      <div className='danisanforum'> 
      <span style={{flexDirection:"row",display:'flex',alignItems:"flex-start",width:"100%",backgroundColor:"#4CAF50",padding:10}}>
        <SettingsIcon style={{fontSize:20,marginRight:5,color:"#333333"}}/>
        <span style={{display:"flex",flexDirection:"row"}}>
        <h4 style={{fontSize:17,color:"#FF0000",marginRight:5}}>{state.isim+" "+state.soyisim}</h4>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Kayıtlı Danışanın Bilgilerini Güncelle</h4>
      </span>
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",backgroundColor:"#ECEFF1",padding:0}} >
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:0,marginTop:5}} >Uyarı : </h4>
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:0,marginTop:2}} >* Doğum tarihi otomatik olarak seçilmez.Manuel olarak seçmek zorunludur. </h4>
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:2,marginTop:2}} >* Doğum tarihini seçerken yılı artırıp azalmak için Home ve End tuşlarını kullanın.</h4>
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:2,marginTop:2}} >* Boy ve Kilo değerleri girerken sadece sayı değerlerini giriniz.</h4>
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:2,marginTop:2}} >* Doğum Tarihi dışında bütün alanların doldurulması zorunludur.</h4>

        </span>
      <hr className='danisan-hr-1'></hr>
      <div className='danisanforum-1'>
      <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Danışan Adı Girin </h4>
      <TextField
      value={Ad}
      onChange={(text)=>setad(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen Danışan adını giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:10}} >Danışan Soyadını Girin </h4>
      <TextField
      value={Soyad}
      onChange={(text)=>setsoyad(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen Danışan soyadını giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:10}} >Tc Kimlik No Girin </h4>
      <TextField
      value={Tckimlik}
      onChange={(text)=>settckimlik(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen Danışan Tc Kimlik No giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10}} >Cinsiyet  Girin </h4>
        <Select
         defaultValue={""}
        size='small'
        style={{width:150,marginTop:10,height:30,fontSize:15}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={Cinsiyet}
        onChange={(e)=>setcinsiyet(e.target.value)}
        >
        <MenuItem style={{fontSize:14}}  value={"Erkek"}>Erkek</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"Kadın"}>Kadın</MenuItem>
        </Select>
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#D13A00",marginBottom:0,marginTop:10}} >Kayıtlı Doğum Tarihi : {state.tarih}</h4>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:10}} > Doğum Tarihini Girin </h4>
        <DatePicker locale="tr"
 selected={startDate}  onSelect={(date)=>setdogumtarih({gun:date.getDate(),ay:date.getUTCMonth()+1,yil:date.getFullYear()})} onChange={(date) => setStartDate(date)} />

        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:10}} >Telefon Numarasını Girin </h4>
      <TextField
      value={Telefon}
      onChange={(text)=>settelefon(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen Danışan telefon no sunu giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:10}} >E-Mail Adresini Girin </h4>
      <TextField
      value={Mail}
      onChange={(text)=>setmail(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen Danışan mail adresini giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
     
        </div>
      <div className='danisanforum-2'>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"flex-start",flexWrap:"wrap"}} >
        {/* <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"50%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10}} >Kayıt Türü</h4>
        <Select
        size='small'
        style={{width:150,marginTop:10,height:30,fontSize:15}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={KayıtTuru}
        onChange={(e)=>setkayitturu(e.target.value)}
        >
        <MenuItem style={{fontSize:14}} value={"Yüzyüze"}>Yüzyüze</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"Online"}>Online</MenuItem>
        </Select>
        </span> */}
        {/* <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"50%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10}} >Paketler</h4>
        <Select
        size='small'
        style={{width:150,marginTop:10,height:30,fontSize:15}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={KayıtTuru}
        onChange={(e)=>setkayitturu(e.target.value)}
        >
        <MenuItem style={{fontSize:14}} value={"Yüzyüze"}>Yüzyüze</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"Online"}>Online</MenuItem>
        </Select>
        </span> */}
        </div>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:10}} >Mesleği Girin </h4>
      <TextField
      value={Meslek}
      onChange={(text)=>setmeslek(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen Danışan mesleğini giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:10}} >Boy</h4>
      <TextField
      value={Boy}
      onChange={(text)=>setboy(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen Danışan boyunu cm olarak  giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:10}} >Kilo</h4>
      <TextField
      value={Kilo}
      onChange={(text)=>setkilo(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen Danışan kilosunu giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between",flexWrap:"wrap"}}>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",justifyContent:"flex-start",width:"50%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10,textAlign:"start"}} >Sigara Kullanımı</h4>
        <Select
        defaultValue={""}
        size='small'
        style={{width:150,marginTop:10,height:30,fontSize:15}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={Sigarakullanimi}
        onChange={(e)=>setsigarakullanimi(e.target.value)}
        >
        <MenuItem style={{fontSize:14}} value={"Bilinmiyor"}>Bilinmiyor</MenuItem>
        <MenuItem style={{fontSize:14}} value={"Evet"}>Evet</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"Hayır"}>Hayır</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"Nadiren"}>Nadiren</MenuItem>
        </Select>
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",justifyContent:"flex-start",width:"50%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10,textAlign:"start"}} >Alkol Kullanımı</h4>
        <Select
         defaultValue={""}
        size='small'
        style={{width:150,marginTop:10,height:30,fontSize:15}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={Alkolkullanimi}
        onChange={(e)=>setalkolkullanimi(e.target.value)}
        >
        <MenuItem style={{fontSize:14}} value={"Bilinmiyor"}>Bilinmiyor</MenuItem>
        <MenuItem style={{fontSize:14}} value={"Evet"}>Evet</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"Hayır"}>Hayır</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"Nadiren"}>Nadiren</MenuItem>

        </Select>
        </span>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",justifyContent:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginTop:10,textAlign:"start"}} >Kan Grubu</h4>
        <Select
        defaultValue={""}
        size='small'
        style={{width:150,marginTop:10,height:30,fontSize:15}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={Kangrubu}
        onChange={(e)=>setkangrubu(e.target.value)}
        >
        <MenuItem style={{fontSize:14}} value={"Bilinmiyor"}>Bilinmiyor</MenuItem>
        <MenuItem style={{fontSize:14}} value={"0 Rh+"}>0 Rh+</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"0 Rh+"}>0 Rh-</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"A Rh+"}>A Rh+</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"A Rh-"}>A Rh-</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"B Rh+"}>B Rh+</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"B Rh-"}>B Rh-</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"AB Rh+"}>AB Rh+</MenuItem>
        <MenuItem style={{fontSize:14}}  value={"AB Rh-"}>AB Rh-</MenuItem>
        </Select>
        </span>
        </div>
        {/* <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%",marginTop:10}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5}} >Diyetisyen Görüşü</h4>
      <TextField
      value={Gorus}
      onChange={(text)=>setgorus(text.target.value)}
      style={{width:"100%"}}
        placeholder='Lütfen görüşünüzü giriniz.'
          id="outlined-size-small"
          size="small"
          color="primary"
          multiline
          minRows={4}
        />
        </span> */}
       <span style={{flexDirection:"row",display:'flex',alignItems:"center",justifyContent:"flex-end",width:"100%",marginTop:10}}>
        <Button onClick={()=>Danisanguncelle()} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#B0BEC5"}} color="success" variant="contained" startIcon={<SettingsIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Güncelle Ve Kaydet</h4>
      </Button>
      {Progress==true &&
        <CircularProgress style={{marginLeft:10}} size={30}/>
      }
        </span>
      </div>
      </div>
    </div>
  )
}

export default Danisanguncelle