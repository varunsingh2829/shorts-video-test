import "./videocard.css";
// import video1 from "../video/1.mp4";
// import comment from "../icons/comment.png";
import send from "../icons/send.png";
import { useContext, useEffect, useState } from "react";
import {firestore} from "../firebase";
import {authContext} from "../authprovider";

let Videocard = (props) => {

    let [playing,setplaying] = useState(false);
    let [commentopen,setcomment] = useState(false);
    let [commwrite,setcommwrite] = useState("");
    // let [like,setlike] = useState(false);
    let [commentget,setcommentget] = useState([]);
    let user = useContext(authContext);
    // console.log(user);
    let like;
    if(user){

        like = props.data.likes.includes(user.uid);
    }
    // console.log(like);
    useEffect(()=>{
    let f = async () => {
        let commentsarr = props.data.comments;
        let arr = [];
        for(let i=0;i<commentsarr.length;i++){
            let commentDoc = await firestore.collection("comments").doc(commentsarr[i]).get();
            arr.push(commentDoc.data());
            // console.log(commentDoc.data());
        }

        setcommentget(arr);
        
    };
    // return () => {
    //     unsub();
    // };

    f(); 
    },[props]);
    
    return (
        
        <div className="video-card-main">
            <span className="music-btn">
            
    <lord-icon
    src="https://cdn.lordicon.com/rsvjbeuw.json"
    trigger="loop"
    colors="primary:#ee6d66,secondary:#16c72e,tertiary:#3080e8"
    // style="width:250px;height:250px">
></lord-icon>

<span className="music-name">{props.data.music? (props.data.music):""}</span>


            </span>
            {like ? (<span className="like-btn">
            <lord-icon onClick={(e)=>{
                if(like){
                    let likesarr = props.data.likes;
                    likesarr = likesarr.filter((el)=>el!==user.uid);
                    firestore.collection("posts").doc(props.data.id).update({likes:likesarr});
                }else{
                    let likesarr = props.data.likes;
                    likesarr.push(user.uid);
                    firestore.collection("posts").doc(props.data.id).update({likes:likesarr});
                    
                }
            }}
    src="https://cdn.lordicon.com/iwaotjbp.json"
    trigger="loop"
    colors="primary:#F43108,secondary:#91311D"
    
    scale="70"
    // style={{width:'left'}}
    // style="width:250px;height:250px">
></lord-icon>

            </span>):(<span className="like-btn">
            <lord-icon onClick={(e)=>{
                if(like){
                    let likesarr = props.data.likes;
                    likesarr = likesarr.filter((el)=>el!==user.uid);
                    firestore.collection("posts").doc(props.data.id).update({likes:likesarr});
                }else{
                    let likesarr = props.data.likes;
                    likesarr.push(user.uid);
                    firestore.collection("posts").doc(props.data.id).update({likes:likesarr});
                    
                }
            }}
            src="https://cdn.lordicon.com/iwaotjbp.json"
            trigger="loop"
            colors="primary:#F3B9BC,secondary:#c71f16"
            scale="70"
            // style={{width:'left'}}
            // style="width:250px;height:250px">
></lord-icon>

            </span>)}
            <label className="likelabel">like</label>
            
            <span className="comm-icon" onClick={()=>{
                
                if(commentopen){
                    setcomment(false);
                }else{
                    setcomment(true);
                }
                
            }}>
                <lord-icon
    src="https://cdn.lordicon.com/kjkiqtxg.json"
    trigger="loop"
    colors="outline:#242424,primary:#000000,secondary:#4bb3fd,tertiary:#b4b4b4"
    // style="width:250px;height:250px">
></lord-icon>
            </span>
                <label className="commentlabel">comment</label>

            {commentopen ? (<div className="comment-box-main">
                <div className="comment-profile-all">

                    {
                        // console.log(commentg);
                        commentget.map((el)=>{
                           return (
                            <div className="comment-profile" >

                            <p className="comment-profile-img">
                                {/* {console.log(el.photo)} */}
                                <img src={el.photo} alt="user pic"/>
            
                            </p>
                            <div className="comment-profile-info">
                                <h6 className="profile-name">{el.name}</h6>
                                <p className="actual-comment">{el.comment}</p>
                            </div>
                            </div>
                            
                           );

                            // console.log(postDoc);
                            
                            
                            



                        })
                    }

                
                </div>
                <div className="comment-input-main">
                    <input className="input" type="text" placeholder="write  a comment" value={commwrite}
                    onChange={(e)=>{
                        setcommwrite(e.currentTarget.value);
                    }} />
                    <img src={send} alt="send" className="comment-btn"
                    onClick={async()=>{
                        let docRef = await firestore.collection("comments").add({
                            name:user.displayName,comment:commwrite,photo:user.photoURL,

                        })
                        setcommwrite(""); 
                        let doc = await docRef.get();
                        let commentId = doc.id;
                        let postDoc= await firestore.collection("posts").doc(props.data.id).get();
                        let postcommentsarr = postDoc.data().comments;
                        postcommentsarr.push(commentId);
                        await firestore.collection("posts").doc(props.data.id).update({
                            comments:postcommentsarr,
                        })
                        
                    }}
                    />

                </div>

            </div>) :("")}
            <video
            onClick={(e)=>{
                if(playing){
                    e.currentTarget.pause();
                    setplaying(false);
                }else{
                    e.currentTarget.play();
                    setplaying(true);

                }
            }}
            loop
                className="video-card"
            >
            <source src={props.data.url} type="video/mp4"/>
            </video>
        </div>
    )

}

export default Videocard;