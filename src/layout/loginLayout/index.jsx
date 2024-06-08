import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Container } from "@mui/material";
import { styled } from '@mui/system';
import backgroundLogin from '../../assets/LoginBackground.avif';

const Root = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 16px)", 
  backgroundSize: "cover",
  backgroundColor: "whiteSmoke",
//   backgroundColor: "#04c4cc",
//   backgroundImage: `linear-gradient(to bottom right, #04c4cc, #8e44ad), url(${backgroundLogin})`,
//   backgroundImage: `url(${backgroundLogin})`,
  backdropFilter: "blur(50px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Content = styled(Box)(({ theme }) => ({
  width: "100%", 
  maxWidth: "850px",
  borderRadius: "8px",
  background: "white",
  borderRadius: "8px",
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
            <Content>
              {children}
            </Content>
        </Grid>
      </Container>
    </Root>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
