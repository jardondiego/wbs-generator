import React, { useState, useRef, useEffect } from 'react';
import Graph from './Graph.js';
import MonacoTextBox from './MonacoTextBox.js';

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
      // Optionally display a success message
    })
    .catch((err) => {
      console.error('Error copying text to clipboard: ', err);
      // Optionally display an error message
    });
}

function generateDot(inputString) {
  let lines = inputString.split('\n');
  let mapping = {};
  let counter = 1;
  let levelLastNode = {};
  let labels = '';
  let associations = '';

  for (let line of lines) {
    let indent = line.length - line.trimStart().length;
    let level = indent / 2;
    let nodeName = line.trim();
    if (nodeName) {
      if (!mapping[nodeName]) {
        mapping[nodeName] = String.fromCharCode(64 + counter); // Generate node name (A, B, C, ...)
        labels += `  ${mapping[nodeName]}[label="${nodeName}"]\n`; // Add node label to labels
        counter += 1;
      }

      if (level > 0) {
        let parentNode = levelLastNode[level - 1];
        associations += `  ${parentNode} -> ${mapping[nodeName]}\n`; // Add edge to associations
      }

      levelLastNode[level] = mapping[nodeName];
    }
  }

  let dotScript = `digraph G {\n  node[shape=box]\n\n${labels}\n${associations}}`;
  return dotScript;
}

function App() {
  // create a ref to store the textInput DOM element / GO button
  const goButton = useRef(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateGraphvizCode = () => {
    const output = generateDot(input);
    setOutput(output);
  };

  return (
    <div className="App">
      <center>
        <div>
          <h1>WBS Diagram Generator</h1>
          <p>Write plaintext and get an SVG diagram</p>
        </div>
      </center>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          generateGraphvizCode();
        }}
        onKeyDown={(evt) => {
          // if ((evt.keyCode == 10 || evt.keyCode == 13) && evt.ctrlKey) {
          //   generateGraphvizCode();
          //   return;
          // }

          // if (evt.ctrlKey && evt.shiftKey && evt.key === 'C') {
          //   evt.preventDefault();
          //   copyToClipboard(output);
          //   return;
          // }

          // if (evt.key === 'Escape') {
          //   evt.target.blur();
          //   return;
          // }
        }}
      >
        <MonacoTextBox
          value={input}
          onChange={(newValue) => {
            setInput(newValue);
          }}
          onTriggerSubmit={() => {
            // click GO button :)
            goButton.current.click();
          }}
        />
        <br />
        <center>
          <button
            type="submit"
            style={{
              width: '72px',
            }}
            ref={goButton}
          >
            GO
          </button>
        </center>
      </form>
      {output !== '' && (
        <React.Fragment>
          <pre
            style={{
              fontSize: '12px',
              fontFamily: 'Courier New, monospace',
              border: '1px solid black',
              borderRadius: '4px',
            }}
          >
            {output}
          </pre>
          <center>
            <button
              style={{ marginBottom: '0.5rem' }}
              onClick={(evt) => {
                navigator.clipboard
                  .writeText(output)
                  .then(function () {
                    console.log('Text copied to clipboard');
                    // You can optionally display a success message here
                  })
                  .catch(function (err) {
                    console.error('Error copying text to clipboard: ', err);
                    // You can optionally display an error message here
                  });
              }}
            >
              COPY
            </button>
          </center>
          <Graph dot={`${output}`} />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
