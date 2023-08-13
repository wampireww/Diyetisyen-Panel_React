import React, { useEffect, useState } from 'react'
import './donem.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFetcher, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { _Danisanlisteleidyegore, _Donemlisteleidyegore, _Donemlisteleseciliyegore, _Donemnotguncelle, _Dosyalistele, _Gorusguncelle, _Notekle, _Seanslistele, _Seanssil, _Tahsilatlisteleseciliyegore } from '../components/Firebaseislemleri';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import FlatwareOutlinedIcon from '@mui/icons-material/FlatwareOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import CurrencyLiraOutlinedIcon from '@mui/icons-material/CurrencyLiraOutlined';
import ShortTextOutlinedIcon from '@mui/icons-material/ShortTextOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Msil from '../modal/Msil';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { PieChart } from 'react-minimal-pie-chart';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Mkilo from '../modal/Mkilo';


const Donem=()=> {

    const navigate=useNavigate();
    const {state}=useLocation();
    var { id } = useParams()
    var { donemid } = useParams()

    const [searchParams] = useSearchParams();

    const[Notdiyetisyen,setnotdiyetisyen]=useState("");
    const[Danisan,setdanisan]=useState({});
    const[durum,setdurum]=useState(false);
    const[Donemlistele,setdonemlistele]=useState([]);
    const[Donemkayit,setdonemkayit]=useState("");
    const[Donembitis,setdonembitis]=useState({gun:"",ay:"",yil:""});
    const[Seansliste,setseansliste]=useState([]);
    const[Seanstarihi,setseanstarihi]=useState({gun:"",ay:"",yil:""});
    const[Donemnotu,setdonemnotu]=useState("");
    const[Progressnot,setprogressnot]=useState(false)
    const[Progressseans,setprogressseans]=useState(false)
    const[Progressgenel,setgenelprogess]=useState(false);
    const[Progressdosya,setprogressdosya]=useState(false);
    const[Progresstahsilat,setprogresstahsilat]=useState(false);
    const[Lock,setlock]=useState(true);
    const[Paketisim,setpaketisim]=useState("");
    const[Paketfiyat,setpaketfiyat]=useState("");
    const[Tahsilatliste,settahsilatliste]=useState([]);
    const[Tahsilattoplami,settahsilattoplami]=useState();

    const[Yas,setyas]=useState("");
    const[Dosyalar,setdosyalar]=useState([]);

     useEffect(()=>{

      setdurum(true)
      if(durum==true){
          _Danisanlisteleidyegore(setdanisan,id,setnotdiyetisyen,setgenelprogess,setyas)
          _Donemlisteleseciliyegore(setdonemlistele,id,donemid,setdonemkayit,setdonembitis,setdonemnotu,setpaketisim,setpaketfiyat)
          _Seanslistele(setseansliste,id,donemid)
          _Dosyalistele(setdosyalar,id,donemid)
          _Tahsilatlisteleseciliyegore(settahsilatliste,id,donemid,settahsilattoplami)
      }
     },[durum])

     
     const Notguncelle=()=>{
      if(Lock==true){

      }
      else{
        if(Donemnotu==""){

        }
        else{
          _Donemnotguncelle(Danisan.key,id,donemid,Donemnotu,navigate,setprogressnot)
        }
       }
      }
    
     const Linkegit=(gelenarray)=>{
      gelenarray.forEach(item => {
        window.open(item,"_blank","noreferrer")
      });
     }

  return (
    <div className='danisanid'>
         {Progressgenel == true ?   <span style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <CircularProgress style={{marginRight:0,marginLeft:10}} size={30}/>

      </span> : 
        <><span style={{ display: 'flex', flexDirection: "row" }}>
          <Button onClick={() => navigate("/Admin/Danisanlarim/" + id)} style={{ textTransform: 'none', fontSize: 15, color: "#333333", backgroundColor: "#039BE5" }} color="success" variant="contained" startIcon={<ArrowBackIcon style={{ fontSize: 22 }} />}>
            <h4 style={{ fontWeight: "bold" }}>Geri Dön</h4>
          </Button>
          <Button onClick={() => navigate("/Admin/Danisanlarim/" + id + "/" + donemid + "/Donembilgiguncelle",
            {
              state: {
                dankey: Danisan.key, danid: Danisan.danisanid, isim: Danisan.isim, soyisim: Danisan.soyisim, donemisim: Donemlistele[0].isim,
                paketisim: Donemlistele[0].paketisim, fiyat: Donemlistele[0].paket, durum: Donemlistele[0].durum, kilo: Donemlistele[0].ilkkilo
              }
            })} style={{ textTransform: 'none', marginLeft: 10, fontSize: 15, color: "#333333", backgroundColor: "#4CAF50" }} color="success" variant="contained" startIcon={<SettingsIcon style={{ wfontSize: 22 }} />}>
            <h4 style={{ fontWeight: "bold" }}>Dönem Bilgileri Güncelle</h4>
          </Button>
          <IconButton onClick={() => navigate("/Admin/Danisanlarim/" + id + "/" + donemid)}
            aria-label="delete">
            <NotificationsOffOutlinedIcon style={{ color: "#FF0000", marginLeft: 5 }} />
          </IconButton>
        </span><hr className='notlarim-hr'></hr>
        <div className='danisanidforum'>
        {searchParams.get("tahsilatsil") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Tahsilatınız Başarıyla Silindi !</Alert>
              </span>}
        {searchParams.get("tahsilatsil") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Tahsilat Silme İşlemi Başarısız !</Alert>
              </span>}
        {searchParams.get("tahsilatekleme") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Tahsilat Ekleme İşlemi Başarısız !</Alert>
              </span>}
        {searchParams.get("tahsilatekleme") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Tahsilatınız Başarıyla Eklendi !</Alert>
              </span>}
        {searchParams.get("dosyasil") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Dosyanız Başarıyla Silindi !</Alert>
              </span>}
        {searchParams.get("dosyasil") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Dosya Silme İşlemi Başarısız !</Alert>
              </span>}
        {searchParams.get("dosyaekle") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Dosya Ekleme İşlemi Başarısız !</Alert>
              </span>}
        {searchParams.get("dosyaekle") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Dosyanız Başarıyla Eklendi !</Alert>
              </span>}
        {searchParams.get("seanssil") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Seans Başarıyla Silindi !</Alert>
              </span>}
        {searchParams.get("seanssil") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Seans Silme İşlemi Başarısız !</Alert>
              </span>}
            {searchParams.get("notguncelle") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Not Güncelleme İşlemi Başarısız !</Alert>
              </span>}
            {searchParams.get("notguncelle") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Notunuz Başarıyla Güncellendi !</Alert>
              </span>}
            {searchParams.get("seansguncelleme") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Seans Başarıyla Güncellendi !</Alert>
              </span>}
            {searchParams.get("seansguncelleme") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Seans Güncelleme İşlemi Başarısız !</Alert>
              </span>}
            {searchParams.get("guncelle") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Dönem Bilgileri Başarıyla Güncellendi !</Alert>
              </span>}
            {searchParams.get("guncelle") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Güncelleme İşlemi Başarısız !</Alert>
              </span>}
            {searchParams.get("seansekleme") == "basarili" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="info">Seans Başarıyla Eklendi !</Alert>
              </span>}
            {searchParams.get("seansekleme") == "basarisiz" &&
              <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "60%", backgroundColor: "#ECEFF1", padding: 5, justifyItems: "center" }}>
                <Alert variant="filled" style={{ width: "100%", borderRadius: 10, backgroundColor: "#039BE5" }} severity="error">Seans Ekleme İşlemi Başarısız !</Alert>
              </span>}
            <span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "99%", backgroundColor: "#ECEFF1", padding: 5, justifyContent: "space-between" }}>
              <span style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {Danisan.cinsiyet == "Kadın" ? <FemaleOutlinedIcon style={{ fontSize: 23, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 2, borderRadius: 10 }} />
                  : <MaleOutlinedIcon style={{ fontSize: 23, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 2, borderRadius: 10 }} />}
                <h4 style={{ fontSize: 17, color: "#333333", marginBottom: 0 }}>{Danisan.isim + " " + Danisan.soyisim} ({Yas.toString()}) / Dönem </h4>
                <h4 style={{ fontSize: 17, color: "#FF0000", marginLeft: 5 }}>{donemid}</h4>
              </span>
              <span style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              {Danisan.arsiv==true && 
              <span style={{ backgroundColor: "#B0BEC5",padding:5,borderRadius:10,marginRight:10}}>
                <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Bu Danışan Arşivdedir</h4>
                </span>
                }
                {Donembitis.gun != "" &&
                  <h4 style={{ fontSize: 15, color: "#333333", marginRight: 10, padding: 5, backgroundColor: "#FF8A65", borderRadius: 10 }}>Dönem Bitiş Tarihi : {Donembitis.gun + " / " + Donembitis.ay + " / " + Donembitis.yil}</h4>}
                <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0, backgroundColor: "#4CAF50", padding: 5, borderRadius: 10 }}>Dönem Kayıt Tarihi : {Donemkayit} </h4>

              </span>
            </span>

            <hr className='danisanid-hr'></hr>
            <div className='donem-1'>
              <div className='donem-2-1'>
                <span style={{ display: "flex", flexDirection: "row" }}>
                  <Button onClick={() => navigate("/Admin/Danisanlarim/" + id + "/" + donemid + "/Seansekle", {
                    state: {
                      key: Danisan.key, danid: Danisan.danisanid,
                      donemisim: Donemlistele[0].isim, kilo: Danisan.kilo
                    }
                  })} style={{
                    display: "flex", flexDirection: "row", alignItems: "center", color: "#333333", backgroundColor: "#4CAF50", textTransform: 'none',
                  }} color='warning' size='small' variant="contained"><AssessmentOutlinedIcon style={{ color: "#333333", fontSize: 24, marginRight: 5 }} />
                    <h4 style={{ fontSize: 15, color: "#333333", marginTop: 0 }}>Seans Ekle</h4>
                  </Button>
                  {Progressseans == true &&
                    <CircularProgress style={{ marginRight: 0, marginLeft: 10 }} size={30} />}
                </span>
                <hr className='danisan2-hr'></hr>
                <div className='tabloseans-div'>
                  <table className="tabloseans-ayar">
                    {Seansliste.length==0 ? <h4 style={{ fontWeight: "500",padding:5,color:"#FF0000" }}>Herhangi bir kayıtlı seans bulunamadı !</h4> : 
                    <tbody>
                      <tr>
                        <th>Sıra</th>
                        <th>Seans Adı</th>
                        <th>Seans Türü</th>
                        <th>Seans Tarihi</th>
                        <th>Seans Notu</th>
                        <th>Tartım Kilosu</th>
                        <th></th>
                      </tr>
                      {Seansliste.map((item, index) => <tr>
                        <td>{index + 1}</td>
                        <td>{item.seansadi}</td>
                        {item.seanstur == "Diger" ? <td style={{ backgroundColor: "#C5E1A5" }}>Diğer</td> : <td>{item.seanstur}</td>}

                        <td>{item.eklemetarihi.gun + " / " + item.eklemetarihi.ay + " / " + item.eklemetarihi.yil}</td>
                        <td style={{ textAlign: "left" }}>{item.seansnot.slice(0, 50) + '...'}</td>
                        <td style={{ color: "red",fontWeight:500 }}>{item.kilo} Kg</td>
                        <td style={{ display: "flex", flexDirection: "row" }}><IconButton onClick={() => navigate("/Admin/Danisanlarim/" + id + "/" + donemid + "/" + item.seansid,
                          {
                            state: {
                              danid: id, donemisim: donemid, kilo: item.kilo, tarih: item.eklemetarihi.gun + " / " + item.eklemetarihi.ay + " / " + item.eklemetarihi.yil,
                              seansadi: item.seansadi, seanstur: item.seanstur, seansnot: item.seansnot
                            }
                          })} aria-label="delete">
                          <SearchIcon style={{ color: "#4CAF50", fontSize: 22 }} />
                        </IconButton><IconButton onClick={() => navigate("/Admin/Danisanlarim/" + id + "/" + donemid + "/Seansguncelle",
                          {
                            state: {
                              key: Danisan.key, isim: Danisan.isim, soyisim: Danisan.soyisim, danid: id, donemisim: donemid, kilo: item.kilo, tarih: item.eklemetarihi.gun + " / " + item.eklemetarihi.ay + " / " + item.eklemetarihi.yil,
                              seansadi: item.seansadi, seanstur: item.seanstur, seansnot: item.seansnot, seanskey: item.seanskey
                            }
                          })} aria-label="delete">
                            <SettingsIcon style={{ color: "#FB8C00", fontSize: 22 }} />
                          </IconButton><Msil id={"seans"} progress={setprogressseans} danid={Danisan.danisanid} sdonemisim={donemid} seanskey={item.seanskey} baslik={item.eklemetarihi.gun + " / " + item.eklemetarihi.ay + " / " + item.eklemetarihi.yil} govde={"Tarihli seansı silmek istediğinizden emin misiniz ?"} dankey={Danisan.key} /></td>
                      </tr>
                      )}
                    </tbody>
                    }
                  </table>
                </div>
              </div>
              <div className='donem-2-2'>
                <div style={{
                  display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5, justifyContent: "space-between", width: "100%",
                  backgroundColor: "#90CAF9", padding: 4, borderRadius: 10
                }}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {Danisan.cinsiyet == "Erkek" ? <FitnessCenterOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 3, borderRadius: 10 }} />
                      : <FitnessCenterOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 3, borderRadius: 10 }} />}
                    <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Danışanın Kilosu :</h4>
                    <h4 style={{ fontSize: 15, color: "red", marginLeft: 10 }}>{Danisan.kilo} </h4>
                    <h4 style={{ fontSize: 15, color: "red", marginLeft: 5 }}>Kg</h4>
                    <Mkilo donem={donemid} konum={"danisandonem"} id={Danisan.danisanid} dankey={Danisan.key} />

                  </span>
                  {/* <span style={{display:"flex",alignItems:"center"}} >
    <h4 style={{fontSize:15,color:"#333333",marginBottom:0}} >İlk Tartım Kilosu : </h4>
    <h4 style={{fontSize:15,color:"#333333",marginLeft:5}} ></h4>
    </span> */}
                </div>
                <hr className='danisan1-hr'></hr>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5, justifyContent: "space-between", width: "100%" }}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {Danisan.cinsiyet == "Erkek" ? <ShortTextOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 3, borderRadius: 10 }} />
                      : <ShortTextOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 3, borderRadius: 10 }} />}
                    <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Dönem Notları</h4>
                    {Progressnot == true &&
                      <CircularProgress style={{ marginRight: 0, marginLeft: 10 }} size={30} />}
                    
                  </span>
                  <span style={{display:"flex",alignItems:"center"}}>
                    {Lock==false ? <LockOpenIcon className='lockicon' onClick={()=>setlock(!Lock)} style={{fontSize:25,color:"green"}}/>
                           :    
                        <LockIcon className='lockicon' onClick={()=>setlock(!Lock)} style={{fontSize:25,color:"green"}}/>}  
                  </span>
                  {/* <span style={{display:"flex",alignItems:"center"}} >
    <h4 style={{fontSize:15,color:"#333333",marginBottom:0}} >İlk Tartım Kilosu : </h4>
    <h4 style={{fontSize:15,color:"#333333",marginLeft:5}} ></h4>
    </span> */}
                </div>
                <span style={{ flexDirection: "column", display: 'flex', alignItems: "flex-start", width: "100%" }}>
                  <TextField
                    disabled={Lock}
                    value={Donemnotu}
                    onChange={(text) => setdonemnotu(text.target.value)}
                    style={{ width: "100%" }}
                    multiline
                    placeholder='Lütfen notunuzu giriniz.'
                    id="outlined-size-small"
                    size="small"
                    color="primary"
                    minRows={8} 
                    maxRows={15} />
                  <Button onClick={() => Notguncelle()} style={{ marginTop: 5, textTransform: 'none', fontSize: 15, width: "100%" }} size='small' variant="contained">Güncelle</Button>

                </span>

              </div>

            </div>
            <div className='donem-2'>
              <div className='donem-1-1'>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5, width: "100%", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {Danisan.cinsiyet == "Erkek" ? <FlatwareOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 3, borderRadius: 10 }} />
                      : <FlatwareOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 3, borderRadius: 10 }} />}
                    <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Diyet Listesi Ve Vücut Analizi</h4>
                    {Progressdosya == true &&
                      <CircularProgress style={{ marginRight: 0, marginLeft: 10 }} size={30} />}
                  </span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Button onClick={()=>navigate("/Admin/Danisanlarim/"+id+"/"+donemid+"/Dosyayukle",{state:{dankey:Donemlistele[0].key,danid:id,
                    donemisim:donemid}})} style={{
                      display: "flex", flexDirection: "row", alignItems: "center", color: "#333333", backgroundColor: "#4CAF50", textTransform: 'none',
                    }} color='warning' size='small' variant="contained"><DriveFolderUploadOutlinedIcon style={{ color: "#333333", fontSize: 23, marginRight: 5 }} />
                      <h4 style={{ fontSize: 14, color: "#333333", marginTop: 2 }}>Dosya Yükle</h4>
                    </Button>

                  </span>
                </div>
                <hr className='danisan1-hr'></hr>
                <div className='tablodiyetliste-div'>
                  <table className="tablodiyetliste-ayar">
                    {Dosyalar.length==0 ? <h4 style={{ fontWeight: "500",padding:5,color:"#FF0000" }}>Herhangi bir dosya bulunamadı !</h4> :
                    <tbody>
                      <tr>
                        <th>Sıra</th>
                        <th>Dosya Notu</th>
                        <th>Yükleme Tarihi</th>
                        <th>Diyet Listesi</th>
                        <th>Vücut Analizi</th>
                        <th></th>
                      </tr>
                      {Dosyalar.map((item,index) => <tr>
                        <td>{index+1}</td>
                        <td>{item.dosyabaslik}</td>
                        <td>{item.tarih}</td>
                        {item.diyetlistesi == undefined ? <td></td>
                        : <td><span style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}><DownloadForOfflineOutlinedIcon onClick={()=>Linkegit(item.diyetlistesi)} className='downloadicon' style={{fontSize:28,color:"#4CAF50",marginLeft:2}} />({item.diyetlistesi.length})</span></td>   
                      }
                       {item.vucutanalizi == undefined ? <td></td>
                        : <td><span style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}><DownloadForOfflineOutlinedIcon onClick={()=>Linkegit(item.vucutanalizi)} className='downloadicon' style={{fontSize:28,color:"#4CAF50",marginLeft:2}} />({item.vucutanalizi.length})</span></td>   
                      } 

                        <td><Msil progress={setprogressdosya} donemisim={donemid} dosyakey={item.dosyakey} dankey={Danisan.key} danid={id} dosyaid={item.dosyaid} id={"dosya"} baslik={item.tarih} govde={"Tarihli dosyalarınızı silmek istediğinizden emin misiniz ? "}/></td>
                      </tr>
                      )}
                    </tbody>
                     }
                  </table>
                </div>



              </div>
              <div className='donem-1-2'>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5, width: "100%", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                  {Danisan.cinsiyet == "Erkek" ? <CurrencyLiraOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#4CAF50", padding: 3, borderRadius: 10 }} />
                    : <CurrencyLiraOutlinedIcon style={{ fontSize: 21, marginRight: 5, color: "#333333", backgroundColor: "#BA68C8", padding: 3, borderRadius: 10 }} />}
                  <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0 }}>Dönem Mali Bilgileri</h4>
                </span>
                <span style={{ display: "flex", alignItems: "center" }}>
                <Button onClick={()=>navigate("/Admin/Danisanlarim/"+id+"/"+donemid+"/Tahsilatekle",{state:{dankey:Donemlistele[0].key,danid:id,
                    donemisim:donemid}})} style={{
                      display: "flex", flexDirection: "row", alignItems: "center", color: "#333333", backgroundColor: "#4CAF50", textTransform: 'none',
                    }} color='warning' size='small' variant="contained"><PaidOutlinedIcon style={{ color: "#333333", fontSize: 23, marginRight: 5 }} />
                      <h4 style={{ fontSize: 14, color: "#333333", marginTop: 2 }}>Tahsilat Ekle</h4>
                    </Button>
                    {Progresstahsilat == true &&
                    <CircularProgress style={{ marginRight: 0, marginLeft: 10 }} size={30} />}
                </span>
                </div>
                <hr className='danisan1-hr'></hr>
                  <div style={{display:"flex",flexDirection:"row",alignItems:"flex-start",width:"100%",height:"100%"}}>
                    <span style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start",width:"65%",height:"100%"}}>
                      <span style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                      <div className='tablotahsilat-div'>
                      <table className="tablotahsilat-ayar">
                    {Tahsilatliste.length==0 ? <h4 style={{ fontWeight: "500",padding:5,color:"#FF0000" }}>Herhangi bir tahsilat bilgisi bulunamadı !</h4> :
                    <tbody>
                      <tr>
                        <th>Sıra</th>
                        <th>Tahsilat Tarihi</th>
                        <th>Miktar</th>
                        <th></th>
                      </tr>
                      {Tahsilatliste.map((item,index) => <tr>
                        <td>{index +1}</td>
                        <td>{item.tarih}</td>
                        <td>{item.miktar} TL</td>
                        <td><Msil progress={setprogresstahsilat} donemisim={donemid} tahsilatkey={item.key} dankey={Danisan.key} danid={id}  id={"tahsilat"} baslik={item.tarih} govde={"Tarihli tahsilatınızı silmek istediğinizden emin misiniz ? "}/></td>
                      </tr>
                      )}
                    </tbody>
                     }
                  </table>
                  </div>
                    </span>
                    </span>
                    <span style={{display:"flex",flexDirection:"column",alignItems:"center",width:"35%",height:"100%",justifyContent:"center",marginTop:-5}}>
                    <p style={{ fontSize: 15, color: "#333333", marginTop: 0,marginRight:0,marginLeft:0,marginBottom:10}} >Paket İsmi : {Paketisim}</p>
                      <span style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginBottom:10}}>
                        <span style={{width:20,height:20,backgroundColor:"#4CAF50",borderRadius:5}}></span>
                        <span style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        <p style={{ fontSize: 13, color: "#333333", marginTop: 2,marginRight:10,marginLeft:2}} >Paket Fiyatı</p>
                        <p style={{ fontSize: 13, color: "#333333", marginTop: 0,marginRight:10,marginLeft:2}} >{Paketfiyat} TL</p>
                        </span>
                      <span style={{width:20,height:20,backgroundColor:"#1976D2",borderRadius:5}}></span>
                      <span style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                      <p style={{ fontSize: 13, color: "#333333", marginTop: 2 ,marginLeft:2}} >Tahsilat</p> 
                      <p style={{ fontSize: 13, color: "#333333", marginTop: 0 ,marginLeft:2}} >{Tahsilattoplami} TL</p> 

                      </span>
                      </span>
                    <PieChart style={{width:"auto",height:"150"}}
                data={[
                    { title: 'Paket', value: Paketfiyat-Tahsilattoplami, color: '#4CAF50' },
                    { title: 'Tahsilat', value: Tahsilattoplami, color: '#1976D2' },
                    ]}
                    />  
                    
                    </span>
                    </div>  
              </div>
            </div>

          </div></>
       }
    </div>
  )
}

export default Donem