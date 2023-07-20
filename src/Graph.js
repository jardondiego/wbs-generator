import React, { useEffect, useRef } from 'react';
import { graphviz } from 'd3-graphviz';
import { select } from 'd3-selection';
import { image } from 'd3-fetch';

function DotGraphWithDownloadAndCopy({ dot, scale = 2 }) {
  const ref = useRef();

  useEffect(() => {
    graphviz(ref.current).renderDot(dot);
  }, [dot]);

  const convertSvgToPngBlob = () => {
    return new Promise((resolve) => {
      select(ref.current)
        .selectAll('svg')
        .each(function () {
          const svgString = new XMLSerializer().serializeToString(this);
          const blob = new Blob([svgString], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);

          image(url).then((img) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            context.scale(scale, scale);
            context.drawImage(img, 0, 0, img.width, img.height);

            canvas.toBlob((blob) => {
              resolve(blob);
            });
          });
        });
    });
  };

  const downloadAsPng = async () => {
    const blob = await convertSvgToPngBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'graph.png';
    link.click();
  };

  const copyToClipboard = async () => {
    const blob = await convertSvgToPngBlob();

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      alert('Image copied to clipboard');
    } catch (error) {
      console.error(error);
      alert('Failed to copy image to clipboard');
    }
  };

  const downloadAsSvg = () => {
    select(ref.current)
      .selectAll('svg')
      .each(function () {
        const svgString = new XMLSerializer().serializeToString(this);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'graph.svg';
        link.click();
      });
  };

  return (
    <div>
      <center>
        <div ref={ref} />
        <button style={{ marginTop: '1rem' }} onClick={downloadAsPng}>
          EXPORT PNG
        </button>
        <br />
        <button style={{ marginTop: '1rem' }} onClick={downloadAsSvg}>
          EXPORT SVG
        </button>
        <br />
        <button style={{ marginTop: '1rem' }} onClick={copyToClipboard}>
          COPY
        </button>
      </center>
    </div>
  );
}

export default DotGraphWithDownloadAndCopy;
