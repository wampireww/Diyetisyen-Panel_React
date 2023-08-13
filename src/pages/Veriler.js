import React, { useEffect, useState } from 'react'
import './yeninot.css';
import { _Donemguncelle, _Notekle, _Paketlistele, _Veriler } from '../components/Firebaseislemleri';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
const Veriler=()=> {

    var zaman = new Date();

    const[Progress,setprogress]=useState(false)
    const[Kisisayisi,setkisisayisi]=useState("");
    const[Donemsayisi,setdonemsayisi]=useState("");
    const[Toplamdonemsayisi,settoplamdonemsayisi]=useState("");
    const[Tahsilat,settahsilat]=useState("");
    const[ToplamTahsilat,settoplamtahsilat]=useState("");
    const[ToplamDanisan,settoplamdanisan]=useState("");

    const[Durumay,setdurumay]=useState(zaman.getUTCMonth()+1);
    const[Durumyil,setdurumyil]=useState(zaman.getFullYear());


    useEffect(()=>{
        _Veriler(Durumay,Durumyil,setkisisayisi,setdonemsayisi,settahsilat,setprogress,settoplamtahsilat,settoplamdanisan,settoplamdonemsayisi)
    },[])

    useEffect(()=>{
        _Veriler(Durumay,Durumyil,setkisisayisi,setdonemsayisi,settahsilat,setprogress,settoplamtahsilat,settoplamdanisan,settoplamdonemsayisi)
      
    },[Durumay,Durumyil])




  return (
    <div className='yeninot'>
     
      <div className='notforum'>
     
      <span style={{flexDirection:"row",display:'flex',alignItems:"center",width:"99%",backgroundColor:"#26A69A",padding:10,justifyItems:"center"}}>
        <EqualizerOutlinedIcon style={{fontSize:20,marginRight:5,color:"#333333"}}/>
        <h4 style={{fontSize:16,color:"#333333",marginBottom:0,marginTop:2}} >İstatistikler</h4>
        </span>
      <hr className='yeninot-hr'></hr>
      <h4 style={{fontSize:15,color:"#333333",marginBottom:0,marginBottom:10}} >* Görmek istediğiniz verileri Ay ve Yıl seçerek giriniz.</h4>

       <span style={{flexDirection:"row",display:'flex',alignItems:"center",width:"100%"}}>
         
         <Select
         multiple={false}
         defaultValue={""}
         size='small'
         style={{width:150,marginTop:0,marginRight:10,height:30,fontSize:15}}
         labelId="demo-select-small"
         id="demo-select-small"
         value={Durumay}
          onChange={(e)=>setdurumay(e.target.value)}  
         >
            {/* <MenuItem value="">
           <em></em>
         </MenuItem> */}
         <MenuItem style={{fontSize:14}} value={"1"}>Ocak</MenuItem>
         <MenuItem style={{fontSize:14}} value={"2"}>Şubat</MenuItem>
         <MenuItem style={{fontSize:14}} value={"3"}>Mart</MenuItem>
         <MenuItem style={{fontSize:14}} value={"4"}>Nisan</MenuItem>
         <MenuItem style={{fontSize:14}} value={"5"}>Mayıs</MenuItem>
         <MenuItem style={{fontSize:14}} value={"6"}>Haziran</MenuItem>
         <MenuItem style={{fontSize:14}} value={"7"}>Temmuz</MenuItem>
         <MenuItem style={{fontSize:14}} value={"8"}>Ağustos</MenuItem>
         <MenuItem style={{fontSize:14}} value={"9"}>Eylül</MenuItem>
         <MenuItem style={{fontSize:14}} value={"10"}>Ekim</MenuItem>
         <MenuItem style={{fontSize:14}} value={"11"}>Kasım</MenuItem>
         <MenuItem style={{fontSize:14}} value={"12"}>Aralık</MenuItem>

         </Select>
         <Select
         multiple={false}
         defaultValue={""}
         size='small'
         style={{width:150,marginTop:0,marginRight:10,height:30,fontSize:15}}
         labelId="demo-select-small"
         id="demo-select-small"
         value={Durumyil}
          onChange={(e)=>setdurumyil(e.target.value)}  
         >
            {/* <MenuItem value="">
           <em></em>
         </MenuItem> */}
             
         <MenuItem style={{fontSize:14}} value={"2023"}>2023</MenuItem>
         <MenuItem style={{fontSize:14}} value={"2024"}>2024</MenuItem>
         <MenuItem style={{fontSize:14}} value={"2025"}>2025</MenuItem>
         <MenuItem style={{fontSize:14}} value={"2026"}>2026</MenuItem>
         <MenuItem style={{fontSize:14}} value={"2027"}>2027</MenuItem>
         <MenuItem style={{fontSize:14}} value={"2027"}>2028</MenuItem>
         <MenuItem style={{fontSize:14}} value={"2027"}>2029</MenuItem>
         <MenuItem style={{fontSize:14}} value={"2027"}>2030</MenuItem>
         </Select>
        
         </span> 

         {Progress==true ? 
        <CircularProgress style={{marginLeft:10}} size={27}/>
     : 
      
        <span style={{flexDirection:"column",display:'flex',justifyContent:"center",alignItems:"flex-start",width:"100%",marginTop:20}}>

            <span style={{flexDirection:"row",display:"flex",justifyItems:"center",borderTopLeftRadius:15,borderTopRightRadius:15,alignItems:"center",width:"70%",padding:10,backgroundColor:"#CFD8DC"}}>
            <GroupsIcon style={{fontSize:30,marginRight:5,color:"#00897B"}}/>
            <h4 style={{fontWeight:"normal"}}>{Durumyil} Yılının {Durumay}. Ayında Kayıt Olan Danışan Sayısı :</h4>
            <h4 style={{fontWeight:"normal",marginLeft:5}}>{Kisisayisi}</h4>
            </span>
            <span style={{flexDirection:"row",display:"flex",justifyItems:"center",borderBottomRightRadius:15,borderBottomLeftRadius:15,alignItems:"center",width:"70%",padding:10,backgroundColor:"#CFD8DC"}}>
            <GroupsIcon style={{fontSize:30,marginRight:5,color:"#00897B"}}/>
            <h4 style={{fontWeight:"normal"}}>{Durumyil} Yılında Kayıt Olan Danışan Sayısı :</h4>
            <h4 style={{fontWeight:"normal",marginLeft:5}}>{ToplamDanisan}</h4>
            </span>

            <span style={{flexDirection:"row",display:"flex",justifyItems:"center",borderTopLeftRadius:15,borderTopRightRadius:15,alignItems:"center",width:"70%",marginTop:20,padding:10,backgroundColor:"#CFD8DC"}}>
            <LibraryBooksIcon style={{fontSize:27,marginRight:5,color:"#00897B"}}/>
            <h4 style={{fontWeight:"normal"}}>{Durumyil} Yılının {Durumay}. Ayında Açılan Dönem Sayısı : </h4>
            <h4 style={{fontWeight:"normal",marginLeft:5}}>{Donemsayisi}</h4>
            </span>
            <span style={{flexDirection:"row",display:"flex",justifyItems:"center",borderBottomLeftRadius:15,borderBottomRightRadius:15,alignItems:"center",width:"70%",marginTop:0,padding:10,backgroundColor:"#CFD8DC"}}>
            <LibraryBooksIcon style={{fontSize:27,marginRight:5,color:"#00897B"}}/>
            <h4 style={{fontWeight:"normal"}}>{Durumyil} Yılında Açılan Dönem Sayısı : </h4>
            <h4 style={{fontWeight:"normal",marginLeft:5}}>{Toplamdonemsayisi}</h4>
            </span>

            <span style={{flexDirection:"row",display:"flex",justifyItems:"center",borderTopLeftRadius:15,borderTopRightRadius:15,alignItems:"center",marginTop:20,width:"70%",padding:10,backgroundColor:"#CFD8DC"}}>
            <PaidIcon style={{fontSize:27,marginRight:5,color:"#00897B"}}/>
            <h4 style={{fontWeight:"normal"}}>{Durumyil} Yılının {Durumay}. Ayında Toplam Tahsilat Miktarı :</h4>
            <h4 style={{fontWeight:"normal",marginLeft:5}}>{Tahsilat}</h4>
            <CurrencyLiraIcon style={{fontSize:20,marginRight:5,color:"#00897B"}}/>

            </span>
            <span style={{flexDirection:"row",display:"flex",justifyItems:"center",borderBottomLeftRadius:15,borderBottomRightRadius:15,alignItems:"center",marginTop:0,width:"70%",padding:10,backgroundColor:"#CFD8DC"}}>
            <PaidIcon style={{fontSize:27,marginRight:5,color:"#00897B"}}/>
            <h4 style={{fontWeight:"normal"}}>{Durumyil} Yılı Toplam Tahsilat Miktarı :</h4>
            <h4 style={{fontWeight:"normal",marginLeft:5}}>{ToplamTahsilat}</h4>
            <CurrencyLiraIcon style={{fontSize:20,marginRight:5,color:"#00897B"}}/>

            </span>

        </span>
        }
      </div>
    </div>
  )
}

export default Veriler