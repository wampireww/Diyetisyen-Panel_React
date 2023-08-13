import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { _Arsivdanisansil, _Danisansil, _Donemsil, _Dosyasil, _Notsil, _Randevusil, _Seanssil, _Tahsilatsil } from '../components/Firebaseislemleri';
import { useNavigate } from 'react-router-dom';
import { key } from 'localforage';

export const Msil=({tahsilatkey,donemisim,dosyakey,dosyaid,id,danid,progress,baslik,govde,dankey,notid,seanskey,sdonemisim,randevusilkey})=> {

 const navigate=useNavigate();
 
 
const [open,setOpen]=useState(false);

const handleClickOpen = () => {
        setOpen(true);
        console.log(dankey);
};

const handleClose = () => {
    setOpen(false);
  };

const Sil=()=>{

  if(id=="danisan"){
    _Danisansil(dankey,navigate,danid)
    setOpen(false)

  }

  else if(id=="arsivsil"){
    _Arsivdanisansil(dankey,navigate,danid)
    setOpen(false)
    
    }

  else if(id=="notlarim"){
  _Notsil(dankey,notid,navigate)
  setOpen(false)
  }

  else if(id=="seans"){
    _Seanssil(danid,dankey,sdonemisim,seanskey,progress,navigate);
    setOpen(false)
  }

  else if(id=="dosya"){
    _Dosyasil(dosyaid,danid,dankey,donemisim,dosyakey,navigate,progress)
    .then(
      setOpen(false)
    )
    
  }
  else if(id=="tahsilat"){
    _Tahsilatsil(dankey,donemisim,danid,tahsilatkey,progress,navigate)
    .then(
      setOpen(false)
    )
  }

  else if(id=="donem"){
    _Donemsil(dankey,donemisim,danid,progress,navigate);
    setOpen(false);
     
 
  }

  else if(id=="randevu"){
   _Randevusil(randevusilkey);
     
 
  }


}

  return (
    <div>
       <IconButton onClick={()=>handleClickOpen()} aria-label="delete">
        <DeleteIcon style={{color:"red"}} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h4>Uyarı !</h4></DialogTitle>
        <DialogContent>
        <h4 style={{fontSize:15,color:"#FF0000",marginBottom:5}}>{baslik}</h4>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0}}>{govde}</h4>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Hayır</Button>
        <Button onClick={()=>Sil()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Evet</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Msil