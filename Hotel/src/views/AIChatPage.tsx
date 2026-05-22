import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useAIChat } from '../hooks/useAIChat';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function AIChatPage() {
  const { mensajes, inputUsuario, setInputUsuario, enviarMensaje, chatContainerRef, escribiendo } = useAIChat();

  return (
    <>
    <Header />
    <div className="min-h-screen bg-[var(--bg-light)] p-4 sm:p-6 md:p-10 pt-24 md:pt-28 flex justify-center font-sans transition-colors duration-300">
      <div className="w-full max-w-[800px] h-[calc(100vh-140px)] bg-[var(--main-card)] rounded-xl shadow-[var(--card-shadow)] flex flex-col overflow-hidden border border-[var(--main-border)]">
        
        {/* HEADER DEL CHAT */}
        <div className="p-4 md:p-6 bg-[var(--input-bg)] border-b border-[var(--main-border)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--brand-rust)] flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2" style={{ fontFamily: 'var(--font-antiqua)' }}>
              Leto AI
              <Sparkles className="text-[var(--brand-yellow)]" size={16} />
            </h1>
            <p className="text-[var(--text-muted)] text-xs flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-green)] animate-pulse"></span>
              Asistente Virtual En Línea
            </p>
          </div>
        </div>

        {/* ÁREA DE MENSAJES */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth bg-[var(--bg-light)]/30"
        >
          {mensajes.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full animate-fadeIn ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar del emisor */}
                <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center shadow-sm ${msg.sender === 'user' ? 'bg-[var(--text-main)] text-[var(--bg-light)]' : 'bg-[var(--brand-rust)] text-white'}`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={18} />}
                </div>

                {/* Burbuja de chat */}
                <div className={`p-3 md:p-4 rounded-2xl text-sm md:text-[15px] leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[var(--text-main)] text-[var(--bg-light)] rounded-tr-sm' 
                    : 'bg-[var(--main-card)] border border-[var(--main-border)] text-[var(--text-main)] rounded-tl-sm'
                }`}>
                  {msg.texto}
                </div>
              </div>
            </div>
          ))}

          {/* Indicador de "Escribiendo..." */}
          {escribiendo && (
            <div className="flex w-full justify-start animate-fadeIn">
              <div className="flex gap-3 max-w-[85%] flex-row">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center bg-[var(--brand-rust)] text-white shadow-sm">
                  <Bot size={18} />
                </div>
                <div className="px-4 py-3 md:py-4 rounded-2xl bg-[var(--main-card)] border border-[var(--main-border)] rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ZONA DE INPUT (Donde escribe el usuario) */}
        <form onSubmit={enviarMensaje} className="p-4 border-t border-[var(--main-border)] bg-[var(--main-card)]">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={inputUsuario}
              onChange={(e) => setInputUsuario(e.target.value)}
              placeholder="Escribe tu mensaje a Leto..."
              className="w-full py-4 pl-6 pr-14 bg-[var(--input-bg)] border border-transparent rounded-full focus:outline-none focus:border-[var(--brand-rust)] focus:bg-[var(--input-bg-focus)] text-[var(--text-main)] transition-colors text-sm shadow-inner"
            />
            <button 
              type="submit" 
              disabled={!inputUsuario.trim()}
              className="absolute right-2 w-10 h-10 rounded-full bg-[var(--brand-rust)] text-white flex items-center justify-center hover:bg-[var(--brand-rust-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              <Send size={18} className="ml-1" />
            </button>
          </div>
        </form>

      </div>
    </div>
    <Footer />
    </>
  );
}