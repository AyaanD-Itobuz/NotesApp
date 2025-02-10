import react from "react"
import zod from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


const passwordValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

const validationSchema = zod.object({
    userName : zod.string().min(3, { message: 'Must have at least 3 character' }),

    email: zod.string().min(1, { message: 'Must have at least 1 character' }).email({message: 'Must be a valid email'}),

    password: zod.string().min(1, { message: 'Must have at least 1 character' }).regex(passwordValidation, { message: 'Your password is not valid' }),
})

export function SignUp(){
    const {
        register,
        handleSubmit,
        formState: { errors }, 
      } = useForm({
        resolver: zodResolver(validationSchema),
      });

    async function onSubmit(data) {
        console.log(data);

        try{
            const response = await axios.post("http://localhost:8000/userData/register" , data);
            console.log(response)

            const display_status = document.getElementById("display_status");
            display_status.style.color = "white";
        }
        catch(error)
        {
            console.log("Error Occured: ",error)
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-[91.2vh] login bg-[#1f2937]">
                <div className="flex-col flex login-form bg-[#374151] p-20 rounded-md items-center">
                    <h2 className="font-bold text-white text-4xl text-center">SignUp</h2>
                    <div>
                        <form action="#" className="form flex-row justify-center items-center gap-9" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col">
                                <h3 className="text-white mt-8 font-bold">UserName:</h3>
                                {errors?.userName && <span className="text-red-500 font-semibold">{errors.userName.message}</span>}
                                <input type="text" className="rounded-sm" {...register('userName')} />
                            </div>
                        
                            <div className="flex flex-col">
                                <h3 className="text-white font-bold mt-5">Email</h3>
                                {errors?.email && <span className="text-red-500 font-semibold">{errors.email.message}</span>}
                                <input type="email" className="rounded-sm" {...register('email')} />
                            </div>
                        
                            <div className="flex flex-col">
                                <h3 className="text-white font-bold mt-5">Password</h3>
                                {errors?.password && <span className="text-red-500 font-semibold">{errors.password.message}</span>}
                                <input type="Password" className="rounded-sm" {...register('password')} />
                            </div>

                            <div className="flex justify-center items-center">

                                <button type="submit" className="p-2 bg-[#7F21FD] hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-white rounded-md mt-12">Submit</button>

                            </div>
                        </form>
                    </div>
                    <div>
                        <p className="text-[#374151] text-sm font-bold mt-5 cursor-default" id="display_status">
                            User Registered and Verification Email Sent
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}


