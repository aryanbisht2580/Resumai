import React, { useState } from "react";
import { X, Lock, Eye, EyeOff, LogIn, User, UserPlus } from "lucide-react";

import { motion } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  const handleSignInSubmit = async (event) => {
    setSignInError("");
    event.preventDefault();
    const { email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setSignInError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const data = { email: email.value, password: password.value };
    try {
      const user = await loginUser(data);
      if (user?.statusCode === 200) {
        navigate("/");
      }
    } catch (error) {
      setSignInError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    setSignUpError("");
    event.preventDefault();
    const { fullname, email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setSignUpError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const data = { fullName: fullname.value, email: email.value, password: password.value };
    try {
      const response = await registerUser(data);
      if (response?.statusCode === 201) {
        handleSignInSubmit(event);
      }
    } catch (error) {
      setSignUpError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
      <button onClick={handleGoBack} className="absolute top-4 right-4 p-1.5 border border-black rounded-md text-white bg-black">
        <X size={18} />
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-black mb-2">Welcome</h1>
          <p className="text-gray-600 text-sm">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${!isSignUp ? "bg-black text-white shadow-sm" : "text-gray-600 hover:text-black"}`}
          >
            <LogIn size={16} /> Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${isSignUp ? "bg-black text-white shadow-sm" : "text-gray-600 hover:text-black"}`}
          >
            <UserPlus size={16} /> Sign Up
          </button>
        </div>

        <div className="relative overflow-hidden">
          {isSignUp ? (
            <form onSubmit={handleSignUpSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input icon={<User />} name="fullname" placeholder="Full Name" />
                <Input icon={<User />} name="email" type="email" placeholder="Email Address" />
                <PasswordInput show={showPassword} toggle={() => setShowPassword(!showPassword)} />
              </div>
              <SubmitButton loading={loading} text="Create Account" />
              {signUpError && <ErrorBox message={signUpError} />}
            </form>
          ) : (
            <form onSubmit={handleSignInSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input icon={<User />} name="email" type="email" placeholder="Email Address" />
                <PasswordInput show={showPassword} toggle={() => setShowPassword(!showPassword)} />
              </div>
              <SubmitButton loading={loading} text="Sign In" />
              {signInError && <ErrorBox message={signInError} />}
            </form>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            {isSignUp ? (
              <>Already have an account? <button onClick={() => setIsSignUp(false)} className="text-black font-medium hover:underline">Sign In</button></>
            ) : (
              <>Don't have an account? <button onClick={() => setIsSignUp(true)} className="text-black font-medium hover:underline">Sign Up</button></>
            )}
          </p>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">Demo: Use "test@test.com" for successful login simulation</p>
        </div>
      </div>
    </div>
  );
}

const Input = ({ icon, name, placeholder, type = "text" }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black bg-white"
    />
  </div>
);

const PasswordInput = ({ show, toggle }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <Lock />
    </div>
    <input
      name="password"
      type={show ? "text" : "password"}
      placeholder="Password"
      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black bg-white"
    />
    <button
      type="button"
      onClick={toggle}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
    >
      {show ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
);

const SubmitButton = ({ loading, text }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
  >
    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> {text}...</> : text}
  </button>
);

const ErrorBox = ({ message }) => (
  <div className="text-red-600 text-sm text-center mt-3">{message}</div>
);

export default AuthPage;
