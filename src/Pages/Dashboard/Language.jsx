import React, { useEffect, useState } from "react";
import { Radio, Button, App } from "antd";
import Cookies from "js-cookie";

const Language = () => {
  const { message } = App.useApp();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { value: "de", label: "German" },
    { value: "tr", label: "Turkish" },
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
  ];

  // Load saved language from cookies on mount
  useEffect(() => {
    const savedLang = Cookies.get("currentLanguage");
    // console.log("🔍 Saved language from cookies:", savedLang);

    // // Check Google Translate status
    // console.log(
    //   "🔍 Google Translate API available:",
    //   !!window.google?.translate
    // );
    // console.log("🔍 Current hash:", window.location.hash);
    // console.log("🔍 Current googtrans cookie:", Cookies.get("googtrans"));
    // console.log(
    //   "🔍 Current googtrans localStorage:",
    //   localStorage.getItem("googtrans")
    // );

    if (savedLang) {
      setSelectedLanguage(savedLang);
    }
  }, []);

  // Switch Language Function using Google Translate hash method
  const switchLanguage = (lang) => {
    // console.log(`🚀 Switching to language: ${lang}`);
    // console.log("🔍 Google Translate API status:", {
    //   available: !!window.google?.translate,
    //   element: !!document.getElementById("google_translate_element"),
    //   combo: !!document.querySelector(".goog-te-combo"),
    // });

    // Save language preference in cookies
    Cookies.set("currentLanguage", lang, {
      expires: 30,
      secure: false, // use true in production with HTTPS
      sameSite: "Lax",
    });

    setSelectedLanguage(lang);

    if (lang === "en") {
      // Reset to original language
      // console.log("🔄 Resetting to English");
      // console.log("🧹 Clearing hash, cookies, and localStorage");

      window.location.hash = "";
      Cookies.remove("googtrans", { path: "/" });
      Cookies.remove("googtrans", { path: "/", domain: "localhost" });
      Cookies.remove("googtrans", {
        path: "/",
        domain: `.${window.location.hostname}`,
      });
      localStorage.removeItem("googtrans");

      // console.log("✅ Cleared translation data, reloading...");

      // Force reload to reset translation
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      // Set Google Translate hash and cookies
      const translateCode = `/en/${lang}`;
      // console.log(`🌐 Setting Google Translate: ${translateCode}`);

      // Method 1: Try hash method first
      const newHash = `#googtrans(en|${lang})`;
      // console.log(`🔗 Setting hash: ${newHash}`);
      window.location.hash = newHash;

      // Method 2: Set cookies for Google Translate with multiple domain attempts
      const cookieOptions = { path: "/" };
      const domainOptions = [
        { ...cookieOptions },
        { ...cookieOptions, domain: "localhost" },
        { ...cookieOptions, domain: `.${window.location.hostname}` },
      ];

      domainOptions.forEach((options, index) => {
        try {
          Cookies.set("googtrans", translateCode, options);
          // console.log(
          //   `✅ Set googtrans cookie with options ${index + 1}:`,
          //   options
          // );
        } catch (error) {
          // console.warn(
          //   `⚠️ Failed to set cookie with options ${index + 1}:`,
          //   error
          // );
        }
      });

      localStorage.setItem("googtrans", translateCode);
      // console.log(`💾 Set localStorage googtrans: ${translateCode}`);

      // Method 3: Try direct combo manipulation if available
      const tryDirectTranslation = () => {
        const combo = document.querySelector(".goog-te-combo");
        if (combo) {
          // console.log(
          //   "🎯 Found Google Translate combo, trying direct manipulation"
          // );
          try {
            combo.value = lang;
            combo.dispatchEvent(new Event("change", { bubbles: true }));
            // console.log("✅ Direct combo manipulation attempted");
          } catch (error) {
            // console.warn("⚠️ Direct combo manipulation failed:", error);
          }
        } else {
          // console.log("❌ Google Translate combo not found");
        }
      };

      // Try direct translation after a short delay
      setTimeout(tryDirectTranslation, 500);

      // Method 4: Force page reload with translation parameters
      setTimeout(() => {
        // console.log("🔄 Force reloading with translation parameters...");

        // // Verify what was actually set
        // console.log("🔍 Final verification before reload:");
        // console.log("  - Hash:", window.location.hash);
        // console.log("  - Cookie:", Cookies.get("googtrans"));
        // console.log("  - LocalStorage:", localStorage.getItem("googtrans"));

        // Use window.location.reload() instead of changing href to reduce extension conflicts
        window.location.reload();
      }, 1000);
    }

    message.success(
      `Language changed to ${
        languages.find((l) => l.value === lang)?.label || "selected"
      }`
    );
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
            <Radio key={lang.value} value={lang.value}>
              {lang.label}
            </Radio>
          ))}
        </Radio.Group>

        <Button
          type="primary"
          onClick={() => switchLanguage(selectedLanguage)}
          className="w-full bg-[#63666A] hover:bg-[#63666A]/90 h-12"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Language;
