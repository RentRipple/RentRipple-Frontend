import React from "react";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
// import Footer from "./footer";
import TopBar from "./topbar";

const Root = styled("div")(() => ({
  backgroundColor: "#fff",
}));

const MainLayoutDiv = styled("div")(() => ({
  zIndex: "1",
  position: "relative",
  minHeight: "calc(100vh - 16px)",
  // backgroundColor: "green",
  display: "flex",
  justifyContent: "center",
  padding: "10px 25px 10px 25px",
  "@media(max-width:800px)": {
    padding: "10px",
  },
}));

const Content = styled("div")(() => ({
  width: "100%",
  // maxWidth: "1200px",
  // backgroundColor: "white",
}));

const GeneralLayout = ({ children }) => {
  return (
    <Root>
      <TopBar />
      <MainLayoutDiv>
        <Content>{children}</Content>
      </MainLayoutDiv>
      {/* <Footer /> */}
    </Root>
  );
};

GeneralLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GeneralLayout;
