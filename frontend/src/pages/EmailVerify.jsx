import react from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

export function EmailVerify() {
    const[message , setMessage] = useState("Verifying...");
    const {token} = useParams();
    console.log(token);

    useEffect(() => {
        const verify = async() => {
            try{
                axios.defaults.headers = {
                    Authorization: "Bearer " + token,
                };
                
                await axios.get("http://localhost:8000/userData/verify");
                setMessage("Email Verified Successfully");
                console.log("Email Verified Successfully");
            }
            catch(error)
            {
                setMessage("Verification Failed...Possibly the link has expired")
                console.log("Error Occured: " + error)
            }
        }

        verify();
    } , token);

    return(
        <>
            <div className="flex flex-col justify-center items-center font-bold mt-5">
                <h2>Email Verification</h2>
                <p>{message}</p>
            </div>
        </>
    )
}