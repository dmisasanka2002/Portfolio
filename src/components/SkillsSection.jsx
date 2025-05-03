// import React from "react";
// import { Card, Divider, Row, Col, Progress, Typography } from "antd";

// const { Title, Paragraph, Text } = Typography;

// import { skillsData } from "../data/skills";

// const SkillsSection = ({ darkMode }) => {
//   return (
//     <Row justify="center">
//       <Col xs={24} md={20} lg={18}>
//         <div style={{ textAlign: "center", marginBottom: "48px" }}>
//           <Title level={4} style={{ color: "#1890ff", margin: "0 0 8px 0" }}>
//             MY EXPERTISE
//           </Title>
//           <Title level={2}>Skills & Proficiency</Title>
//           <Divider />
//         </div>

//         <Row gutter={[24, 24]}>
//           {skillsData.map((skill, index) => (
//             <Col xs={24} md={12} key={index}>
//               <Card
//                 variant={false}
//                 style={{
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//                   height: "100%",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       backgroundColor: skill.color,
//                       width: "48px",
//                       height: "48px",
//                       borderRadius: "12px",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       marginRight: "16px",
//                       fontSize: "24px",
//                       color: "#fff",
//                     }}
//                   >
//                     {skill.icon}
//                   </div>
//                   <Title level={4} style={{ margin: 0 }}>
//                     {skill.title}
//                   </Title>
//                 </div>

//                 <Paragraph>{skill.description}</Paragraph>

//                 <div style={{ marginTop: "16px" }}>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     <Text strong>Proficiency</Text>
//                     <Text strong>{skill.proficiency}%</Text>
//                   </div>
//                   <Progress
//                     percent={skill.proficiency}
//                     showInfo={false}
//                     strokeColor={skill.color}
//                     trailColor={darkMode ? "#2d2d2d" : "#f0f0f0"}
//                   />
//                 </div>
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         {/* <div style={{ marginTop: "64px" }}>
//                   <div style={{ marginBottom: "32px", textAlign: "center" }}>
//                     <Title level={3}>What Others Say</Title>
//                     <Divider />
//                   </div>

//                   <Carousel autoplay>
//                     {testimonials.map((testimonial, index) => (
//                       <div key={index}>
//                         <Card
//                           variant={false}
//                           style={{
//                             maxWidth: "800px",
//                             margin: "0 auto",
//                             padding: "16px",
//                             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//                             backgroundColor: darkMode ? "#1f1f1f" : "#f9f9f9",
//                           }}
//                         >
//                           <div style={{ textAlign: "center", padding: "24px" }}>
//                             <div
//                               style={{
//                                 fontSize: "48px",
//                                 color: "#1890ff",
//                                 marginBottom: "16px",
//                               }}
//                             >
//                               "
//                             </div>
//                             <Paragraph
//                               style={{ fontSize: "16px", fontStyle: "italic" }}
//                             >
//                               {testimonial.content}
//                             </Paragraph>
//                             <div style={{ marginTop: "16px" }}>
//                               <Text strong>{testimonial.author}</Text>
//                             </div>
//                           </div>
//                         </Card>
//                       </div>
//                     ))}
//                   </Carousel>
//                 </div> */}
//       </Col>
//     </Row>
//   );
// };

// export default SkillsSection;

// ----------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import {
  Card,
  Divider,
  Row,
  Col,
  Progress,
  Typography,
  Carousel,
  Button,
  Tag,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

import { skillsData } from "../data/skills";
import { testimonials } from "../data/testimonials";

