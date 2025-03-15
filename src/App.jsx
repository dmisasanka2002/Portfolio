import React, { useState, useEffect } from "react";
import {
  ConfigProvider,
  theme,
  Button,
  Layout,
  Menu,
  Typography,
  Form,
  Input,
  Card,
  Modal,
  List,
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
  HomeOutlined,
  UserOutlined,
  ToolOutlined,
  ProjectOutlined,
  MailOutlined,
  BulbOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  SendOutlined,
  DownloadOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  RobotOutlined,
  ExperimentOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import emailjs from "@emailjs/browser";
// import ModelLoader from "./threejs/ModelLoader";

const { Header, Content, Footer } = Layout;
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

  const skillsData = [
    {
      title: "Programming",
      description: "JavaScript, Python, C++, Java",
      icon: <CodeOutlined />,
      color: "#1890ff",
      proficiency: 90,
    },
    {
      title: "AI & Machine Learning",
      description: "TensorFlow, PyTorch, Scikit-learn, Neural Networks",
      icon: <RobotOutlined />,
      color: "#52c41a",
      proficiency: 85,
    },
    {
      title: "3D Modeling",
      description: "AutoCAD, SolidWorks, Fusion 360, Blender",
      icon: <AntDesignOutlined />,
      color: "#722ed1",
      proficiency: 95,
    },
    {
      title: "Engineering Analysis",
      description: "FEA, CFD, Thermal Analysis, MATLAB",
      icon: <ExperimentOutlined />,
      color: "#eb2f96",
      proficiency: 88,
    },
  ];

  const projectsData = [
    {
      title: "AI-Based Predictive Maintenance",
      description:
        "Developed an AI system that predicts equipment failures before they occur, reducing downtime by 30%.",
      tags: ["AI", "Python", "TensorFlow", "Industrial IoT"],
      highlight: true,
    },
    {
      title: "Deep Learning Model for Image Recognition",
      description:
        "Created a custom CNN architecture for identifying defects in manufactured parts with 98% accuracy.",
      tags: ["Deep Learning", "Computer Vision", "PyTorch", "Manufacturing"],
      highlight: false,
    },
    {
      title: "3D CAD Model Simulations",
      description:
        "Implemented physics-based simulations for mechanical components under various stress conditions.",
      tags: ["SolidWorks", "FEA", "Mechanical Design", "Physics Simulation"],
      highlight: false,
    },
    {
      title: "Robotics Control System",
      description:
        "Designed and implemented a control system for a 6-axis robotic arm using ROS and custom algorithms.",
      tags: ["Robotics", "ROS", "C++", "Control Systems"],
      highlight: true,
    },
  ];

  const testimonials = [
    {
      content:
        "An exceptional engineer who combines mechanical knowledge with cutting-edge AI solutions. The predictive maintenance system they developed saved our company millions in downtime costs.",
      author: "Engineering Director, Manufacturing Company",
    },
    {
      content:
        "Innovative problem solver with deep technical expertise. Their work on our robotics control system exceeded all expectations and accelerated our product development timeline.",
      author: "CTO, Robotics Startup",
    },
    {
      content:
        "Remarkable ability to translate complex engineering concepts into practical solutions. Their 3D modeling skills and simulation expertise were invaluable to our project.",
      author: "Project Manager, Aerospace Firm",
    },
  ];

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className={darkMode ? "dark-mode" : "light-mode"}>
        {/* Navigation */}
        <Header
          style={{
            position: "fixed",
            top: 0,
            zIndex: 10,
            width: "100%",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              scrollPosition > 100 ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "none",
            transition: "box-shadow 0.3s ease",
            backgroundColor: darkMode
              ? "rgba(0, 0, 0, 0.85)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography.Title
            level={3}
            style={{ color: darkMode ? "white" : "black", margin: 0 }}
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
          <Menu
            mode="horizontal"
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "none",
            }}
            selectedKeys={[activeSection]}
            items={[
              {
                key: "home",
                icon: <HomeOutlined />,
                label: (
                  <Link to="home" smooth duration={500}>
                    Home
                  </Link>
                ),
              },
              {
                key: "about",
                icon: <UserOutlined />,
                label: (
                  <Link to="about" smooth duration={500}>
                    About
                  </Link>
                ),
              },
              {
                key: "skills",
                icon: <ToolOutlined />,
                label: (
                  <Link to="skills" smooth duration={500}>
                    Skills
                  </Link>
                ),
              },
              {
                key: "projects",
                icon: <ProjectOutlined />,
                label: (
                  <Link to="projects" smooth duration={500}>
                    Projects
                  </Link>
                ),
              },
              {
                key: "contact",
                icon: <MailOutlined />,
                label: (
                  <Link to="contact" smooth duration={500}>
                    Contact
                  </Link>
                ),
              },
            ]}
          />
          <Button
            type="primary"
            shape="round"
            onClick={() => setDarkMode(!darkMode)}
            icon={<BulbOutlined />}
            style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}
          >
            {darkMode ? "Light" : "Dark"}
          </Button>
        </Header>

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
              <Canvas camera={{ position: [0, 1, 3] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} />
                {/* <ModelLoader /> */}
                <OrbitControls enableZoom={true} />
              </Canvas>
            </div>

            <div style={{ zIndex: 2, textAlign: "center", maxWidth: "800px" }}>
              <Badge.Ribbon text="Undergraduate" color="#1890ff">
                <Title
                  level={1}
                  style={{
                    fontSize: "3.5rem",
                    marginBottom: "1rem",
                    textShadow: darkMode
                      ? "0 0 10px rgba(24, 144, 255, 0.5)"
                      : "none",
                  }}
                >
                  Hi, I'm{" "}
                  <span style={{ color: "#1890ff" }}>Ishan Sasanka</span>
                </Title>
              </Badge.Ribbon>
              <Title
                level={2}
                style={{
                  marginTop: 0,
                  marginBottom: "2rem",
                  fontWeight: 400,
                  color: darkMode
                    ? "rgba(255, 255, 255, 0.85)"
                    : "rgba(0, 0, 0, 0.85)",
                }}
              >
                Mechanical Engineer & AI Specialist
              </Title>
              <Paragraph
                style={{
                  fontSize: "1.2rem",
                  margin: "20px 0 40px",
                  color: darkMode
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.65)",
                }}
              >
                Combining traditional engineering principles with cutting-edge
                technology to create innovative solutions for complex problems.
              </Paragraph>

              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  icon={<DownloadOutlined />}
                  href="https://drive.google.com/file/d/1yGjkteuQgKs9mxtqVs7_d6RcDlYRcHGV/view?usp=drive_link" // Replace with your actual file link
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security best practice
                >
                  Download CV
                </Button>

                <Button
                  size="large"
                  shape="round"
                  icon={<ArrowRightOutlined />}
                >
                  <Link to="projects" smooth duration={500}>
                    View Projects
                  </Link>
                </Button>
              </Space>
            </div>

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
            <Row justify="center" gutter={[32, 32]}>
              <Col xs={24} lg={8}>
                <div style={{ textAlign: "center" }}>
                  <Avatar
                    size={240}
                    src="ishan.jpg"
                    style={{
                      border: "4px solid #1890ff",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                    }}
                  />
                  <div style={{ marginTop: "24px" }}>
                    <Space>
                      <Tooltip title="GitHub">
                        <Button
                          shape="circle"
                          icon={<GithubOutlined />}
                          size="large"
                          onClick={() =>
                            window.open(
                              "https://github.com/dmisasanka2002",
                              "_blank"
                            )
                          }
                        />
                      </Tooltip>
                      <Tooltip title="LinkedIn">
                        <Button
                          shape="circle"
                          icon={<LinkedinOutlined />}
                          size="large"
                          onClick={() =>
                            window.open(
                              "https://www.linkedin.com/in/ishan-sasanka-a2b4872ab",
                              "_blank"
                            )
                          }
                        />
                      </Tooltip>
                      {/* <Tooltip title="Twitter">
                        <Button
                          shape="circle"
                          icon={<TwitterOutlined />}
                          size="large"
                          onClick={() =>
                            window.open(
                              "https://twitter.com/your-username",
                              "_blank"
                            )
                          } 
                        />
                      </Tooltip> */}
                    </Space>
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={16}>
                <div>
                  <Title
                    level={4}
                    style={{ color: "#1890ff", margin: "0 0 8px 0" }}
                  >
                    WHO I AM
                  </Title>
                  <Title level={2}>About Me</Title>
                  <Divider
                    style={{ marginTop: "16px", marginBottom: "24px" }}
                  />

                  <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                    I'm a Mechanical Engineering undergraduate with a strong
                    passion for designing, analyzing, and optimizing mechanical
                    systems. My interest lies at the intersection of traditional
                    engineering and modern digital technologies.
                  </Paragraph>

                  <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                    Alongside my foundation in mechanical engineering, I have
                    developed skills in programming, AI, and machine learning. I
                    actively explore how these technologies can be integrated
                    into engineering workflows to enhance efficiency and
                    innovation.
                  </Paragraph>

                  <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                    I approach problem-solving with a blend of analytical
                    thinking and creativity, aiming to bridge the gap between
                    physical systems and digital solutions. I'm always eager to
                    learn new technologies and methodologies to expand my
                    engineering capabilities.
                  </Paragraph>

                  {/* <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                    <Col xs={12} sm={6}>
                      <Card
                        variant={false}
                        style={{
                          textAlign: "center",
                          backgroundColor: darkMode ? "#1f1f1f" : "#f0f5ff",
                        }}
                      >
                        <Title
                          level={2}
                          style={{ margin: 0, color: "#1890ff" }}
                        >
                          7+
                        </Title>
                        <Text strong>Years Experience</Text>
                      </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Card
                        variant={false}
                        style={{
                          textAlign: "center",
                          backgroundColor: darkMode ? "#1f1f1f" : "#f0f5ff",
                        }}
                      >
                        <Title
                          level={2}
                          style={{ margin: 0, color: "#1890ff" }}
                        >
                          20+
                        </Title>
                        <Text strong>Projects</Text>
                      </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Card
                        variant={false}
                        style={{
                          textAlign: "center",
                          backgroundColor: darkMode ? "#1f1f1f" : "#f0f5ff",
                        }}
                      >
                        <Title
                          level={2}
                          style={{ margin: 0, color: "#1890ff" }}
                        >
                          15+
                        </Title>
                        <Text strong>Happy Clients</Text>
                      </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Card
                        variant={false}
                        style={{
                          textAlign: "center",
                          backgroundColor: darkMode ? "#1f1f1f" : "#f0f5ff",
                        }}
                      >
                        <Title
                          level={2}
                          style={{ margin: 0, color: "#1890ff" }}
                        >
                          5+
                        </Title>
                        <Text strong>Publications</Text>
                      </Card>
                    </Col>
                  </Row> */}
                </div>
              </Col>
            </Row>
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
            <Row justify="center">
              <Col xs={24} md={20} lg={18}>
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                  <Title
                    level={4}
                    style={{ color: "#1890ff", margin: "0 0 8px 0" }}
                  >
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
            <Row justify="center">
              <Col xs={24} md={20} lg={18}>
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                  <Title
                    level={4}
                    style={{ color: "#1890ff", margin: "0 0 8px 0" }}
                  >
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
                              <Tag
                                key={tagIndex}
                                style={{ marginBottom: "8px" }}
                              >
                                {tag}
                              </Tag>
                            ))}
                          </div>
                          <div style={{ marginTop: "16px" }}>
                            <Button
                              type="primary"
                              icon={<ArrowRightOutlined />}
                              onClick={() => setSelectedProject(project)}
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
            title={selectedProject.title}
            open={!!selectedProject}
            onCancel={() => setSelectedProject(null)}
            footer={null}
          >
            <Paragraph>{selectedProject.description}</Paragraph>
            <div style={{ marginTop: "16px" }}>
              {selectedProject.tags.map((tag, tagIndex) => (
                <Tag key={tagIndex} color="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          </Modal>
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default App;

//
