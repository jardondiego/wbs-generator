import React, { Component } from 'react';
import { download } from 'react-download';

class SVGExporter extends Component {
  state = {
    svg: '',
  };

  componentDidMount() {
    this.setState({
      svg: this.props.svg,
    });
  }

  render() {
    const { svg } = this.state;

    return (
      <div>
        <svg dangerouslySetInnerHTML={{ __html: svg }} />
        <button
          onClick={() => download(svg, 'my-svg.svg')}
          disabled={svg === ''}
        >
          Download SVG
        </button>
      </div>
    );
  }
}

export default SVGExporter;
