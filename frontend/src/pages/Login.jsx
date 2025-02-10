import react from "react"

export function Login(){ 
    
    function search() {
        const {email , password} = 
        
        console.log("reached")
        console.log()
    }

    return (
    <>
        <div className="flex justify-center items-center h-[91.2vh] login bg-[#1f2937]">
            
            <div className="flex-col flex bg-[#374151] p-20 rounded-md items-center login-form">
                <h2 className=" font-bold text-white text-4xl text-center">LogIn</h2>
                <form action="#">
                    <h3 className="text-white mt-8 font-bold">Enter Email:</h3>
                    <input name="email" id="email" className="rounded-sm"/>
                    <h3 className="text-white font-bold mt-5">Enter Password</h3>
                    <input name="password" id="password" className="rounded-sm" type="password"/>
                </form>
                    <button onClick={search} className="p-2 content-center bg-[#7F21FD] hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-white rounded-md mt-12">Submit</button>
            </div> 
        </div>
    </>       
        
    );
}