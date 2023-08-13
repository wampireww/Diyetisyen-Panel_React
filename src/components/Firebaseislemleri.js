import React from 'react';
import { db, storage } from './Firebaseconfig';
import {push,ref,set,get,update,remove,child,onValue} from "firebase/database";
import {ref as refstorage,uploadBytes,getDownloadURL,getMetadata,deleteObject,listAll, list } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'


const short = require('short-uuid');


export const _Girisyap= async(kuladi,sifre,navigate)=>{

    
     get(ref(db,"/Giris")).then((snapshot)=>{
        
        if(snapshot.val().kuladi==kuladi && snapshot.val().sifre==sifre){

             update(ref(db,"/Giris/"),{
                izin:true,
              
            });

            localStorage.setItem("login", "true");
            navigate("/Admin")
        }
        else{
            update(ref(db,"/Giris/"),{
                izin:false,
              
            });
            navigate("/?giris=basarisiz")
        }

     })
        

}

export const _İzin=async()=>{

    update(ref(db,"/Giris/"),{
        izin:false,
      
    });
}

export const _Notekle=async(notbaslik,notgovde,notdosya,navigate,setprogress)=>{
    var zaman = new Date().toLocaleString('tr-TR');
    setprogress(true)
    const notid=short.generate();
    var dosyaUrl=[];

    for(let i=0;i<notdosya.length;i++){
        if(notdosya[i].size>30288000){


      }
      else{
        const storagedosya=refstorage(storage,"/Notdosyalar/"+notid+"/"+notid+notdosya[i].name+notbaslik);
        await uploadBytes(storagedosya,notdosya[i]);
        const urldosya=await getDownloadURL(storagedosya);
        dosyaUrl.push(urldosya)

      }
    }

    push(ref(db,"/Notlarim/"),{
        guncelleme:"",
        tarih:zaman,
        notid:notid,
      baslik:notbaslik,
      govde:notgovde,
      dosyalar:dosyaUrl
    }).then(()=>setprogress(false),
    navigate("/Admin/Notlarim?ekle=basarili"),
    ).catch((error)=>console.log(error)
    )
        }



export const _Notlistele=(setnotliste,setgenelprogess)=>{
    setgenelprogess(true);

    onValue(ref(db,"/Notlarim/"),(snapshot)=>{
        var items=[];
        snapshot.forEach(item=>{
            items.push({
                tarih:item.val().tarih,
                notid:item.val().notid,
                baslik:item.val().baslik,
                govde:item.val().govde,
                dosyalar:item.val().dosyalar,
                key:item.key,
                guncelleme:item.val().guncelleme
            })

        })
        setnotliste(items)
        setgenelprogess(false)

    })

}

export const _Notsil=async(notsilkey,notid,navigate)=>{


    const storageref=refstorage(storage,"/Notdosyalar/"+notid);
   await listAll(storageref).then(item=>item.items.forEach(item=>deleteObject(item)));
  await remove(ref(db,"/Notlarim/"+notsilkey)).then(()=>console.log("silindi")).then(()=>navigate("/Admin/Notlarim?sil=basarili"))
  .catch(()=>navigate("/Admin/Notlarim?sil=basarisiz"));



}

export const _Notgüncelle=async(notsilkey,notbaslik,navigate,govde,dosyalar,setprogress,notid)=>{
    var zaman = new Date().toLocaleString('tr-TR');
    setprogress(true)

    const storageref=refstorage(storage,"/Notdosyalar/"+notid);
    await listAll(storageref).then(item=>item.items.forEach(item=>deleteObject(item)));

    var dosyaUrl=[];
    for(let i=0;i<dosyalar.length;i++){
        if(dosyalar[i].size>30288000){

       }
       else{
        const storagedosya=refstorage(storage,"/Notdosyalar/"+notid+"/"+notid+dosyalar[i].name+notbaslik);
        await uploadBytes(storagedosya,dosyalar[i]);
        const urldosya=await getDownloadURL(storagedosya);
        dosyaUrl.push(urldosya)
       }
        }
        await update(ref(db,"/Notlarim/"+notsilkey),{
            guncelleme:zaman,
            baslik:notbaslik,
            govde:govde,
            dosyalar:dosyaUrl
        }).then(()=>setprogress(false),navigate("/Admin/Notlarim?guncelle=basarili"))
        .catch(()=>navigate("/Admin/Notlarim?guncelle=basarisiz"));


}

export const _YenipaketEkle=async(Paketismi,Paketfiyati,navigate)=>{

    push(ref(db,"/Paketler/"),{
        isim:Paketismi,
        fiyat:Paketfiyati,
        paketid:short.generate(),
    }).then(()=>window.location.reload(),
    navigate("/Admin/Ayarlar?ekle=basarili"),
    ).catch(()=>navigate("/Admin/Ayarlar?ekle=basarisiz"),
    )

}

