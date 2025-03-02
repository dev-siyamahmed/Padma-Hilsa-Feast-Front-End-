import React from 'react'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {

    const { googleLogin , facebookLogin } = useAuth()
    const navigate = useNavigate()

    const handleSocialLogin = (user) => {
        user().then(res => {
            if (res.user) {
                toast.success('User Login in successfully!')
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }

        }).catch(error => {
            toast.error(error);
        })
    }
    return (
        <>
            <button onClick={() => handleSocialLogin(googleLogin)} type="submit" className="w-full  flex items-center justify-center 2xl:gap-2 lg:gap-2 gap-1 py-3 2xl:px-6 lg:px-2 text-[16px]  font-normal tracking-wide text-gray-800 border border-gray-300 rounded-md bg-[#E4E4E4]  ">
                <FcGoogle size={20} />
                google
            </button>
            
        </>
    )
}