const SkillsSection = ({ darkMode }) => {
  const [isMobile, setIsMobile] = useState(false);

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

  // Custom arrows for carousel
  const carouselArrows = {
    prevArrow: <Button icon={<LeftOutlined />} type="primary" shape="circle" />,
    nextArrow: (
      <Button icon={<RightOutlined />} type="primary" shape="circle" />
    ),
  };

  // Configure carousel settings based on screen size
  const carouselSettings = {
    // arrows: true,
    dots: true,
    // prevArrow: carouselArrows.prevArrow,
    // nextArrow: carouselArrows.nextArrow,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dotPosition: "bottom",
  };

  // Render skill card
  const renderSkillCard = (skill, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{ padding: "8px" }}
    >
      <Card
        variant={false}
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          height: "100%",
          margin: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: skill.color,
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "16px",
              fontSize: "24px",
              color: "#fff",
            }}
          >
            {skill.icon}
          </div>
          <Title level={4} style={{ margin: 0 }}>
            {skill.title}
          </Title>
        </div>

        {/* <Paragraph>{skill.description}</Paragraph> */}
        {/* Modified Description View */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {skill.description.split(", ").map((tag, idx) => (
            <Tag
              key={idx}
              color="geekblue"
              style={{
                fontSize: "14px",
                padding: "4px 12px",
                borderRadius: "16px",
              }}
            >
              {tag}
            </Tag>
          ))}
        </div>

        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text strong>Proficiency</Text>
            <Text strong>{skill.proficiency}%</Text>
          </div>
          <Progress
            percent={skill.proficiency}
            showInfo={false}
            strokeColor={skill.color}
            trailColor={darkMode ? "#2d2d2d" : "#f0f0f0"}
          />
        </div>
      </Card>
    </motion.div>
  );

  // Custom style for the carousel container
  const carouselContainerStyle = {
    position: "relative",
    paddingBottom: "40px", // Add space for dots
  };

  return (
    <>
      <Row justify="center">
        <Col xs={24} md={20} lg={18}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Title level={4} style={{ color: "#1890ff", margin: "0 0 8px 0" }}>
              MY EXPERTISE
            </Title>
            <Title level={2}>Skills & Proficiency</Title>
            <Divider />
          </div>

          <div style={carouselContainerStyle}>
            <Carousel {...carouselSettings}>
              {skillsData.map((skill, index) => renderSkillCard(skill, index))}
            </Carousel>

            {/* Add custom styling for dots */}
            <style jsx="true">{`
              .slick-dots {
                z-index: 1 !important;
              }
              .slick-dots li {
                width: 10px !important;
                height: 10px !important;
                border-radius: 50% !important;
                background: ${darkMode ? "#555" : "#d9d9d9"} !important;
              }
              .slick-dots li button {
                width: 10px !important;
                height: 10px !important;
                border-radius: 50% !important;
                opacity: 0.7;
              }
              .slick-dots li.slick-active button {
                background: #1890ff !important;
                opacity: 1;
                transform: scale(1.2);
              }
              .ant-carousel .slick-dots-bottom {
                bottom: -30px;
              }
              .slick-prev,
              .slick-next {
                z-index: 10;
              }
              .slick-prev {
                left: 10px;
              }
              .slick-next {
                right: 10px;
              }
            `}</style>
          </div>
        </Col>
      </Row>
      {/* {
        <div style={{ marginTop: "64px" }}>
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <Title level={3}>What Others Say</Title>
            <Divider />
          </div>

          <Carousel autoplay>
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <Card
                  variant={false}
                  style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    backgroundColor: darkMode ? "#1f1f1f" : "#f9f9f9",
                  }}
                >
                  <div style={{ textAlign: "center", padding: "24px" }}>
                    <div
                      style={{
                        fontSize: "48px",
                        color: "#1890ff",
                        marginBottom: "16px",
                      }}
                    >
                      "
                    </div>
                    <Paragraph
                      style={{ fontSize: "16px", fontStyle: "italic" }}
                    >
                      {testimonial.content}
                    </Paragraph>
                    <div style={{ marginTop: "16px" }}>
                      <Text strong>{testimonial.author}</Text>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      } */}
    </>
  );
};

export default SkillsSection;

// ------------------------------------------------------------------------------------------