export const _Paketlistele=async(setpaketliste)=>{


    onValue(ref(db,"/Paketler/"),(snapshot)=>{
        var items=[];
        snapshot.forEach(item=>{
            items.push({
                isim:item.val().isim,
                fiyat:item.val().fiyat,
                key:item.key,
                paketid:item.val().paketid
            })

        })
        setpaketliste(items)
    })

}


export const _Paketsil=async(paketkey,navigate)=>{

    await remove(ref(db,"/Paketler/"+paketkey)).then(()=>window.location.reload(),navigate("/Admin/Ayarlar?sil=basarili"))
    .catch(()=>navigate("/Admin/Ayarlar?sil=basarisiz"));

}

export const _Danisanekle=async(ad,soyad,tckimlik,cinsiyet,telefon,mail,meslek,boy,kilo,sigara,alkol,kangrubu,dogumtarih,navigate,setprogress)=>{
        setprogress(true);
    var zaman = new Date();
    const kayittarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};
    const _Ad=ad.charAt(0).toLocaleUpperCase('tr-TR') + ad.slice(1);
    const _Soyad=soyad.charAt(0).toLocaleUpperCase('tr-TR') + soyad.slice(1);
    const _Meslek=meslek.charAt(0).toLocaleUpperCase('tr-TR') + meslek.slice(1);

  push(ref(db,"/Danisanlar/"),{
       Bilgiler:{
        arsiv:false,
        isim:_Ad,
        soyisim:_Soyad,
        tckimlik:tckimlik,
        danisanid:short.generate(),
        cinsiyet:cinsiyet,
        telefon:telefon,
        mail:mail,
        meslek:_Meslek,
        gorus:"",
        boy:boy,
        kilo:kilo,
        sigara:sigara,
        alkol:alkol,
        kangrubu:kangrubu,
        dogumtarih:dogumtarih,
        kayittarihi:kayittarihi,
    }
    }).then(()=>setprogress(false),
    navigate("/Admin/Danisanlarim?ekle=basarili"),
    ).catch(()=>navigate("/Admin/Danisanlarim?ekle=basarisiz"),
    )
}

export const _Danisanlistele=async(setdanisanliste,Arama,setdogum,setkayit,setgenelprogess)=>{
    setgenelprogess(true)
    const gelenisim=Arama.charAt(0).toLocaleUpperCase('tr-TR')+ Arama.slice(1);

    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        var items=[];
        snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Bilgiler"){if(item2.val().isim.startsWith(gelenisim) && item2.val().arsiv==false){

            items.push({
                isim:item2.val().isim,
                soyisim:item2.val().soyisim,
                key:item.key,
                danisanid:item2.val().danisanid,
                tckimlik:item2.val().tckimlik,
                cinsiyet:item2.val().cinsiyet,
                telefon:item2.val().telefon,
                mail:item2.val().mail,
                meslek:item2.val().meslek,
                gorus:item2.val().gorus,
                boy:item2.val().boy,
                kilo:item2.val().kilo,
                kayitturu:item2.val().kayitturu,
                sigara:item2.val().sigara,
                alkol:item2.val().alkol,
                kangrubu:item2.val().kangrubu,
                dogumtarih:item2.val().dogumtarih.gun+" / "+item2.val().dogumtarih.ay+" / "+item2.val().dogumtarih.yil,
                kayittarihi:item2.val().kayittarihi.gun+" / "+item2.val().kayittarihi.ay+" / "+item2.val().kayittarihi.yil,
            })
        }}}
            )
        })
        setdanisanliste(items);
        setdogum(items.dogumtarih);
        setkayit(items.kayittarihi);
        setgenelprogess(false);
    })

}

export const _Danisanlistelerandevu=async(setdanisanliste,setgenelprogess)=>{
    setgenelprogess(true)

    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        var items=[];
        snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Bilgiler"){if(item2.val().arsiv==false){

            items.push({
                isim:item2.val().isim,
                soyisim:item2.val().soyisim,
                key:item.key,
                danisanid:item2.val().danisanid,
                tckimlik:item2.val().tckimlik,
                cinsiyet:item2.val().cinsiyet,
                telefon:item2.val().telefon,
                mail:item2.val().mail,
                meslek:item2.val().meslek,
                gorus:item2.val().gorus,
                boy:item2.val().boy,
                kilo:item2.val().kilo,
                kayitturu:item2.val().kayitturu,
                sigara:item2.val().sigara,
                alkol:item2.val().alkol,
                kangrubu:item2.val().kangrubu,
                dogumtarih:item2.val().dogumtarih.gun+" / "+item2.val().dogumtarih.ay+" / "+item2.val().dogumtarih.yil,
                kayittarihi:item2.val().kayittarihi.gun+" / "+item2.val().kayittarihi.ay+" / "+item2.val().kayittarihi.yil,
            })
        }}}
            )
        })
        setdanisanliste(items);
      
        setgenelprogess(false);
    })

}


