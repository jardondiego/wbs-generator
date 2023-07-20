import React from 'react';
import { Graphviz } from 'graphviz-react';
import { graphviz } from "d3-graphviz";

function GraphDiagram({ dotCode }) {
  return (
    <div>
      <Graphviz dot={dotCode} options={{ width: '100%', height: 'auto' }} />
    </div>
  );
}

export default GraphDiagram;
