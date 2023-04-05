import { Form, Input, Button, message, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
const UploadForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_q2kojxs",
        "template_rq4csrf",
        form.current,
        "l7fnjWprpIkdNUvre"
      )
      .then(
        (result) => {
          setLoading(false);
          message.success("Email has been sent");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Spin spinning={loading} delay={500}>
      <Container>
        <FormStyle ref={form} onSubmit={sendEmail}>
          <h2>Weather Alerts Updates</h2>
          <FormLabel>Updates</FormLabel>
          <FormTextArea
            type="text"
            name="updates"
            placeholder="Enter the updates"
            required
          />
          <FormLabel>Severity</FormLabel>
          <FormSelect name="severity" placeholder="Select severity type">
            <option value="Orange">Orange</option>
            <option value="Red">Red</option>
          </FormSelect>
          <FormLabel>Impacts Expected</FormLabel>
          <FormTextArea
            name="impact"
            placeholder="Expected Impacted"
            required
          />
          <FormLabel>Actions</FormLabel>
          <FormTextArea
            name="actions"
            placeholder="Specify the actions taken"
            required
          />
          <FormSubmit
            type="primary"
            htmlType="submit"
            value="Send Email"
            disabled={false}
          >
            Send Email
          </FormSubmit>
        </FormStyle>
      </Container>
    </Spin>
  );
};
export default UploadForm;
export const Container = styled.div`
  margin: 50px;
`;
export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;
export const FormLabel = styled.label`
  margin: 20px 0px;
  font-weight: 600;
`;
export const FormTextArea = styled.textarea`
  padding: 8px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  :hover {
    border: 1px solid #1aa3ff;
  }
`;
export const FormSelect = styled.select`
  padding: 10px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
`;
export const FormSubmit = styled(Button)`
  margin: 30px 0px 0px 0px;
  width: 20%;
  border-radius: 50px;
  @media (max-width: 480px) {
    width: 40%;
  }
`;
