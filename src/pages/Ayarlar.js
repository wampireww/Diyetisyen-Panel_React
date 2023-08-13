import React, { useEffect, useState } from 'react'
import './ayarlar.css';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { _Notekle, _Paketlistele, _Paketsil, _YenipaketEkle } from '../components/Firebaseislemleri';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';

const Ayarlar=()=> {

    const navigate=useNavigate();

    const[Paketismi,setpaketismi]=useState();
    const[Paketfiyat,setpaketfiyat]=useState();
    const[Paketgismi,setpaketgismi]=useState();
    const[Paketgfiyat,setpaketgfiyat]=useState();

    const[Paketliste,setpaketliste]=useState([]);
    const{Guncelle,setguncelle}=useState(false);
    const[Kontrol,setkontrol]=useState(false);

    useEffect(()=>{

      _Paketlistele(setpaketliste)

    },[])


    const Paketekle=()=>{
      
      if(Paketismi=="" || Paketfiyat==""){
        
      }
      else{
            _YenipaketEkle(Paketismi,Paketfiyat,navigate).then(
              setpaketismi(""),setpaketfiyat("")
            )
      }

    }

    const Paketsil=(paketkey)=>{
      
      _Paketsil(paketkey,navigate);

    }



  return (
    <div className='yeninot'>
     
      <div className='notforum'>
      <span style={{flexDirection:"row",display:'flex',alignItems:"center",width:"99%",backgroundColor:"#FF8F00",padding:5,justifyItems:"center"}}>
        <SettingsIcon style={{fontSize:20,marginRight:5,color:"#333333"}}/>
      <h4 style={{fontSize:17,color:"#333333",marginBottom:0}}>Paket Ayarları</h4>
        </span>
      <hr className='yeninot-hr'></hr>
      {Kontrol==true ? <CircularProgress style={{marginRight:0,marginLeft:0,marginBottom:10}} size={30}/> :
      
      <><span style={{ flexDirection: "column", display: 'flex', alignItems: "flex-start", width: "50%" }}>
            <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Diyet Paketi Ekle</h4>
            <TextField
              value={Paketismi}
              onChange={(text) => setpaketismi(text.target.value)}
              style={{ width: "100%" }}
              placeholder='Diyet paketinin ismini giriniz'
              id="outlined-size-small"
              size="small"
              color="warning" />
            <TextField
              value={Paketfiyat}
              onChange={(text) => setpaketfiyat(text.target.value)}
              style={{ width: "100%", marginTop: 10 }}
              placeholder='Diyet paketinin fiyatını giriniz'
              id="outlined-size-small"
              size="small"
              color="warning" />
          </span><span style={{ flexDirection: "column", display: 'flex', alignItems: "flex-start", width: "100%", marginTop: 10 }}>
              <Button onClick={() => Paketekle()} style={{ textTransform: 'none', fontSize: 15, color: "#333333", backgroundColor: "#B0BEC5" }} color="success" variant="contained" startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 22 }} />}>
                <h4 style={{ fontWeight: "bold", marginLeft: -5 }}>Ekle</h4>
              </Button>
            </span><div className='tabloayar-div'>
              <table className="tablo-ayar">
                {Paketliste.length == 0 ? <h4 style={{ fontWeight: "500", padding: 5, color: "#FF0000" }}>Herhangi Paket Listesi bulunamadı !</h4> :
                  <tbody>
                    <tr>
                      <th>Paket İsmi</th>
                      <th>Fiyatı</th>
                      <th></th>
                    </tr>
                    {Paketliste.map(item => <tr>
                      <td>{item.isim}</td>
                      <td>{item.fiyat} TL</td>
                      <td><IconButton onClick={() => Paketsil(item.key)} aria-label="delete">
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton></td>
                    </tr>
                    )}
                  </tbody>}
              </table>
            </div></>
      
}
      </div>
    </div>
  )
}

export default Ayarlar