export const _ArsivDanisanlistele=async(setdanisanliste,Arama,setdogum,setkayit,setgenelprogess)=>{
    setgenelprogess(true)
    const gelenisim=Arama.charAt(0).toLocaleUpperCase('tr-TR')+ Arama.slice(1);

    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        var items=[];
        snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Bilgiler"){if(item2.val().isim.startsWith(gelenisim) && item2.val().arsiv==true){

            items.push({
                isim:item2.val().isim,
                soyisim:item2.val().soyisim,
                key:item.key,
                danisanid:item2.val().danisanid,
                tckimlik:item2.val().tckimlik,
                cinsiyet:item2.val().cinsiyet,
                telefon:item2.val().telefon,
                mail:item2.val().mail,
                meslek:item2.val().meslek,
                gorus:item2.val().gorus,
                boy:item2.val().boy,
                kilo:item2.val().kilo,
                kayitturu:item2.val().kayitturu,
                sigara:item2.val().sigara,
                alkol:item2.val().alkol,
                kangrubu:item2.val().kangrubu,
                dogumtarih:item2.val().dogumtarih.gun+" / "+item2.val().dogumtarih.ay+" / "+item2.val().dogumtarih.yil,
                kayittarihi:item2.val().kayittarihi.gun+" / "+item2.val().kayittarihi.ay+" / "+item2.val().kayittarihi.yil,
            })
        }}}
            )
        })
        setdanisanliste(items);
        setdogum(items.dogumtarih);
        setkayit(items.kayittarihi);
        setgenelprogess(false);
    })

}

export const _Danisanlisteleidyegore=async(setdanisan,danisankey,setnotdiyetisyen,setgenelprogess,setyas)=>{
    setgenelprogess(true)
  //const gelenisim=Arama.charAt(0).toLocaleUpperCase('tr-TR')+ Arama.slice(1);
  var zaman = new Date();
  const yil=zaman.getFullYear();
    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        var items=[];
        snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Bilgiler"){if(item2.val().danisanid==danisankey){

            items.push({
                arsiv:item2.val().arsiv,
                isim:item2.val().isim,
                soyisim:item2.val().soyisim,
                key:item.key,
                danisanid:item2.val().danisanid,
                tckimlik:item2.val().tckimlik,
                cinsiyet:item2.val().cinsiyet,
                telefon:item2.val().telefon,
                mail:item2.val().mail,
                meslek:item2.val().meslek,
                gorus:item2.val().gorus,
                boy:item2.val().boy,
                kilo:item2.val().kilo,
                kayitturu:item2.val().kayitturu,
                sigara:item2.val().sigara,
                alkol:item2.val().alkol,
                kangrubu:item2.val().kangrubu,
                dogumtarih:item2.val().dogumtarih.gun+" / "+item2.val().dogumtarih.ay+" / "+item2.val().dogumtarih.yil,
                kayittarihi:item2.val().kayittarihi.gun+" / "+item2.val().kayittarihi.ay+" / "+item2.val().kayittarihi.yil,
                yil:item2.val().dogumtarih.yil
            })
        }}}
            )
        })
        setyas(yil-items[0].yil);
        setdanisan(items[0])
        setnotdiyetisyen(items[0].gorus)
        setgenelprogess(false)
    });

}

export const _Danisanguncelle=async(ad,soyad,tckimlik,cinsiyet,telefon,mail,meslek,boy,kilo,sigarakullanimi,alkolkullanimi,kangrubu,dogumtarih,navigate,key,danid,setprogress)=>{
    setprogress(true);
 //   const kayittarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};
    const _Ad=ad.charAt(0).toLocaleUpperCase('tr-TR') + ad.slice(1);
    const _Soyad=soyad.charAt(0).toLocaleUpperCase('tr-TR') + soyad.slice(1);
    const _Meslek=meslek.charAt(0).toLocaleUpperCase('tr-TR') + meslek.slice(1);

    await update(ref(db,"/Danisanlar/"+key+"/Bilgiler/"),{
        isim:_Ad,
        soyisim:_Soyad,
        tckimlik:tckimlik,
        cinsiyet:cinsiyet,
        telefon:telefon,
        mail:mail,
        meslek:_Meslek,
        boy:boy,
        kilo:kilo,
        sigara:sigarakullanimi,
        alkol:alkolkullanimi,
        kangrubu:kangrubu,
        dogumtarih:dogumtarih,

    }).then(()=>setprogress(false),navigate("/Admin/Danisanlarim/"+danid+"?guncelle=basarili")).catch(()=>navigate("/Admin/Danisanlarim/"+danid+"?guncelle=basarisiz"));

}

export const _Arsivegonder=async(key,navigate)=>{

    await update(ref(db,"/Danisanlar/"+key+"/Bilgiler/"),{
       arsiv:true

    }).then(()=>window.location.reload(),navigate("/Admin/Danisanlarim?arsivegonder=basarili")).catch((error)=>console.log(error));

}

export const _Arsivdencikart=async(key,navigate)=>{

    await update(ref(db,"/Danisanlar/"+key+"/Bilgiler/"),{
       arsiv:false

    }).then(()=>window.location.reload(),navigate("/Admin/Arsiv?arsivcikart=basarili")).catch((error)=>console.log(error));

}

