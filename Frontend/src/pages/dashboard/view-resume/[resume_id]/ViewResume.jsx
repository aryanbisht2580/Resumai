import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    dispatch(addResumeData(response.data));
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div id="noPrint" className="w-full max-w-5xl px-6 py-10">
        <h2 className="text-center text-3xl font-semibold mb-2">
          🎉 Your AI-Generated Resume is Ready!
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Download or share your professional resume with your network.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button
            onClick={HandleDownload}
            className="bg-white text-black hover:bg-gray-100 transition-all px-6 py-2 rounded-md"
          >
            Download PDF
          </Button>
          
        </div>
      </div>

      <div
        className="bg-white text-black w-[210mm] h-[297mm] rounded-md shadow-none p-6 print-area"
      >
        <ResumePreview />
      </div>
    </div>
  );
}

export default ViewResume;
