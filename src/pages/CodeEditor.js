import React, { useRef, useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Editor } from "@monaco-editor/react";
import Output from "./Output";

const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typeScript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
};

const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};

const LanguageSelector = ({ language, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ marginLeft: 2, marginBottom: 4 }}>
      <Typography mb={2} variant="h6">
        Choose Language
      </Typography>
      <Button onClick={handleClick} variant="contained">
        {language}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
          <MenuItem
            key={lang}
            onClick={() => {
              onSelect(lang);
              handleClose();
            }}
            sx={{
              color: lang === language ? "#42a5f5" : "inherit",
              backgroundColor: lang === language ? "#424242" : "transparent",
              "&:hover": {
                color: "#42a5f5",
                backgroundColor: "#424242",
              },
            }}
          >
            {lang}
            &nbsp;
            <Typography component="span" color="gray" fontSize="small">
              ({version})
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]); // Set initial code
  const [language, setLanguage] = useState("javascript");

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang] || "");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LanguageSelector
            language={language}
            onSelect={handleLanguageSelect}
          />
          <Editor
            options={{
              minimap: { enabled: false },
            }}
            height="75vh"
            language={language}
            value={value}
            onMount={handleEditorMount}
            onChange={(newValue) => setValue(newValue || "")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Output editorRef={editorRef} language={language} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CodeEditor;
