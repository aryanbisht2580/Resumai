import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "@/Services/AiModel";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Sparkles, LoaderCircle } from "lucide-react";

const PROMPT = `Create a JSON object with the following fields:
"projectName": A string representing the project
"techStack": A string representing the project tech stack
"projectSummary": An array of strings, each representing a bullet point in html format describing relevant experience for the given project title and tech stack
projectName-"{projectName}"
techStack-"{techStack}"`;

function SimpeRichTextEditor({ index, onRichTextEditorChange, resumeInfo }) {
  const [value, setValue] = useState(
    resumeInfo?.projects[index]?.projectSummary || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRichTextEditorChange(value);
  }, [value]);

  const GenerateSummaryFromAI = async () => {
    const project = resumeInfo?.projects[index];

    if (!project?.projectName || !project?.techStack) {
      toast("Add Project Name and Tech Stack to generate summary");
      return;
    }

    setLoading(true);

    const prompt = PROMPT.replace("{projectName}", project.projectName)
                         .replace("{techStack}", project.techStack);

    const result = await AIChatSession.sendMessage(prompt);
    const resp = JSON.parse(result.response.text());

    setValue(resp.projectSummary?.join("") || "");
    setLoading(false);
  };

  return (
    <div className="bg-white text-black border border-gray-300 p-4 rounded">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium">Summary</label>
        <Button
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="bg-white text-black border border-black hover:bg-gray-100 px-3 py-1 text-sm flex items-center gap-2"
        >
          {loading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid #ccc",
            padding: "8px",
            minHeight: "150px",
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default SimpeRichTextEditor;
