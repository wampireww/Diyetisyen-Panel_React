import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { _Arsivdencikart, _Arsivegonder, _Danisansil, _Donemsil, _Dosyasil, _Notsil, _Seanssil, _Tahsilatsil } from '../components/Firebaseislemleri';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';

export const Mcikart=({baslik,govde,dankey})=> {

 const navigate=useNavigate();
 
 
const [open,setOpen]=useState(false);

const handleClickOpen = () => {
        setOpen(true);
        console.log(dankey);
};

const handleClose = () => {
    setOpen(false);
  };

const Dondur=()=>{

    _Arsivdencikart(dankey,navigate);
 
}

  return (
    <div>
       <IconButton onClick={()=>handleClickOpen()} aria-label="delete">
       <ReplyIcon style={{color:"#455A64"}} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h4>Uyarı !</h4></DialogTitle>
        <DialogContent>
        <h4 style={{fontSize:15,color:"#FF0000",marginBottom:5}}>{baslik}</h4>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0}}>{govde}</h4>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Hayır</Button>
        <Button onClick={()=>Dondur()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Evet</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Mcikart