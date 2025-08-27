// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   Divider,
//   Row,
//   Col,
//   Badge,
//   Typography,
//   Tag,
//   Pagination,
//   Carousel,
//   Tabs,
// } from "antd";
// import {
//   ProjectOutlined,
//   ArrowRightOutlined,
//   LeftOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
// import { motion, AnimatePresence } from "framer-motion";
// import useCSVDataLoader from "../hooks/useCSVDataLoader";

// const { Title, Paragraph } = Typography;

// // import { projectsData } from "../data/projects";

// const ProjectsSection = ({ darkMode, setSelectedProject }) => {
//   // const [projectsData, setProjectsData] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const projectsPerPage = 4;

//   const csvUrl =
//     "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0OolWGTTvmGyuG__Uz927ukP6Pf_NDNSeZajeA_kajS9dEocLgl3NgCMwykoVROxCqrMz2SncYNOd/pub?output=csv";

//   const { csvData: projectsData, loading } = useCSVDataLoader(csvUrl);

//   // Extract unique categories from projects data
//   const categories = [
//     "all",
//     ...new Set((projectsData || []).map((project) => project.category)),
//   ];

//   // Check window size on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => {
//       window.removeEventListener("resize", checkMobile);
//     };
//   }, []);

//   // Filter projects based on active category
//   const filteredProjects =
//     activeCategory === "all"
//       ? projectsData
//       : projectsData.filter((project) => project.category === activeCategory);

//   // Reset to page 1 when changing category
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeCategory]);

//   // Calculate the projects to display on the current page (for pagination)
//   const indexOfLastProject = currentPage * projectsPerPage;
//   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//   const currentProjects = filteredProjects.slice(
//     indexOfFirstProject,
//     indexOfLastProject
//   );

//   // Change page handler
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Scroll to top of projects section when page changes
//     document
//       .getElementById("projects-grid")
//       .scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   // Handle category change
//   const handleCategoryChange = (category) => {
//     setActiveCategory(category);
//   };

//   // Render project card with framer-motion
//   const renderProjectCard = (project, index) => (
//     <motion.div
//       key={project.id || index}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       layout
//     >
//       <Badge.Ribbon
//         text="Featured"
//         color="#1890ff"
//         style={{
//           display: project.highlight ? "block" : "none",
//         }}
//       >
//         <Card
//           hoverable
//           cover={
//             <div
//               style={{
//                 height: "200px",
//                 background: `linear-gradient(135deg, ${
//                   index % 2 === 0 ? "#1890ff" : "#722ed1"
//                 }, ${index % 3 === 0 ? "#52c41a" : "#eb2f96"})`,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: "80px",
//                 color: "rgba(255, 255, 255, 0.2)",
//               }}
//             >
//               <ProjectOutlined />
//             </div>
//           }
//           style={{
//             height: "100%",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//             margin: isMobile ? "0 8px" : 0,
//           }}
//         >
//           <Title level={4}>{project.title}</Title>
//           <Paragraph>{project.description}</Paragraph>
//           <div style={{ marginTop: "16px" }}>
//             {project.tags.split(",").map((tag, tagIndex) => (
//               <Tag key={tagIndex} style={{ marginBottom: "8px" }}>
//                 {tag}
//               </Tag>
//             ))}
//           </div>
//           <div style={{ marginTop: 16, textAlign: "center" }}>
//             <Button
//               type="primary"
//               icon={<ArrowRightOutlined />}
//               onClick={() => {setSelectedProject(project)}}
//               size="large"
//               shape="round"
//               style={{
//                 background: "linear-gradient(90deg, #1890ff, #722ed1)",
//                 color: "white",
//                 border: "none",
//                 boxShadow: "0 5px 15px rgba(24, 144, 255, 0.4)",
//                 padding: "0 20px",
//                 height: "40px",
//                 fontWeight: "500",
//                 fontSize: "16px",
//                 transition: "all 0.3s ease",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-2px)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//               }}
//             >
//               View Details
//             </Button>
//           </div>
//         </Card>
//       </Badge.Ribbon>
//     </motion.div>
//   );

//   // Custom category tabs component
//   const renderCategoryTabs = () => {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         style={{
//           marginBottom: "32px",
//           display: "flex",
//           justifyContent: "center",
//           overflow: "auto",
//           padding: "8px 0",
//         }}
//       >
//         <div
//           style={{
//             background: darkMode ? "#1f1f1f" : "#fff",
//             borderRadius: "12px",
//             padding: "4px",
//             boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
//             display: "inline-flex",
//             overflowX: "auto",
//             maxWidth: "100%",
//           }}
//         >
//           {categories.map((category, index) => (
//             <motion.button
//               key={category}
//               onClick={() => handleCategoryChange(category)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               style={{
//                 backgroundColor:
//                   activeCategory === category ? "#1890ff" : "transparent",
//                 color:
//                   activeCategory === category
//                     ? "#fff"
//                     : darkMode
//                     ? "#f0f0f0"
//                     : "#333",
//                 border: "none",
//                 padding: "12px 20px",
//                 margin: "4px",
//                 borderRadius: "8px",
//                 fontSize: "15px",
//                 fontWeight: "500",
//                 cursor: "pointer",
//                 textTransform: "capitalize",
//                 transition: "all 0.3s ease",
//                 whiteSpace: "nowrap",
//                 boxShadow:
//                   activeCategory === category
//                     ? "0 4px 12px rgba(24, 144, 255, 0.3)"
//                     : "none",
//               }}
//             >
//               {category}
//             </motion.button>
//           ))}
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <Row justify="center">
//       <Col xs={24} md={20} lg={18}>
//         <div style={{ textAlign: "center", marginBottom: "32px" }}>
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-10"
//           >
//             <Title level={4} style={{ color: "#1890ff", margin: "0 0 8px 0" }}>
//               MY WORK
//             </Title>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <Title level={2}>Recent Projects</Title>
//           </motion.div>
//           <Divider />
//         </div>

