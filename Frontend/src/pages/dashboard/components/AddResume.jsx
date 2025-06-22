import React from "react";
import { useState } from "react";
import { CopyPlus, Loader, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "")
      return console.log("Please add a title to your resume");
    const data = {
      data: {
        title: resumetitle,
        themeColor: "#000000",
      },
    };
    console.log(`Creating Resume ${resumetitle}`);
    createNewResume(data)
      .then((res) => {
        console.log("Prinitng From AddResume Respnse of Create Resume", res);
        Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };

  return (
    <>
      <div
        className="group relative p-12 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl h-[380px] hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
        onClick={() => setOpenDialog(true)}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-black opacity-5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-black opacity-5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500"></div>
        
        {/* Main icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Plus className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center">
            <CopyPlus className="w-3 h-3 text-black" strokeWidth={2} />
          </div>
        </div>
        
        {/* Text content */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">
            Create Resume
          </h3>
          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
            Start building your professional resume
          </p>
        </div>
        
        {/* Subtle border animation */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-black transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl border-0 shadow-2xl">
          <DialogHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center mb-4 shadow-lg">
              <CopyPlus className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Create New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Give your resume a memorable title to get started
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="relative">
              <Input
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200 text-center font-medium"
                type="text"
                
                value={resumetitle}
                onChange={(e) => setResumetitle(e.target.value.trimStart())}
              />
              {resumetitle && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-black rounded-full"></div>
              )}
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setOpenDialog(false)}
                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg font-medium transition-all duration-200"
              >
                Cancel
              </Button>
              
              <Button 
                onClick={createResume} 
                disabled={!resumetitle || loading}
                className="flex-1 py-3 bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-900 disabled:from-gray-400 disabled:to-gray-500 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Resume"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;