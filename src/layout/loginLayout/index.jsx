import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Container } from "@mui/material";
import { styled } from "@mui/system";

const Root = styled(Box)(() => ({
  minHeight: "calc(100vh - 16px)",
  backgroundSize: "cover",
  backgroundColor: "#E7EDF2",
  backdropFilter: "blur(50px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Content = styled(Box)(() => ({
  width: "100%",
  maxWidth: "850px",
  borderRadius: "8px",
  background: "white",
  height: "auto",
  maxHeight: "45rem",
  color: "#000",
  padding: "20px",
}));

const LoginLayout = ({ children }) => {
  return (
    <Root>
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          <Content>{children}</Content>
        </Grid>
      </Container>
    </Root>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
