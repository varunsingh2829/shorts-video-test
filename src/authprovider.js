import { createContext,useEffect,useState} from "react";
import {auth,firestore} from "./firebase";

export const authContext = createContext();

let AuthProvider = (props) => {

    let [user,setUser] = useState(null);
    let [loading,setLoading] = useState(true);

    useEffect(()=>{
       let unsub =  auth.onAuthStateChanged((user)=>{
            // console.log(user);
            let f = async() => {
                
                if(user){
                    let {displayName,email,uid,photoURL} = user;
                    // console.log(uid);
                   let docref = firestore.collection("users").doc(uid);
                   let documentsnapshot = await docref.get();
                   if(!documentsnapshot.exists){
                       docref.set({
                           displayName,email,photoURL
                       })
                   }
    
    
                    setUser({displayName,email,uid,photoURL});
                }else{
                    setUser(null);
    
                }
            }
            f();
            setLoading(false);
        })

        return () => {
            unsub();
        };

    },[]);

    return(
        <authContext.Provider value={user}>
            {!loading && props.children}
        </authContext.Provider>
    );

};
export default AuthProvider;