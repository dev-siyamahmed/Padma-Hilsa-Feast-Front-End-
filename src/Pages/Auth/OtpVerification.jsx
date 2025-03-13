import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Ensure only numbers are entered
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !otp) {
      toast.error('Please enter both email and OTP.');
      return;
    }
    // Convert OTP to a number
    const otpAsNumber = +otp; 

    try {
      const response = await axiosPublic.post('/auth/verify-otp', { email, otp: otpAsNumber });
      if (response.data.success) {
        toast.success('OTP verified successfully!');
        navigate('/'); // Redirect to dashboard or desired page
      } else {
        toast.error('Invalid OTP or email, please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Failed to verify OTP. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Enter Email and OTP
        </h2>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Valid Email"
            className="w-full text-center p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {/* OTP Input */}
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP"
            inputMode="numeric"        // Ensures numeric keyboard on mobile
            pattern="\d*"              // Ensures only numbers
            maxLength={6}              // Maximum 6 digits
            className="w-full text-center p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Verify OTP
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Didn't receive the code? <span className="text-blue-600 cursor-pointer">Resend OTP</span>
        </p>
      </div>
    </div>
  );
}
