import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Code2, Eye, MessageSquare, PanelLeftClose, PanelLeft } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { CodePreview } from "@/components/CodePreview";
import { LivePreview } from "@/components/LivePreview";
import { BackendStatus } from "@/components/BackendStatus";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [activeView, setActiveView] = useState<"code" | "preview">("preview");
  const [showChat, setShowChat] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (initialPrompt) {
      handleGenerate(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const handleGenerate = (prompt: string) => {
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setIsGenerating(true);

    setTimeout(() => {
      const code = generateCodeFromPrompt(prompt);
      setGeneratedCode(code);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I've created your ${prompt.toLowerCase()}. The app is now live in the preview! You can view the code in the Code tab and continue refining it.`,
        },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const generateCodeFromPrompt = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes("todo") || lowerPrompt.includes("task")) {
      return {
        jsx: `import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build an app', done: false }
  ]);
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

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <h1>✓ Todo List</h1>
        <div className="input-group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
          />
          <button onClick={addTodo}>Add Task</button>
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
              <button onClick={() => deleteTodo(todo.id)} className="delete">×</button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p className="empty">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}`,
        css: `.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

h1 {
  color: #FF6B35;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.input-group {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

input[type="text"] {
  flex: 1;
  padding: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input[type="text"]:focus {
  outline: none;
  border-color: #FF6B35;
}

button {
  padding: 0.875rem 1.5rem;
  background: #FF6B35;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

button:hover {
  background: #ff5722;
  transform: translateY(-2px);
}

.todo-list {
  list-style: none;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}

.todo-list li:hover {
  background: #f3f4f6;
}

.todo-list li.done span {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-list li span {
  flex: 1;
  font-size: 1rem;
}

.delete {
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 1.5rem;
  line-height: 1;
  background: #ef4444;
}

.empty {
  text-align: center;
  color: #9ca3af;
  padding: 2rem;
}`,
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
</head>
<body>
  <div id="root"></div>
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
      case '×': result = prevValue * current; break;
      case '÷': result = prevValue / current; break;
      default: return;
    }
    
    setDisplay(String(result));
    setOperator(null);
    setPrevValue(null);
  };

  const clear = () => {
    setDisplay('0');
    setOperator(null);
    setPrevValue(null);
  };

  return (
    <div className="app">
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          <button onClick={clear} className="clear">C</button>
          <button onClick={() => handleOperator('÷')}>÷</button>
          <button onClick={() => handleOperator('×')}>×</button>
          <button onClick={() => handleOperator('-')}>−</button>
          
          <button onClick={() => handleNumber(7)}>7</button>
          <button onClick={() => handleNumber(8)}>8</button>
          <button onClick={() => handleNumber(9)}>9</button>
          <button onClick={() => handleOperator('+')} className="operator">+</button>
          
          <button onClick={() => handleNumber(4)}>4</button>
          <button onClick={() => handleNumber(5)}>5</button>
          <button onClick={() => handleNumber(6)}>6</button>
          <button onClick={calculate} className="equals" rowSpan="2">=</button>
          
          <button onClick={() => handleNumber(1)}>1</button>
          <button onClick={() => handleNumber(2)}>2</button>
          <button onClick={() => handleNumber(3)}>3</button>
          
          <button onClick={() => handleNumber(0)} className="zero">0</button>
          <button onClick={() => handleNumber('.')}>.</button>
        </div>
      </div>
    </div>
  );
}`,
        css: `.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.calculator {
  width: 320px;
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.display {
  background: #1f2937;
  color: white;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  text-align: right;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

button {
  padding: 1.25rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 12px;
  background: #f3f4f6;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

button:hover {
  background: #e5e7eb;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

.clear {
  background: #ef4444;
  color: white;
}

.clear:hover {
  background: #dc2626;
}

.operator {
  background: #FF6B35;
  color: white;
}

.operator:hover {
  background: #ff5722;
}

.equals {
  background: #10b981;
  color: white;
  grid-row: span 2;
}

.equals:hover {
  background: #059669;
}

.zero {
  grid-column: span 2;
}`,
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Calculator</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
      };
    }

    return {
      jsx: `import React from 'react';

function App() {
  return (
    <div className="app">
      <div className="hero">
        <h1>Welcome to Your App</h1>
        <p className="subtitle">${prompt}</p>
        <div className="cards">
          <div className="card">
            <h3>🚀 Fast</h3>
            <p>Built with modern technologies</p>
          </div>
          <div className="card">
            <h3>💎 Beautiful</h3>
            <p>Stunning design out of the box</p>
          </div>
          <div className="card">
            <h3>⚡ Powerful</h3>
            <p>Everything you need to succeed</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      css: `.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.hero {
  max-width: 1000px;
  text-align: center;
  color: white;
}

h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-8px);
}

.card h3 {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  color: #FF6B35;
}

.card p {
  color: #6b7280;
  line-height: 1.6;
}`,
      html: `<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
    };
  };

  // Mobile layout with tabs for chat/preview switching
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <div className="border-b border-border bg-card">
            <TabsList className="w-full grid grid-cols-3 rounded-none h-12 bg-transparent p-0">
              <TabsTrigger
                value="chat"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12"
              >
                <Code2 className="h-4 w-4 mr-2" />
                Code
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 mt-0 flex flex-col">
            <div className="flex flex-col h-full bg-chat-bg">
              <div className="border-b border-border p-3 bg-card space-y-2">
                <h2 className="font-semibold">Chat</h2>
                <BackendStatus />
              </div>
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <p className="text-sm">Start by describing your app idea</p>
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <ChatMessage key={idx} {...msg} />
                  ))}
                  {isGenerating && (
                    <ChatMessage role="assistant" content="" isLoading />
                  )}
                </div>
              </ScrollArea>
              <div className="border-t border-border p-3 bg-card">
                <ChatInput
                  onSend={handleGenerate}
                  placeholder="Describe your app..."
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 mt-0">
            <LivePreview jsx={generatedCode.jsx} css={generatedCode.css} />
          </TabsContent>

          <TabsContent value="code" className="flex-1 mt-0">
            <CodePreview {...generatedCode} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Desktop layout with resizable panels
  return (
    <div className="flex h-screen">
      <PanelGroup direction="horizontal">
        {/* Chat Panel */}
        {showChat && (
          <Panel defaultSize={35} minSize={25} maxSize={50}>
            <div className="flex flex-col h-full bg-chat-bg border-r border-border">
              {/* Chat Header */}
              <div className="border-b border-border p-4 bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">Chat</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Describe what you want to build
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowChat(false)}
                    className="h-8 w-8"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </div>
                <BackendStatus />
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-12">
                      <p className="text-sm">Start by describing your app idea</p>
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <ChatMessage key={idx} {...msg} />
                  ))}
                  {isGenerating && (
                    <ChatMessage role="assistant" content="" isLoading />
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t border-border p-4 bg-card">
                <ChatInput
                  onSend={handleGenerate}
                  placeholder="Describe your app or request changes..."
                />
              </div>
            </div>
          </Panel>
        )}

        {/* Resize Handle */}
        {showChat && (
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors" />
        )}

        {/* Code/Preview Panel */}
        <Panel defaultSize={showChat ? 65 : 100} minSize={50}>
          <div className="flex flex-col h-full">
            {/* Tabs */}
            <Tabs
              value={activeView}
              onValueChange={(v) => setActiveView(v as "code" | "preview")}
              className="flex-1 flex flex-col"
            >
              <div className="border-b border-border bg-card">
                <TabsList className="w-full justify-start rounded-none h-12 bg-transparent p-0">
                  {!showChat && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowChat(true)}
                      className="h-12 w-12 rounded-none border-r border-border"
                    >
                      <PanelLeft className="h-4 w-4" />
                    </Button>
                  )}
                  <TabsTrigger
                    value="preview"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4 sm:px-6"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Preview</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4 sm:px-6"
                  >
                    <Code2 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Code</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="preview" className="flex-1 mt-0">
                <LivePreview jsx={generatedCode.jsx} css={generatedCode.css} />
              </TabsContent>

              <TabsContent value="code" className="flex-1 mt-0">
                <CodePreview {...generatedCode} />
              </TabsContent>
            </Tabs>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
