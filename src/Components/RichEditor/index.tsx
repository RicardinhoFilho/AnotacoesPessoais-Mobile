import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { FullEditor } from "../FullEditor";
export function RichEditor() {
  return (
    <WebView
      source={{
        html: `<html>
    <head>
      <script src='https://cdn.tiny.cloud/1/wmxbqfc4u8a95i5h8ztiiho3x21tw34e3t680rwgob8o0hwn/tinymce/5/tinymce.min.js' referrerpolicy="origin">
      </script>
      <script>
        tinymce.init({
          selector: '#mytextarea'
        });
      </script>
    </head>
    
    <body>
      <h1>TinyMCE Quick Start Guide</h1>
      <form method="post">
        <textarea id="mytextarea" name="mytextarea">
          Hello, World!
        </textarea>
      </form>
    </body>
    </html>`,
      }}
      style={{ marginTop: 20 }}
      javaScriptEnabled={true}
    />
  );
}
