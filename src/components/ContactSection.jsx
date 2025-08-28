import { Button, Typography, Form, Input, Card, Divider, Row, Col } from "antd";
import {
  MailOutlined,
  LinkedinOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ContactSection = ({ darkMode, handleFormSubmit }) => {
  const [form] = Form.useForm();
  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={18}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Title level={4} style={{ color: "#1890ff", margin: "0 0 8px 0" }}>
            GET IN TOUCH
          </Title>
          <Title level={2}>Contact Me</Title>
          <Divider />
        </div>

        <Row gutter={[32, 32]}>
          <Col xs={24} lg={12}>
            <div style={{ marginBottom: "32px" }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <Title level={3}>Let's Talk</Title>
                <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                  Whether you have a question about a project, job opportunity,
                  or just want to say hi, feel free to reach out. I'm always
                  open to discussing new projects and ideas.
                </Paragraph>
              </motion.div>
            </div>

            <Row gutter={[16, 24]}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <Col xs={24}>
                  <Card
                    variant={false}
                    style={{
                      backgroundColor: darkMode ? "#1f1f1f" : "#f0f5ff",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                            href="mailto:ishansasankadisanayaka@gmail.com"
                            style={{ color: "#1890ff" }}
                          >
                            ishansasankadisanayaka@gmail.com
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
                    <div style={{ display: "flex", alignItems: "center" }}>
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
              </motion.div>
            </Row>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
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
                        background: "linear-gradient(90deg, #1890ff, #722ed1)",
                        color: "white",
                        border: "none",
                        boxShadow: "0 5px 15px rgba(24, 144, 255, 0.4)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
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
            </motion.div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ContactSection;
