import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../pages/Admin'
import Adminindex from '../pages/Adminindex'
import Ayarlar from '../pages/Ayarlar'
import Danisanguncelle from '../pages/Danisanguncelle'
import Danisanid from '../pages/Danisanid'
import Danisanlarim from '../pages/Danisanlarim'
import Donem from '../pages/Donem'
import Donembilgiguncelle from '../pages/Donembilgiguncelle'
import Donemekle from '../pages/Donemekle'
import Dosyayukle from '../pages/Dosyayukle'
import Home from '../pages/Home'
import Notid from '../pages/Notid'
import Notlarim from '../pages/Notlarim'
import Seansekle from '../pages/Seansekle'
import Seansguncelle from '../pages/Seansguncelle'
import Seansid from '../pages/Seansid'
import Tahsilatekle from '../pages/Tahsilatekle'
import Yenidanisan from '../pages/Yenidanisan'
import Yeninot from '../pages/Yeninot'
import Arsiv from '../pages/Arsiv'
import Veriler from '../pages/Veriler'
import Ajanda from '../pages/Ajanda'
import Randevu from '../pages/Randevu'
import Nopage from '../pages/Nopage'


const Root=()=> {
  

  return (
    <div>
        <Routes>
        <Route path='*' element={<Nopage/>} />
        <Route path='/' element={<Home/>}/>
        <Route path='/Admin' element={<Admin/>}>
        <Route index element={<Adminindex/>}/>
        <Route path='Ajanda' element={<Ajanda/>}/>
        <Route path='Ajanda/Randevu' element={<Randevu/>}/>
        <Route path='Notlarim' element={<Notlarim/>}/>
        <Route path='Veriler' element={<Veriler/>}/>
        <Route path='Notlarim/Yeninot' element={<Yeninot/>}/>
        <Route path='Notlarim/:id' element={<Notid/>}/>
        <Route path='Danisanlarim' element={<Danisanlarim/>}/>
        <Route path='Arsiv' element={<Arsiv/>}/>
        <Route path='Danisanlarim/Yenidanisan' element={<Yenidanisan/>}/>
        <Route path='Danisanlarim/:id' element={<Danisanid/>}/>
        <Route path='Danisanlarim/:id/Donemekle' element={<Donemekle/>}/>
        <Route path='Danisanlarim/:id/Bilgiguncelle' element={<Danisanguncelle/>}/>
        <Route path='Danisanlarim/:id/:donemid' element={<Donem/>}/>
        <Route path='Danisanlarim/:id/:donemid/Donembilgiguncelle' element={<Donembilgiguncelle/>}/>
        <Route path='Danisanlarim/:id/:donemid/Seansekle' element={<Seansekle/>}/>
        <Route path='Danisanlarim/:id/:donemid/:seansid' element={<Seansid/>}/>
        <Route path='Danisanlarim/:id/:donemid/Seansguncelle' element={<Seansguncelle/>}/>
        <Route path='Danisanlarim/:id/:donemid/Dosyayukle' element={<Dosyayukle/>}/>
        <Route path='Danisanlarim/:id/:donemid/Tahsilatekle' element={<Tahsilatekle/>}/>
        <Route path='Ayarlar' element={<Ayarlar/>}/>
        </Route>
        </Routes>
    </div>
  )
}

export default Root