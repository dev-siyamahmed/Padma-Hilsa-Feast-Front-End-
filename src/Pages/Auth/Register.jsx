import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const axiosPublic = useAxiosPublic()

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const handleTogglePassword = () => {
  //   setShowPassword(!showPassword);
  // };


  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Toggle Password Visibility
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)


  const { createUser, handleUpdateProfile } = useAuth();
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.userName;

    // 
    const newUser = { name, email, password, };
    try {
      // Step 1: Backend-এ user-এর তথ্য পাঠানো (Firebase-এ এখনো set হবে না)
      const res = await axiosPublic.post("/auth/register", newUser);

      console.log(res);

      if (res.data.success) {
        toast.success("OTP has been sent! Please verify your email.");
        // navigate("/otp-verification");
        navigate("/otp-verification", { state: { email, password, name } });
      } else {
        toast.error("Registration failed! Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("This email already exists or another issue occurred.");
    }

  };

  return (
    <div className="font-poppins flex items-center justify-center min-h-screen md:mt-6">
      <div className=" w-full max-w-md bg-white rounded-lg shadow-md md:p-6 p-3 ">

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <div>
            <label className="text-[#152A16] text-[15px] mb-2 block font-medium">Name</label>
            <div className="relative flex items-center">
              <input
                {...register("userName")}
                name="userName"
                type="text"
                required
                className="w-full text-sm text-gray-800 bg-gray-50 focus:bg-transparent px-4 py-3.5 rounded-md"
                placeholder="@username"
              />
            </div>
          </div>

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
          {/* <div className="mt-4">
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
          </div> */}


          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block font-medium">Password</label>
            <div className="relative flex items-center">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                type={showPassword ? "text" : "password"}
                className="w-full text-sm text-[#152A16] bg-gray-50 focus:bg-transparent px-4 py-3.5 rounded-md"
                placeholder="Enter password"
              />
              <button type="button" className="absolute right-4 text-[#bbb]" onClick={handleTogglePassword}>
                {showPassword ? <IoEyeOffOutline size={24} /> : <IoEyeOutline size={24} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block font-medium">Confirm Password</label>
            <div className="relative flex items-center">
              <input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full text-sm text-[#152A16] bg-gray-50 focus:bg-transparent px-4 py-3.5 rounded-md"
                placeholder="Confirm password"
              />
              <button type="button" className="absolute right-4 text-[#bbb]" onClick={handleToggleConfirmPassword}>
                {showConfirmPassword ? <IoEyeOffOutline size={24} /> : <IoEyeOutline size={24} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 border-gray-300 rounded-md" required />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-[#156BCA]">
                Accept Terms of Service
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              // disabled={password !== confirmPassword || !password}
              className={`w-full flex items-center justify-center py-3 px-6 text-sm tracking-wide rounded-md text-white ${
                password === confirmPassword && password ? "bg-[#156BCA] hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              } focus:outline-none`}
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="my-4 flex items-center gap-3">
          <hr className="flex-1 border-gray-300" />
          <p className=" text-[#5C635A] text-[14px] font-normal text-center">Or Continue with Email</p>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className='flex items-center 2xl:gap-4 lg:gap-2 gap-2 px-1 '>
          {/* <SocialLogin /> */}
        </div>
        <div className="mt-1">
          <p className="text-md mt-4 text-center text-gray-800">Don't have an account?
            <Link to={'/login'}>
              <span className="text-[#156BCA] font-semibold underline ml-1 whitespace-nowrap">Login here</span>
            </Link></p>
        </div>

      </div>
    </div>
  );
}
