import { motion } from "framer-motion";
import { User, Bell, Lock, Palette, Globe, Database, Check } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  useUICustomization,
  colorPresets,
  fontPresets,
  borderRadiusPresets,
  navColorPresets,
} from "@/contexts/UICustomizationContext";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "data", label: "Data", icon: Database },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const { isDark, toggle } = useTheme();

  const {
    colorPreset,
    fontPreset,
    borderRadius,
    navColorPreset,
    setColorPreset,
    setFontPreset,
    setBorderRadius,
    setNavColorPreset,
  } = useUICustomization();

  const [enabled, setEnabled] = useState({
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
});

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <nav className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                active === s.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </nav>

        <motion.div
          key={active}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card rounded-xl border border-border p-6 space-y-6"
        >
          <h2 className="font-heading font-semibold text-lg text-foreground capitalize">
            {active}
          </h2>

          {active === "profile" && (
            <div className="space-y-4 max-w-lg">
              {[
                { label: "Full Name", value: "John Doe" },
                { label: "Email", value: "john@nexuscrm.com" },
                { label: "Role", value: "Admin" },
                { label: "Phone", value: "+1 (555) 000-0000" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    {field.label}
                  </label>
                  <input
                    defaultValue={field.value}
                    className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>
              ))}
              <button className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                Save Changes
              </button>
            </div>
          )}

          {/* {active === "notifications" && (
            <div className="space-y-4 max-w-lg">
              {[
                "Email notifications",
                "Push notifications",
                "Deal updates",
                "Task reminders",
                "Weekly digest",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground">{item}</span>
                  <button className="w-10 h-6 rounded-full bg-primary relative transition">
                    <div className="w-4 h-4 rounded-full bg-primary-foreground absolute right-1 top-1" />
                  </button>
                </div>
              ))}
            </div>
          )} */}
          {active === "notifications" && (
  <div className="space-y-4 max-w-lg">
    {[
      "Email notifications",
      "Push notifications",
      "Deal updates",
      "Task reminders",
      "Weekly digest",
    ].map((item, index) => (
      <div key={item} className="flex items-center justify-between py-2">
        <span className="text-sm text-foreground">{item}</span>

        <button
          onClick={() =>
            setEnabled((prev) => ({
              ...prev,
              [index]: !prev[index],
            }))
          }
          className={`w-10 h-6 rounded-full relative transition ${
            enabled[index] ? "bg-primary" : "bg-muted"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white absolute top-1 transition ${
              enabled[index] ? "right-1" : "left-1"
            }`}
          />
        </button>
      </div>
    ))}
  </div>
)}

          {active === "appearance" && (
            <div className="space-y-8">
              {/* Theme Mode */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Theme Mode
                </h3>
                <div className="flex gap-3">
                  {[
                    { label: "Light", active: !isDark },
                    { label: "Dark", active: isDark },
                  ].map((mode) => (
                    <button
                      key={mode.label}
                      onClick={() => {
                        if (mode.active) return;
                        toggle();
                      }}
                      className={`flex-1 max-w-[160px] h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 ${
                        mode.active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <div
                        className={`w-8 h-5 rounded-md ${
                          mode.label === "Light"
                            ? "bg-white border border-border shadow-sm"
                            : "bg-foreground"
                        }`}
                      />
                      <span className="text-xs font-medium">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Color Palette
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Choose a primary accent color for the interface
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {colorPresets.map((preset) => {
                    const isActive = colorPreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setColorPreset(preset.id)}
                        className={`relative rounded-xl border-2 p-3 transition-all ${
                          isActive
                            ? "border-primary shadow-md shadow-primary/20"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}

                        <div className="flex gap-1 mb-2">
                          {preset.preview.map((color, i) => (
                            <div
                              key={i}
                              className="flex-1 h-6 rounded-md first:rounded-l-lg last:rounded-r-lg"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>

                        <span className="text-xs font-medium text-foreground">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Typography
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Select a font pairing for headings and body text
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {fontPresets.map((preset) => {
                    const isActive = fontPreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setFontPreset(preset.id)}
                        className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                          isActive
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}

                        <span
                          className="block text-base font-bold text-foreground mb-0.5"
                          style={{ fontFamily: `${preset.heading}, sans-serif` }}
                        >
                          {preset.heading.replace(/'/g, "")}
                        </span>

                        <span
                          className="block text-xs text-muted-foreground"
                          style={{ fontFamily: `${preset.body}, sans-serif` }}
                        >
                          Body: {preset.body.replace(/'/g, "")}
                        </span>

                        <span
                          className="block text-[11px] text-muted-foreground/70 mt-1.5 leading-snug"
                          style={{ fontFamily: `${preset.body}, sans-serif` }}
                        >
                          The quick brown fox jumps over the lazy dog.
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Border Radius
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Control the roundness of UI elements
                </p>

                <div className="flex gap-3 flex-wrap">
                  {borderRadiusPresets.map((preset) => {
                    const isActive = borderRadius === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setBorderRadius(preset.id)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all min-w-[80px] ${
                          isActive
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <div
                          className="w-10 h-10 bg-primary/20 border-2 border-primary/50"
                          style={{ borderRadius: preset.value }}
                        />
                        <span className="text-xs font-medium text-foreground">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Background */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Navigation Background
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Choose a background color for the sidebar navigation
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {navColorPresets.map((preset) => {
                    const isActive = navColorPreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setNavColorPreset(preset.id)}
                        className={`relative rounded-xl border-2 p-3 transition-all ${
                          isActive
                            ? "border-primary shadow-md shadow-primary/20"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}

                        <div
                          className="w-full h-10 rounded-lg mb-2 border border-border/30"
                          style={{ backgroundColor: preset.preview }}
                        />

                        <span className="text-xs font-medium text-foreground">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {active !== "profile" &&
            active !== "notifications" &&
            active !== "appearance" && (
              <p className="text-sm text-muted-foreground">
                Configure your {active} preferences here.
              </p>
            )}
        </motion.div>
      </div>
    </div>
  );
}
