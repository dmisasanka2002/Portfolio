import React, { useEffect } from 'react';
import { Row, Col, Avatar, Button, Tooltip, Typography, Divider, Card, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';
import { motion, useAnimation } from 'framer-motion';
import { personalInfo, aboutText, statsData } from '../data/aboutdata';

const { Title, Paragraph, Text } = Typography;

const AboutSection = ({ darkMode }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 80, 
        damping: 12,
        mass: 1
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: i => ({
      opacity: 1,
      transition: { 
        delay: 0.3 + (i * 0.1),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 10,
        delay: 0.7 + (i * 0.15)
      }
    }),
    hover: {
      y: -8,
      scale: 1.05,
      boxShadow: darkMode 
        ? "0 15px 30px rgba(24, 144, 255, 0.25)" 
        : "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { 
        type: 'spring', 
        stiffness: 200, 
        damping: 15 
      }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 13,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      boxShadow: darkMode 
        ? "0 20px 40px rgba(24, 144, 255, 0.4)" 
        : "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 15 
      }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: i => ({
      scale: 1,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: 0.7 + (i * 0.1)
      }
    }),
    hover: {
      y: -8,
      scale: 1.2,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.9 }
  };

  const titleVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15,
        delay: 0.5
      }
    }
  };

  const subtitleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 60, 
        damping: 12,
        delay: 0.6
      }
    }
  };

  const dividerVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.7
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Row justify="center" gutter={[32, 32]}>
        {/* Avatar & Social Media Column */}
        <Col xs={24} lg={8}>
          <motion.div 
            style={{ textAlign: "center" }}
            variants={itemVariants}
          >
            <motion.div
              variants={avatarVariants}
              whileHover="hover"
            >
              <Avatar
                size={240}
                src={personalInfo.avatar}
                style={{
                  border: `4px solid ${darkMode ? "#1890ff" : "#1890ff"}`,
                  boxShadow: darkMode 
                    ? "0 12px 24px rgba(0, 0, 0, 0.3)" 
                    : "0 12px 24px rgba(0, 0, 0, 0.15)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            </motion.div>
            <motion.div 
              style={{ marginTop: "24px" }}
              variants={itemVariants}
            >
              <Space size="middle">
                {personalInfo.social.map((platform, index) => {
                  const IconComponent = eval(platform.icon);
                  return (
                    <Tooltip key={index} title={platform.name}>
                      <motion.div
                        custom={index}
                        variants={socialIconVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          shape="circle"
                          icon={<IconComponent />}
                          size="large"
                          onClick={() => window.open(platform.url, "_blank")}
                          style={{
                            background: darkMode 
                              ? `linear-gradient(45deg, #141414, #1f1f1f)` 
                              : `linear-gradient(45deg, #f5f5f5, #ffffff)`,
                            boxShadow: darkMode
                              ? "0 4px 12px rgba(24, 144, 255, 0.2)"
                              : "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: darkMode ? "1px solid #303030" : "1px solid #e8e8e8",
                            transition: "all 0.3s ease"
                          }}
                        />
                      </motion.div>
                    </Tooltip>
                  );
                })}
              </Space>
            </motion.div>
          </motion.div>
        </Col>

        {/* About Me Content Column */}
        <Col xs={24} lg={16}>
          <motion.div variants={itemVariants}>
            <motion.div variants={titleVariants}>
              <Title
                level={4}
                style={{ 
                  background: "linear-gradient(90deg, #1890ff, #722ed1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: "0 0 8px 0",
                  display: "inline-block"
                }}
              >
                WHO I AM
              </Title>
            </motion.div>

            <motion.div variants={subtitleVariants}>
              <Title level={2} style={{ fontWeight: 600 }}>About Me</Title>
            </motion.div>

            <motion.div variants={dividerVariants}>
              <Divider
                style={{ 
                  marginTop: "16px", 
                  marginBottom: "24px",
                  background: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" 
                }}
              />
            </motion.div>

            {aboutText.map((paragraph, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeInVariants}
              >
                <Paragraph style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.8",
                  color: darkMode ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
                  marginBottom: "20px"
                }}>
                  {paragraph}
                </Paragraph>
              </motion.div>
            ))}

            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
              {statsData.map((stat, index) => (
                <Col xs={12} sm={6} key={index}>
                  <motion.div
                    custom={index}
                    variants={statsVariants}
                    whileHover="hover"
                  >
                    <Card
                      bordered={false}
                      style={{
                        textAlign: "center",
                        background: darkMode 
                          ? `linear-gradient(145deg, #1f1f1f, #141414)` 
                          : `linear-gradient(145deg, #f0f5ff, #ffffff)`,
                        boxShadow: darkMode 
                          ? "5px 5px 10px #0d0d0d, -5px -5px 10px #252525" 
                          : "5px 5px 15px #e6e6e6, -5px -5px 15px #ffffff",
                        borderRadius: "12px",
                        padding: "16px 12px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                          transition: { 
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 1 + (index * 0.15)
                          }
                        }}
                      >
                        <Title level={2} style={{ 
                          margin: 0, 
                          background: "linear-gradient(90deg, #1890ff, #722ed1)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent", 
                        }}>
                          {stat.value}
                        </Title>
                      </motion.div>
                      <Text strong style={{ 
                        color: darkMode ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
                        fontSize: "14px"
                      }}>
                        {stat.label}
                      </Text>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default AboutSection;