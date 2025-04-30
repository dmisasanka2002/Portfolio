// import React from "react";
// import { Button ,Card, Divider, Row, Col, Badge, Typography, Tag } from "antd";
// import { ProjectOutlined, ArrowRightOutlined } from "@ant-design/icons";

// const { Title, Paragraph, Text } = Typography;

// import { projectsData } from "../data/projects";

// const ProjectsSection = ({ darkMode, setSelectedProject }) => {
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

//         <Row gutter={[24, 24]}>
//           {projectsData.map((project, index) => (
//             <Col xs={24} md={12} lg={12} key={index}>
//               <Badge.Ribbon
//                 text="Featured"
//                 color="#1890ff"
//                 style={{
//                   display: project.highlight ? "block" : "none",
//                 }}
//               >
//                 <Card
//                   hoverable
//                   cover={
//                     <div
//                       style={{
//                         height: "200px",
//                         background: `linear-gradient(135deg, ${
//                           index % 2 === 0 ? "#1890ff" : "#722ed1"
//                         }, ${index % 3 === 0 ? "#52c41a" : "#eb2f96"})`,
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         fontSize: "80px",
//                         color: "rgba(255, 255, 255, 0.2)",
//                       }}
//                     >
//                       <ProjectOutlined />
//                     </div>
//                   }
//                   style={{
//                     height: "100%",
//                     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//                   }}
//                 >
//                   <Title level={4}>{project.title}</Title>
//                   <Paragraph>{project.description}</Paragraph>
//                   <div style={{ marginTop: "16px" }}>
//                     {project.tags.map((tag, tagIndex) => (
//                       <Tag key={tagIndex} style={{ marginBottom: "8px" }}>
//                         {tag}
//                       </Tag>
//                     ))}
//                   </div>
//                   <div style={{ marginTop: 16, textAlign: "center" }}>
//                     <Button
//                       type="primary"
//                       icon={<ArrowRightOutlined />}
//                       onClick={() => setSelectedProject(project)}
//                       size="large"
//                       shape="round"
//                       style={{
//                         background: "linear-gradient(90deg, #1890ff, #722ed1)",
//                         color: "white",
//                         border: "none",
//                         boxShadow: "0 5px 15px rgba(24, 144, 255, 0.4)",
//                         padding: "0 20px",
//                         height: "40px",
//                         fontWeight: "500",
//                         fontSize: "16px",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "translateY(-2px)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "translateY(0)";
//                       }}
//                     >
//                       View Details
//                     </Button>
//                   </div>
//                 </Card>
//               </Badge.Ribbon>
//             </Col>
//           ))}
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// export default ProjectsSection;

// ------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import { Button, Card, Divider, Row, Col, Badge, Typography, Tag, Pagination } from "antd";
// import { ProjectOutlined, ArrowRightOutlined } from "@ant-design/icons";

// const { Title, Paragraph } = Typography;

// import { projectsData } from "../data/projects";

// const ProjectsSection = ({ darkMode, setSelectedProject }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const projectsPerPage = 4;

//   // Calculate the projects to display on the current page
//   const indexOfLastProject = currentPage * projectsPerPage;
//   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//   const currentProjects = projectsData.slice(indexOfFirstProject, indexOfLastProject);

