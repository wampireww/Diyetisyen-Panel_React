import React, { useEffect, useState } from 'react'
import './ayarlar.css';
import './randevu.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { _Danisanlistelerandevu, _Notekle, _Paketlistele, _Paketsil, _Randevuekle, _Randevulistele, _YenipaketEkle } from '../components/Firebaseislemleri';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import tr from 'date-fns/locale/tr';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Checkbox from '@mui/material/Checkbox';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import Msil from '../modal/Msil';
import Msilrandevu from '../modal/Msilrandevu';

const Randevu=()=> {

    const navigate=useNavigate();
    const zaman=new Date();
    const[Kontrol,setkontrol]=useState(false);
    const[Kontrol2,setkontrol2]=useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const[Randevutarih,setrandevutarih]=useState({gun:"",ay:"",yil:""});
    const[Baslangicsaati,setbaslangicsaati]=useState();
    const[Bitissaati,setbitissaati]=useState();
    const[İsim,setisim]=useState("");
    const[Selectisim,setselectisim]=useState("");

    const[Randevuliste,setrandevuliste]=useState([]);
    const[Danisanisimliste,setdanisanisimliste]=useState([]);
    const[Genelprogress,setgenelprogess]=useState(false);

    useEffect(()=>{

      _Randevulistele(setrandevuliste);
      _Danisanlistelerandevu(setdanisanisimliste,setgenelprogess);

    },[])

    const onChange=(checked)=>{
      setkontrol(checked);
    }

    const Randevuolustur=()=>{

      if(Kontrol==true){
        if(İsim!="" && Baslangicsaati!=null && Bitissaati!=null){
        _Randevuekle(Randevutarih,İsim,Baslangicsaati,Bitissaati,setkontrol2)
        }
        
      }
      else{
        if(Selectisim!="" && Baslangicsaati!=null && Bitissaati!=null){
          _Randevuekle(Randevutarih,Selectisim,Baslangicsaati,Bitissaati,setkontrol2)

        }

      }


    }
    


  return (
    <div className='yeninot'>

        <span style={{ display: 'flex', flexDirection: "row" }}>
          <Button onClick={() => navigate("/Admin/Ajanda")} style={{ textTransform: 'none', fontSize: 15, color: "#333333", backgroundColor: "#039BE5" }} color="success" variant="contained" startIcon={<ArrowBackIcon style={{ fontSize: 22 }} />}>
            <h4 style={{ fontWeight: "bold" }}>Geri Dön</h4>
          </Button>
        
        </span><hr className='notlarim-hr'></hr>
      <div className='notforum'>
        {Genelprogress==true ? <CircularProgress style={{marginRight:0,marginLeft:0,marginBottom:10}} size={30}/> :
      

      <><span style={{ flexDirection: "row", display: 'flex', alignItems: "center", width: "99%", backgroundColor: "#0097A7", padding: 5, justifyItems: "center" }}>
            <AddToPhotosIcon style={{ fontSize: 20, marginRight: 5, color: "#F1F8E9" }} />
            <h4 style={{ fontSize: 17, color: "#333333", marginBottom: 0 }}>Randevu Ekle</h4>
          </span><hr className='yeninot-hr'></hr><span style={{ flexDirection: "column", justifyContent: "center", display: 'flex', alignItems: "flex-start", width: "100%" }}>
              <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 5 }}>Randevu Tarihi</h4>
              <DatePicker
              className='datapicker'
                locale="tr"
                selected={startDate}
                onSelect={(date) => setrandevutarih({ gun: date.getDate(), ay: date.getMonth()+1, yil: date.getFullYear() })}
                onChange={(date) => setStartDate(date)} />

            </span><span style={{ flexDirection: "row", justifyItems: "center", display: 'flex', alignItems: "center", width: "100%", marginTop: 10 }}>
              <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0, marginRight: 5 }}>Başlangıç Saati : </h4>
              <Select
                renderValue={v =>v.dakika.toString().length==2 ? v.saat+":"+v.dakika  : v.saat+":"+v.dakika+""+v.dakika }
                multiple={false}
                defaultValue={""}
                size='small'
                style={{ width: 150, marginTop: 0, marginRight: 10, height: 25, fontSize: 15 }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={Baslangicsaati}
                onChange={(e) => setbaslangicsaati(e.target.value)}
              >
                {/* <MenuItem value="">
   <em></em>
 </MenuItem> */}
                <MenuItem style={{ fontSize: 14 }} value={{saat:8,dakika:0}}>8:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:8,dakika:30}}>8:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:9,dakika:0}}>9:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:9,dakika:30}}>9:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:10,dakika:0}}>10:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:10,dakika:30}}>10:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:11,dakika:0}}>11:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:11,dakika:30}}>11:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:12,dakika:0}}>12:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:12,dakika:30}}>12:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:13,dakika:0}}>13:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:13,dakika:30}}>13:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:14,dakika:0}}>14:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:14,dakika:30}}>14:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:15,dakika:0}}>15:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:15,dakika:30}}>15:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:16,dakika:0}}>16:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:16,dakika:30}}>16:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:17,dakika:0}}>17:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:17,dakika:30}}>17:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:18,dakika:0}}>18:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:18,dakika:30}}>18:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:19,dakika:0}}>19:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:19,dakika:30}}>19:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:20,dakika:0}}>20:00</MenuItem>

              </Select>
              <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0, marginRight: 5 }}>Bitiş Saati : </h4>
              <Select
                multiple={false}
                renderValue={v =>v.dakika.toString().length==2 ? v.saat+":"+v.dakika  : v.saat+":"+v.dakika+""+v.dakika }
                defaultValue={""}
                size='small'
                style={{ width: 150, marginTop: 0, marginRight: 10, height: 25, fontSize: 15 }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={Bitissaati}
                onChange={(e) => setbitissaati(e.target.value)}
              >
                {/* <MenuItem value="">
   <em></em>
 </MenuItem> */}
                <MenuItem style={{ fontSize: 14 }} value={{saat:8,dakika:0}}>8:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:8,dakika:30}}>8:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:9,dakika:0}}>9:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:9,dakika:30}}>9:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:10,dakika:0}}>10:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:10,dakika:30}}>10:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:11,dakika:0}}>11:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:11,dakika:30}}>11:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:12,dakika:0}}>12:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:12,dakika:30}}>12:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:13,dakika:0}}>13:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:13,dakika:30}}>13:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:14,dakika:0}}>14:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:14,dakika:30}}>14:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:15,dakika:0}}>15:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:15,dakika:30}}>15:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:16,dakika:0}}>16:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:16,dakika:30}}>16:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:17,dakika:0}}>17:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:17,dakika:30}}>17:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:18,dakika:0}}>18:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:18,dakika:30}}>18:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:19,dakika:0}}>19:00</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:19,dakika:30}}>19:30</MenuItem>
                <MenuItem style={{ fontSize: 14 }} value={{saat:20,dakika:0}}>20:00</MenuItem>

              </Select>
            </span><span style={{ flexDirection: "row", justifyItems: "center", display: 'flex', alignItems: "center", width: "100%", marginTop: 10 }}>
              <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0, marginRight: 5 }}>Kişi Seçin :</h4>
              <Select
                disabled={Kontrol}
                multiple={false}
                defaultValue={""}
                size='small'
                style={{ width: 200, marginTop: 0, marginRight: 10, height: 25, fontSize: 15 }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={Selectisim}
                onChange={(e) => setselectisim(e.target.value)}
              >
                {/* <MenuItem value="">
   <em></em>
 </MenuItem> */}
        {Danisanisimliste.map(item=>
                <MenuItem style={{ fontSize: 14 }} value={item.isim+" "+item.soyisim}>{item.isim+" "+item.soyisim}</MenuItem>
                )}
              </Select>

            </span><span style={{ flexDirection: "row", justifyItems: "center", display: 'flex', alignItems: "center", width: "100%", marginTop: 0 }}>
              <h4 style={{ fontSize: 15, color: "#333333", marginBottom: 0, marginRight: 0 }}>Danışanlarım Dışından Seç</h4>
              <Checkbox
                checked={Kontrol}
                onChange={(e) => onChange(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }} />
              <TextField
                disabled={!Kontrol}
                value={İsim}
                onChange={(text) => setisim(text.target.value)}
                style={{ width: "50%", borderRadius: 20 }}
                inputProps={{ style: { fontSize: 15, color: '#333333', height: 15, borderRadius: 20 } }}
                placeholder='Lütfen bir isim giriniz.'
                id="outlined-size-small"
                size="small"
                color="primary" />
            </span><span style={{ flexDirection: "row", display: 'flex', alignItems: "flex-start", width: "100%", marginTop: 0 }}>
              <Button onClick={()=>Randevuolustur()} style={{ textTransform: 'none', fontSize: 15, color: "#333333", backgroundColor: "#B0BEC5" }} color="success" variant="contained" startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 22 }} />}>
                <h4 style={{ fontWeight: "bold", marginLeft: -5 }}>Randevu Ekle</h4>
              </Button>
              {Kontrol2 &&  <CircularProgress style={{marginTop:2,marginRight:0,marginLeft:5,marginBottom:0}} size={30}/>}
             
            </span >
            <Msilrandevu id={"bugun"} govde={"Bugüne ait randevuları silmek istediğinizden emin misiniz ? "}  anabaslik={"Bugüne Ait Randevuları Sil"}/>
            <Msilrandevu id={"tumzamanlar"} govde={"Bütün randevularınızı silmek istediğinizden emin misiniz ? "} anabaslik={"Bütün Randevuları Sil"}/>
            <span style={{ flexDirection: "row", display: 'flex',justifyItems:"center" ,alignItems: "flex-start", width: "100%", marginTop: 20,marginBottom:-5 }}>
            <AdjustOutlinedIcon style={{fontSize:22,color:"#4CAF50",marginRight:1}} />

            <h4 style={{ fontSize: 15, color: "#333333", marginTop:3,marginBottom:0, marginRight: 0 }}>Aktif Randevular</h4>
            </span>
            
            <div className='tablorandevu-div'>
              
              <table className="tablo-randevu">
                {Randevuliste.length == 0 ? <h4 style={{ fontWeight: "500", padding: 5, color: "#FF0000" }}>Herhangi Bir Randevu Bulunamadı !</h4> :
                  <tbody>
                    <tr>
                    <th>Sıra</th>
                      <th>Randevu Atanan Kişi</th>
                      <th>Randevu Tarihi</th>
                      <th>Başlangıç Saati</th>
                      <th>Bitiş Saati</th>
                      <th></th>
                    </tr>
                    {Randevuliste.map((item,index) => <tr>
                      <td>{index+1}</td>
                      <td>{item.title}</td>
                      <td>{item.start.gun+" / "+item.start.ay+" / "+item.start.yil}</td>
                      <td>{item.baslangicsaat.dakika.toString().length==2 ? item.baslangicsaat.saat+":"+item.baslangicsaat.dakika : item.baslangicsaat.saat+":"+item.baslangicsaat.dakika+""+item.baslangicsaat.dakika }</td>
                      <td>{item.bitissaati.dakika.toString().length==2 ? item.bitissaati.saat+":"+item.bitissaati.dakika : item.bitissaati.saat+":"+item.bitissaati.dakika+""+item.bitissaati.dakika }</td>
                      <td><Msil id={"randevu"} baslik={item.title} govde={"Atanan randevuyu silmek istediğinizden emin misiniz ?"} randevusilkey={item.key}/></td>
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

export default Randevu