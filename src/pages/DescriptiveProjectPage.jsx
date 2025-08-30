import { useContext, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  ImageIcon,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

import GoogleDriveSVG from "../components/GoogleDriveSVG";
import { ThemeContext } from "../contexts/ThemeContext";
import useCSVDataLoader from "../hooks/useCSVDataLoader";

const DescriptiveProjectPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0OolWGTTvmGyuG__Uz927ukP6Pf_NDNSeZajeA_kajS9dEocLgl3NgCMwykoVROxCqrMz2SncYNOd/pub?output=csv";

  // Only fetch if state.project is not provided
  const { csvData, loading } = useCSVDataLoader(
    state?.project ? null : csvUrl,
    (row) => String(row.id) === String(id) // filtering handled inside the hook
  );

  // Prefer state.project if available, else take from CSV
  const project = state?.project || csvData[0];

  if (!state?.project && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            Loading project details...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Project Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The project you’re looking for doesn’t exist or couldn’t be loaded.
          </p>
          <button
            onClick={() => {
              state?.project ? navigate(-1) : navigate("/");
            }}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
          >
            {state?.project ? `Go Back` : `Home Page`}
          </button>
        </motion.div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  function convertDriveToEmbed(url) {
    const match = url.match(/\/d\/(.*)\/view/);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              state?.project ? navigate(-1) : navigate("/");
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 border ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            {/* <span>Back</span> */}
            <span>{state?.project ? `Back` : `Home Page`}</span>
          </button>
        </div>

        {/* Project Header */}
        <div
          className={`rounded-2xl shadow-xl p-8 mb-8 border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 text-gray-800 border-gray-300"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.date).toLocaleDateString()}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-400 mb-6">
                {project.description}
              </p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>
                    {project.team != 0
                      ? `${project.team} team members`
                      : `Individual project`}
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                {project.liveUrl && (
                  <a
                    target="blank"
                    href={project.liveUrl}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.link && (
                  <a
                    target="blank"
                    href={project.link}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                      darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {project.source === "Github" ? (
                      <Github className="w-5 h-5" />
                    ) : (
                      <GoogleDriveSVG className="w-5 h-5" />
                    )}
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
            <div className="relative">
              <img
                src={project.images.split(",")[0]}
                alt={project.title}
                className="w-full h-80 object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div
          className={`rounded-2xl shadow-xl p-8 mb-8 border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 text-gray-800 border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies?.split(",").map((tech, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full border font-medium transition-colors duration-300 ${
                  darkMode
                    ? "bg-blue-900/30 text-blue-300 border-blue-700"
                    : "bg-blue-100 text-blue-800 border-blue-300"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        {/* <div
          className={`rounded-2xl shadow-xl p-8 mb-8 border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 text-gray-800 border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          <div className="prose dark:prose-invert max-w-none">
            {project.fullDescription.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className={`mb-6 text-[17px] leading-loose tracking-wide ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div> */}

        {/* Description */}
        <div
          className={`rounded-2xl shadow-xl p-8 mb-8 border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 text-gray-800 border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          <div className="prose dark:prose-invert max-w-none text-[17px] leading-loose tracking-wide">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    } mb-4`}
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
                ),
              }}
            >
              {project.fullDescription}
            </ReactMarkdown>
          </div>
        </div>

        {/* Features */}
        <div
          className={`rounded-2xl shadow-xl p-8 mb-8 border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.split(",").map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700/50 text-gray-300"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                <span
                  className={`text-[17px] leading-loose tracking-wide ${
                    darkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Images Gallery */}
        <div
          className={`rounded-2xl shadow-xl p-8 mb-8 border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.split(",")?.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Project screenshot ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div
                  className={`absolute inset-0 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    darkMode
                      ? "bg-black/0 group-hover:bg-black/20"
                      : "bg-white/0 group-hover:bg-black/10"
                  }`}
                >
                  <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        {project.videos && project.videos.length > 0 && (
          <div
            className={`rounded-2xl shadow-xl p-8 mb-8 border transition-colors duration-300 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Project Videos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.videos?.split(",").map((videoUrl, index) => {
                videoUrl = videoUrl.trim();
                let embedUrl = "";
                let title = `Video ${index + 1}`;

                // Check if YouTube
                const ytMatch = videoUrl.match(/(?:v=|youtu\.be\/)([^&]+)/);
                if (ytMatch) {
                  const videoId = ytMatch[1];
                  embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
                // Check if Google Drive
                else if (videoUrl.includes("drive.google.com")) {
                  const driveMatch = videoUrl.match(/\/d\/(.*)\/view/);
                  if (driveMatch)
                    embedUrl = `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
                }

                return (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
                  >
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <p className="text-center text-sm text-red-500">
                        Invalid video link
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default DescriptiveProjectPage;
