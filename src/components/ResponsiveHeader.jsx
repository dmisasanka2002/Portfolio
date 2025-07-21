import React, { useState, useEffect } from "react";
import { Typography, Menu, Button, Drawer, Layout } from "antd";
const { Header } = Layout;
import {
  HomeOutlined,
  UserOutlined,
  ToolOutlined,
  ProjectOutlined,
  MailOutlined,
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-scroll";

const ResponsiveHeader = ({ darkMode, setDarkMode, activeSection, scrollPosition, setScrollPosition }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileMenuVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: (
        <Link
          to="home"
          smooth
          duration={500}
          onClick={() => setMobileMenuVisible(false)}
        >
          Home
        </Link>
      ),
    },
    {
      key: "about",
      icon: <UserOutlined />,
      label: (
        <Link
          to="about"
          smooth
          duration={500}
          onClick={() => setMobileMenuVisible(false)}
        >
          About
        </Link>
      ),
    },
    {
      key: "skills",
      icon: <ToolOutlined />,
      label: (
        <Link
          to="skills"
          smooth
          duration={500}
          onClick={() => setMobileMenuVisible(false)}
        >
          Skills
        </Link>
      ),
    },
    {
      key: "projects",
      icon: <ProjectOutlined />,
      label: (
        <Link
          to="projects"
          smooth
          duration={500}
          onClick={() => setMobileMenuVisible(false)}
        >
          Projects
        </Link>
      ),
    },
    {
      key: "contact",
      icon: <MailOutlined />,
      label: (
        <Link
          to="contact"
          smooth
          duration={500}
          onClick={() => setMobileMenuVisible(false)}
        >
          Contact
        </Link>
      ),
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
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
        height: "64px",
      }}
    >
      <Typography.Title
        level={3}
        style={{
          color: darkMode ? "white" : "black",
          margin: 0,
          fontSize: windowWidth < 576 ? "18px" : "24px",
        }}
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

      {/* Desktop Navigation */}
      {windowWidth > 768 ? (
        <Menu
          mode="horizontal"
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "transparent",
            border: "none",
            color: darkMode ? "white" : "black",
          }}
          selectedKeys={[activeSection]}
          items={menuItems}
          // theme={darkMode ? "light" : "light"}
        />
      ) : null}

      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Improved Theme Toggle Button */}
        <Button
          onClick={() => setDarkMode(!darkMode)}
          style={{ 
            marginRight: windowWidth > 768 ? "0" : "8px",
            background: darkMode ? "rgba(66, 139, 202, 0.2)" : "rgba(255, 196, 0, 0.1)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: darkMode ? "1px solid #2a6baf" : "1px solid #e8c23d",
            boxShadow: darkMode 
              ? "0 2px 8px rgba(0, 120, 255, 0.3)" 
              : "0 2px 8px rgba(255, 204, 0, 0.3)",
            transition: "all 0.3s ease",
            color: darkMode ? "#4dabf7" : "#f59f00",
            padding: 0
          }}
        >
          {darkMode ? 
            <SunOutlined style={{ fontSize: "18px" }} /> : 
            <MoonOutlined style={{ fontSize: "18px" }} />
          }
        </Button>

        {/* Mobile Menu Button */}
        {windowWidth <= 768 && (
          <Button
            type="text"
            icon={
              <MenuOutlined style={{ color: darkMode ? "white" : "black" }} />
            }
            onClick={() => setMobileMenuVisible(true)}
            style={{ border: "none" }}
          />
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title={
          <span
            style={{
              background: "linear-gradient(90deg, #1890ff, #722ed1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              body: {
                padding: "12px 0",
                backgroundColor: darkMode ? "#141414" : "#fff",
              },
              header: {
                backgroundColor: darkMode ? "#141414" : "#fff",
                color: darkMode ? "white" : "black",
                borderBottom: darkMode
                  ? "1px solid #303030"
                  : "1px solid #f0f0f0",
              },
            }}
          >
            Ishan Sasanka
          </span>
        }
        placement="right"
        closable={true}
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
        style={{
          backgroundColor: darkMode ? "#141414" : "#fff",
        }}
      >
        <Menu
          mode="vertical"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "none",
          }}
          selectedKeys={[activeSection]}
          items={menuItems}
          theme={darkMode ? "dark" : "light"}
        />
      </Drawer>
    </Header>
  );
};

export default ResponsiveHeader;
