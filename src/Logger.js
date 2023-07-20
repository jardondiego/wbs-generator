import React, { useRef, useEffect } from 'react';

const LogInnerHTMLComponent = ({ children }) => {
  const componentRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (componentRef.current) {
        console.log(componentRef.current.innerHTML);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div ref={componentRef}>{children}</div>;
};

export default LogInnerHTMLComponent;
