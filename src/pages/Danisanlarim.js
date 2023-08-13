import React, { useDebugValue, useEffect, useState } from 'react'
import './notlarim.css';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { _Danisanlistele, _Notlistele, _Notsil } from '../components/Firebaseislemleri';
import Alert from '@mui/material/Alert';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ForwardIcon from '@mui/icons-material/Forward';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import TextField from '@mui/material/TextField';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import Msil from '../modal/Msil';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Marsiv from '../modal/Marsiv';


const Danisanlarim=()=>{

  const [searchParams] = useSearchParams();

  const navigate=useNavigate();
  const[Danisanliste,setdanisanliste]=useState([])
  const[Arama,setarama]=useState("");
  const[Dogum,setdogum]=useState({gun:"",ay:"",yil:""});
  const[Kayit,setkayit]=useState({gun:"",ay:"",yil:""});
  const[Progressgenel,setgenelprogess]=useState(false);

  useEffect(()=>{
      console.log(Danisanliste)
    _Danisanlistele(setdanisanliste,Arama,setdogum,setkayit,setgenelprogess);
  },[Arama])

  return (
    <div className='notlarim'>
        <div className='notlarim-1'>
           <Button onClick={()=>navigate("/Admin/Danisanlarim/Yenidanisan")} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#039BE5"}} color="primary" variant="contained" startIcon={<PersonAddAlt1Icon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Yeni Danışan Ekle</h4>
      </Button>
      <span style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",backgroundColor:"#CFD8DC",padding:6,borderRadius:10,marginLeft:20}}>
        <AdjustOutlinedIcon style={{fontSize:22,color:"#4CAF50",marginRight:5}} />
      {Danisanliste.length==undefined  ? <h4 style={{fontWeight:"bold",color:"#333333"}}>Aktif Danışan Sayısı : 0</h4> : 
       <h4 style={{fontWeight:"bold",color:"#333333"}}>Aktif Danışan Sayısı : {Danisanliste.length}</h4>  }
</span>
<IconButton onClick={()=>navigate("/Admin/Danisanlarim")}
     aria-label="delete">
        <NotificationsOffOutlinedIcon style={{color:"#FF0000",marginLeft:5}} />
      </IconButton>

           </div>
           <hr className='notlarim-hr'></hr>
           {searchParams.get("ekle")=="basarili" &&  <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="info">
        Danışan başarıyla Eklendi !
      </Alert> }
      {searchParams.get("arsivegonder")=="basarili" &&  <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="info">
        Danışan Arşive Gönderildi !
      </Alert> }
      {searchParams.get("ekle")=="basarisiz" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="warning">
        Danışan Ekleme İşlemi Başarısız !
      </Alert> }
      {searchParams.get("sil")=="basarili" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="info">
        Danışan başarıyla Silindi !
      </Alert> }
      {searchParams.get("sil")=="basarisiz" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="warning">
        Danışan Silme İşlemi Başarısız !
      </Alert> }
      {/* {searchParams.get("guncelle")=="basarisiz" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="warning">
        Not Güncelleme İşlemi Başarısız !
      </Alert> }
      {searchParams.get("guncelle")=="basarili" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="info">
        Notunuz başarıyla Güncellendi
      </Alert> } */}
             <span className='arama-span' style={{flexDirection:"row",display:'flex',alignItems:"center",width:"30%",backgroundColor:"#ECEFF1",padding:5,borderRadius:10}}>
      <TextField

      value={Arama}
      onChange={(text)=>setarama(text.target.value)}
      style={{width:"100%",borderRadius:20}}
      inputProps={{ style: {fontSize:15,color: '#333333',height:15,borderRadius:20 } }}
        placeholder='Danışanın adını giriniz.'
          id="outlined-size-small"
          size="small"  
          color="primary"
        />
                <PersonSearchOutlinedIcon style={{fontSize:25,color:"#4CAF50",marginLeft:-35}} />

        </span>

     
        <span style={{paddingRight:5,paddingLeft:5,padding:5,backgroundColor:"#CFD8DC",borderRadius:10,marginBottom:5,marginTop:10}}>
           <h4 style={{fontSize:16,color:"#333333",textAlign:"center",marginBottom:0}}>Danışanlar Listesi</h4>
           </span>
           {Progressgenel == true ?   <span style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <CircularProgress style={{marginRight:0,marginLeft:10}} size={30}/>

      </span> : 
      
           <div className='tablo-div'>
            <table className="tablo">
            {Danisanliste.length==0 ? <h4 style={{ fontWeight: "500",padding:5,color:"#FF0000" }}>Herhangi bir Danışan bulunamadı !</h4>:
            <tbody>
  <tr className='tr'>
    <th>Ad</th>
    <th>Soyad</th>
    <th>Cinsiyet</th>
    <th>Doğum Tarihi</th>
    <th>Telefon</th>
    <th>Meslek</th>
    <th>Oluşturma Tarihi</th>
    <th></th>
  </tr>
  {Danisanliste.map((item)=>
  <tr>
    <td>{item.isim}</td>
    <td>{item.soyisim}</td>
    {item.cinsiyet=="Kadın" ? <td style={{backgroundColor:"#B39DDB"}}>{item.cinsiyet}</td>
: <td>{item.cinsiyet}</td>}
    {item.dogumtarih== " /  / "? <td></td> : 
    <td>{item.dogumtarih}</td>
  }
    <td>{item.telefon}</td>
  <td>{item.meslek}</td>
    <td>{item.kayittarihi}</td>
    <td style={{width:150,display:"flex",flexDirection:"row"}}><IconButton onClick={()=>navigate("/Admin/Danisanlarim/"+item.danisanid,{state:{gorus:item.gorus}})}
     aria-label="delete">
        <SearchIcon style={{color:"#4CAF50"}} />
      </IconButton><Msil danid={item.danisanid} id={"danisan"} baslik={item.isim+" "+item.soyisim} govde={"isimli danışanınızı silmek istediğinizden emin misiniz ?"} dankey={item.key}/>
     <Marsiv dankey={item.key} baslik={item.isim+" "+item.soyisim} govde={"isimli danışanınızı arşive göndermek istediğinizden emin misiniz ?"} /></td> 
  </tr>
  )}
  </tbody>
  }

</table>
           </div>
}
    </div>
  )
}

export default Danisanlarim