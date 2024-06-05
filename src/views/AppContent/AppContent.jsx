import React, { Fragment } from 'react';
import { Routes, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

const AppContent = ({ routes }) => {

    AppContent.propTypes = {
        routes: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
          })
        ).isRequired,
      };

    return (
        <Fragment>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.id} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </Fragment>
    );
};

export default AppContent;
