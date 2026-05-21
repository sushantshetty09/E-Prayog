import React, { useState } from 'react';
import { Delete } from 'lucide-react';
import { useLang } from '../../services/LanguageContext';

// Custom tokenizer and recursive descent parser for mathematical expressions
function parseAndEvaluate(expr: string): number {
  const tokens: string[] = [];
  let i = 0;
  
  // Clean up whitespace
  const clean = expr.replace(/\s+/g, '');
  
  while (i < clean.length) {
    const char = clean[i];
    
    if (/[0-9.]/.test(char)) {
      let numStr = '';
      while (i < clean.length && /[0-9.]/.test(clean[i])) {
        numStr += clean[i];
        i++;
      }
      tokens.push(numStr);
    } else if (['+', '-', '*', '/', '(', ')'].includes(char)) {
      tokens.push(char);
      i++;
    } else if (/[a-zA-Z]/.test(char)) {
      let funcStr = '';
      while (i < clean.length && /[a-zA-Z]/.test(clean[i])) {
        funcStr += clean[i];
        i++;
      }
      if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(funcStr)) {
        tokens.push(funcStr);
      } else {
        throw new Error('Unknown function');
      }
    } else {
      throw new Error('Invalid character');
    }
  }

  let tokenIndex = 0;
  
  function peek() {
    return tokens[tokenIndex];
  }
  
  function consume(expected?: string) {
    const t = tokens[tokenIndex];
    if (expected && t !== expected) {
      throw new Error(`Expected ${expected}`);
    }
    tokenIndex++;
    return t;
  }
  
  function parseExpression(): number {
    let result = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const right = parseTerm();
      if (op === '+') result += right;
      else result -= right;
    }
    return result;
  }
  
  function parseTerm(): number {
    let result = parseFactor();
    while (peek() === '*' || peek() === '/') {
      const op = consume();
      const right = parseFactor();
      if (op === '*') result *= right;
      else {
        if (right === 0) throw new Error('Division by zero');
        result /= right;
      }
    }
    return result;
  }
  
  function parseFactor(): number {
    const t = peek();
    if (t === '-') {
      consume();
      return -parseFactor();
    }
    if (t === '+') {
      consume();
      return parseFactor();
    }
    return parsePrimary();
  }
  
  function parsePrimary(): number {
    const t = peek();
    if (!t) {
      throw new Error('Unexpected end of expression');
    }
    
    if (/^[0-9.]+$/.test(t)) {
      consume();
      const val = parseFloat(t);
      if (isNaN(val)) throw new Error('Invalid number');
      return val;
    }
    
    if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(t)) {
      const funcName = consume();
      consume('(');
      const arg = parseExpression();
      consume(')');
      
      switch (funcName) {
        case 'sin': return Math.sin(arg);
        case 'cos': return Math.cos(arg);
        case 'tan': return Math.tan(arg);
        case 'log': return Math.log10(arg);
        case 'ln': return Math.log(arg);
        case 'sqrt':
          if (arg < 0) throw new Error('Negative square root');
          return Math.sqrt(arg);
        default: throw new Error('Unknown function');
      }
    }
    
    if (t === '(') {
      consume();
      const val = parseExpression();
      consume(')');
      return val;
    }
    
    throw new Error('Unexpected token');
  }
  
  const result = parseExpression();
  if (tokenIndex < tokens.length) {
    throw new Error('Extra tokens');
  }
  return result;
}

// Custom evaluator to avoid eval()
function evaluate(expr: string): string {
  try {
    // Replace visual symbols with math operators
    const cleanExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-') // replace minus with hyphen
      .replace(/π/g, '3.14159265359')
      .replace(/e/g, '2.71828182846');
    
    const result = parseAndEvaluate(cleanExpr);
    
    if (isNaN(result) || !isFinite(result)) return 'Error';
    
    // Limit decimals
    const strRes = String(result);
    if (strRes.includes('.') && strRes.split('.')[1].length > 8) {
      return Number(result).toFixed(8).replace(/\.?0+$/, '');
    }
    return strRes;
  } catch (e) {
    return 'Error';
  }
}

