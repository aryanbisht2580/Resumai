import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle, Trash2, Zap, Plus, Star, Code, Award, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateResumeData } from "@/Services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  name: "",
  rating: 0,
};

function Skills({ resumeInfo, enanbledNext, enanbledPrev }) {
  const [loading, setLoading] = React.useState(false);
  const [skillsList, setSkillsList] = React.useState(
    resumeInfo?.skills || []
  );
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  useEffect(() => {
    try {
      dispatch(addResumeData({ ...resumeInfo, skills: skillsList }));
    } catch (error) {
      console.log("error in skills context update", error.message);
    }
  }, [skillsList]);

  const addSkill = () => {
    if (!skillsList) {
      setSkillsList([formFields]);
      return;
    }
    setSkillsList([...skillsList, formFields]);
  };

  const removeSkill = (index) => {
    const list = [...skillsList];
    const newList = list.filter((item, i) => {
      if (i !== index) return true;
    });
    setSkillsList(newList);
  };

  const handleChange = (index, key, value) => {
    enanbledNext && enanbledNext(false);
    enanbledPrev && enanbledPrev(false);
    const list = [...skillsList];
    const newListData = {
      ...list[index],
      [key]: value,
    };
    list[index] = newListData;
    setSkillsList(list);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };
    if (resume_id) {
      console.log("Started Updating Skills");
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
              <Zap className="w-8 h-8 text-black" strokeWidth={2} />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">Skills</h2>
              <p className="text-gray-300 mt-1">Add your top professional key skills</p>
            </div>
          </div>
        </div>


        <div className="p-8 -mt-6 relative space-y-6">
          {skillsList?.map((skill, index) => (
            <div key={index} className="bg-white rounded-xl border-2 border-gray-100 shadow-sm overflow-hidden">
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <Code className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        Skill {index + 1}
                      </h3>
                      <div className="w-12 h-0.5 bg-black rounded-full mt-1"></div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => removeSkill(index)}
                    className="border-2 border-red-200 text-red-600 hover:border-red-500 hover:bg-red-50 rounded-lg p-2 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                  </Button>
                </div>
              </div>

              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Award className="w-4 h-4 text-gray-500" strokeWidth={2} />
                      <span>Skill Name</span>
                    </label>
                    <div className="relative group">
                      <Input
                        type="text"
                        value={skill?.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        placeholder="e.g. JavaScript, Python, React"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:border-black focus:ring-0 transition-all duration-200"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-black rounded-full transition-all duration-300 scale-x-0 group-focus-within:scale-x-100 origin-left"></div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-500" strokeWidth={2} />
                      <span>Proficiency Level</span>
                    </label>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:bg-white hover:border-black transition-all duration-200">
                      <Rating
                        style={{ maxWidth: 150 }}
                        value={skill?.rating}
                        onChange={(v) => handleChange(index, "rating", v)}
                        className="flex justify-center"
                      />
                      <div className="text-center mt-2">
                        <span className="text-xs font-medium text-gray-600">
                          {skill?.rating === 0 && "Not Rated"}
                          {skill?.rating === 1 && "Beginner"}
                          {skill?.rating === 2 && "Basic"}
                          {skill?.rating === 3 && "Intermediate"}
                          {skill?.rating === 4 && "Advanced"}
                          {skill?.rating === 5 && "Expert"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          
          {!skillsList || skillsList.length === 0 && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-gray-400" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Skills Added</h3>
              <p className="text-gray-500 mb-6">Start building your skills section</p>
              <Button
                onClick={addSkill}
                className="bg-black text-white hover:bg-gray-800 rounded-lg px-6 py-3 font-medium transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
                Add Your First Skill
              </Button>
            </div>
          )}

          
          {skillsList && skillsList.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" strokeWidth={2} />
                <span>Skills Overview</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsList.map((skill, index) => (
                  skill.name && (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 truncate">{skill.name}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < skill.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                              strokeWidth={2}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-gray-900 to-black h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(skill.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <Button
                onClick={addSkill}
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200 rounded-lg px-6 py-3 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
                Add {skillsList?.length > 0 ? "More" : ""} Skill
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
                  "Save Skills"
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

export default Skills;