import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import AuthGuard from "../../component/authGuard";
import { ToastContainer } from "react-toastify";

const AppContent = ({ routes }) => {
  AppContent.propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        component: PropTypes.elementType.isRequired,
        exact: PropTypes.bool,
        guard: PropTypes.bool,
        routes: PropTypes.array,
        layout: PropTypes.elementType,
      }),
    ).isRequired,
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="light"
      />
      <Routes>
        {routes.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;
          const Layout = route.layout || Fragment;
          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    <Component />
                  </Layout>
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </>
  );
};

export default AppContent;
