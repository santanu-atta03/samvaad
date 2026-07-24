// import React from "react";
// import ChatHeader from "./ChatHeader";
// import MessageList from "./MessageList";
// import ChatInput from "./ChatInput";
// import CallInterface from "../CallInterface";
// import { MessageSquare } from "lucide-react";

// const EmptyState = () => (
//   <div className="flex-1 flex flex-col items-center justify-center gap-4 select-none">
//     <div className="relative">
//       <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
//         style={{ background: 'linear-gradient(135deg, hsl(var(--sv-accent)/0.2), hsl(var(--sv-accent-2)/0.2))', border: '1px solid hsl(var(--sv-accent)/0.2)' }}>
//         <MessageSquare size={32} style={{ color: 'hsl(var(--sv-accent))' }} />
//       </div>
//       <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping"
//         style={{ background: 'hsl(var(--sv-accent)/0.4)' }} />
//       <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
//         style={{ background: 'hsl(var(--sv-accent))' }} />
//     </div>
//     <div className="text-center">
//       <h3 className="font-bold text-base mb-1" style={{ color: 'hsl(var(--sv-text))' }}>
//         Start a Conversation
//       </h3>
//       <p className="text-sm" style={{ color: 'hsl(var(--sv-text-3))' }}>
//         Select a chat from the sidebar to begin
//       </p>
//     </div>
//   </div>
// );

// const ChatWindow = (props) => {
//   const {
//     selectedConversation,
//     mobileShowSidebar,
//     ...rest
//   } = props;

//   if (!selectedConversation) {
//     return (
//       <div className="flex-1 flex flex-col" style={{ background: 'hsl(var(--sv-surface-2))' }}>
//         <EmptyState />
//       </div>
//     );
//   }

//   return (
//     <main
//       className={`
//         flex-1 min-w-0 min-h-0 h-full
//         relative flex flex-col
//         transition-all duration-300
//         ${mobileShowSidebar
//           ? "hidden md:flex"
//           : "fixed md:relative inset-0 md:inset-auto z-50 md:z-0 flex"}
//       `}
//       style={{ background: "hsl(var(--sv-surface-2))" }}
//     >
//       <CallInterface />

//       {/* Header */}
//       <div className="shrink-0">
//         <ChatHeader selectedConversation={selectedConversation} {...rest} />
//       </div>

//       {/* Messages + Input */}
//       <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
//         <MessageList selectedConversation={selectedConversation} {...rest} />
//         <div className="shrink-0 pb-[env(safe-area-inset-bottom,0px)] md:pb-0">
//           <ChatInput selectedConversation={selectedConversation} {...rest} />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default React.memo(ChatWindow);



// frontend/src/components/Chat/layout/ChatWindow.jsx

import React, { useRef, useEffect } from "react";
import { SmilePlus, Paperclip, Camera, SendHorizonal, Info } from "lucide-react";

