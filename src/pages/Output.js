import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSnackbar } from "notistack";


export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typeScript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};

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

function Output({ editorRef, language }) {
  const { enqueueSnackbar } = useSnackbar();

  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCodeOutput = async () => {
    const srcCode = editorRef.current.getValue();
    console.log(srcCode, "Source code here");

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
        width: "50%",
        margin: "10px",
        padding: "10px",
      }}
    >
      <Typography sx={{ mb: 2, fontSize: "18px", color: "grey.500" }}>
        Output
      </Typography>
      <Button
        variant="outlined"
        color="success"
        sx={{ mb: 4 }}
        isLoading={isLoading}
        onClick={runCodeOutput}
      >
        Run Code
      </Button>
      <Box
        sx={{
          height: "75vh",
          p: 2,
          border: "1px solid",
          borderRadius: "4px",
          //   borderColor: "#333",
          borderColor: `${isError ? "#f44336" : "grey.500"}`,
          color: `${isError ? "#ef5350" : ""}`,
          boxShadow: 0,
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
  );
}

export default Output;
