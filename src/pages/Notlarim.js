import React, { useDebugValue, useEffect, useState } from 'react'
import './notlarim.css';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { _Notlistele, _Notsil } from '../components/Firebaseislemleri';
import Alert from '@mui/material/Alert';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import Msil from '../modal/Msil';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import CircularProgress from '@mui/material/CircularProgress';


const Notlarim=()=>{

  const [searchParams] = useSearchParams();

  const navigate=useNavigate();
  const[Notliste,setnotliste]=useState([])
  const[Progressgenel,setgenelprogess]=useState(false);

  useEffect(()=>{

    _Notlistele(setnotliste,setgenelprogess)

  },[])

  return (
    <div className='notlarim'>
        <div className='notlarim-1'>
           <Button onClick={()=>navigate("/Admin/Notlarim/Yeninot")} style={{textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#4CAF50"}} color="success" variant="contained" startIcon={<AddCircleOutlineIcon style={{fontSize:22}} />}>
       <h4 style={{fontWeight:"bold"}}>Yeni Not Ekle</h4>
      </Button>
      <span style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",backgroundColor:"#CFD8DC",padding:6,borderRadius:10,marginLeft:20}}>
        <EventNoteOutlinedIcon style={{fontSize:22,color:"#4CAF50",marginRight:5}} />
      {Notliste.length==undefined  ? <h4 style={{fontWeight:"bold",color:"#333333"}}>Toplam Not Sayısı : 0</h4> : 
       <h4 style={{fontWeight:"bold",color:"#333333"}}>Toplam Not Sayısı : {Notliste.length}</h4>  }
</span>
<IconButton onClick={()=>navigate("/Admin/Notlarim")}
     aria-label="delete">
        <NotificationsOffOutlinedIcon style={{color:"#FF0000",marginLeft:5}} />
      </IconButton>
           </div>
           <hr className='notlarim-hr'></hr>
           {searchParams.get("ekle")=="basarili" &&  <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="info">
        Notunuz başarıyla Eklendi !
      </Alert> }
      {searchParams.get("ekle")=="basarisiz" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="warning">
        Not Ekleme İşlemi Başarısız !
      </Alert> }
      {searchParams.get("sil")=="basarili" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="info">
        Notunuz başarıyla Silindi !
      </Alert> }
      {searchParams.get("sil")=="basarisiz" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="warning">
        Not Silme İşlemi Başarısız !
      </Alert> }
      {searchParams.get("guncelle")=="basarisiz" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="warning">
        Not Güncelleme İşlemi Başarısız !
      </Alert> }
      {searchParams.get("guncelle")=="basarili" && <Alert style={{width:500,marginBottom:10,fontSize:15,color:"#E8F5E9"}} variant="filled" severity="info">
        Notunuz başarıyla Güncellendi
      </Alert> }


            <span style={{paddingRight:5,paddingLeft:5,padding:5,backgroundColor:"#CFD8DC",borderRadius:10,marginBottom:5}}>
           <h4 style={{fontSize:16,color:"#333333",textAlign:"center",marginBottom:0}}>Notlarım Listesi</h4>
           </span>
           {Progressgenel == true ?   <span style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <CircularProgress style={{marginRight:0,marginLeft:10}} size={30}/>

      </span> : 
           <div className='tablonot-div'>
            <table className="tablo-not">
              {Notliste.length==0 ? <h4 style={{ fontWeight: "500",padding:5,color:"#FF0000" }}>Herhangi bir Not bulunamadı !</h4> :
            <tbody>
  <tr>
    <th>Başlık</th>
    <th>Oluşturma Tarihi</th>
    <th>Güncelleme Tarihi</th>
    <th>Dosya</th>
    <th></th>
  </tr>
  {Notliste.map(item=>
  <tr>
    <td>{item.baslik}</td>
    <td>{item.tarih}</td>
    <td>{item.guncelleme}</td>
    <td> {item.dosyalar!==undefined ? item.dosyalar.length : 0 } </td>
    <td style={{width:150,display:"flex",flexDirection:"row"}} ><IconButton onClick={()=>navigate("/Admin/Notlarim/"+item.notid, { state: {notid:item.notid,tarih:item.tarih,baslik:item.baslik,govde:item.govde,dosyalar:item.dosyalar,key:item.key,guncelleme:item.guncelleme}})}  aria-label="delete">
        <SearchIcon style={{color:"#4CAF50"}} />
      </IconButton><Msil id={"notlarim"} notid={item.notid} baslik={item.baslik} govde={"başlıklı notunuzu silmek istediğinizden emin misiniz ?"} dankey={item.key}/></td> 
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

export default Notlarim