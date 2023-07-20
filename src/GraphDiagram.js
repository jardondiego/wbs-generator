import React from 'react';
import { Graphviz } from 'graphviz-react';

function GraphDiagram({ dotCode }) {
  return (
    <div>
      <Graphviz dot={dotCode} options={{ width: '100%', height: 'auto' }} />
    </div>
  );
}

export default GraphDiagram;
