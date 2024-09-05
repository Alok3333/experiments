import React, { useRef, useState, createContext, useContext, useEffect } from 'react';
import { Box, Button, Menu, MenuItem, Typography, IconButton, Grid } from '@mui/material';
import { Editor } from '@monaco-editor/react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import * as monaco from 'monaco-editor';
import _ from 'lodash';  // For debouncing

// Creating an API
export const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston/',
});

// API with post call
export const executeCode = async (language, srcCode) => {
  const res = await API.post('/execute', {
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
  javascript: '18.15.0',
  typescript: '5.0.3',
  python: '3.10.0',
  java: '15.0.2',
  csharp: '6.12.0',
  php: '8.2.3',
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

// Custom hook to toggle theme
const ColorModeContext = createContext({ toggleColorMode: () => {} });

const useToggleTheme = () => {
  return useContext(ColorModeContext);
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
      <Typography sx={{ mb: 2, fontSize: '18px', color: 'text.secondary' }}>
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
          'aria-labelledby': 'basic-button',
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
              color: lang === language ? 'primary.main' : 'inherit',
              backgroundColor: lang === language ? 'background.paper' : 'transparent',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'background.paper',
              },
            }}
          >
            {lang}
            &nbsp;
            <Typography component="span" color="text.secondary" fontSize="small">
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
  const [value, setValue] = useState(CODE_SNIPPETS['javascript']); // Set initial code
  const [language, setLanguage] = useState('javascript');

  // Declared output code state
  const { enqueueSnackbar } = useSnackbar();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { toggleColorMode, mode } = useToggleTheme();

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang] || '');
  };

  const runCodeOutput = async () => {
    const srcCode = editorRef.current.getValue();
    console.log(srcCode, 'Source code here');

    if (!srcCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, srcCode);
      const finalResult = result.output.split('\n');
      setOutput(finalResult);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message || 'Unable to run code', {
        variant: 'error',
        autoHideDuration: 6000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        preventDuplicate: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Update Monaco editor theme dynamically
    if (editorRef.current) {
      monaco.editor.setTheme(mode === 'dark' ? 'vs-dark' : 'vs');
    }
  }, [mode]);

  useEffect(() => {
    // Debounce the resize event handler
    const handleResize = _.debounce(() => {
      if (editorRef.current) {
        editorRef.current.layout(); // Recalculate layout on window resize
      }
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box sx={{ padding: 2, margin: '10px', padding: '10px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LanguageSelector language={language} onSelect={handleLanguageSelect} />
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'grey.500',
              borderRadius: '4px',
              bgcolor: mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
            }}
          >
            <Editor
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
              }}
              height="79vh"
              language={language}
              value={value}
              onMount={handleEditorMount}
              onChange={(newValue) => setValue(newValue || '')}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography sx={{ mb: 2, fontSize: '18px', color: 'text.secondary' }}>
              Output
            </Typography>
            <Button
              variant="outlined"
              color="success"
              sx={{ mb: 4 }}
              onClick={runCodeOutput}
            >
              {isLoading ? 'loading...' : 'Run Code'}
            </Button>
            <Box
              sx={{
                height: '75vh',
                p: 2,
                border: '1px solid',
                borderRadius: '4px',
                borderColor: `${isError ? '#f44336' : 'grey.500'}`,
                color: `${isError ? '#ef5350' : ''}`,
                bgcolor: mode === 'dark' ? '#333' : '#fff',
                color: mode === 'dark' ? '#fff' : '#000',
              }}
            >
              {output ? (
                output.map((line, i) => <Typography key={i}>{line}</Typography>)
              ) : (
                <Typography sx={{ color: 'text.secondary' }}>
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

const ThemeApp = () => {
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
      },
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#424242' : '#bdbdbd',
      },
      success: {
        main: mode === 'light' ? '#4caf50' : '#66bb6a',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#424242' : '#e0e0e0',
      },
    },
  });

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            bgcolor: theme.palette.background.default,
          }}
        >
          <IconButton
            sx={{ position: 'fixed', top: 10, right: 10 }}
            onClick={toggleColorMode}
            color="inherit"
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <CodeEditor />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeApp;
