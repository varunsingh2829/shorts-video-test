// import {Redirect} from "react-router-dom";
import {useContext } from "react";
import {Signwithgoogle} from "../firebase"
import {Navigate} from "react-router-dom";
import {authContext} from "../authprovider";

let Login = () => {
    let user = useContext(authContext);
    
    return (
        <><div className="login">

        {user? <Navigate to="/"/> : ""}
        <button onClick={()=>{
            Signwithgoogle();
        }} className="btn btn-primary login-btn">login with google</button>
        </div>

        
        
        </>

    );
}

export default Login;