//   // Change page handler
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Scroll to top of projects section when page changes
//     document.getElementById("projects-grid").scrollIntoView({ behavior: "smooth", block: "start" });
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
//           <Row gutter={[24, 24]}>
//             {currentProjects.map((project, index) => (
//               <Col xs={24} md={12} lg={12} key={index}>
//                 <Badge.Ribbon
//                   text="Featured"
//                   color="#1890ff"
//                   style={{
//                     display: project.highlight ? "block" : "none",
//                   }}
//                 >
//                   <Card
//                     hoverable
//                     cover={
//                       <div
//                         style={{
//                           height: "200px",
//                           background: `linear-gradient(135deg, ${
//                             index % 2 === 0 ? "#1890ff" : "#722ed1"
//                           }, ${index % 3 === 0 ? "#52c41a" : "#eb2f96"})`,
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           fontSize: "80px",
//                           color: "rgba(255, 255, 255, 0.2)",
//                         }}
//                       >
//                         <ProjectOutlined />
//                       </div>
//                     }
//                     style={{
//                       height: "100%",
//                       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//                     }}
//                   >
//                     <Title level={4}>{project.title}</Title>
//                     <Paragraph>{project.description}</Paragraph>
//                     <div style={{ marginTop: "16px" }}>
//                       {project.tags.map((tag, tagIndex) => (
//                         <Tag key={tagIndex} style={{ marginBottom: "8px" }}>
//                           {tag}
//                         </Tag>
//                       ))}
//                     </div>
//                     <div style={{ marginTop: 16, textAlign: "center" }}>
//                       <Button
//                         type="primary"
//                         icon={<ArrowRightOutlined />}
//                         onClick={() => setSelectedProject(project)}
//                         size="large"
//                         shape="round"
//                         style={{
//                           background: "linear-gradient(90deg, #1890ff, #722ed1)",
//                           color: "white",
//                           border: "none",
//                           boxShadow: "0 5px 15px rgba(24, 144, 255, 0.4)",
//                           padding: "0 20px",
//                           height: "40px",
//                           fontWeight: "500",
//                           fontSize: "16px",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = "translateY(-2px)";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = "translateY(0)";
//                         }}
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </Card>
//                 </Badge.Ribbon>
//               </Col>
//             ))}
//           </Row>
//         </div>

//         <div style={{ marginTop: "48px", textAlign: "center" }}>
//           <Pagination
//             current={currentPage}
//             pageSize={projectsPerPage}
//             total={projectsData.length}
//             onChange={handlePageChange}
//             showSizeChanger={false}
//             style={{ 
//               display: "flex", 
//               justifyContent: "center",
//               background: darkMode ? "#1f1f1f" : "#fff",
//               padding: "12px 16px",
//               borderRadius: "8px",
//               display: "inline-flex",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.09)"
//             }}
//           />
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default ProjectsSection;


// ------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { Button, Card, Divider, Row, Col, Badge, Typography, Tag, Pagination, Carousel } from "antd";
// import { ProjectOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

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
//   const currentProjects = projectsData.slice(indexOfFirstProject, indexOfLastProject);

//   // Change page handler
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Scroll to top of projects section when page changes
//     document.getElementById("projects-grid").scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   // Custom arrows for carousel
//   const carouselArrows = {
//     prevArrow: <Button icon={<LeftOutlined />} type="primary" shape="circle" />,
//     nextArrow: <Button icon={<RightOutlined />} type="primary" shape="circle" />
//   };

//   // Render project card
//   const renderProjectCard = (project, index) => (
//     <Badge.Ribbon
//       text="Featured"
//       color="#1890ff"
//       style={{
//         display: project.highlight ? "block" : "none",
//       }}
//     >
//       <Card
//         hoverable
//         cover={
//           <div
//             style={{
//               height: "200px",
//               background: `linear-gradient(135deg, ${
//                 index % 2 === 0 ? "#1890ff" : "#722ed1"
//               }, ${index % 3 === 0 ? "#52c41a" : "#eb2f96"})`,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               fontSize: "80px",
//               color: "rgba(255, 255, 255, 0.2)",
//             }}
//           >
//             <ProjectOutlined />
//           </div>
//         }
//         style={{
//           height: "100%",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//           margin: isMobile ? "0 8px" : 0,
//         }}
//       >
//         <Title level={4}>{project.title}</Title>
//         <Paragraph>{project.description}</Paragraph>
//         <div style={{ marginTop: "16px" }}>
//           {project.tags.map((tag, tagIndex) => (
//             <Tag key={tagIndex} style={{ marginBottom: "8px" }}>
//               {tag}
//             </Tag>
//           ))}
//         </div>
//         <div style={{ marginTop: 16, textAlign: "center" }}>
//           <Button
//             type="primary"
//             icon={<ArrowRightOutlined />}
//             onClick={() => setSelectedProject(project)}
//             size="large"
//             shape="round"
//             style={{
//               background: "linear-gradient(90deg, #1890ff, #722ed1)",
//               color: "white",
//               border: "none",
//               boxShadow: "0 5px 15px rgba(24, 144, 255, 0.4)",
//               padding: "0 20px",
//               height: "40px",
//               fontWeight: "500",
//               fontSize: "16px",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "translateY(-2px)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "translateY(0)";
//             }}
//           >
//             View Details
//           </Button>
//         </div>
//       </Card>
//     </Badge.Ribbon>
//   );

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
//             <Carousel
//               arrows
//               dots={{ className: "custom-carousel-dots" }}
//               prevArrow={carouselArrows.prevArrow}
//               nextArrow={carouselArrows.nextArrow}
//               style={{ padding: "0 30px" }}
//               autoplay
//               autoplaySpeed={5000}
//             >
//               {projectsData.map((project, index) => (
//                 <div key={index} style={{ padding: "8px" }}>
//                   {renderProjectCard(project, index)}
//                 </div>
//               ))}
//             </Carousel>
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
//           <div style={{ marginTop: "48px", textAlign: "center" }}>
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
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.09)"
//               }}
//             />
//           </div>
//         )}
//       </Col>
//     </Row>
//   );
// };

