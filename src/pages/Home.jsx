import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";
import FAQBox from "../components/FAQBox";
import homeFaqData from "../data/homeFaqData";
import colorTheme from "../themes/colorTheme";
import {
  CalendarDays,
  Smile,
  NotebookPen,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Home({ sidebarVisible, setSidebarVisible, showLogoutDialog, setShowLogoutDialog }) {
  return (
    <div className="bg-rose-300 flex relative">
      <Sidebar
        color="rose"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        setShowLogoutDialog={setShowLogoutDialog}
        showLogoutDialog={showLogoutDialog}
      />

      <div className="flex-1">
        <div className="max-w-screen-xl w-full mx-auto px-6 py-12 pt-0 space-y-24">
          <Hero color="rose" sidebarVisible={sidebarVisible} />
          <Features color="rose" />
          <Faqs color="rose" />
        </div>
      </div>
    </div>
  );
}

const Hero = ({ color, sidebarVisible }) => {
  const navigate = useNavigate();

  function getStarted() {
    navigate("/signin");
  }

  const theme = colorTheme[color];
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6">
      <div className="md:w-1/2 px-0 text-center md:text-left md:ml-15">
        <h1
          className={`text-4xl md:text-5xl font-bold ${theme.text} leading-tight`}
        >
          Track Your Cycle. Understand Your Body. Thrive Every Day.
        </h1>
        <h3
          className={`text-lg md:text-xl mt-4 ${
            theme.textDark || "text-gray-800"
          }`}
        >
          Florette helps you track periods, moods, and wellness in one place —
          empowering you with insights to live in sync with your body.
        </h3>
        <div className="mt-6 flex justify-center md:justify-start gap-4">
          <button
            className={`flex items-center ${theme.buttonBg} ${theme.buttonText} px-6 py-3 rounded-full ${theme.buttonHover} transition`}
            onClick={getStarted}
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 md:pt-0 pt-6">
        <img
          src="/logo.png"
          alt="Florette logo"
          className={`${
            sidebarVisible
              ? "w-56 h-56 md:w-72 md:h-72"
              : "w-64 h-64 md:w-96 md:h-96"
          } rounded-full object-cover shadow-lg transition-all duration-300 ease-in-out`}
        />
      </div>
    </div>
  );
};

const Card = ({ icon, title, description, color }) => {
  const theme = colorTheme[color];

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl ${theme.hover} transition-all duration-300 w-full`}
    >
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      {title && (
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      )}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
    </div>
  );
};

const featuresCardData = [
  {
    title: "Period Tracker",
    description:
      "Log your periods, predict cycles, and stay in sync with your body.",
    icon: <CalendarDays className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Mood Logging",
    description: "Track your emotions daily and discover patterns over time.",
    icon: <Smile className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Journal",
    description:
      "Reflect on your day, thoughts, or health with our private journal.",
    icon: <NotebookPen className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Tips & Tricks",
    description:
      "Browse community tips, wellness ideas, and shared experiences.",
    icon: <Sparkles className="w-6 h-6 text-red-500" />,
  },
];

const Features = ({ color }) => {
  const theme = colorTheme[color];

  return (
    <div className={`${theme.bg} p-6 rounded-lg`}>
      <h2 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-12`}>
        Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {featuresCardData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            icon={<div className={`${theme.text}`}>{item.icon}</div>}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

const Faqs = ({ color }) => {
  const theme = colorTheme[color];

  return (
    <div className="p-6 rounded-lg bg-rose-200">
      <h2 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-12`}>
        FAQs
      </h2>
      <FAQBox faqData={homeFaqData} color={color} page={false} />
    </div>
  );
};
