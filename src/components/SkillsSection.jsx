import React from "react";
import { Card, Divider, Row, Col, Progress, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

import { skillsData } from "../data/skills";

const SkillsSection = ({ darkMode }) => {
  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={18}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Title level={4} style={{ color: "#1890ff", margin: "0 0 8px 0" }}>
            MY EXPERTISE
          </Title>
          <Title level={2}>Skills & Proficiency</Title>
          <Divider />
        </div>

        <Row gutter={[24, 24]}>
          {skillsData.map((skill, index) => (
            <Col xs={24} md={12} key={index}>
              <Card
                variant={false}
                style={{
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  height: "100%",
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

                <Paragraph>{skill.description}</Paragraph>

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
            </Col>
          ))}
        </Row>

        {/* <div style={{ marginTop: "64px" }}>
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
                </div> */}
      </Col>
    </Row>
  );
};

export default SkillsSection;
