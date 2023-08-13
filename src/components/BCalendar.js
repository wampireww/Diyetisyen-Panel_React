import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/tr';
import CircularProgress from '@mui/material/CircularProgress';

import { _Randevueventliste, _Randevulistele } from './Firebaseislemleri';
require('react-big-calendar/lib/css/react-big-calendar.css');


const BCalendar=()=> {

      const localizer = momentLocalizer(moment)
      const[Randevulistesi,setrandevuliste]=useState([]);
      const[Kontrol,setkontrol]=useState(false);

      useEffect(()=>{
          _Randevueventliste(setrandevuliste,setkontrol)
        
      },[])



  return (
    <div style={{marginTop:10}}>
      {Kontrol ? <CircularProgress style={{marginTop:2,marginRight:0,marginLeft:5,marginBottom:0}} size={30}/> : 
      
 <Calendar
 
 events={Randevulistesi}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700,width:1125}}
    />
  }
    </div>
  )
}

export default BCalendar