export const _Kilodegismodal=async(key,kilo)=>{

    await update(ref(db,"/Danisanlar/"+key+"/Bilgiler/"),{
       kilo:kilo

    }).then(()=>window.location.reload()).catch((error)=>console.log(error));

}

export const _Gorusguncelle=async(danid,key,diyetisyengorus,navigate,setprogressnot)=>{
    setprogressnot(true);
    await update(ref(db,"/Danisanlar/"+key+"/Bilgiler/"),{

     gorus:diyetisyengorus

    }).then(()=>window.location.reload(),setprogressnot(false),navigate("/Admin/Danisanlarim/"+danid+"?notguncelle=basarili")).catch(()=>navigate("/Admin/Danisanlarim/"+danid+"?notguncelle=basarisiz"));

}


export const _Danisansil=async(key,navigate,danid)=>{

    const storageref=refstorage(storage,"/yuklemeler/"+danid);

    await listAll(storageref).then(item=>{item.prefixes.forEach(item2=>list(item2)
        .then(item3=>item3.prefixes.forEach(item4=>list(item4).then(item5=>item5.items.forEach(item6=>deleteObject(item6))))))})

         await remove(ref(db,"/Danisanlar/"+key)).then(()=>navigate("/Admin/Danisanlarim?sil=basarili"))
         .catch(()=>navigate("/Admin/Danisanlarim?sil=basarisiz"));

}

export const _Arsivdanisansil=async(key,navigate,danid)=>{

    const storageref=refstorage(storage,"/yuklemeler/"+danid);

    await listAll(storageref).then(item=>{item.prefixes.forEach(item2=>list(item2)
        .then(item3=>item3.prefixes.forEach(item4=>list(item4).then(item5=>item5.items.forEach(item6=>deleteObject(item6))))))})

    await remove(ref(db,"/Danisanlar/"+key)).then(()=>navigate("/Admin/Arsiv?sil=basarili"))
    .catch(()=>navigate("/Admin/Arsiv?sil=basarisiz"));

}


export const _Donemekle=async(donemismi,Paket,navigate,key,id,setalert,setprogress)=>{
    setprogress(true);
    var itemspaketler=[];

    onValue(ref(db,"/Paketler/"),(snapshot)=>{
        snapshot.forEach(item=>{if(item.val().isim==Paket)
            itemspaketler.push({
                isim:item.val().isim,
                fiyat:item.val().fiyat,
                key:item.key,
                paketid:item.val().paketid
            })

        })
    })

    var zaman = new Date();
    const kayittarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};
    const _donemadi=donemismi.charAt(0).toLocaleUpperCase('tr-TR') + donemismi.slice(1);

    onValue(ref(db,"/Danisanlar/"+key+"/"),(snapshot)=>{
        if(snapshot.hasChild("Donemler")==true){
            if(snapshot.child("Donemler").hasChild(_donemadi)==true){
                setalert(true)
                setprogress(false);
            }
            else{
                set(ref(db,"/Danisanlar/"+key+"/Donemler/"+_donemadi),{
                    donemnotu:"",
                    sonislemtarihi:{gun:"",ay:"",yil:""},
                    paketisim:itemspaketler[0].isim,
                     isim:_donemadi,
                     paket:itemspaketler[0].fiyat,
                     kayittarihi:kayittarihi,
                     donemid:short.generate(),
                     key:key,
                     durum:"Devam ediyor",
                     danisanid:id,
                     bitistarihi:{gun:"",ay:"",yil:""}

                 }).then(()=>setalert(false),setprogress(false),
                  navigate("/Admin/Danisanlarim/"+id+"?ekleme=basarili"),
                 ).catch(()=>navigate("/Admin/Danisanlarim/"+id+"?ekleme=basarisiz"),
                )

            }



        }

        else{
            set(ref(db,"/Danisanlar/"+key+"/Donemler/"+_donemadi),{
                donemnotu:"",
                sonislemtarihi:{gun:"",ay:"",yil:""},
                paketisim:itemspaketler[0].isim,
                 isim:_donemadi,
                 paket:itemspaketler[0].fiyat,
                 kayittarihi:kayittarihi,
                 donemid:short.generate(),
                 key:key,
                 durum:"Devam ediyor",
                 danisanid:id,
                 bitistarihi:{gun:"",ay:"",yil:""}
             }).then(()=>setalert(false),setprogress(false),
              navigate("/Admin/Danisanlarim/"+id+"?ekleme=basarili"),
             ).catch(()=>navigate("/Admin/Danisanlarim/"+id+"?ekleme=basarisiz"),
            )
        }

    })


    }


