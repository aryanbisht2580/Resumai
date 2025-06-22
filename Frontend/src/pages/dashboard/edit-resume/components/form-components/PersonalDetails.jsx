
import React from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle, User, Briefcase, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, enanbledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: resumeInfo?.firstName || "",
    lastName: resumeInfo?.lastName || "",
    jobTitle: resumeInfo?.jobTitle || "",
    address: resumeInfo?.address || "",
    phone: resumeInfo?.phone || "",
    email: resumeInfo?.email || "",
  });

  const handleInputChange = (e) => {
    enanbledNext(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Personal Details Save Started");
    const data = {
      data: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        jobTitle: e.target.jobTitle.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
      },
    };
    if (resume_id) {
      try {
        const response = await updateThisResume(resume_id, data);
        toast("Resume Updated", "success");
      } catch (error) {
        toast(error.message, `failed`);
        console.log(error.message);
      } finally {
        enanbledNext(true);
        setLoading(false);
      }
    }
  };

  const inputFields = [
    { name: "firstName", label: "First Name", icon: User, required: true, span: 1 },
    { name: "lastName", label: "Last Name", icon: User, required: true, span: 1 },
    { name: "jobTitle", label: "Job Title", icon: Briefcase, required: false, span: 2 },
    { name: "address", label: "Address", icon: MapPin, required: true, span: 2 },
    { name: "phone", label: "Phone", icon: Phone, required: true, span: 1 },
    { name: "email", label: "Email", icon: Mail, required: true, span: 1 },
  ];

  return (
    <div className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-lg mt-10 overflow-hidden">
      
      <div className="relative bg-gradient-to-r from-gray-900 to-black p-8 pb-12">
      
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-black" strokeWidth={2} />
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold">Personal Details</h2>
            <p className="text-gray-300 mt-1">Build your professional identity</p>
          </div>
        </div>
      </div>

      
      <div className="p-8 -mt-6 relative">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <form onSubmit={onSave} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.name} className={field.span === 2 ? "col-span-2" : ""}>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <field.icon className="w-4 h-4 text-gray-500" strokeWidth={2} />
                    <span>{field.label}</span>
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative group">
                    <Input
                      name={field.name}
                      defaultValue={resumeInfo?.[field.name]}
                      required={field.required}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200 group-hover:border-gray-300"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                      <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="text-red-500">*</span> Required fields
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-900 disabled:from-gray-400 disabled:to-gray-500 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl min-w-[120px]"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save Details"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-gray-900 to-black"></div>
    </div>
  );
}

export default PersonalDetails;