const ChatWindow = ({
  selectedConversation,
  messages,
  userId,
  handleSend,
  handleTyping,
  replyToMessage,
  setReplyToMessage,
  isTyping,
  showRightSidebar,
  setShowRightSidebar,
}) => {
  const messageInput = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#17192b]">
      {/* Top header */}
      <div className="flex items-center px-10 py-6">
        <div className="flex items-center gap-3 mr-auto">
          {/* Logo Icon Placeholder */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2b64fc] to-[#6087fb] flex items-center justify-center shadow-[0_0_15px_rgba(43,100,252,0.5)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-extrabold text-[22px] tracking-[0.2em] text-white">HYPER</span>
        </div>
        {/* Group avatars in a cluster, right side */}
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <div className="flex -space-x-3 mr-2">
              {selectedConversation?.participants?.slice(0, 4).map((p, i) => (
                <img
                  key={p._id || i}
                  src={p.avatar || "/default-avatar.png"}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#17192b]"
                  alt={p.name}
                />
              ))}
            </div>
            <button className="w-9 h-9 rounded-full bg-[#a855f7] flex items-center justify-center text-white text-lg font-bold border-2 border-[#17192b] shadow-sm hover:opacity-90">
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowRightSidebar(prev => !prev)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${showRightSidebar ? 'bg-[#2b64fc] text-white' : 'bg-[#1c1e31] text-[#A3AED0] hover:text-white'}`}
            title="Toggle Info Sidebar"
          >
            <Info size={18} />
          </button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-10 py-6" style={{ minHeight: 0 }}>
        {messages.length === 0 && (
          <div className="text-[#5F6E8C] text-center mt-32 text-lg">No messages yet...</div>
        )}
        {messages.map((msg, i) => (
          <div key={msg._id || i} className="mb-5">
            {/* Audio Message */}
            {msg.type === "audio" && (
              <div className="flex items-start gap-4 mb-8 pl-12">
                <div className="flex flex-col bg-[#1c1e31] rounded-3xl p-5 shadow-lg max-w-[400px] w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={msg.sender?.avatar || "/default-avatar.png"} className="w-12 h-12 rounded-xl object-cover" alt={msg.sender?.name} />
                      <div>
                        <div className="font-bold text-[15px] text-white">{msg.sender?.name || "Ceritera"}</div>
                        <div className="text-[11px] font-semibold text-[#5F6E8C] tracking-wide mt-0.5">HVR</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#5F6E8C]">3:45 / 5:02</span>
                  </div>
                  {/* Waveform placeholder */}
                  <div className="flex items-center gap-[2px] h-10 w-full mb-1">
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className="w-[3px] rounded-full bg-gradient-to-t from-[#2b64fc] to-[#6087fb]" style={{ height: `${Math.max(20, Math.random() * 100)}%`, opacity: i > 25 ? 0.3 : 1 }}></div>
                    ))}
                  </div>
                </div>
                {/* Reactions below (simulated by positioning) */}
                <div className="flex items-center gap-2 mt-2 -ml-3 absolute translate-y-[130px] translate-x-[70px]">
                  <div className="flex items-center gap-1.5 bg-[#1c1e31] px-2.5 py-1.5 rounded-full text-[11px] font-bold text-white shadow-sm cursor-pointer hover:bg-[#232546]">
                    ❤️ 12
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#1c1e31] px-2.5 py-1.5 rounded-full text-[11px] font-bold text-white shadow-sm cursor-pointer hover:bg-[#232546]">
                    🔥 10
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#1c1e31] px-2.5 py-1.5 rounded-full text-[11px] font-bold text-white shadow-sm cursor-pointer hover:bg-[#232546]">
                    👍 17
                  </div>
                </div>
              </div>
            )}
            
            {/* Text/Reply Message */}
            {msg.type === "text" && (
              <div className="flex gap-4 items-start pl-12 relative group mt-4">
                <div className="relative">
                  <img src={msg.sender?.avatar || "/default-avatar.png"} className="w-10 h-10 rounded-full object-cover" alt={msg.sender?.name} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#17192b] rounded-full"></div>
                </div>
                
                <div className="flex-1 max-w-[500px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-[14px] text-white">{msg.sender?.name || "User"}</span>
                  </div>
                  <div className="text-[13px] bg-[#1c1e31] leading-relaxed rounded-2xl rounded-tl-sm p-4 text-[#d1d5db] shadow-sm relative">
                    {msg.content}
                    <div className="absolute top-4 -right-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[#5F6E8C] hover:text-white">
                      •••
                    </div>
                  </div>
                  {/* Reactions */}
                  {msg.reactionCount > 0 && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex items-center gap-1.5 bg-[#1c1e31] px-2 py-1 rounded-full text-[10px] font-bold text-white">
                        🙌 {msg.reactionCount}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Image Array Message Simulation */}
            {msg.type === "image-group" && (
               <div className="flex gap-4 items-start pl-12 relative mt-4">
                 <div className="relative">
                   <img src={msg.sender?.avatar || "/default-avatar.png"} className="w-10 h-10 rounded-full object-cover" alt={msg.sender?.name} />
                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#17192b] rounded-full"></div>
                 </div>
                 <div className="flex-1 max-w-[500px]">
                   <div className="flex items-center gap-2 mb-1.5">
                     <span className="font-bold text-[14px] text-[#A855F7]">{msg.sender?.name || "Abbie Wilson"}</span>
                   </div>
                   <div className="text-[13px] bg-[#1c1e31] leading-relaxed rounded-2xl rounded-tl-sm p-4 text-[#d1d5db] shadow-sm relative mb-3">
                     Here are some of very cute illustration. You can add this to your moodboard. Okay! 🔥
                   </div>
                   <div className="flex gap-2">
                     <div className="w-[70px] h-[70px] rounded-xl bg-pink-200 overflow-hidden"><img src={msg.images?.[0] || "/placeholder.jpg"} className="w-full h-full object-cover"/></div>
                     <div className="w-[70px] h-[70px] rounded-xl bg-purple-200 overflow-hidden"><img src={msg.images?.[1] || "/placeholder.jpg"} className="w-full h-full object-cover"/></div>
                     <div className="w-[70px] h-[70px] rounded-xl bg-blue-200 overflow-hidden"><img src={msg.images?.[2] || "/placeholder.jpg"} className="w-full h-full object-cover"/></div>
                     <div className="w-[70px] h-[70px] rounded-xl bg-indigo-900 overflow-hidden relative flex items-center justify-center text-white font-bold cursor-pointer">
                       <img src={msg.images?.[3] || "/placeholder.jpg"} className="w-full h-full object-cover opacity-40"/>
                       <span className="absolute z-10">+5</span>
                     </div>
                   </div>
                 </div>
               </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      {/* Typing state */}
      {isTyping && (
        <div className="mb-3 ml-12 text-[#7586a0] text-sm">Typing…</div>
      )}
      {/* Input Bar */}
      <form
        className="flex items-center gap-3 px-10 py-6 bg-[#17192b]"
        onSubmit={e => {
          e.preventDefault();
          handleSend(e, messageInput.current.value);
          messageInput.current.value = "";
        }}
      >
        <button type="button" className="p-2 text-[#5F6E8C] hover:text-white transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        </button>
        <input
          ref={messageInput}
          type="text"
          placeholder="Type something..."
          className="flex-1 py-3 bg-transparent text-white placeholder-[#5F6E8C] outline-none text-[15px] font-medium"
          onKeyDown={handleTyping}
        />
        <div className="flex items-center gap-3">
          <button type="button" className="p-2 text-[#A3AED0] hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </button>
          <button type="button" className="p-2 text-[#A3AED0] hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </button>
          <button type="submit" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black ml-2 hover:bg-gray-200 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;