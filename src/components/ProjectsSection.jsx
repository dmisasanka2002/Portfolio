import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, List, Calendar, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import useCSVDataLoader from "../hooks/useCSVDataLoader";

const ProjectsSection = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0OolWGTTvmGyuG__Uz927ukP6Pf_NDNSeZajeA_kajS9dEocLgl3NgCMwykoVROxCqrMz2SncYNOd/pub?output=csv";

  const { csvData: projectsData, loading } = useCSVDataLoader(csvUrl);

  const navigate = useNavigate();

  const categories = ["all", ...new Set(projectsData.map((p) => p.category))];
  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  // ============================================================
  const projectsPerPage = viewMode === "grid" ? 6 : 3;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, viewMode]);

  // ==============================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="mb-4">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Project Showcase
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gray-600 dark:text-gray-400 mt-5"
            >
              Discover my amazing projects and innovations
            </motion.p>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`hidden md:flex items-center space-x-2 rounded-lg p-1 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-nowrap overflow-x-auto scrollbar-hide sm:justify-center sm:flex-wrap sm:overflow-x-visible">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 shrink-0 ${
                filter === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : darkMode
                  ? "bg-gray-800 text-gray-300 border border-gray-700 hover:shadow-md"
                  : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:shadow-md"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }`}
        >
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                navigate(`/project/${project.id}`, { state: { project } });
              }}
              className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border overflow-hidden group ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              } ${viewMode === "list" ? "flex flex-col md:flex-row" : ""}`}
            >
              <div
                className={`relative ${
                  viewMode === "list" ? "w-full md:w-80 flex-shrink-0" : ""
                }`}
              >
                <img
                  src={project.images.split(",")[0]}
                  alt={project.title}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === "list"
                      ? "w-full h-48 md:h-full"
                      : "w-full h-48"
                  }`}
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {project.rating}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p
                  className={`mb-4 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags
                    ?.split(",")
                    .slice(0, 3)
                    .map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-md text-xs ${
                          darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  {project.tags.split(",").length > 3 && (
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      +{project.tags.split(",").length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    {project.team != 0
                      ? ` ${project.team} team members`
                      : ` Individual project`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================================================================================================ */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              ← Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full shadow-md transition-all border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : darkMode
                    ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Next →
            </button>
          </div>
        )}

        {/* ========================================================================================= */}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
