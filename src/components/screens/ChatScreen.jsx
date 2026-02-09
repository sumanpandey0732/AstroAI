import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useUser } from '../../hooks/useUser';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import BottomNav from '../common/BottomNav';
import GlassCard from '../common/GlassCard';
import { ChatIcon } from '../../assets/icons';
import { CHAT_PROMPT } from '../../utils/systemPrompts';

/**
 * 💬 AI CHAT SCREEN
 * Full messenger-style chat interface with AI spiritual guide.
 * Uses OpenRouter API for real AI responses.
 */
const ChatScreen = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { user } = useUser();
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 📜 Load Chat History on Mount
  useEffect(() => {
    const saved = localStorage.getItem('astroai_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
        if (parsed.length > 0) setShowSuggestions(false);
      } catch (e) {
        console.error('Failed to load chat history');
      }
    }
  }, []);

  // 📜 Auto Scroll to Bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 💾 Save Chat History
  const saveChatHistory = (msgs) => {
    try {
      // Keep only last 50 messages to save space
      const toSave = msgs.slice(-50);
      localStorage.setItem('astroai_chat_history', JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to save chat history');
    }
  };

  // 💡 Suggested Questions
  const suggestions = [
    { id: 1, text: t('chat.suggested_1') },
    { id: 2, text: t('chat.suggested_2') },
    { id: 3, text: t('chat.suggested_3') },
  ];

  // ═══════════════════════════════════════════════════════════
  // 📤 SEND MESSAGE
  // ═══════════════════════════════════════════════════════════
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Haptic
    if (navigator.vibrate) navigator.vibrate(10);

    try {
      const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

      // Build conversation history (last 10 messages for context)
      const historyForAI = updatedMessages.slice(-10).map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
          },
          body: JSON.stringify({
            model: 'liquid/lfm-7b-chat:free',
            messages: [
              {
                role: 'system',
                content: `${CHAT_PROMPT}\n\nUser's name: ${user?.name || 'Stargazer'}\nUser's zodiac: ${user?.zodiac || 'Unknown'}`,
              },
              ...historyForAI,
            ],
            max_tokens: 1000,
            temperature: 0.8,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content;

      if (!aiText) throw new Error('Empty AI response');

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiText,
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);

    } catch (error) {
      console.error('Chat Error:', error);
      
      // Fallback response
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "The cosmic connection seems disrupted right now. Please check your internet connection and try again. The stars will align soon. ✨",
        timestamp: new Date().toISOString(),
      };
      
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      showToast('error', 'Connection failed. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Enter Key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  // Clear Chat
  const clearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
    localStorage.removeItem('astroai_chat_history');
    showToast('info', 'Chat cleared.');
  };

  // ═══════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <PageTransition variant="fade" className="bg-midnight-950">
      
      {/* 🔝 Chat Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-midnight-950/90 backdrop-blur-xl border-b border-white/5 pt-safe">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-full">
              <ChatIcon className="w-6 h-6 text-purple-400" filled />
            </div>
            <div>
              <h1 className="text-white font-bold text-base">{t('chat.title')}</h1>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-green-400">Online</span>
              </div>
            </div>
          </div>

          {/* Clear Chat */}
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 💬 Messages Area */}
      <div className="pt-24 pb-32 px-4 max-w-lg mx-auto min-h-screen">
        
        {/* Welcome Message (First time) */}
        {messages.length === 0 && (
          <div className="text-center py-8 animate-fade-in">
            <div className="inline-flex p-4 mb-4 rounded-full bg-purple-500/10 border border-purple-500/20">
              <span className="text-4xl">🔮</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {t('chat.title')}
            </h2>
            <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
              {t('chat.welcome')}
            </p>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`
              flex mb-4 animate-fade-in-up
              ${msg.role === 'user' ? 'justify-end' : 'justify-start'}
            `}
          >
            {/* AI Avatar */}
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0 mr-2 mt-1 border border-purple-500/30">
                <span className="text-sm">🔮</span>
              </div>
            )}

            {/* Bubble */}
            <div
              className={`
                max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm shadow-lg shadow-purple-500/20'
                  : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5 backdrop-blur-md'
                }
              `}
            >
              <p className="whitespace-pre-line">{msg.content}</p>
              <span className={`text-[9px] mt-1 block ${msg.role === 'user' ? 'text-white/50 text-right' : 'text-gray-500'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {/* ⏳ Typing Indicator */}
        {isTyping && (
          <div className="flex items-start mb-4 animate-fade-in">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0 mr-2 mt-1 border border-purple-500/30">
              <span className="text-sm">🔮</span>
            </div>
            <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 backdrop-blur-md">
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">{t('chat.typing')}</p>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />

        {/* 💡 Suggested Questions */}
        {showSuggestions && messages.length === 0 && (
          <div className="space-y-2 mt-4 animate-fade-in-up">
            <p className="text-xs text-gray-500 uppercase tracking-wider px-1 mb-2">
              Try asking:
            </p>
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => sendMessage(s.text)}
                className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm text-gray-300 hover:text-white transition-all active:scale-98"
              >
                💬 {s.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ⌨️ Input Bar (Fixed at Bottom) */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-midnight-950/90 backdrop-blur-xl border-t border-white/5 px-4 py-3">
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.placeholder')}
            disabled={isTyping}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 disabled:opacity-50"
          />

          {/* Send Button */}
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
            className={`
              p-3 rounded-xl transition-all duration-200
              ${inputText.trim() && !isTyping
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 active:scale-95'
                : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }
            `}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      <BottomNav />
    </PageTransition>
  );
};

export default ChatScreen;
