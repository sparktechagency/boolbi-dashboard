import React, { useState } from "react";
import { Radio, Button } from "antd";

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { value: "German", label: "German", subLabel: "German" },
    { value: "Turkish", label: "Turkish", subLabel: "Turkish" },
    { value: "English", label: "English", subLabel: "English" },
    { value: "Spanish", label: "Spanish", subLabel: "Spanish" },
  ];

  const handleSubmit = () => {
    console.log("Selected language:", selectedLanguage);
  };

  return (
    <div className="flex items-start min-h-[80vh]">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <h2 className="text-lg font-medium mb-6">Please Set Your Language</h2>

        <Radio.Group
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="flex flex-col gap-4 mb-6"
        >
          {languages.map((lang) => (
            <Radio
              key={lang.value}
              value={lang.value}
              className="flex items-center py-2"
            >
              <div>
                <div className="font-medium">{lang.label}</div>
                <div className="text-sm text-gray-500">{lang.subLabel}</div>
              </div>
            </Radio>
          ))}
        </Radio.Group>

        <Button
          type="primary"
          onClick={handleSubmit}
          className="w-full bg-[#63666A] hover:bg-[#63666A]/90 h-12"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Language;
