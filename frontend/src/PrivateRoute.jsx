// PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuth } from './services/auth';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation(); // Use useLocation hook to get the current location
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      const redirectTimer = setTimeout(() => {
        setShouldRedirect(true);
      }, 1000); // Set delay to 1000 milliseconds (1 second)

      return () => clearTimeout(redirectTimer); // Cleanup function to clear the timer
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div>
        <p>Unauthorized access. Please login before accessing this page.</p>
        {shouldRedirect && <Navigate to="/" state={{ from: location }} />}
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
