import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { _Arsivegonder, _Danisansil, _Donemsil, _Dosyasil, _Notsil, _Randevusiltarihegore, _Seanssil, _Tahsilatsil, _Tumrandevularisil } from '../components/Firebaseislemleri';
import { useNavigate } from 'react-router-dom';


export const Msilrandevu=({id,baslik,govde,randevukey,anabaslik})=> {

 
 
const [open,setOpen]=useState(false);

const handleClickOpen = () => {
        setOpen(true);
};

const handleClose = () => {
    setOpen(false);
  };

const Sil=()=>{
    var zaman = new Date();

    if(id=="bugun"){
        _Randevusiltarihegore(zaman.getDate())

      }

    else if(id=="tumzamanlar"){
        _Tumrandevularisil();
    }
    
}

  return (
    <div>
         <span onClick={()=>handleClickOpen()} className='randevumodal' style={{textDecoration:"underline",flexDirection: "row", display: 'flex',justifyItems:"center" ,alignItems: "flex-start", width: "100%", marginTop: 15,marginBottom:-5 }}>
            <DeleteIcon style={{fontSize:22,color:"red",marginRight:1}} />
            <h4 style={{ fontSize: 15, color: "#333333", marginTop:3,marginBottom:0, marginRight: 0 }}>{anabaslik}</h4>
            </span>
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

export default Msilrandevu