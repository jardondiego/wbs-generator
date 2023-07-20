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

function svgToPNG(svg, width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(svg, 0, 0);
  var png = canvas.toDataURL('image/png');
  return png;
}

const generateGraphvizCode = () => {
  const output = generateDot(input);
  setOutput(output);
};

export default {
  svgToPNG,
  generateGraphvizCode,
  copyToClipboard,
};