export const _Donemguncelle=async(key,danid,donemisim,durum,paket,navigate,setprogress,kontrol,eskipaketisim,eskifiyat)=>{
    var zaman = new Date();
    const bitistarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};
    setprogress(true);

    await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim),{
        sonislemtarihi:bitistarihi
    })

    if(kontrol==true){
        if(durum=="Tamamlandi"){
        await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim),{
            durum:durum,
            paket:eskifiyat,
            paketisim:eskipaketisim,
            bitistarihi:bitistarihi
        }).then(()=>setprogress(false),navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?guncelle=basarili"))
        .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?guncelle=basarisiz"));
    }
    else{
        await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim),{
            durum:durum,
            paket:eskifiyat,
            paketisim:eskipaketisim,
            bitistarihi:{gun:"",ay:"",yil:""}
        }).then(()=>setprogress(false),navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?guncelle=basarili"))
        .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?guncelle=basarisiz"));
    }
    }
    else{

     var itemspaketler=[];
        onValue(ref(db,"/Paketler/"),(snapshot)=>{
            snapshot.forEach(item=>{if(item.val().isim==paket)
                itemspaketler.push({
                    isim:item.val().isim,
                    fiyat:item.val().fiyat,
                    key:item.key,
                    paketid:item.val().paketid
                })

            })
        })
        if(durum=="Tamamlandi"){
     await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim),{
                durum:durum,
                paket:itemspaketler[0].fiyat,
                paketisim:itemspaketler[0].isim,
                bitistarihi:bitistarihi
            }).then(()=>setprogress(false),navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?guncelle=basarili"))
            .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?guncelle=basarisiz"));
    }
    else{
        await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim),{
            durum:durum,
            paket:itemspaketler[0].fiyat,
            paketisim:itemspaketler[0].isim,
            bitistarihi:{gun:"",ay:"",yil:""}
        }).then(()=>setprogress(false),navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?guncelle=basarili"))
        .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?guncelle=basarisiz"));
    }
}
}

export const _Donemnotguncelle=async(key,danid,donemisim,Donemnot,navigate,setprogress)=>{
        setprogress(true);
        var zaman = new Date();
        const eklemetarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};

    await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim),{
            sonislemtarihi:eklemetarihi
        })

    await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim),{
        donemnotu:Donemnot
    }).then(()=>window.location.reload(),setprogress(false),navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?notguncelle=basarili"))
    .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?notguncelle=basarisiz"));

}


export const _Donemlisteleidyegore=async(setdonemliste,id)=>{

      var items=[];
      var items2=[];
        var diyetlistesi=0;
        var vucutanalizi=0;
        var toplam=0;
      onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Donemler"){
           item2.forEach(item3=>{
            
               if(item3.val().danisanid==id){
              item3.child("Dosyalar").forEach(x=>{diyetlistesi=x.child("diyetlistesi").size+diyetlistesi});
            item3.child("Dosyalar").forEach(x=>{vucutanalizi=x.child("vucutanalizi").size+vucutanalizi});
            toplam=vucutanalizi+diyetlistesi
            items2.push(toplam);



                items.push({
            
                    dosyasayisi:diyetlistesi+vucutanalizi,
                    sonislemtarihi:item3.val().sonislemtarihi.gun+" / "+item3.val().sonislemtarihi.ay+" / "+item3.val().sonislemtarihi.yil,
                    paketisim:item3.val().paketisim,
                    isim:item3.val().isim,
                    paket:item3.val().paket,
                    kayittarihi:item3.val().kayittarihi.gun+" / "+item3.val().kayittarihi.ay+" / "+item3.val().kayittarihi.yil,
                    donemid:item3.val().donemid,
                    key:item3.val().key,
                    durum:item3.val().durum,
                    danisanid:item3.val().danisanid,
                    bitistarihi:item3.val().bitistarihi
                })
               }
               diyetlistesi=0;
               vucutanalizi=0;
           })}})}
            )
        setdonemliste(items);
    });


}

export const _Donemlisteleseciliyegore=async(setdonemliste,id,donemisim,setdonemkayit,setdonembitis,setdonemnotu,setpaketisim,setpaketfiyat)=>{

    var items=[];
    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
      snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Donemler"){
         item2.forEach(item3=>{
             if(item3.val().danisanid==id){
                if(item3.val().isim==donemisim){
              items.push({
                donemnotu:item3.val().donemnotu,
                  paketisim:item3.val().paketisim,
                  isim:item3.val().isim,
                  paket:item3.val().paket,
                  kayittarihi:item3.val().kayittarihi.gun+" / "+item3.val().kayittarihi.ay+" / "+item3.val().kayittarihi.yil,
                  donemid:item3.val().donemid,
                  key:item3.val().key,
                  durum:item3.val().durum,
                  danisanid:item3.val().danisanid,
                  bitistarihi:item3.val().bitistarihi

              })
            }
             }
         })}})}
          )
          setpaketfiyat(parseInt(items[0].paket))
          setpaketisim(items[0].paketisim)
          setdonemnotu(items[0].donemnotu)
          setdonembitis(items[0].bitistarihi)
          setdonemkayit(items[0].kayittarihi)
      setdonemliste(items)
  });

}

