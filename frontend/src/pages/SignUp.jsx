import react from "react"
import zod from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


const userLoginSchema = zod.object({
    body : zod.object({
        email : zod.string().email(),
        password: zod
            .string()
            .min(6)
            .refine(value => /[A-Z]/.test(value), {
                message: 'Password must contain at least one uppercase letter',
            })
            .refine(value => /[0-9]/.test(value), {
                message: 'Password must contain at least one number',
            })
            .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
                message: 'Password must contain at least one special character',
            })
    })
})

const passwordValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

const validationSchema = zod.object({
    name : zod.string().min(3, { message: 'Must have at least 3 character' }),

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

    function submitForm() {
        console.log('submit');
    }

    return (
        <>
            <div className="flex justify-center items-center h-[91.2vh] login bg-[#1f2937]">
                <div className="flex-col flex login-form bg-[#374151] p-20 rounded-md items-center">
                    <h2 className="font-bold text-white text-4xl text-center">SignUp</h2>
                    <div>
                        <form  className="form flex-row justify-center items-center gap-9" onSubmit={handleSubmit(submitForm)}>
                            <div className="flex flex-col">
                                <h3 className="text-white mt-8 font-bold">UserName:</h3>
                                {errors?.name && <span className="text-red-500">{errors.name.message}</span>}
                                <input type="text" className="rounded-sm" {...register('name')} />
                            </div>
                        
                            <div className="flex flex-col">
                                <h3 className="text-white font-bold mt-5">Email</h3>
                                {errors?.email && <span className="text-red-500">{errors.email.message}</span>}
                                <input type="email" className="rounded-sm" {...register('email')} />
                            </div>
                        
                            <div className="flex flex-col">
                                <h3 className="text-white font-bold mt-5">Password</h3>
                                {errors?.password && <span className="text-red-500">{errors.password.message}</span>}
                                <input type="Password" className="rounded-sm" {...register('password')} />
                            </div>

                            <div className="flex justify-center items-center">

                                <button type="submit" className="p-2 bg-[#7F21FD] hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-white rounded-md mt-12" onClick={createUser}>Submit</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

function createUser()
{
    console.log("create User Function called");
}
