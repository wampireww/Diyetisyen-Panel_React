import React, {useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { _Arsivdencikart, _Arsivegonder, _Danisansil, _Donemsil, _Dosyasil, _Kilodegismodal, _Notsil, _Seanssil, _Tahsilatsil } from '../components/Firebaseislemleri';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import TextField from '@mui/material/TextField';

export const Mkilo=({donem,konum,id,dankey})=> {

 const navigate=useNavigate();
 
 
const [open,setOpen]=useState(false);
const [Kilodegeri,setkilodegeri]=useState("");

const handleClickOpen = () => {
        setOpen(true);
        console.log(dankey);
};

const handleClose = () => {
    setOpen(false);
  };


const Kilodegistir=()=>{

  

    if(Kilodegeri==""){

    }
    else{
          if(konum=="danisandonem"){
            _Kilodegismodal(dankey,Kilodegeri).then(()=>{navigate("/Admin/Danisanlarim/"+id+"/"+donem+"?kilodegis=basarili");setOpen(false);
          })
          }
          else if(konum=="danisanana"){
            _Kilodegismodal(dankey,Kilodegeri).then(()=>{navigate("/Admin/Danisanlarim/"+id+"?kilodegis=basarili");setOpen(false);
          })
          }
        
    }

 
}

  return (
    <div>
    <IconButton onClick={()=>handleClickOpen()}  aria-label="delete"><SettingsIcon style={{ color: "#FB8C00", fontSize: 22}} /></IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h4>Danışan Kilosunu Değiştir</h4></DialogTitle>
        <DialogContent>
        <span style={{flexDirection:"column",display:'flex',alignItems:"flex-start",width:"100%"}}>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:5,marginTop:0}} >Danışanın Kilosunu giriniz.</h4>
      <TextField
      value={Kilodegeri}
      onChange={(text)=>setkilodegeri(text.target.value)}
      style={{width:"100%"}}
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        </span>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">İptal</Button>
        <Button onClick={()=>Kilodegistir()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Kaydet</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Mkilo