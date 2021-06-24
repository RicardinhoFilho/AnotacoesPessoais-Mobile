import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

export function FullEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <Editor
      editorState={editorState}
      
      onEditorStateChange={setEditorState}
    />
  );
}
