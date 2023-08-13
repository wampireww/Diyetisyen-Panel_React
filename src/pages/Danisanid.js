import React, { useEffect, useState } from 'react'
import './danisanid.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Route, useFetcher, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { _Danisanlisteleidyegore, _Donemlisteleidyegore, _Gorusguncelle, _Notekle } from '../components/Firebaseislemleri';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import ShortTextOutlinedIcon from '@mui/icons-material/ShortTextOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Msil from '../modal/Msil';
import Mkilo from '../modal/Mkilo';


const Danisanid=()=> {

    const navigate=useNavigate();
    const {state}=useLocation();
    var { id } = useParams()
    const [searchParams] = useSearchParams();



    const[Notdiyetisyen,setnotdiyetisyen]=useState("");
    const[Danisan,setdanisan]=useState({});
    const[durum,setdurum]=useState(false);
    const[Donemlistele,setdonemlistele]=useState([]);
    const[Progressgenel,setgenelprogess]=useState(false);
    const[Progressdonemsil,setprogressdonemsil]=useState(false);
    const[Yas,setyas]=useState("");
    const[Progressnot,setprogressnot]=useState(false);
    const[Lock,setlock]=useState(true);
    
    const Notguncelle=()=>{
      if(Lock==true){

      }
      else{
        if(Notdiyetisyen==""){

        }
        else{
          _Gorusguncelle(Danisan.danisanid,Danisan.key,Notdiyetisyen,navigate,setprogressnot)
  
        }
      }
      }
     

     useEffect(()=>{
      setdurum(true)

      if(durum==true){
          _Danisanlisteleidyegore(setdanisan,id,setnotdiyetisyen,setgenelprogess,setyas)
          _Donemlisteleidyegore(setdonemlistele,id)
             
      }
     },[durum])


  return (
    <div className='danisanid'>
        {Progressgenel == true ?   <span style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <CircularProgress style={{marginRight:0,marginLeft:10}} size={30}/>

      </span> : 
        <><span style={{ display: 'flex', flexDirection: "row" }}>
          {/* <Button onClick={() => navigate("/Admin/Danisanlarim")} style={{ textTransform: 'none', fontSize: 15, color: "#333333", backgroundColor: "#039BE5" }} color="success" variant="contained" startIcon={<ArrowBackIcon style={{ fontSize: 22 }} />}>
            <h4 style={{ fontWeight: "bold" }}>Geri Dön</h4>
          </Button> */}
          <Button onClick={() => navigate("/Admin/Danisanlarim/" + id + "/Bilgiguncelle",
            {
              state: {
                dankey: Danisan.key, danid: Danisan.danisanid, isim: Danisan.isim, soyisim: Danisan.soyisim, tckimlik: Danisan.tckimlik, cinsiyet: Danisan.cinsiyet,
                telefon: Danisan.telefon, mail: Danisan.mail, meslek: Danisan.meslek, boy: Danisan.boy, kilo: Danisan.kilo,
                sigara: Danisan.sigara, alkol: Danisan.alkol, kangrubu: Danisan.kangrubu, tarih: Danisan.dogumtarih
              }
            })} style={{ textTransform: 'none', marginLeft: 0, fontSize: 15, color: "#333333", backgroundColor: "#4CAF50" }} color="success" variant="contained" startIcon={<ManageAccountsOutlinedIcon style={{ wfontSize: 28 }} />}>
            <h4 style={{ fontWeight: "bold" }}>Danışan Bilgilerini Güncelle</h4>
          </Button>
          <IconButton onClick={() => navigate("/Admin/Danisanlarim/" + id)}
            aria-label="delete">
            <NotificationsOffOutlinedIcon style={{ color: "#FF0000", marginLeft: 5 }} />
          </IconButton>
        </span><hr className='notlarim-hr'></hr><div className='danisanidforum'>
        {searchParams.get("kilodegis") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Danışan Kilosu Başarıyla Değiştirildi  !</Alert>
              </span>}
            {searchParams.get("notguncelle") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Notunuz Güncelleme İşlemi Başarısız !</Alert>
              </span>}
            {searchParams.get("notguncelle") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Notunuz Başarıyla Güncellendi !</Alert>
              </span>}
            {searchParams.get("guncelle") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Bilgiler Başarıyla Güncellendi !</Alert>
              </span>}
            {searchParams.get("guncelle") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Güncelleme İşlemi Başarısız !</Alert>
              </span>}
            {searchParams.get("ekleme") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Dönem Başarıyla Eklendi !</Alert>
              </span>}
            {searchParams.get("ekleme") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Dönem Ekleme İşlemi Başarısız !</Alert>
              </span>}
            <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "99%", backgroundColor: "#ECEFF1", padding: 5, justifyContent: "space-between" }}>
              
              <span style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {Danisan.cinsiyet == "Kadın" ? <FemaleOutlinedIcon style={{ fontSize: 23, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 2, borderRadius: 10 }} />
                  : <MaleOutlinedIcon style={{ fontSize: 23, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 2, borderRadius: 10 }} />}
                <h4 style={{ fontSize: 17, color: "#333333", marginBottom: 0 }}>{Danisan.isim + " " + Danisan.soyisim} ({Yas.toString()})</h4>
              </span>
              <span style={{ display: "flex", flexDirection: "row", padding: 0, borderRadius: 10 }}>
                {Danisan.arsiv==true && 
              <span style={{ backgroundColor: "#B0BEC5",padding:5,borderRadius:10,marginRight:10}}>
                <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Bu Danışan Arşivdedir</h4>
                </span>
                }
                <span style={{ backgroundColor: "#4CAF50",padding:5,borderRadius:10}}>
                <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Danışan Kayıt Tarihi :  {Danisan.kayittarihi}</h4>
                </span>  
              </span>
            </span>

            <hr className='danisanid-hr'></hr>
            <div className='danisan-1'>
              <div className='danisan-1-1'>
                <span style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                  {Danisan.cinsiyet == "Erkek" ? <AssignmentIndOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 3, borderRadius: 10 }} />
                    : <AssignmentIndOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 3, borderRadius: 10 }} />}
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Kişisel Bilgiler Ve İletişim</h4>
                </span>
                <hr className='danisan1-hr'></hr>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Ad Soyad : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.isim} {Danisan.soyisim} </h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Doğum Tarihi : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.dogumtarih}</h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Cinsiyet : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.cinsiyet}</h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Tc Kimlik No : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.tckimlik}</h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Meslek : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.meslek}</h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Telefon : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.telefon}</h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>E-Mail : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.mail}</h4>
                </span>

              </div>
              <div className='danisan-1-2'>
                <span style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                  {Danisan.cinsiyet == "Erkek" ? <AccessibilityNewOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 3, borderRadius: 10 }} />
                    : <AccessibilityNewOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 3, borderRadius: 10 }} />}
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Vücut Bilgileri</h4>
                </span>
                <hr className='danisan1-hr'></hr>
                <span style={{ display: 'flex', flexDirection: "row",alignItems:"center",marginTop:0}}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Boy : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0, marginLeft: 5 }}>{Danisan.boy} cm</h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row",alignItems:"center",marginTop:-5 }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Kilo : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0, marginLeft: 5 }}>{Danisan.kilo} kg</h4>
                  <Mkilo konum={"danisanana"} id={Danisan.danisanid} dankey={Danisan.key} />
                </span>
              </div>
              <div className='danisan-1-3'>
                <span style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                  {Danisan.cinsiyet == "Erkek" ? <MoreHorizIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 3, borderRadius: 10 }} />
                    : <MoreHorizIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 3, borderRadius: 10 }} />}
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Diğer Bilgiler</h4>
                </span>
                <hr className='danisan1-hr'></hr>  
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Kan Grubu : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.kangrubu}</h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Sigara : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.sigara}</h4>
                </span>
                <span style={{ display: 'flex', flexDirection: "row" }}>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Alkol : </h4>
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5, marginLeft: 5 }}>{Danisan.alkol}</h4>
                </span>
              </div>
            </div>
            <div className='danisan-2'>
              <div className='danisan-2-1'>
                <span style={{ display: "flex", flexDirection: "row" }}>
                  <Button onClick={() => navigate("/Admin/Danisanlarim/" + id + "/Donemekle", { state: { key: Danisan.key, id: Danisan.danisanid } })} style={{
                    display: "flex", flexDirection: "row", alignItems: "center", color: "#333333", backgroundColor: "#4CAF50", textTransform: 'none',
                  }} color='warning' size='small' variant="contained"><AddCircleOutlineOutlinedIcon style={{ color: "#333333", fontSize: 24, marginRight: 5 }} />
                    <h4 style={{ fontSize: 15, color: "#333333", marginTop: 0 }}>Dönem Ekle</h4>
                  </Button>
                  {Progressdonemsil == true && 
      <CircularProgress style={{marginRight:0,marginLeft:10}} size={30}/>}
                </span>
                <hr className='danisan2-hr'></hr>
                <div className='tablodanisanid-div'>
                  <table className="tablodanisanid-ayar">
                    {Donemlistele.length==0 ?  <h4 style={{ fontWeight: "500",padding:5,color:"#FF0000" }}>Herhangi bir dönem kaydı bulunamadı !</h4> : 
                    <tbody>
                      <tr>
                        <th>Dönem</th>
                        <th>Diyet Paketi</th>
                        <th>Kayıt Tarihi</th>
                        <th>Dosya</th>
                        <th>Durum</th>
                        <th>Son İşlem Tarihi</th>
                        <th></th>
                      </tr>
                      {Donemlistele.map((item) => <tr>
                        <td>{item.isim}</td>
                        <td>{item.paketisim + " - " + item.paket} TL</td>
                        <td>{item.kayittarihi}</td>
                        <td>{item.dosyasayisi}</td>
                        {item.durum == "Devametmedi" && <td style={{ backgroundColor: "#FF9800" }}>Devam Etmedi</td>}
                        {item.durum == "Devam ediyor" && <td style={{ backgroundColor: "#90CAF9" }}>Devam Ediyor</td>}
                        {item.durum == "Tamamlandi" && <td style={{ backgroundColor: "#FF8A65" }}>Tamamlandı</td>}
                        {item.sonislemtarihi == " /  / " ? <td></td> : <td>{item.sonislemtarihi}</td>}

                        <td style={{display:"flex",flexDirection:"row"}}><IconButton onClick={() => navigate("/Admin/Danisanlarim/" + id + "/" + item.isim)} aria-label="delete">
                          <SearchIcon style={{ color: "#4CAF50" }} />
                        </IconButton><Msil progress={setprogressdonemsil} baslik={item.isim}
                         govde={"Adlı dönemi silmek istediğinizden emin misiniz ? evet derseniz döneme ait bütün bilgiler kalıcı olarak silinecektir."} 
                         danid={id} donemisim={item.isim} dankey={item.key} id={"donem"}/></td>
                      </tr>
                      )}
                    </tbody>
                    }
                  </table>
                </div>
              </div>
              <div className='danisan-2-2'>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between",marginBottom:5}}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  {Danisan.cinsiyet == "Erkek" ? <ShortTextOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 3, borderRadius: 10 }} />
                    : <ShortTextOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 3, borderRadius: 10 }} />}
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Diyetisyen Notları </h4>
                  {Progressnot == true &&  <span style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <CircularProgress style={{marginRight:0,marginLeft:10}} size={30}/>
                    
      </span> }
                </span>
                <span style={{display:"flex",alignItems:"center"}}>
                    {Lock==false ? <LockOpenIcon className='lockicon' onClick={()=>setlock(!Lock)} style={{fontSize:25,color:"green"}}/>
                           :    
                        <LockIcon className='lockicon' onClick={()=>setlock(!Lock)} style={{fontSize:25,color:"green"}}/>}  
                  </span>
                  </div>
                <hr className='danisan1-hr'></hr>
                <span style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
                  <TextField
                    disabled={Lock}
                    value={Notdiyetisyen}
                    onChange={(text) => setnotdiyetisyen(text.target.value)}
                    style={{ width: "100%" }}
                    placeholder='Lütfen notunuzu giriniz.'
                    id="outlined-size-small"
                    size="small"
                    color="primary"
                    multiline
                    minRows={10} />
                  <Button onClick={() => Notguncelle()} style={{ marginTop: 5, textTransform: 'none', fontSize: 15 }} size='small' variant="contained">Güncelle</Button>

                </span>
              </div>
            </div>
          </div></>
}
    </div>
  )
}

export default Danisanid