export const _Donemsil=async(dankey,donemisim,danid,setdonemprogress,navigate)=>{

        const birinci=async()=>{

            setdonemprogress(true);
    
            const storageref=refstorage(storage,"/yuklemeler/"+danid+"/"+donemisim);
    
            await listAll(storageref).then(item=>item.prefixes.forEach(item2=>list(item2)
            .then(item3=>item3.items.forEach((item4)=>{deleteObject(item4);console.log("ss")})))).then(()=>{
                
            })
        }

        const ikinci=async()=>{

            await remove(ref(db,"/Danisanlar/"+dankey+"/Donemler/"+donemisim))
            .then(()=>setdonemprogress(false),
            navigate("/Admin/Danisanlarim/"+danid+"/?donemsil=basarili"))
            .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/?donemsil=basarisiz"));
   
            window.location.reload();
        }

           await birinci().then(()=>ikinci())
      
        
}


export const _Seansekle=async(key,donemisim,danid,navigate,seansnot,seanstur,kilo,setprogress,Seansadi)=>{
    setprogress(true)
    var zaman = new Date();
    const eklemetarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};

    const _Seansadi=Seansadi.charAt(0).toLocaleUpperCase('tr-TR') + Seansadi.slice(1);
    const _Seansnotu=seansnot.charAt(0).toLocaleUpperCase('tr-TR') + seansnot.slice(1);

    await update(ref(db,"/Danisanlar/"+key+"/Bilgiler/"),{
        kilo:kilo
    })


    await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim),{
        sonislemtarihi:eklemetarihi
    })


   await push(ref(db,"/Danisanlar/"+key+"/"+"Donemler/"+donemisim+"/Seanslar"),{
            seansadi:_Seansadi,
            seansid:short.generate(),
            seansnot:_Seansnotu,
            seanstur:seanstur,
            kilo:kilo,
            eklemetarihi:eklemetarihi

     }).then(()=>setprogress(false),
     navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?seansekleme=basarili"),
     ).catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?seansekleme=basarisiz"),
     )

}

export const _Seanslistele=(setseansliste,danisanid,donemisim)=>{

    var items=[];
    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        snapshot.forEach(item=>{item.child("Donemler").forEach(item2=>{if(item2.val().danisanid==danisanid){if(item2.key==donemisim){
            item2.child("Seanslar").forEach(item3=>{
                    items.push({
                        seansadi:item3.val().seansadi,
                        seansid:item3.val().seansid,
                        seansnot:item3.val().seansnot,
                        seanstur:item3.val().seanstur,
                        kilo:item3.val().kilo,
                        eklemetarihi:item3.val().eklemetarihi,
                        seanskey:item3.key,
                    })
            })
        }}}
        )})
        setseansliste(items)
    });

}

export const _Seansguncellemeislemi=async(key,donemisim,seanskey,seansadi,seanstur,seansnot,kilo,setprogress,navigate,danid)=>{
    setprogress(true)
    await update(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemisim+"/Seanslar/"+seanskey),{
            seansadi:seansadi,
            kilo:kilo,
            seansnot:seansnot,
            seanstur:seanstur
    }).then(()=>setprogress(false),
    navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?seansguncelleme=basarili"),
    ).catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?seansguncelleme=basarisiz"),
    )
}

export const _Seanssil=async(danid,key,donemadi,seanskey,setprogresssil,navigate)=>{
    setprogresssil(true)
    await remove(ref(db,"/Danisanlar/"+key+"/Donemler/"+donemadi+"/Seanslar/"+seanskey)).then(()=>window.location.reload(),setprogresssil(false),
    navigate("/Admin/Danisanlarim/"+danid+"/"+donemadi+"?seanssil=basarili"))
    .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemadi+"?seanssil=basarisiz"));

}


export const _Dosyayukle=async(dankey,danid,donemisim,dosyabaslik,diyetlistesi,vucutanalizi,navigate,setprogress)=>{
    setprogress(true)
    var zaman = new Date();
    var olusturmatarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};
    const _dosyabaslik =dosyabaslik.charAt(0).toLocaleUpperCase('tr-TR') + dosyabaslik.slice(1);
    const dosyaid=short.generate();
    var dosyaUrldiyetlistesi=[];
    var dosyaUrlvucutanalizi=[];


        for(let i=0;i<diyetlistesi.length;i++){
            if(diyetlistesi[i].size>30288000){

          }
          else{
            const storagedosya=refstorage(storage,"/yuklemeler/"+danid+"/"+donemisim+"/"+dosyaid+"/"+dosyaid+diyetlistesi[i].name+_dosyabaslik);
            await uploadBytes(storagedosya,diyetlistesi[i]);
            const urldosya=await getDownloadURL(storagedosya);
            dosyaUrldiyetlistesi.push(urldosya)

          }
        }

        for(let i=0;i<vucutanalizi.length;i++){
            if(vucutanalizi[i].size>30288000){


          }
          else{
            const storagedosya=refstorage(storage,"/yuklemeler/"+danid+"/"+donemisim+"/"+dosyaid+"/"+dosyaid+vucutanalizi[i].name+_dosyabaslik);
            await uploadBytes(storagedosya,vucutanalizi[i]);
            const urldosya=await getDownloadURL(storagedosya);
            dosyaUrlvucutanalizi.push(urldosya)

          }
        }

     await update(ref(db,"/Danisanlar/"+dankey+"/Donemler/"+donemisim),{
            sonislemtarihi:olusturmatarihi
        })


    push(ref(db,"/Danisanlar/"+dankey+"/Donemler/"+donemisim+"/Dosyalar"),{
        dosyaid:dosyaid,
        tarih:olusturmatarihi,
        dosyabaslik:_dosyabaslik,
        diyetlistesi:dosyaUrldiyetlistesi,
        vucutanalizi:dosyaUrlvucutanalizi

    }).then(()=>setprogress(false),
    navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?dosyaekle=basarili"),
    ).catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?dosyaekle=basarisiz"),

    )

}

