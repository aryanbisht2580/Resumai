import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Trash2, GraduationCap, Plus, Building, MapPin, Calendar, User, BookOpen, Award } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateResumeData } from "@/Services/GlobalApi";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  grade: "",
  gradeType: "CGPA",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({ resumeInfo, enanbledNext, enanbledPrev }) {
  const [educationalList, setEducationalList] = React.useState(
    resumeInfo?.education || []
  );
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    try {
      dispatch(addResumeData({ ...resumeInfo, education: educationalList }));
    } catch (error) {
      console.log("error in education context update", error.message);
    }
  }, [educationalList]);

  const addEducation = () => {
    if (!educationalList) {
      setEducationalList([formFields]);
      return;
    }
    setEducationalList([...educationalList, formFields]);
  };

  const removeEducation = (index) => {
    const list = [...educationalList];
    const newList = list.filter((item, i) => {
      if (i !== index) return true;
    });
    setEducationalList(newList);
  };

  const handleChange = (e, index) => {
    enanbledNext && enanbledNext(false);
    enanbledPrev && enanbledPrev(false);
    const { name, value } = e.target;
    const list = [...educationalList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setEducationalList(list);
  };

  const onSave = () => {
    if (educationalList.length === 0) {
      return toast("Please add atleast one education", "error");
    }
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };
    if (resume_id) {
      console.log("Started Updating Education");
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          enanbledNext && enanbledNext(true);
          enanbledPrev && enanbledPrev(true);
          setLoading(false);
        });
    }
  };

  return (
    <div className="space-y-8">
      
      <div className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        
        <div className="relative bg-gradient-to-r from-gray-900 to-black p-8 pb-12">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-black" strokeWidth={2} />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">Education</h2>
              <p className="text-gray-300 mt-1">Add your educational background and qualifications</p>
            </div>
          </div>
        </div>

        
        <div className="p-8 -mt-6 relative space-y-6">
          {educationalList?.map((education, index) => (
            <div key={index} className="bg-white rounded-xl border-2 border-gray-100 shadow-sm overflow-hidden">
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        Education {index + 1}
                      </h3>
                      <div className="w-12 h-0.5 bg-black rounded-full mt-1"></div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => removeEducation(index)}
                    className="border-2 border-red-200 text-red-600 hover:border-red-500 hover:bg-red-50 rounded-lg p-2 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                  </Button>
                </div>
              </div>

              
              <div className="p-6 space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-500" strokeWidth={2} />
                    <span>University Name</span>
                  </label>
                  <div className="relative group">
                    <Input
                      type="text"
                      name="universityName"
                      value={education?.universityName}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="e.g. Harvard University"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                      <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                    </div>
                  </div>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" strokeWidth={2} />
                      <span>Degree</span>
                    </label>
                    <div className="relative group">
                      <Input
                        type="text"
                        name="degree"
                        value={education?.degree}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="e.g. Bachelor of Science"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-500" strokeWidth={2} />
                      <span>Major</span>
                    </label>
                    <div className="relative group">
                      <Input
                        type="text"
                        name="major"
                        value={education?.major}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="e.g. Computer Science"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" strokeWidth={2} />
                      <span>Start Date</span>
                    </label>
                    <div className="relative group">
                      <Input
                        type="date"
                        name="startDate"
                        value={education?.startDate}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" strokeWidth={2} />
                      <span>End Date</span>
                    </label>
                    <div className="relative group">
                      <Input
                        type="date"
                        name="endDate"
                        value={education?.endDate}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-500" strokeWidth={2} />
                    <span>Grade</span>
                  </label>
                  <div className="flex justify-center items-center gap-4">
                    <div className="relative group flex-1">
                      <select
                        name="gradeType"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200 appearance-none cursor-pointer"
                        onChange={(e) => handleChange(e, index)}
                        value={education?.gradeType}
                      >
                        <option value="CGPA">CGPA</option>
                        <option value="GPA">GPA</option>
                        <option value="Percentage">Percentage</option>
                      </select>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                      </div>
                    </div>
                    <div className="relative group flex-2">
                      <Input
                        type="text"
                        name="grade"
                        value={education?.grade}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="e.g. 8.5 / 85%"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" strokeWidth={2} />
                    <span>Description</span>
                  </label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg focus-within:bg-white focus-within:border-black transition-all duration-200">
                    <Textarea
                      name="description"
                      value={education?.description}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="Describe your achievements, relevant coursework, honors, etc."
                      className="w-full px-4 py-3 bg-transparent border-0 text-gray-900 placeholder-gray-500 focus:ring-0 resize-none min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!educationalList || educationalList.length === 0 && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-gray-400" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Education Added</h3>
              <p className="text-gray-500 mb-6">Start building your education section</p>
              <Button
                onClick={addEducation}
                className="bg-black text-white hover:bg-gray-800 rounded-lg px-6 py-3 font-medium transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
                Add Your First Education
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <Button
                onClick={addEducation}
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200 rounded-lg px-6 py-3 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
                Add {educationalList?.length > 0 ? "More" : ""} Education
              </Button>
              
              <Button 
                onClick={onSave}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-900 disabled:from-gray-400 disabled:to-gray-500 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl min-w-[120px]"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Education"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-gray-900 to-black"></div>
      </div>
    </div>
  );
}

export default Education;