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
// } from "antd";
// import {
//   ProjectOutlined,
//   ArrowRightOutlined,
//   LeftOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
// import { motion } from "framer-motion";

// const { Title, Paragraph } = Typography;

// import { projectsData } from "../data/projects";

// const ProjectsSection = ({ darkMode, setSelectedProject }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);
//   const projectsPerPage = 4;

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

//   // Calculate the projects to display on the current page (for pagination)
//   const indexOfLastProject = currentPage * projectsPerPage;
//   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//   const currentProjects = projectsData.slice(
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

//   // Custom arrows for carousel
//   const carouselArrows = {
//     prevArrow: <Button icon={<LeftOutlined />} type="primary" shape="circle" />,
//     nextArrow: (
//       <Button icon={<RightOutlined />} type="primary" shape="circle" />
//     ),
//   };

//   // Custom dot style for carousel
//   const customDotStyle = {
//     width: "10px",
//     height: "10px",
//     borderRadius: "50%",
//     background: darkMode ? "#555" : "#d9d9d9",
//   };

//   // Render project card with framer-motion
//   const renderProjectCard = (project, index) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
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
//             {project.tags.map((tag, tagIndex) => (
//               <Tag key={tagIndex} style={{ marginBottom: "8px" }}>
//                 {tag}
//               </Tag>
//             ))}
//           </div>
//           <div style={{ marginTop: 16, textAlign: "center" }}>
//             <Button
//               type="primary"
//               icon={<ArrowRightOutlined />}
//               onClick={() => setSelectedProject(project)}
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

//   // Custom style for the carousel container
//   const carouselContainerStyle = {
//     position: "relative",
//     paddingBottom: "40px", // Add space for dots
//   };

//   return (
//     <Row justify="center">
//       <Col xs={24} md={20} lg={18}>
//         <div style={{ textAlign: "center", marginBottom: "48px" }}>
//           <Title level={4} style={{ color: "#1890ff", margin: "0 0 8px 0" }}>
//             MY WORK
//           </Title>
//           <Title level={2}>Recent Projects</Title>
//           <Divider />
//         </div>

//         <div id="projects-grid">
//           {isMobile ? (
//             // Carousel view for mobile
//             <div style={carouselContainerStyle}>
//               <Carousel
//                 arrows
//                 dots={{ className: "carousel-dots" }}
//                 style={{ padding: "0 30px" }}
//                 autoplay
//                 autoplaySpeed={5000}
//                 dotPosition="bottom"
//               >
//                 {projectsData.map((project, index) => (
//                   <div key={index} style={{ padding: "8px" }}>
//                     {renderProjectCard(project, index)}
//                   </div>
//                 ))}
//               </Carousel>
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
//             <Row gutter={[24, 24]}>
//               {currentProjects.map((project, index) => (
//                 <Col xs={24} md={12} lg={12} key={index}>
//                   {renderProjectCard(project, index)}
//                 </Col>
//               ))}
//             </Row>
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
//               total={projectsData.length}
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


// ------------------------------------------------------------------------------------------------------