export const _Dosyalistele=async(setdosyaliste,danisanid,donemisim)=>{

    var items=[];
    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        snapshot.forEach(item=>{item.child("Donemler").forEach(item2=>{if(item2.val().danisanid==danisanid){if(item2.key==donemisim){
            item2.child("Dosyalar").forEach(item3=>{
                    items.push({
                        dosyabaslik:item3.val().dosyabaslik,
                        tarih:item3.val().tarih.gun+" / "+item3.val().tarih.ay+" / "+item3.val().tarih.yil,
                        diyetlistesi:item3.val().diyetlistesi,
                        vucutanalizi:item3.val().vucutanalizi,
                        dosyakey:item3.key,
                        dosyaid:item3.val().dosyaid
                    })
            })
        }}}
        )})
        setdosyaliste(items)
    });

}

export const _Dosyasil=async(dosyaid,danid,dankey,donemisim,dosyakey,navigate,setprogresdosya)=>{
    setprogresdosya(true)
    const storageref=refstorage(storage,"/yuklemeler/"+danid+"/"+donemisim+"/"+dosyaid+"/");
    await listAll(storageref).then(item=>item.items.forEach(item=>deleteObject(item)));
   await remove(ref(db,"/Danisanlar/"+dankey+"/Donemler/"+donemisim+"/Dosyalar/"+dosyakey))
   .then(()=>window.location.reload(),setprogresdosya(false),
   navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?dosyasil=basarili"))
   .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?dosyasil=basarisiz"));

}

export const _Tahsilatekle=async(dankey,danid,donemisim,miktar,setprogress,navigate)=>{

    setprogress(true)
    var zaman = new Date();
    var olusturmatarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};
    const tahsilatid=short.generate();

    await update(ref(db,"/Danisanlar/"+dankey+"/Donemler/"+donemisim),{
        sonislemtarihi:olusturmatarihi
    })


    push(ref(db,"/Danisanlar/"+dankey+"/Donemler/"+donemisim+"/Tahsilatlar"),{
        miktar:miktar,
        tarih:olusturmatarihi,
        tahsilatid:tahsilatid
    }).then(()=>setprogress(false),
    navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?tahsilatekleme=basarili")
    ).catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?tahsilatekleme=basarisiz")
    )

}

export const _Tahsilatlisteleseciliyegore=async(settahsilatliste,danisanid,donemisim,settahsilattoplami)=>{

    var items=[];
    var sonuc=0;
    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        snapshot.forEach(item=>{item.child("Donemler").forEach(item2=>{if(item2.val().danisanid==danisanid){if(item2.key==donemisim){
            item2.child("Tahsilatlar").forEach(item3=>{
                    items.push({
                        tahsilatid:item3.val().tahsilatid,
                        miktar:item3.val().miktar,
                        tarih:item3.val().tarih.gun+" / "+item3.val().tarih.ay+" / "+item3.val().tarih.yil,
                        key:item3.key
                    })
            })
        }}}
        )})
        settahsilatliste(items)
        items.forEach(item=>{sonuc=sonuc+parseInt(item.miktar)})
        settahsilattoplami(sonuc);
    });

}

