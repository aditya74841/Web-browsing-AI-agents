import { useState, useRef, useEffect } from 'react'
import { Send, Search, MessageCircle, Zap } from 'lucide-react'

export default function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  // Backend API URL
  const API_URL = 'https://web-browsing-ai-agents.onrender.com'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          searchResults: data.searchResults,
        },
      ])
    } catch (err) {
      setError(err.message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${err.message}`,
          isError: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-800 backdrop-blur-xl bg-gradient-to-r from-slate-900/80 to-slate-800/80 px-6 py-6 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI Search Assistant
            </h1>
          </div>
          <p className="text-slate-400 ml-11 text-sm">
            Powered by Groq AI and Tavily Search • Get instant answers from the web
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <div className="flex gap-4 justify-center mb-8">
                    <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
                      <Search className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                      <MessageCircle className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 backdrop-blur-sm">
                      <Zap className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Welcome to AI Search</h2>
                  <p className="text-slate-400 text-lg max-w-md mx-auto">
                    Ask me anything and I'll search the web for the latest information with AI-powered insights
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                  <div className="p-4 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors bg-slate-800/30 backdrop-blur">
                    <p className="text-cyan-400 font-semibold mb-2">💡 Try asking</p>
                    <p className="text-sm text-slate-400">"Latest AI news 2024"</p>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors bg-slate-800/30 backdrop-blur">
                    <p className="text-cyan-400 font-semibold mb-2">🔍 Or search</p>
                    <p className="text-sm text-slate-400">"Stock market today"</p>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors bg-slate-800/30 backdrop-blur">
                    <p className="text-cyan-400 font-semibold mb-2">🌐 Explore</p>
                    <p className="text-sm text-slate-400">"Weather forecast"</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-300`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl px-5 py-4 shadow-lg transition-all hover:shadow-xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none'
                        : message.isError
                        ? 'bg-gradient-to-r from-red-900/80 to-red-800/80 text-red-100 border border-red-700/50 rounded-bl-none'
                        : 'bg-gradient-to-r from-slate-800 to-slate-700 text-slate-100 border border-slate-700/50 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</p>

                    {/* Display search results if available */}
                    {message.searchResults && (
                      <div className="mt-5 pt-4 border-t border-slate-600/50">
                        <p className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wide">📚 Sources</p>
                        <div className="space-y-2">
                          {message.searchResults.slice(0, 3).map((result, i) => (
                            <a
                              key={i}
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-2 rounded-lg hover:bg-slate-600/50 transition-colors group"
                            >
                              <p className="text-xs font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors truncate">
                                {result.title}
                              </p>
                              <p className="text-xs text-slate-400 truncate">{result.url}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start animate-in fade-in">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl rounded-bl-none px-5 py-4 border border-slate-700/50">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-slate-800 backdrop-blur-xl bg-gradient-to-t from-slate-900/90 to-slate-800/90 px-6 py-5 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700/50 rounded-lg text-red-300 text-sm backdrop-blur">
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything... Search, questions, ideas..."
              disabled={loading}
              className="flex-1 bg-slate-800/80 border border-slate-700 text-white rounded-xl px-5 py-3.5 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:from-slate-600 disabled:to-slate-600"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
