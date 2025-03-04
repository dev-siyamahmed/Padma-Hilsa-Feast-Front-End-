import { useState } from "react";
// react icons
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import SocialLogin from "../../Pages/Auth/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { signin } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    console.log(data);

    signin(email, password)
      .then((res) => {
        toast.success('Login Successfully!')
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast("Invalid Email or Password!");
      });
  };


  return (
    <div>
      <div className="font-poppins flex items-center justify-center min-h-screen md:mt-6 ">

        {/* Form section */}
        <div className=" w-full max-w-md bg-white rounded-lg shadow-md md:p-6  p-3 ">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="px-2">

            {/* Email field */}
            <div className="mt-4">
              <label className="text-[#152A16] text-[15px] mb-2 block font-medium">Email</label>
              <div className="relative flex items-center">
                <input
                  {...register("email")}
                  name="email"
                  type="email"
                  required
                  className="w-full text-sm text-gray-800 bg-gray-50 focus:bg-transparent px-4 py-3.5 rounded-md"
                  placeholder="Enter email"
                />
                <CiMail className="w-[24px] h-[24px] absolute right-4 text-[#bbb]" />
              </div>
            </div>

            {/* Password field */}
            <div className="mt-4">
              <label className="text-gray-800 text-[15px] mb-2 block font-medium">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register("password")}
                  required
                  className="w-full text-sm text-[#152A16] bg-gray-50 focus:bg-transparent px-4 py-3.5 rounded-md"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="absolute right-4 text-[#bbb]"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={24} />
                  ) : (
                    <IoEyeOutline size={24} />
                  )}
                </button>
              </div>
            </div>



            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 border-gray-300 rounded-md" required />
                <label htmlFor="remember-me" className="ml-1 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a href="javascript:void(0);" className="text-[#156BCA] font-semibold text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>


            <div className="mt-8">
              <button type="submit" className="w-full lg:w-[271px] mx-auto flex items-center justify-center py-3 px-6 text-sm tracking-wide rounded-md text-white bg-[#156BCA] hover:bg-blue-700 focus:outline-none">
                Sign in
              </button>
            </div>
          </form>

          <div className="my-4 flex items-center gap-3">
            <hr className="flex-1 border-gray-300" />
            <p className=" text-[#5C635A] text-[14px] font-normal text-center">Or Continue with Email</p>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className='flex items-center 2xl:gap-4 lg:gap-2 gap-2 px-1 '>
            <SocialLogin />
          </div>

          <div className="mt-1 px-0.5">
            <p className="text-md mt-4 text-center text-gray-800">Don't have an account?
              <Link to={'/register'}>
                <span className="text-[#156BCA] font-semibold underline ml-1 whitespace-nowrap">Register here</span>
              </Link></p>
          </div>

        </div>

      </div>
    </div>
  )
}