import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Row,
  Col,
  Badge,
  Typography,
  Tag,
  Pagination,
  Carousel,
  Tabs,
} from "antd";
import {
  ProjectOutlined,
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import useCSVDataLoader from "../hooks/useCSVDataLoader";

const { Title, Paragraph } = Typography;

// import { projectsData } from "../data/projects";

const ProjectsSection = ({ darkMode, setSelectedProject }) => {
  // const [projectsData, setProjectsData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const projectsPerPage = 4;

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0OolWGTTvmGyuG__Uz927ukP6Pf_NDNSeZajeA_kajS9dEocLgl3NgCMwykoVROxCqrMz2SncYNOd/pub?output=csv";

  const { csvData: projectsData, loading } = useCSVDataLoader(csvUrl);


  // Extract unique categories from projects data
  const categories = ["all", ...new Set((projectsData || []).map(project => project.category))];

  // Check window size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  // Reset to page 1 when changing category
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Calculate the projects to display on the current page (for pagination)
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Change page handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of projects section when page changes
    document
      .getElementById("projects-grid")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Render project card with framer-motion
  const renderProjectCard = (project, index) => (
    <motion.div
      key={project.id || index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      layout
    >
      <Badge.Ribbon
        text="Featured"
        color="#1890ff"
        style={{
          display: project.highlight ? "block" : "none",
        }}
      >
        <Card
          hoverable
          cover={
            <div
              style={{
                height: "200px",
                background: `linear-gradient(135deg, ${
                  index % 2 === 0 ? "#1890ff" : "#722ed1"
                }, ${index % 3 === 0 ? "#52c41a" : "#eb2f96"})`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "80px",
                color: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <ProjectOutlined />
            </div>
          }
          style={{
            height: "100%",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            margin: isMobile ? "0 8px" : 0,
          }}
        >
          <Title level={4}>{project.title}</Title>
          <Paragraph>{project.description}</Paragraph>
          <div style={{ marginTop: "16px" }}>
            {project.tags.split(',').map((tag, tagIndex) => (
              <Tag key={tagIndex} style={{ marginBottom: "8px" }}>
                {tag}
              </Tag>
            ))}
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={() => setSelectedProject(project)}
              size="large"
              shape="round"
              style={{
                background: "linear-gradient(90deg, #1890ff, #722ed1)",
                color: "white",
                border: "none",
                boxShadow: "0 5px 15px rgba(24, 144, 255, 0.4)",
                padding: "0 20px",
                height: "40px",
                fontWeight: "500",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Details
            </Button>
          </div>
        </Card>
      </Badge.Ribbon>
    </motion.div>
  );

  // Custom category tabs component
  const renderCategoryTabs = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          marginBottom: "32px",
          display: "flex",
          justifyContent: "center",
          overflow: "auto",
          padding: "8px 0"
        }}
      >
        <div style={{ 
          background: darkMode ? "#1f1f1f" : "#fff",
          borderRadius: "12px",
          padding: "4px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          display: "inline-flex",
          overflowX: "auto",
          maxWidth: "100%"
        }}>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: activeCategory === category 
                  ? "#1890ff" 
                  : "transparent",
                color: activeCategory === category 
                  ? "#fff" 
                  : darkMode ? "#f0f0f0" : "#333",
                border: "none",
                padding: "12px 20px",
                margin: "4px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "500",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                boxShadow: activeCategory === category 
                  ? "0 4px 12px rgba(24, 144, 255, 0.3)" 
                  : "none",
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={18}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Title level={4} style={{ color: "#1890ff", margin: "0 0 8px 0" }}>
            MY WORK
          </Title>
          <Title level={2}>Recent Projects</Title>
          <Divider />
        </div>

        {/* Category Tabs */}
        {renderCategoryTabs()}

        <div id="projects-grid">
          {isMobile ? (
            // Carousel view for mobile
            <div style={{ position: "relative", paddingBottom: "40px" }}>
              {filteredProjects.length > 0 ? (
                <Carousel
                  arrows
                  dots={{ className: "carousel-dots" }}
                  style={{ padding: "0 30px" }}
                  autoplay
                  autoplaySpeed={5000}
                  dotPosition="bottom"
                >
                  {filteredProjects.map((project, index) => (
                    <div key={project.id || index} style={{ padding: "8px" }}>
                      {renderProjectCard(project, index)}
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <Title level={4}>No projects found in this category</Title>
                </div>
              )}
              {/* Add custom styling for dots */}
              <style jsx="true">{`
                .carousel-dots {
                  z-index: 1 !important;
                }
                .carousel-dots li {
                  width: 10px !important;
                  height: 10px !important;
                  border-radius: 50% !important;
                  background: ${darkMode ? "#555" : "#d9d9d9"} !important;
                }
                .carousel-dots li button {
                  width: 10px !important;
                  height: 10px !important;
                  border-radius: 50% !important;
                  background: ${darkMode ? "#555" : "#d9d9d9"} !important;
                  opacity: 0.7;
                }
                .carousel-dots li.slick-active button {
                  background: #1890ff !important;
                  opacity: 1;
                  transform: scale(1.2);
                }
                .ant-carousel .slick-dots-bottom {
                  bottom: -30px;
                }
              `}</style>
            </div>
          ) : (
            // Grid view with pagination for desktop
            <div>
              <AnimatePresence>
                {filteredProjects.length > 0 ? (
                  <Row gutter={[24, 24]}>
                    {currentProjects.map((project, index) => (
                      <Col xs={24} md={12} lg={12} key={project.id || index}>
                        {renderProjectCard(project, index)}
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "40px 0" }}
                  >
                    <Title level={4}>No projects found in this category</Title>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginTop: "48px", textAlign: "center" }}
          >
            <Pagination
              current={currentPage}
              pageSize={projectsPerPage}
              total={filteredProjects.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              style={{
                display: "inline-flex",
                justifyContent: "center",
                background: darkMode ? "#1f1f1f" : "#fff",
                padding: "12px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
              }}
            />
          </motion.div>
        )}
      </Col>
    </Row>
  );
};

export default ProjectsSection;