import React from 'react'
import './notlarim.css';
import Calendar from '../components/BCalendar';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


const Ajanda=()=>{

    const navigate=useNavigate();



  return (
    <div className='notlarim'>
        <div>
        <Button onClick={()=>navigate("/Admin/Ajanda/Randevu")} style={{marginBottom:5,textTransform: 'none',fontSize:15,color:"#333333",backgroundColor:"#0097A7"}} color="primary" variant="contained" startIcon={<LibraryBooksIcon style={{color:"#F1F8E9",fontSize:22}} />}>
       <h4 style={{fontWeight:"600"}}>Randevu Ekle Veya Sil</h4>
      </Button>
        </div>
        <hr className='notlarim-hr'></hr>
        <Calendar/>
    </div>
  )
}

export default Ajanda