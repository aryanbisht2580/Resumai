import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";
import img from "/logo.png";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log(
          "Printing from Home Page there was a error ->",
          error.message
        );
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const hadnleGetStartedClick = () => {
    if (user) {
      console.log("Printing from Homepage User is There ");
      navigate("/dashboard");
    } else {
      console.log("Printing for Homepage User Not Found");
      navigate("/auth/sign-in");
    }
  };
  return (
    <>
      <Header user={user} />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 border-4 border-white rotate-45 transform -translate-x-48 -translate-y-48"></div>
          <div className="absolute top-1/3 right-0 w-64 h-64 border-4 border-white rotate-12 transform translate-x-32"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 border-4 border-white -rotate-12 transform translate-y-40"></div>
        </div>
        
        <div className="relative z-10 px-8 md:px-16 lg:px-24 pt-32 pb-20">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-20">
              <div className="inline-block mb-8">
                <div className="bg-white text-black px-4 py-2 text-sm font-bold tracking-wider uppercase mb-6 transform -rotate-2">
                  AI-Powered Resume Builder
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-8">
                <span className="block transform -skew-x-12 bg-white text-black px-8 py-4 mb-4 inline-block">
                  CREATE
                </span>
                <span className="block text-white stroke-text text-outline">
                  YOUR
                </span>
                <span className="block transform skew-x-12 bg-white text-black px-8 py-4 mt-4 inline-block">
                  FUTURE
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                Revolutionary AI-driven resume builder that transforms your career story into an irresistible professional narrative
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <button
                  onClick={hadnleGetStartedClick}
                  className="group relative px-12 py-4 bg-white text-black text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:bg-black hover:text-white border-4 border-white hover:border-white transform hover:scale-105 hover:-rotate-1"
                >
                  <span className="relative z-10">Start Building</span>
                  <div className="absolute inset-0 bg-black transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </button>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 transform -skew-y-1">
              WHY CHOOSE US?
            </h2>
            <div className="w-32 h-2 bg-black mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-black text-white p-8 transform transition-all duration-300 hover:scale-105 hover:-rotate-2">
                <div className="text-4xl font-black mb-4">01</div>
                <h3 className="text-2xl font-bold mb-4">AI-POWERED</h3>
                <p className="text-gray-300">Advanced algorithms craft personalized resumes that stand out</p>
              </div>
            </div>
            
            <div className="group">
              <div className="border-4 border-black p-8 transform transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-black hover:text-white">
                <div className="text-4xl font-black mb-4">02</div>
                <h3 className="text-2xl font-bold mb-4">INSTANT</h3>
                <p className="opacity-75">Generate professional resumes in seconds, not hours</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-black text-white p-8 transform transition-all duration-300 hover:scale-105 hover:-rotate-2">
                <div className="text-4xl font-black mb-4">03</div>
                <h3 className="text-2xl font-bold mb-4">PROVEN</h3>
                <p className="text-gray-300">Templates tested and approved by hiring managers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              EXPERIENCE THE
              <span className="ml-4 block bg-white text-black px-8 py-2 mt-4 transform skew-x-12 inline-block">
                POWER
              </span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="absolute  bg-white transform rotate-2"></div>
            <div className="relative bg-black border-8 border-white overflow-hidden">
              
              <div className="bg-white text-black p-4 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <div className="w-4 h-4 border-2 border-black rounded-full"></div>
                  <div className="w-4 h-4 border-2 border-black rounded-full"></div>
                </div>
                <img src={img} className="h-10 grayscale"></img>
                
                <FaInfoCircle className="text-black" />
              </div>
              
              
              <div className="p-4 bg-white">
                <img
                  className="w-full object-cover filter grayscale contrast-125 transition-all duration-500 hover:scale-105"
                  src={heroSnapshot}
                  alt="Dashboard Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}

export default HomePage;