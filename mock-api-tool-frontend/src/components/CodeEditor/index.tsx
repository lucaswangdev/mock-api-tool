import React from 'react';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  value: string;
  language?: string;
  height?: number;
  onChange?: (value: string) => void;
}

/**
 * 代码编辑器
 */
const CodeEditor: React.FC<Props> = (props) => {
  const { value, height = 500, language = 'sql', onChange, editorDidMountCallback } = props;
  
  const options = {
    selectOnLineNumbers: true,
    fontSize: 14,
    formatOnPaste: true,
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
  };

  const editorDidMountHandle = (editor: any, monaco: any) => {
    // editor.getActions('editor.action.formatDocument')._run()  //格式化
    // const actionList = editor.getActions();
    const actionList = editor._actions;
    editorDidMountCallback && editorDidMountCallback(actionList);
  }

  return (
    <MonacoEditor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMountHandle}
    />
  );
};

export default CodeEditor;