// export default ProjectsSection;



// ------------------------------------------------------------------------------------------------------


import React, { useState, useEffect } from "react";
import { Button, Card, Divider, Row, Col, Badge, Typography, Tag, Pagination, Carousel } from "antd";
import { ProjectOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

import { projectsData } from "../data/projects";

const ProjectsSection = ({ darkMode, setSelectedProject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const projectsPerPage = 4;

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

  // Calculate the projects to display on the current page (for pagination)
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectsData.slice(indexOfFirstProject, indexOfLastProject);

  // Change page handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of projects section when page changes
    document.getElementById("projects-grid").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Custom arrows for carousel
  const carouselArrows = {
    prevArrow: <Button icon={<LeftOutlined />} type="primary" shape="circle" />,
    nextArrow: <Button icon={<RightOutlined />} type="primary" shape="circle" />
  };

  // Custom dot style for carousel
  const customDotStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: darkMode ? "#555" : "#d9d9d9"
  };

  // Render project card with framer-motion
  const renderProjectCard = (project, index) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
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
            {project.tags.map((tag, tagIndex) => (
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

  // Custom style for the carousel container
  const carouselContainerStyle = {
    position: "relative",
    paddingBottom: "40px"  // Add space for dots
  };

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={18}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Title level={4} style={{ color: "#1890ff", margin: "0 0 8px 0" }}>
            MY WORK
          </Title>
          <Title level={2}>Recent Projects</Title>
          <Divider />
        </div>

        <div id="projects-grid">
          {isMobile ? (
            // Carousel view for mobile
            <div style={carouselContainerStyle}>
              <Carousel
                arrows
                dots={{ className: "carousel-dots" }}
                // prevArrow={carouselArrows.prevArrow}
                // nextArrow={carouselArrows.nextArrow}
                style={{ padding: "0 30px" }}
                autoplay
                autoplaySpeed={5000}
                dotPosition="bottom"
              >
                {projectsData.map((project, index) => (
                  <div key={index} style={{ padding: "8px" }}>
                    {renderProjectCard(project, index)}
                  </div>
                ))}
              </Carousel>
              {/* Add custom styling for dots */}
              <style jsx="true">{`
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
            <Row gutter={[24, 24]}>
              {currentProjects.map((project, index) => (
                <Col xs={24} md={12} lg={12} key={index}>
                  {renderProjectCard(project, index)}
                </Col>
              ))}
            </Row>
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
              total={projectsData.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              style={{ 
                display: "inline-flex", 
                justifyContent: "center",
                background: darkMode ? "#1f1f1f" : "#fff",
                padding: "12px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.09)"
              }}
            />
          </motion.div>
        )}
      </Col>
    </Row>
  );
};

export default ProjectsSection;