//         {/* Category Tabs */}
//         {renderCategoryTabs()}

//         <div id="projects-grid">
//           {isMobile ? (
//             // Carousel view for mobile
//             <div style={{ position: "relative", paddingBottom: "40px" }}>
//               {filteredProjects.length > 0 ? (
//                 <Carousel
//                   arrows
//                   dots={{ className: "carousel-dots" }}
//                   style={{ padding: "0 30px" }}
//                   autoplay
//                   autoplaySpeed={5000}
//                   dotPosition="bottom"
//                 >
//                   {filteredProjects.map((project, index) => (
//                     <div key={project.id || index} style={{ padding: "8px" }}>
//                       {renderProjectCard(project, index)}
//                     </div>
//                   ))}
//                 </Carousel>
//               ) : (
//                 <div style={{ textAlign: "center", padding: "40px 0" }}>
//                   <Title level={4}>No projects found in this category</Title>
//                 </div>
//               )}
//               {/* Add custom styling for dots */}
//               <style jsx="true">{`
//                 .carousel-dots {
//                   z-index: 1 !important;
//                 }
//                 .carousel-dots li {
//                   width: 10px !important;
//                   height: 10px !important;
//                   border-radius: 50% !important;
//                   background: ${darkMode ? "#555" : "#d9d9d9"} !important;
//                 }
//                 .carousel-dots li button {
//                   width: 10px !important;
//                   height: 10px !important;
//                   border-radius: 50% !important;
//                   background: ${darkMode ? "#555" : "#d9d9d9"} !important;
//                   opacity: 0.7;
//                 }
//                 .carousel-dots li.slick-active button {
//                   background: #1890ff !important;
//                   opacity: 1;
//                   transform: scale(1.2);
//                 }
//                 .ant-carousel .slick-dots-bottom {
//                   bottom: -30px;
//                 }
//               `}</style>
//             </div>
//           ) : (
//             // Grid view with pagination for desktop
//             <div>
//               <AnimatePresence>
//                 {filteredProjects.length > 0 ? (
//                   <Row gutter={[24, 24]}>
//                     {currentProjects.map((project, index) => (
//                       <Col xs={24} md={12} lg={12} key={project.id || index}>
//                         {renderProjectCard(project, index)}
//                       </Col>
//                     ))}
//                   </Row>
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     style={{ textAlign: "center", padding: "40px 0" }}
//                   >
//                     <Title level={4}>No projects found in this category</Title>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           )}
//         </div>

//         {!isMobile && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             style={{ marginTop: "48px", textAlign: "center" }}
//           >
//             <Pagination
//               current={currentPage}
//               pageSize={projectsPerPage}
//               total={filteredProjects.length}
//               onChange={handlePageChange}
//               showSizeChanger={false}
//               style={{
//                 display: "inline-flex",
//                 justifyContent: "center",
//                 background: darkMode ? "#1f1f1f" : "#fff",
//                 padding: "12px 16px",
//                 borderRadius: "8px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
//               }}
//             />
//           </motion.div>
//         )}
//       </Col>
//     </Row>
//   );
// };

// export default ProjectsSection;

// =====================================================================================================================

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
        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"> */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          {/* <div className="text-center"> */}
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
          {/* <div className="flex items-center space-x-4 mt-4 md:mt-0"> */}
          <div className="w-full flex justify-end">
            {/* <div className="hidden md:flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700"> */}
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
        {/* <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
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
        </div> */}

        {/* Filters */}
<div
  className="
    flex gap-3 mb-8
    flex-nowrap overflow-x-auto scrollbar-hide
    sm:justify-center sm:flex-wrap sm:overflow-x-visible
  "
>
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
              onClick={() => {console.log(project);navigate(`/project/${project.id}`, { state: { project } })}}
              // className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden group ${
              //   viewMode === "list" ? "flex flex-col md:flex-row" : ""
              // }`}
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
                    {/* <span className="text-sm text-gray-600 dark:text-gray-400"> */}
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
                {/* <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm"> */}
                <p
                  className={`mb-4 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.split(",").slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      // className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
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
                      // className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
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
                    {project.team != 0
                      ? `${<Users className="w-4 h-4" />}${project.team} team members`
                      : `Individual project`}
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
              // className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-md hover:from-gray-400 hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                // className={`px-4 py-2 rounded-full shadow-md transition-all ${
                //   currentPage === i + 1
                //     ? "bg-blue-600 text-white"
                //     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                // }`}

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
              // className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-md hover:from-gray-400 hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