export const _Tahsilatsil=async(dankey,donemisim,danid,tahsilatkey,setprogresstahsilat,navigate)=>{
    setprogresstahsilat(true)
    await remove(ref(db,"/Danisanlar/"+dankey+"/Donemler/"+donemisim+"/Tahsilatlar/"+tahsilatkey))
    .then(()=>window.location.reload(),setprogresstahsilat(false),
    navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?tahsilatsil=basarili"))
    .catch(()=>navigate("/Admin/Danisanlarim/"+danid+"/"+donemisim+"?tahsilatsil=basarisiz"));
}


export const _Veriler=async(gelenay,gelenyil,setkisisayisi,setdonemsayisi,settahsilat,setprogress,settoplamtahsilat,settoplamdanisan,settoplamdonemsayisi)=>{
    setprogress(true)
    var yenikisi=0;
    var donemsayisi=0;
    var tahsilatmiktari=0;
    var toplamtahsilatmiktari=0;
    var toplamdanisan=0;
    var toplamdonemsayisi=0;
   
    onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        
        snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Bilgiler"){if(item2.val().kayittarihi.ay==gelenay && item2.val().kayittarihi.yil==gelenyil){
            yenikisi=yenikisi+1
        
        }}}
            )
        })})
        setkisisayisi(yenikisi.toString());


        onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        
            snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Bilgiler"){if(item2.val().kayittarihi.yil==gelenyil){
                toplamdanisan=toplamdanisan+1
            
            }}}
                )
            })})
            settoplamdanisan(toplamdanisan.toString());
        
        


        onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        
            snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Donemler"){item2.forEach(item3=>{
                if(item3.val().kayittarihi.ay==gelenay && item3.val().kayittarihi.yil==gelenyil){
                    donemsayisi=donemsayisi+1
                
                }
                
            })}}
                )
            })})
            setdonemsayisi(donemsayisi.toString())


            onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        
                snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Donemler"){item2.forEach(item3=>{
                    if(item3.val().kayittarihi.yil==gelenyil){
                        toplamdonemsayisi=toplamdonemsayisi+1
                    
                    }
                    
                })}}
                    )
                })})
                settoplamdonemsayisi(toplamdonemsayisi.toString())



            onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        
                snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Donemler"){item2.forEach(item3=>{
                   item3.child("Tahsilatlar").forEach(item4=>{if(item4.val().tarih.yil==gelenyil && item4.val().tarih.ay==gelenay){
                        tahsilatmiktari=tahsilatmiktari + parseInt(item4.val().miktar)
                   }})
                    
                })}}
                    )
                })})
                settahsilat(tahsilatmiktari.toString())

                
            onValue(ref(db,"/Danisanlar/"),(snapshot)=>{
        
                snapshot.forEach(item=>{item.forEach(item2=>{if(item2.key=="Donemler"){item2.forEach(item3=>{
                   item3.child("Tahsilatlar").forEach(item4=>{if(item4.val().tarih.yil==gelenyil){
                    toplamtahsilatmiktari=toplamtahsilatmiktari + parseInt(item4.val().miktar)
                   }})
                    
                })}}
                    )
                })})
                settoplamtahsilat(toplamtahsilatmiktari.toString())



                setprogress(false)

}

export const _Randevuekle=async(Randevutarih,randevuisim,baslangicsaati,bitissaati,setkontrol2)=>{
  //   var zaman = new Date().toLocaleString('tr-TR');
    setkontrol2(true)

    push(ref(db,"/Randevular/"),{
        baslangicsaat:baslangicsaati,
        bitissaati:bitissaati,
        start:Randevutarih,
        allDay:false,
      end:Randevutarih,
      title:randevuisim,
    
    }).then(()=>setkontrol2(false),window.location.reload()
    ).catch((error)=>console.log(error)
    )
        }

export const _Randevulistele=async(setrandevuliste)=>{


        onValue(ref(db,"/Randevular/"),(snapshot)=>{
                var items=[];
                snapshot.forEach(item=>{
                    items.push({
                        allDay:item.val().allDay,
                        baslangicsaat:item.val().baslangicsaat,
                        bitissaati:item.val().bitissaati,
                        title:item.val().title,
                        end:item.val().end,
                        start:item.val().start,
                        key:item.key
                    })
        
                })
                setrandevuliste(items)
            })
            
           
        }

        export const _Randevueventliste=async(setrandevuliste,setkontrol)=>{

            setkontrol(true);

            onValue(ref(db,"/Randevular/"),(snapshot)=>{
                    var items=[];
                    snapshot.forEach(item=>{
                        items.push({
                            allDay:item.val().allDay,
                            title:item.val().title,
                             start:new Date(item.val().start.yil,item.val().start.ay-1,item.val().start.gun,item.val().baslangicsaat.saat,item.val().baslangicsaat.dakika),
                             end:new Date(item.val().end.yil,item.val().end.ay-1,item.val().end.gun,item.val().bitissaati.saat,item.val().bitissaati.dakika),
                   
                        })
            
                    })
                    setrandevuliste(items)
                    setkontrol(false);
                })
                
                
            }

            export const _Randevusil=async(randevusilkey)=>{


              await remove(ref(db,"/Randevular/"+randevusilkey)).then(()=>window.location.reload())
              .catch((error)=>console.log(error));
            
            
            
            }

            
            export const _Randevusiltarihegore=async(gelengun)=>{
                
                onValue(ref(db,"/Randevular/"),(snapshot)=>{
                    snapshot.forEach(item=>{if(item.val().start.gun==gelengun){
                         remove(ref(db,"/Randevular/"+item.key)).then(()=>window.location.reload())

                    }
                       
                    })
                })

              }

              export const _Tumrandevularisil=async()=>{
                
                await remove(ref(db,"/Randevular/")).then(()=>window.location.reload())
                .catch((error)=>console.log(error));

              }
  




