import react from "react";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

const validationSchema = zod.object({
  userName: zod.string().min(3, { message: "Must have at least 3 character" }),

  email: zod
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .email({ message: "Must be a valid email" }),

  password: zod
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .regex(passwordValidation, { message: "Your password is not valid" }),
});



export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        "http://localhost:8000/userData/register",
        data
      );
      console.log(response);
      // console.log(response.data.message);


      if (response.data.message == "Error: User Already Exists") {
        notifyError("User Already Exists");
      } else {
        notifySuccess("User Registered and Verification Email Send");
      }
    } catch (error) {
      console.log("Error Occured: ", error);
      notifyError(error.message);
    }
  }
  const notifySuccess = (msg) => toast.success(msg, { autoClose: 2000 });
  const notifyError = (msg) => toast.error(msg, { autoClose: 2000 });

  return (

    <>
      <div className="flex justify-center items-center h-[91.2vh] login bg-[#1f2937]">
        <div className="flex-col flex login-form bg-[#374151] p-20 rounded-md items-center">
          <h2 className="font-bold text-white text-4xl text-center">SignUp</h2>
          <div>
            <form
              className="form flex-row justify-center items-center gap-9"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col">
                <h3 className="text-white mt-8 font-bold">UserName:</h3>
                {errors?.userName && (
                  <span className="text-red-500 font-semibold">
                    {errors.userName.message}
                  </span>
                )}
                <input
                  type="text"
                  className="ps-2 min-w-[10vw] min-h-[5vh] rounded-sm placeholder:ps-2"
                  placeholder="Enter Your UserName"
                  {...register("userName")}
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-white font-bold mt-5">Email</h3>
                {errors?.email && (
                  <span className="text-red-500 font-semibold">
                    {errors.email.message}
                  </span>
                )}
                <input
                  type="email"
                  className="ps-2 min-w-[10vw] min-h-[5vh] rounded-sm placeholder:ps-2"
                  placeholder="Enter Your Email"
                  {...register("email")}
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-white font-bold mt-5">Password</h3>
                {errors?.password && (
                  <span className="text-red-500 font-semibold">
                    {errors.password.message}
                  </span>
                )}
                <input
                  type="Password"
                  className="ps-2 min-w-[10vw] min-h-[5vh] rounded-sm placeholder:ps-2"
                  placeholder="Enter Your Password"
                  {...register("password")}
                />
              </div>

              <div className="flex justify-center items-center">
              <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-12 p-5">Submit</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
