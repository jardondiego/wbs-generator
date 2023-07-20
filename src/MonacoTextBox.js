import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const MonacoTextBox = ({ value, onChange, onTriggerSubmit }) => {
  const options = {
    selectOnLineNumbers: true,
  };

  const editorDidMount = (editor, monaco) => {
    editor.focus();
    editor.getModel().updateOptions({ tabSize: 2 });
    editor.addAction({
      id: 'submit',
      label: 'Submit',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: () => onTriggerSubmit(),
    });
  };

  return (
    <MonacoEditor
      width="100%"
      height="300"
      language="plaintext"
      theme="vs-dark"
      value={value}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default MonacoTextBox;
