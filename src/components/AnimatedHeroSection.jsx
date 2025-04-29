import React, { useState, useEffect } from 'react';
import { Typography, Badge, Button, Space } from 'antd';
import { DownloadOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const AnimatedHeroSection = ({ darkMode }) => {
  // Custom typing effect
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ['Mechanical Engineer', 'AI Specialist', 'Problem Solver', 'Innovative Thinker'];
  
  useEffect(() => {
    const typingSpeed = isDeleting ? 80 : 120;
    const pauseTime = 1500;
    
    const currentWord = words[wordIndex];
    
    const type = () => {
      if (isDeleting) {
        // Deleting text
        setDisplayText(prev => prev.substring(0, prev.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        // Typing text
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        
        if (displayText === currentWord) {
          // Pause before deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
          return;
        }
      }
    };
    
    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ 
        zIndex: 2, 
        textAlign: "center", 
        maxWidth: "800px",
        padding: "0 20px"
      }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          delay: 0.3
        }}
      >
        <Badge.Ribbon 
          text="Undergraduate" 
          color="#722ed1"
          style={{ 
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          <Title
            level={1}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              marginBottom: "1rem",
              textShadow: darkMode
                ? "0 0 10px rgba(114, 46, 209, 0.6)"
                : "none",
              padding: "15px 15px 5px 15px",
              background: darkMode ? "rgba(0, 0, 0, 0.3)" : "",
              borderRadius: "12px",
              backdropFilter: "blur(5px)"
            }}
          >
            Hi, I'm{" "}
            <motion.span
              style={{ 
                background: "linear-gradient(90deg, #1890ff, #722ed1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block"
              }}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3
              }}
            >
              Ishan Sasanka
            </motion.span>
          </Title>
        </Badge.Ribbon>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
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
          <div style={{ 
            height: "40px", 
            marginTop: "15px",
            position: "relative",
            display: "inline-block"
          }}>
            {displayText}
            <span 
              style={{ 
                borderRight: `2px solid ${darkMode ? "#fff" : "#000"}`,
                animation: "blink 1s step-end infinite"
              }} 
            />
          </div>
        </Title>
        
        {/* CSS for cursor blink animation */}
        <style jsx>{`
          @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: ${darkMode ? "#fff" : "#000"} }
          }
        `}</style>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Paragraph
          style={{
            fontSize: "1.2rem",
            margin: "20px 0 40px",
            color: darkMode
              ? "rgba(255, 255, 255, 0.75)"
              : "rgba(0, 0, 0, 0.75)",
            lineHeight: 1.6,
            fontWeight: 300,
            maxWidth: "90%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          Combining traditional engineering principles with cutting-edge
          technology to create innovative solutions for complex problems.
        </Paragraph>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Space size="large" wrap>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="large"
              shape="round"
              icon={<DownloadOutlined />}
              href="https://drive.google.com/file/d/1yGjkteuQgKs9mxtqVs7_d6RcDlYRcHGV/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #1890ff, #722ed1)",
                color: "white",
                border: "none",
                boxShadow: "0 5px 15px rgba(24, 144, 255, 0.4)",
                padding: "0 24px",
                height: "48px",
                fontWeight: "500",
                fontSize: "16px"
              }}
            >
              Download CV
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="large"
              shape="round"
              icon={<ArrowRightOutlined />}
              style={{
                background: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.03)",
                color: darkMode ? "#1890ff" : "#722ed1",
                border: `2px solid ${darkMode ? "#1890ff" : "#722ed1"}`,
                height: "48px",
                padding: "0 24px",
                fontWeight: "500",
                fontSize: "16px"
              }}
            >
              <Link to="projects" smooth duration={500}>
                View Projects
              </Link>
            </Button>
          </motion.div>
        </Space>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedHeroSection;