import React from 'react';

// renders a visualization of a DOT graph in SVG format
function SVGViever({ dotCode }) {
  return (
    <div className="svg-viewer">
        
    </div>
  );
}

SVGViever.propTypes = {
    dotCode: PropTypes.string.isRequired,
};

export default SVGViever;