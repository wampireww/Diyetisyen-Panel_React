import React, { useEffect } from 'react'
import './admin.css';
import LogoutIcon from '@mui/icons-material/Logout';
import AppleIcon from '@mui/icons-material/Apple';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import NoteIcon from '@mui/icons-material/Note';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import { Outlet, useNavigate } from 'react-router-dom';
import Clock from 'react-live-clock';
import 'moment-timezone';
import 'moment/locale/tr';
import { _İzin } from '../components/Firebaseislemleri';

const Admin=()=> {
    const navigate=useNavigate();

    useEffect(()=>{

        if(localStorage.getItem("login")=="true"){

        }
        else{
            navigate("/")
        }

    },[])

    const Cikis=()=>{
        _İzin();
        localStorage.setItem("login", "false");
        navigate("/");
    }

    
  return (
    <div className='admin'>
        <div className='admin-navbar' >
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <AppleIcon style={{fontSize:30,marginRight:5,color:"#43A047"}} />
        <h3>Diyetisyen Admin Panel</h3>
        </div>
        <Clock format={"LLL"} ticking={true}  />

        </div>
        <div onClick={()=>Cikis()} className='cikis' style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <h4 style={{marginRight:5,color:"red"}}>Çıkış</h4>
        <LogoutIcon style={{color:"red",fontSize:25}} />
        </div>
        </div>
      
        <div className='admin-1'>
        <div className='admin-sidebar'>
            <ul className='admin-ul' >
                <li onClick={()=>navigate("Ajanda")} className='admin-li'><span style={{display:"flex",flexDirection:"row",alignItems:"center"}}><DateRangeIcon style={{color:"#0097A7"}} /><h4 style={{marginLeft:5}}>Ajanda</h4></span></li>
                <li onClick={()=>navigate("Danisanlarim")} className='admin-li'><span style={{display:"flex",flexDirection:"row",alignItems:"center"}}><PeopleIcon style={{color:"#039BE5"}} /><h4 style={{marginLeft:5}}>Danışanlarım</h4></span></li>
                <li onClick={()=>navigate("Notlarim")} className='admin-li'><span style={{display:"flex",flexDirection:"row",alignItems:"center"}}><NoteIcon style={{color:"#4CAF50"}} /><h4 style={{marginLeft:5}}>Notlarım</h4></span></li>
                <li onClick={()=>navigate("Veriler")} className='admin-li'><span style={{display:"flex",flexDirection:"row",alignItems:"center"}}><EqualizerOutlinedIcon style={{color:"#00897B"}} /><h4 style={{marginLeft:5}}>İstatistikler</h4></span></li>
                <li onClick={()=>navigate("Ayarlar")} className='admin-li'><span style={{display:"flex",flexDirection:"row",alignItems:"center"}}><SettingsIcon style={{color:"#FF8F00"}} /><h4 style={{marginLeft:5}}>Paket Ayarları</h4></span></li>
                <li onClick={()=>navigate("Arsiv")} className='admin-li'><span style={{display:"flex",flexDirection:"row",alignItems:"center"}}><FolderIcon style={{color:"#616161"}} /><h4 style={{marginLeft:5}}>Arşiv</h4></span></li>

            </ul>
        </div>
        <Outlet/>
        </div>
    </div>
    
  )
}

export default Admin