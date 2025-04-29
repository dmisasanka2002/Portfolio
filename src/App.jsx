import React, { useState, useEffect } from "react";
import {
  ConfigProvider,
  theme,
  Button,
  Layout,
  Typography,
  Form,
  Input,
  Card,
  Modal,
  Divider,
  Row,
  Col,
  Space,
  Avatar,
  Progress,
  Tag,
  Badge,
  FloatButton,
  Tooltip,
  Carousel,
} from "antd";
import { Link } from "react-scroll";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  ProjectOutlined,
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  SendOutlined,
  DownloadOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import emailjs from "@emailjs/browser";


import ResponsiveHeader from "./components/ResponsiveHeader";
import AnimatedHeroSection from "./components/AnimatedHeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [form] = Form.useForm();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (values) => {
    setLoading(true);

    // Use EmailJS to send the email
    emailjs
      .send(
        "service_28srnqc", // Replace with your EmailJS service ID
        "template_m4m0hsh", // Replace with your EmailJS template ID
        {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        },
        {
          publicKey: "UUfdTZwdqriGxcmU-", // Replace with your EmailJS user ID
        }
      )
      .then(
        (response) => {
          setLoading(false);
          // message.success("Message sent successfully!");
          console.log("Message sent successfully!");
          form.resetFields(); // Reset the form fields
        },
        (error) => {
          setLoading(false);
          // message.error("Failed to send message. Please try again.");
          console.log(error);
        }
      );
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      // Determine active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themeConfig = {
    algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#1890ff",
      borderRadius: 8,
      fontFamily: "'Poppins', sans-serif",
    },
    components: {
      Button: {
        borderRadius: 8,
        primaryColor: "#1890ff",
      },
      Card: {
        borderRadius: 12,
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className={darkMode ? "dark-mode" : "light-mode"}>
        {/* Navigation Bar */}
        <ResponsiveHeader
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          scrollPosition={scrollPosition}
          setScrollPosition={setScrollPosition}
        />

        <Content>
          {/* Home Section */}
          <section
            id="home"
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px 20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
              }}
            >
            </div>

            {/* Hero Section */}
            <AnimatedHeroSection darkMode={darkMode} />

            <div
              style={{
                position: "absolute",
                bottom: "40px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 2,
                animation: "bounce 2s infinite",
              }}
            >
              <Link to="about" smooth duration={500}>
                <Button
                  type="text"
                  shape="circle"
                  size="large"
                  icon={<div style={{ fontSize: "24px" }}>↓</div>}
                />
              </Link>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            style={{
              minHeight: "100vh",
              padding: "100px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: darkMode ? "#141414" : "#f7f9fc",
            }}
          >
            <AboutSection darkMode={darkMode} />
          </section>

          {/* Skills Section */}
          <section
            id="skills"
            style={{
              minHeight: "100vh",
              padding: "100px 20px",
              backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
            }}
          >
            <SkillsSection darkMode={darkMode}/>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            style={{
              minHeight: "100vh",
              padding: "100px 20px",
              backgroundColor: darkMode ? "#141414" : "#f7f9fc",
            }}
          >
            <ProjectsSection darkMode={darkMode} setSelectedProject={setSelectedProject}/>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            style={{
              minHeight: "100vh",
              padding: "100px 20px",
              backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
            }}
          >
            <Row justify="center">
              <Col xs={24} md={20} lg={18}>
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                  <Title
                    level={4}
                    style={{ color: "#1890ff", margin: "0 0 8px 0" }}
                  >
                    GET IN TOUCH
                  </Title>
                  <Title level={2}>Contact Me</Title>
                  <Divider />
                </div>

                <Row gutter={[32, 32]}>
                  <Col xs={24} lg={12}>
                    <div style={{ marginBottom: "32px" }}>
                      <Title level={3}>Let's Talk</Title>
                      <Paragraph
                        style={{ fontSize: "16px", lineHeight: "1.8" }}
                      >
                        Whether you have a question about a project, job
                        opportunity, or just want to say hi, feel free to reach
                        out. I'm always open to discussing new projects and
                        ideas.
                      </Paragraph>
                    </div>

                    <Row gutter={[16, 24]}>
                      <Col xs={24}>
                        <Card
                          variant={false}
                          style={{
                            backgroundColor: darkMode ? "#1f1f1f" : "#f0f5ff",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                backgroundColor: "#1890ff",
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "16px",
                                fontSize: "20px",
                                color: "#fff",
                              }}
                            >
                              <MailOutlined />
                            </div>
                            <div>
                              <Text
                                strong
                                style={{
                                  display: "block",
                                  marginBottom: "4px",
                                }}
                              >
                                Email
                              </Text>
                              <Text>
                                <a
                                  href="mailto:dmisasanka@gmail.com"
                                  style={{ color: "#1890ff" }}
                                >
                                  dmisasanka@gmail.com
                                </a>
                              </Text>
                            </div>
                          </div>
                        </Card>
                      </Col>
                      <Col xs={24}>
                        <Card
                          variant={false}
                          style={{
                            backgroundColor: darkMode ? "#1f1f1f" : "#f0f5ff",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                backgroundColor: "#52c41a",
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "16px",
                                fontSize: "20px",
                                color: "#fff",
                              }}
                            >
                              <LinkedinOutlined />
                            </div>
                            <div>
                              <Text
                                strong
                                style={{
                                  display: "block",
                                  marginBottom: "4px",
                                }}
                              >
                                LinkedIn
                              </Text>
                              <Text>
                                <a
                                  href="https://www.linkedin.com/in/ishan-sasanka-a2b4872ab"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "#1890ff" }}
                                >
                                  linkedin.com/in/ishan-sasanka-a2b4872ab
                                </a>
                              </Text>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Card
                      variant={false}
                      style={{
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={(values) => (
                          console.log("Form values:", values),
                          handleFormSubmit(values)
                        )}
                      >
                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          <Input size="large" placeholder="Your Name" />
                        </Form.Item>
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                            {
                              type: "email",
                              message: "Please enter a valid email",
                            },
                          ]}
                        >
                          <Input size="large" placeholder="Your Email" />
                        </Form.Item>
                        <Form.Item
                          name="subject"
                          label="Subject"
                          rules={[
                            {
                              required: true,
                              message: "Please enter a subject",
                            },
                          ]}
                        >
                          <Input size="large" placeholder="Subject" />
                        </Form.Item>
                        <Form.Item
                          name="message"
                          label="Message"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your message",
                            },
                          ]}
                        >
                          <TextArea rows={5} placeholder="Your Message" />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            icon={<SendOutlined />}
                            style={{
                              background:
                                "linear-gradient(90deg, #1890ff, #722ed1)",
                              color: "white",
                              border: "none",
                              boxShadow: "0 5px 15px rgba(24, 144, 255, 0.4)",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-2px)";
                              e.currentTarget.style.boxShadow =
                                "0 8px 20px rgba(114, 46, 209, 0.5)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow =
                                "0 5px 15px rgba(24, 144, 255, 0.4)";
                            }}
                          >
                            Send Message
                          </Button>
                        </Form.Item>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </section>
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            padding: "40px 50px",
            backgroundColor: darkMode ? "#0f0f0f" : "#001529",
            color: "rgba(255, 255, 255, 0.65)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <Typography.Title
              level={4}
              style={{ color: "#fff", margin: "0 0 16px 0" }}
            >
              <span
                style={{
                  background: "linear-gradient(90deg, #1890ff, #722ed1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ishan Sasanka
              </span>
            </Typography.Title>
            <Paragraph style={{ color: "rgba(255, 255, 255, 0.65)" }}>
              Building innovative engineering solutions through technology
            </Paragraph>
          </div>
          <Space size={24} style={{ marginBottom: "24px" }}>
            <Button
              type="text"
              icon={
                <GithubOutlined
                  style={{ fontSize: "24px", color: "#fff" }}
                  onClick={() =>
                    window.open("https://github.com/dmisasanka2002", "_blank")
                  }
                />
              }
            />
            <Button
              type="text"
              icon={
                <LinkedinOutlined
                  style={{ fontSize: "24px", color: "#fff" }}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/ishan-sasanka-a2b4872ab",
                      "_blank"
                    )
                  }
                />
              }
            />
            {/* <Button
              type="text"
              icon={
                <TwitterOutlined style={{ fontSize: "24px", color: "#fff" }} />
              }
            /> */}
          </Space>
          <Divider style={{ borderColor: "rgba(255, 255, 255, 0.15)" }} />
          <div>
            © {new Date().getFullYear()} Ishan Sasanka | Mechanical Engineer &
            AI Specialist. All Rights Reserved.
          </div>
        </Footer>
        <FloatButton.BackTop />

        {selectedProject && (
          <Modal
            title={
              <span
                style={{ fontSize: "24px", fontWeight: 600, color: "#722ed1" }}
              >
                {selectedProject.title}
              </span>
            }
            open={!!selectedProject}
            onCancel={() => setSelectedProject(null)}
            footer={null}
            centered
            bodyStyle={{ padding: "24px", borderRadius: "8px" }}
          >
            <Paragraph
              style={{ fontSize: "16px", color: "#595959", lineHeight: 1.6 }}
            >
              {selectedProject.description}
            </Paragraph>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {selectedProject.tags.map((tag, tagIndex) => (
                <Tag
                  key={tagIndex}
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

            <div style={{ marginTop: 32, textAlign: "right" }}>
              <Tooltip title="View on GitHub">
                <Button
                  shape="circle"
                  size="large"
                  icon={<GithubOutlined />}
                  style={{
                    background: "#24292e",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => window.open(selectedProject.link, "_blank")}
                />
              </Tooltip>
            </div>
          </Modal>
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default App;

//
