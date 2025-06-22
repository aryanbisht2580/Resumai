import { FaEye, FaEdit, FaTrashAlt, FaBook, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const patterns = [
  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)",
  "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.02) 15px, rgba(0,0,0,0.02) 30px)",
  "radial-gradient(circle at 20% 80%, rgba(0,0,0,0.04) 0%, transparent 50%)",
  "linear-gradient(135deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.02) 75%, transparent 75%)",
  "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0,0,0,0.025) 8px, rgba(0,0,0,0.025) 16px)"
];

const getRandomPattern = () => {
  return patterns[Math.floor(Math.random() * patterns.length)];
};

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const pattern = getRandomPattern();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    console.log("Delete Resume with ID", resume._id);
    try {
      const response = await deleteThisResume(resume._id);
    } catch (error) {
      console.error("Error deleting resume:", error.message);
      toast(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };

  return (
    <div
      className="group relative bg-white border-2 border-gray-200 h-[380px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-black transition-all duration-300 cursor-pointer"
      style={{ backgroundImage: pattern }}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-black opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-black opacity-5 rounded-full translate-y-6 -translate-x-6 group-hover:scale-110 transition-transform duration-500"></div>
      
      {/* Header section */}
      <div className="relative p-8 pb-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 group-hover:from-white group-hover:to-gray-50 transition-all duration-300">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <FaBook className="text-white text-lg" />
          </div>
        </div>
        
        
        
        {/* Accent line */}
        <div className="mx-auto mt-4 w-12 h-0.5 bg-gray-300 group-hover:bg-black group-hover:w-16 transition-all duration-300"></div>
      </div>

      {/* Content area with subtle pattern */}
      <div className="flex-1 relative p-6 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 mx-auto bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
            <div className="w-4 h-3 border border-gray-400 rounded-sm"></div>
          </div>
          <h2 className="text-center font-bold text-lg text-gray-900 leading-tight px-2 group-hover:text-black transition-colors duration-300">
          {resume.title}
        </h2>
        </div>
      </div>

      {/* Action buttons */}
      <div className="relative p-4 bg-gray-50 border-t border-gray-100 group-hover:bg-white transition-all duration-300">
        <div className="flex items-center justify-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
            className="w-12 h-12 p-0 rounded-full hover:bg-gray-200 hover:scale-110 transition-all duration-200 group"
          >
            <FaEye className="text-gray-600 group-hover:text-black transition-colors duration-200" />
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
            className="w-12 h-12 p-0 rounded-full hover:bg-gray-200 hover:scale-110 transition-all duration-200 group"
          >
            <FaEdit className="text-gray-600 group-hover:text-black transition-colors duration-200" />
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => setOpenAlert(true)}
            className="w-12 h-12 p-0 rounded-full hover:bg-red-50 hover:scale-110 transition-all duration-200 group"
          >
            <FaTrashAlt className="text-gray-600 group-hover:text-red-600 transition-colors duration-200" />
          </Button>
        </div>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="bg-white rounded-2xl border-0 shadow-2xl max-w-md">
          <AlertDialogHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
              <FaTrashAlt className="text-white text-xl" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-gray-900">
              Delete Resume?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mt-2">
              This action cannot be undone. This will permanently delete your resume "{resume.title}" and remove all data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter className="flex gap-3 pt-6">
            <AlertDialogCancel 
              onClick={() => setOpenAlert(false)}
              className=" flex-1 py-3 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg font-medium transition-all duration-200"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={loading}
              className="flex-1 py-3 bg-black text-white hover:bg-red-700 disabled:bg-gray-400 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete Resume"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCard;