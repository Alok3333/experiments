import React, { useRef, useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { Editor } from "@monaco-editor/react";
import Output from "./Output";
import { useSnackbar } from "notistack";
import axios from "axios";

// creating a api
export const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston/",
});

// api with post call
export const executeCode = async (language, srcCode) => {
  const res = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: srcCode,
      },
    ],
  });
  return res.data;
};

const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alok");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alok" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alok")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alok';\necho $name;\n",
};

const LanguageSelector = ({ language, onSelect, isDark }) => {
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
      <Typography sx={{ mb: 2, fontSize: "18px", color: "grey.500" }}>
        Choose Language
      </Typography>
      <Button onClick={handleClick} variant={isDark ? "contained" : "outlined"}>
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

  // Declared output code state
  const { enqueueSnackbar } = useSnackbar();

  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Declared State for dark/light
  const [isDark, setIsDark] = useState(false);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang] || "");
  };

  // RunCodeOutput
  const runCodeOutput = async () => {
    const srcCode = editorRef.current.getValue();
    // console.log(srcCode, "Source code here");

    if (!srcCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, srcCode);
      const finalResult = result.output.split("\n");
      setOutput(finalResult);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message || "Unable to run code", {
        variant: "error",
        autoHideDuration: 6000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        preventDuplicate: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        // padding: 2,
        // margin: "10px",
        padding: "10px",
        height: "100vh",
        backgroundColor: `${isDark ? "#000" : ""}`,
      }}
    >
      {/* toogle button for dark and light screen */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {isDark ? (
          <Brightness4Icon
            sx={{ color: `${isDark ? "#dcdcdc" : "#000"}` }}
            onClick={() => setIsDark(!isDark)}
          />
        ) : (
          <Brightness6Icon
            sx={{ color: `${isDark ? "#dcdcdc" : "#000"}` }}
            onClick={() => setIsDark(!isDark)}
          />
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LanguageSelector
            language={language}
            onSelect={handleLanguageSelect}
            isDark={isDark}
          />
          <Box
            sx={{
              border: "1px solid",
              borderColor: "grey.500",
              borderRadius: "4px",
            }}
          >
            <Editor
              options={{
                minimap: { enabled: false },
              }}
              height="79vh"
              language={language}
              value={value}
              onMount={handleEditorMount}
              onChange={(newValue) => setValue(newValue || "")}
              theme={!isDark ? "light" : "vs-dark"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* output code */}
          <Box>
            <Typography
              sx={{ mb: 2, marginLeft: 2, fontSize: "18px", color: "grey.500" }}
            >
              Output
            </Typography>
            <Button
              variant={isDark ? "contained" : "outlined"}
              color="success"
              sx={{ mb: 4, marginLeft: 2 }}
              onClick={runCodeOutput}
            >
              {isLoading ? "loading..." : "Run Code"}
            </Button>
            <Box
              sx={{
                height: "75vh",
                p: 2,
                border: "1px solid",
                borderRadius: "4px",
                //   borderColor: "#333",
                borderColor: `${isError ? "#f44336" : "grey.500"}`,
                color: `${isError ? "#ef5350" : "grey.600"}`,
                boxShadow: 0,
                backgroundColor: `${isDark ? "#1e1e1e" : "#fff"}`,
                overflow: "auto",
              }}
            >
              {output ? (
                output.map((line, i) => <Typography key={i}>{line}</Typography>)
              ) : (
                <Typography sx={{ color: "grey.600" }}>
                  Click "Run Code" to see the output here.
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CodeEditor;
