import { useContext, useEffect, useState } from "react";
import {auth ,storage,firestore} from "../firebase";
import {Navigate} from "react-router-dom";
import {authContext} from "../authprovider";
import "./home.css";
import Videocard from "./videocard";


let Home = () => {
    let user = useContext(authContext);
    let [post,setpost] = useState([]);
    // let {displayName,email,uid,photoURL} = user;
    useEffect(()=>{
       let unsub = firestore.collection("posts").onSnapshot((querysnapshot)=>{
            let docarr = querysnapshot.docs;
            let arr = [];
            for(let i=0;i<docarr.length;i++){
                arr.push({id:docarr[i].id,...docarr[i].data(),})
            }

            setpost(arr);

        });
        return ()=> {
            unsub()
    };
    },[]);
    
    return (
        <>
        {user? "" : <Navigate to="/login" />}
        <div className="shorts-div">

        {/* <h5>{displayName}</h5>
        <h5>{email}</h5> */}
        {/* <h5>{uid}</h5> */}
        {/* <img src="" alt="Girl in a jacket" width="500" height="600"/> */}
        <div className="video-container">
        <h1 className="title">Shorts</h1>
            {
                post.map((el)=>{
                    // console.log(el);
                return    <Videocard key={el.id} data={el}/>
                })
            }

        </div>
        <div onClick={()=>{
            auth.signOut();
        }} id="logout"><lord-icon
        onClick={()=>{
            auth.signOut();
        }}
        src="https://cdn.lordicon.com/hjbsbdhw.json"
        trigger="loop"
        colors="primary:#3a3347,secondary:#f24c00,tertiary:#b26836,quaternary:#ebe6ef"
        scale="55"
        htmlFor="logout"
        // style="width:250px;height:250px">
    ></lord-icon></div>
        </div>
        <label htmlFor="upload-icon" className="upload-img">
        <lord-icon
    src="https://cdn.lordicon.com/xhitaejr.json"
    trigger="loop"
    colors="outline:#131432,primary:#e83a30,secondary:#ffffff,secondary 2:#e4e4e4"
    stroke="0"
    scale="70"
    // style="width:250px;height:250px">
></lord-icon>
        </label>
        <input type="file"
        onClick={(e)=>{
            e.currentTarget.value=null;
        }} onChange={(e)=>{


            let videoObj = e.currentTarget.files[0];
            let{name,type,size} = videoObj;
            // console.log(videoObj);

            if(size>1024*1024*512){
                alert("file size exceed 10mb");
                return;
            }
            type = type.split("/")[0];
            name = name.split(".")[0];
            if(type!== "video"){
                alert("please upload video file");
                return;
            }

            // const storage = getStorage();
            // const storageRef = ref(storage, `/posts/${user.uid}/${Date.now()+"-"+name}`);
            // uploadBytes(storageRef, name).then((snapshot) => {
            //     console.log('Uploaded a blob or file!');
            //   });
            // storage.ref( `/posts/${user.uid}/${Date.now()+"-"+name}`);
            let uploadTask = storage.ref(`/posts/${user.uid}/${Date.now()+"-"+name}`).put(videoObj);
            uploadTask.on("state_changed",(e)=>{console.log((e.bytesTransferred/e.totalBytes)*100);},null,()=>{
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    firestore.collection("posts").add({name:user.displayName,url,likes:[],comments:[],music:name});
                    
                });
            });

        }} id = "upload-icon" className="upload"/>

        </>

    );
}

export default Home;