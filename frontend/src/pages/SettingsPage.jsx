import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const THEME_OPTIONS = [
  { id: "system", name: "System default" },
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
];

const CHAT_COLORS = [
  "#e9edc9",
  "#ffc8dd",
  "#fbf8cc",
  "#cbd5e0",
  "#ffffff",
  "#dacabe",
  "#f9e7ff",
  "#f8edeb",
  "#1a202c",
  "#f4dbe8",
  "#5a67d8",
  "#bbd18b",
  "#d53f8c",
  "#079320",
  "#f6e05e",
  "#38a169",
  "#f4e4e1",
  "#715d93",
  "#4d8a5c",
  "#c5e3db",
  "#f08080",
];

const TEXT_SIZES = [
  { id: "sm", name: "80%", class: "text-sm" },
  { id: "base", name: "100%", class: "text-base" },
  { id: "lg", name: "120%", class: "text-lg" },
  { id: "xl", name: "140%", class: "text-xl" },
];

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const {
    theme, setTheme,
    chatWallpaperColor, setChatWallpaperColor,
    textSize, setTextSize
  } = useThemeStore();

  const applyThemeToHtml = useCallback((selectedThemeOption) => {
    let actualTheme = selectedThemeOption;
    if (selectedThemeOption === "system") {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute("data-theme", actualTheme);
    if (actualTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(selectedThemeOption);
  }, [setTheme]);

  useEffect(() => {
    applyThemeToHtml(theme);
  }, [theme, applyThemeToHtml]);

  const handleReset = () => {
    setTheme(THEME_OPTIONS[0].id);
    setChatWallpaperColor(CHAT_COLORS[0]);
    setTextSize(TEXT_SIZES[1].class);
  };

  const getChatMessagesBackgroundStyle = () => {
  return {
    backgroundColor: chatWallpaperColor,
    backgroundImage: 'none', // Explicitly ensure no background image
  };
};

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-10">
        <div>
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70 mb-4">App color theme</p>
          <div className="relative inline-block w-full sm:w-1/2">
            <select
              className="select select-bordered w-full"
              value={theme}
              onChange={(e) => applyThemeToHtml(e.target.value)}
            >
              {THEME_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  <span className="flex items-center gap-2">
                    {option.id === "system" && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop-2"><rect width="20" height="12" x="2" y="6" rx="2" ry="2"/><path d="M2 18h20"/><path d="M7 22h10"/></svg>}
                    {option.name}
                  </span>
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Chat wallpaper</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-4">
            {CHAT_COLORS.map((color) => (
              <button
                key={color}
                className={`
                  w-full h-12 rounded-md border-2 transition-all cursor-pointer
                  ${chatWallpaperColor === color ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-base-100" : "border-transparent hover:border-base-300"}
                `}
                style={{ backgroundColor: color }}
                onClick={() => setChatWallpaperColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Text size</h2>
          <div className="relative inline-block w-full sm:w-1/2 mt-4">
            <select
              className="select select-bordered w-full"
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
            >
              {TEXT_SIZES.map((option) => (
                <option key={option.id} value={option.class}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-outline btn-error mt-6" onClick={handleReset}>
          Reset
        </button>

        <h3 className="text-lg font-semibold mt-8 mb-3">Preview</h3>
        <div
          className="rounded-xl border border-base-300 overflow-hidden shadow-lg"
        >
          <div className="p-4 bg-base-200 bg-opacity-80">
            <div className="max-w-lg mx-auto">
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto"
                  style={getChatMessagesBackgroundStyle()}
                >
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"}
                          ${textSize}
                        `}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className={`input input-bordered flex-1 h-10 ${textSize}`}
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;