const CalculatorTool: React.FC = () => {
  const { t } = useLang();
  const [display, setDisplay] = useState('0');
  const [mode, setMode] = useState<'standard'|'scientific'>('standard');
  const [hasError, setHasError] = useState(false);

  const handleInput = (char: string) => {
    if (hasError) {
      setDisplay(char);
      setHasError(false);
      return;
    }
    if (display === '0' && !isNaN(Number(char))) {
      setDisplay(char);
    } else {
      setDisplay(prev => prev + char);
    }
  };

  const calculate = () => {
    const result = evaluate(display);
    setDisplay(result);
    if (result === 'Error') setHasError(true);
  };

  const clear = () => {
    setDisplay('0');
    setHasError(false);
  };

  const backspace = () => {
    if (hasError) { clear(); return; }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const sciButtons = [
    { label: 'sin', action: () => handleInput('sin(') },
    { label: 'cos', action: () => handleInput('cos(') },
    { label: 'tan', action: () => handleInput('tan(') },
    { label: 'ln', action: () => handleInput('ln(') },
    { label: 'log', action: () => handleInput('log(') },
    { label: '√', action: () => handleInput('sqrt(') },
    { label: 'π', action: () => handleInput('π') },
    { label: 'e', action: () => handleInput('e') },
    { label: '(', action: () => handleInput('(') },
    { label: ')', action: () => handleInput(')') },
  ];

  return (
    <div className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-3xl lg:text-4xl font-display font-semibold text-white mb-4">{t.toolCalculatorTitle}</h1>
      </div>

      <div className="max-w-md mx-auto glass-panel p-6 rounded-3xl border border-white/10 bg-zinc-900/80 shadow-2xl">
        
        {/* Mode Toggle */}
        <div className="flex bg-black/40 rounded-xl p-1 mb-6">
          <button 
            onClick={() => setMode('standard')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${mode === 'standard' ? 'bg-pink-600 text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            {t.toolCalcStandard}
          </button>
          <button 
            onClick={() => setMode('scientific')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${mode === 'scientific' ? 'bg-pink-600 text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            {t.toolCalcScientific}
          </button>
        </div>

        {/* Display */}
        <div className="bg-zinc-800 rounded-2xl p-6 mb-6 text-right overflow-hidden shadow-inner border border-black/50">
          <div className="text-zinc-400 h-6 text-sm mb-1 tracking-wider overflow-hidden">{display}</div>
          <div className={`text-4xl font-mono text-white tracking-widest ${hasError ? 'text-red-400' : ''}`}>
            {display}
          </div>
        </div>

        {/* Scientific Pad */}
        {mode === 'scientific' && (
          <div className="grid grid-cols-5 gap-2 mb-4">
            {sciButtons.map(btn => (
              <button
                key={btn.label}
                onClick={btn.action}
                className="bg-zinc-700/50 hover:bg-zinc-600 text-zinc-300 py-2 rounded-lg text-sm font-bold transition-colors border border-white/5"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Main Pad */}
        <div className="grid grid-cols-4 gap-3">
          <button onClick={clear} className="col-span-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-4 rounded-xl text-lg font-bold border border-red-500/30">C</button>
          <button onClick={backspace} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-4 rounded-xl flex items-center justify-center border border-white/5"><Delete size={20}/></button>
          <button onClick={() => handleInput('÷')} className="bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 py-4 rounded-xl text-2xl font-bold border border-pink-500/30">÷</button>
          
          <button onClick={() => handleInput('7')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">7</button>
          <button onClick={() => handleInput('8')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">8</button>
          <button onClick={() => handleInput('9')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">9</button>
          <button onClick={() => handleInput('×')} className="bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 py-4 rounded-xl text-2xl font-bold border border-pink-500/30">×</button>
          
          <button onClick={() => handleInput('4')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">4</button>
          <button onClick={() => handleInput('5')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">5</button>
          <button onClick={() => handleInput('6')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">6</button>
          <button onClick={() => handleInput('-')} className="bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 py-4 rounded-xl text-2xl font-bold border border-pink-500/30">−</button>
          
          <button onClick={() => handleInput('1')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">1</button>
          <button onClick={() => handleInput('2')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">2</button>
          <button onClick={() => handleInput('3')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">3</button>
          <button onClick={() => handleInput('+')} className="bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 py-4 rounded-xl text-2xl font-bold border border-pink-500/30">+</button>
          
          <button onClick={() => handleInput('0')} className="col-span-2 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">0</button>
          <button onClick={() => handleInput('.')} className="bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-xl font-bold border border-white/5">.</button>
          <button onClick={calculate} className="bg-pink-600 hover:bg-pink-500 text-white py-4 rounded-xl text-2xl font-bold shadow-lg shadow-pink-600/20">=</button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorTool;
