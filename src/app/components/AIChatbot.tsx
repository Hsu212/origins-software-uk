'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hey! I\'m Chloe, your AI HR specialist at Origins. I can help with team questions, culture, hiring, or just chat about what we do. What\'s on your mind?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Render-hosted AI agent endpoint (Marcus Chen's HR agent)
  const AGENT_ENDPOINT = process.env.NEXT_PUBLIC_AI_AGENT_URL || 'https://origins-hr-agent.onrender.com/chat';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // Call the Render-hosted AI agent
      const response = await fetch(AGENT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          conversationHistory: messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) throw new Error('Agent unavailable');

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.message || 'Thanks for reaching out! Our team will get back to you shortly.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Fallback responses for demo
      const fallbacks = [
        'That\'s a great question! Let me connect you with Htet (CEO) or Hsu (CTO) for technical details. Would you like me to schedule a quick call?',
        'Our team structure is intentionally flat—senior engineers own end-to-end delivery. Chloe (that\'s me!) handles people ops, and Maranda drives marketing. What specifically interests you?',
        'We\'re always looking for exceptional talent. If you\'re an engineer who\'s shipped at scale, drop your details in the contact form and I\'ll personally review.',
        'Origins culture: no juniors on critical path, founder-to-founder comms, skin in the game. Want the full culture doc? I can email it.',
        'I\'m an AI agent hosted on Render, built by Marcus Chen. I handle HR queries, scheduling, and culture questions 24/7. For complex stuff, I escalate to the human team.'
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbacks[Math.floor(Math.random() * fallbacks.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald text-forest shadow-xl hover:shadow-2xl hover:shadow-emerald/30 transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 1 }}
        aria-label="Open AI HR Assistant"
      >
        <motion.svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </motion.svg>
        {/* Notification badge */}
        <motion.span
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
        >
          1
        </motion.span>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-md h-[600px] bg-forest-light rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-forest-lighter/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald to-emerald-dim flex items-center justify-center text-forest font-bold serif-heading"
                      animate={{ rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      CR
                    </motion.div>
                    <motion.div
                      className="absolute bottom-1 right-1 w-3 h-3 bg-emerald rounded-full border-2 border-forest"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">Chloe Rodriguez</p>
                    <p className="text-xs text-emerald flex items-center gap-1">
                      <motion.span
                        className="w-1.5 h-1.5 bg-emerald rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      AI HR Specialist • Online
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-white-faint hover:text-white hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={chatContainerRef}>
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      {message.role === 'assistant' && (
                        <motion.div
                          className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald to-emerald-dim flex items-center justify-center text-forest font-bold serif-heading text-xs flex-shrink-0"
                          initial={{ rotate: -180, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                        >
                          CR
                        </motion.div>
                      )}
                      <div className={`max-w-[75%] ${message.role === 'user' ? 'text-right' : ''}`}>
                        <motion.div
                          className={`inline-block px-4 py-2.5 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-emerald text-forest rounded-tr-sm'
                              : 'bg-forest border border-white/10 text-white rounded-tl-sm'
                          }`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </motion.div>
                        <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-white-faint' : 'text-emerald/50'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-xl bg-forest-lighter flex items-center justify-center text-white-dim font-medium text-xs flex-shrink-0">
                          YOU
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      key="typing"
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald to-emerald-dim flex items-center justify-center text-forest font-bold serif-heading text-xs flex-shrink-0">
                        CR
                      </div>
                      <div className="bg-forest border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5">
                        <div className="flex gap-1 items-end h-6">
                          <motion.div
                            className="w-2 h-2 bg-emerald/50 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-emerald/50 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-emerald/50 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-forest-lighter/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <motion.div
                    className="flex-1 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask about team, culture, hiring..."
                      className="w-full px-4 py-2.5 pr-10 bg-forest border border-white/10 rounded-xl text-white placeholder-white-faint focus:border-emerald focus:ring-2 focus:ring-emerald/20 focus:outline-none transition-all"
                      disabled={isTyping}
                    />
                  </motion.div>
                  <motion.button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 rounded-xl bg-emerald text-forest hover:bg-emerald-dim disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
                <p className="text-xs text-white-faint text-center mt-2">
                  Powered by Marcus Chen's Render-hosted AI HR agent • Conversations are private
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}