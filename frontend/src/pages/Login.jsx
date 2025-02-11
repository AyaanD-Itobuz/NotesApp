import react from "react"
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer , toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export function Login(){ 
    const notifySuccess = (msg) => toast.success(msg, { autoClose: 2000 });
    const notifyError = (msg) => toast.error(msg, { autoClose: 2000 });  
    const{register, handleSubmit} = useForm()
    const navigate = useNavigate();

    async function userLogin(data) {
        try{
            console.log("reached")
            console.log("Data: ",data)

            const response = await axios.post("http://localhost:8000/userData/login",data)
            console.log("Response",response);
            
            if(data.email == "" && data.password == "")
                {
                    notifyError("Please Enter Details to Login")
                }
                else if(data.password == "")
                {
                    notifyError("Please Enter Password to Login")
                }
                else if(data.email == "")
                {
                    notifyError("Please Enter Email to Login")
                }
                else if(response.data.status == "400")
                {
                    notifyError("User Not Registered")
                }
                else
                {
                    
                    notifySuccess("Login Suggessful")
                    console.log("login")
                    //Accessing Access Token , Refresh Token , userName
                    const access_token = response.data.token;
                    const refresh_token = response.data.refreshToken;
                    const userName = response.data.userName;
                    
                    // console.log("AccessToken: ",access_token);
                    // console.log("Refresh Token: ",refresh_token)
            
                    //Storing Data to Local Storage
                    localStorage.setItem("accessToken" , access_token)
                    localStorage.setItem("refreshToken" , refresh_token)
                    localStorage.setItem("userName" , userName)

                  
                    await navigate("/Notes" , {replace:true})
                }
            }
            catch(error)
            {
                // console.log(error)
                notifyError("Invalid User");
                console.log("Error Occured : ", error.message)
            }
    }

    function reDirect_to_Notes()
    {
        const navigate = useNavigate();
        navigate("/NotesPage")
    }

    return (
    <>
        <div className="flex justify-center items-center h-[91.2vh] login bg-[#1f2937]">
            
            <div className="flex-col flex bg-[#374151] p-20 rounded-md items-center login-form">
                <h2 className=" font-bold text-white text-4xl text-center">LogIn</h2>
                <form action="#" onSubmit={handleSubmit(userLogin)}>
                    <h3 className="text-white mt-8 font-bold">Email:</h3>
                    <input  className="rounded-sm" placeholder="Enter Your Email" {...register("email")}/>
                    <h3 className="text-white font-bold mt-5">Password</h3>
                    <input  className="rounded-sm" placeholder="Enter Your Password" type="password" autoComplete="on" {...register("password")}/>
                    <div className="flex justify-center items-center">
                        <button  className="p-2  bg-[#7F21FD] hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-white rounded-md mt-12">Submit</button>
                    </div>
                </form>
            </div> 
        </div>
    </>       
        
    );
}