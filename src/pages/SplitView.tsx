import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Code2, Eye, Loader2, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInput } from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function SplitView() {
  const location = useLocation();
  const initialPrompt = location.state?.prompt as string | undefined;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState({
    jsx: "",
    css: "",
    html: "",
  });

  // Simulate code generation when prompt is received
  useEffect(() => {
    if (initialPrompt) {
      handleGenerate(initialPrompt);
    }
  }, [initialPrompt]);

  const handleGenerate = (prompt: string) => {
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setIsGenerating(true);

    // Simulate AI generation with delay
    setTimeout(() => {
      const code = generateCodeFromPrompt(prompt);
      setGeneratedCode(code);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I've generated a ${prompt.toLowerCase()} for you. Check the code and preview panels!`,
        },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const generateCodeFromPrompt = (prompt: string) => {
    // Simulate different code based on prompt
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes("todo") || lowerPrompt.includes("task")) {
      return {
        jsx: `import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;`,
        css: `.todo-app {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #FF6B35;
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

input[type="text"] {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  background: #FF6B35;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.todo-list li.done span {
  text-decoration: line-through;
  color: #999;
}`,
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="root"></div>
  <script src="app.jsx"></script>
</body>
</html>`,
      };
    }

    if (lowerPrompt.includes("calculator")) {
      return {
        jsx: `import React, { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  const handleNumber = (num) => {
    setDisplay(display === '0' ? String(num) : display + num);
  };

  const handleOperator = (op) => {
    setOperator(op);
    setPrevValue(parseFloat(display));
    setDisplay('0');
  };

  const calculate = () => {
    const current = parseFloat(display);
    let result = 0;
    
    switch(operator) {
      case '+': result = prevValue + current; break;
      case '-': result = prevValue - current; break;
      case '*': result = prevValue * current; break;
      case '/': result = prevValue / current; break;
    }
    
    setDisplay(String(result));
    setOperator(null);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {[7,8,9,'/'].map(btn => (
          <button key={btn} onClick={() => 
            typeof btn === 'number' ? handleNumber(btn) : handleOperator(btn)
          }>{btn}</button>
        ))}
        {[4,5,6,'*'].map(btn => (
          <button key={btn} onClick={() => 
            typeof btn === 'number' ? handleNumber(btn) : handleOperator(btn)
          }>{btn}</button>
        ))}
        {[1,2,3,'-'].map(btn => (
          <button key={btn} onClick={() => 
            typeof btn === 'number' ? handleNumber(btn) : handleOperator(btn)
          }>{btn}</button>
        ))}
        <button onClick={() => setDisplay('0')}>C</button>
        <button onClick={() => handleNumber(0)}>0</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => handleOperator('+')}>+</button>
      </div>
    </div>
  );
}

export default Calculator;`,
        css: `.calculator {
  width: 320px;
  margin: 3rem auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8A5B 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
}

.display {
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: right;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  min-height: 60px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

button {
  padding: 1.25rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: scale(0.95);
}`,
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Calculator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="root"></div>
  <script src="app.jsx"></script>
</body>
</html>`,
      };
    }

    // Default app
    return {
      jsx: `import React from 'react';

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Welcome to Your App</h1>
        <p className="subtitle">${prompt}</p>
        <div className="card">
          <h2>Getting Started</h2>
          <p>This is your generated application. Customize it as needed!</p>
        </div>
      </div>
    </div>
  );
}

export default App;`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  max-width: 800px;
  width: 100%;
}

h1 {
  color: white;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.card h2 {
  color: #FF6B35;
  margin-bottom: 1rem;
}

.card p {
  color: #333;
  line-height: 1.6;
}`,
      html: `<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="root"></div>
  <script src="app.jsx"></script>
</body>
</html>`,
    };
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Split Panels Container */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Code Panel */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col bg-muted/30">
              <div className="border-b border-border p-3 flex items-center justify-between bg-background">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Code</span>
                </div>
                {isGenerating && (
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Generating...</span>
                  </div>
                )}
              </div>

              <ScrollArea className="flex-1">
                <Tabs defaultValue="jsx" className="h-full">
                  <div className="border-b border-border px-3 bg-background">
                    <TabsList className="bg-transparent h-10">
                      <TabsTrigger value="jsx">App.jsx</TabsTrigger>
                      <TabsTrigger value="css">styles.css</TabsTrigger>
                      <TabsTrigger value="html">index.html</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="jsx" className="mt-0 p-6">
                    {generatedCode.jsx ? (
                      <pre className="text-sm font-mono">
                        <code>{generatedCode.jsx}</code>
                      </pre>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <Sparkles className="h-12 w-12 mb-4" />
                        <p>Code will appear here after generation</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="css" className="mt-0 p-6">
                    {generatedCode.css ? (
                      <pre className="text-sm font-mono">
                        <code>{generatedCode.css}</code>
                      </pre>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <Sparkles className="h-12 w-12 mb-4" />
                        <p>CSS will appear here after generation</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="html" className="mt-0 p-6">
                    {generatedCode.html ? (
                      <pre className="text-sm font-mono">
                        <code>{generatedCode.html}</code>
                      </pre>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <Sparkles className="h-12 w-12 mb-4" />
                        <p>HTML will appear here after generation</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors" />

          {/* Preview Panel */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col bg-background">
              <div className="border-b border-border p-3 flex items-center gap-2 bg-background">
                <Eye className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Preview</span>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-6">
                  {generatedCode.jsx ? (
                    <div className="border border-border rounded-lg overflow-hidden">
                      <iframe
                        srcDoc={`
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <style>${generatedCode.css}</style>
                            </head>
                            <body>
                              <div id="root"></div>
                              <script type="module">
                                ${generatedCode.jsx.replace('export default', 'const Component =')}
                                
                                const root = document.getElementById('root');
                                root.innerHTML = '<div style="padding: 20px;">Preview rendering...</div>';
                              </script>
                            </body>
                          </html>
                        `}
                        className="w-full h-[600px] border-0"
                        title="Preview"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
                      <Eye className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Preview will appear here</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* Chat Section at Bottom */}
      <div className="border-t border-border bg-background">
        <div className="max-w-4xl mx-auto p-4">
          {/* Chat History */}
          {messages.length > 0 && (
            <ScrollArea className="max-h-32 mb-3">
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`text-sm p-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary/10 border border-primary/20 ml-8"
                        : "bg-muted mr-8"
                    }`}
                  >
                    <span className="font-semibold text-xs uppercase text-muted-foreground">
                      {msg.role === "user" ? "You" : "Assistant"}:
                    </span>
                    <p className="mt-1">{msg.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          
          {/* Input */}
          <ChatInput
            onSend={handleGenerate}
            placeholder="Modify your app or create a new one..."
          />
        </div>
      </div>
    </div>
  );
}
