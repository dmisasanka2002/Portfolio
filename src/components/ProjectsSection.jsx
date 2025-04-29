import React from "react";
import { Button ,Card, Divider, Row, Col, Badge, Typography, Tag } from "antd";
import { ProjectOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

import { projectsData } from "../data/projects";

const ProjectsSection = ({ darkMode, setSelectedProject }) => {
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

        <Row gutter={[24, 24]}>
          {projectsData.map((project, index) => (
            <Col xs={24} md={12} lg={12} key={index}>
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
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ProjectsSection;
