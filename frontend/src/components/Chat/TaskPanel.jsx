// import { motion, AnimatePresence } from "framer-motion";
// import { X, CheckCircle2, Circle, Clock, Trash2, Calendar, AlertCircle } from "lucide-react";
// import { useChat } from "../../context/ChatContext";

// const TaskPanel = ({ isOpen, onClose }) => {
//     const { tasks, toggleTaskStatus, removeTask } = useChat();

//     if (!isOpen) return null;

//     const pendingTasks = tasks.filter(t => t.status === 'pending');
//     const completedTasks = tasks.filter(t => t.status === 'completed');

//     return (
//         <>
//             {/* Mobile backdrop */}
//             <motion.div
//                 className="fixed inset-0 bg-black/60 z-[300] md:hidden"
//                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                 onClick={onClose}
//             />
//             <motion.aside
//                 className="fixed right-0 top-0 h-full z-[301] border-l overflow-hidden flex flex-col shadow-2xl"
//                 style={{
//                     width: 'min(92vw, 360px)',
//                     background: 'hsl(var(--sv-surface))',
//                     borderColor: 'hsl(var(--sv-border) / 0.5)',
//                 }}
//                 initial={{ x: '100%' }}
//                 animate={{ x: 0 }}
//                 exit={{ x: '100%' }}
//                 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//             >
//                 <div className="flex items-center justify-between p-4 border-b bg-[hsl(var(--sv-surface-2))]" style={{ borderColor: 'hsl(var(--sv-border) / 0.5)' }}>
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
//                             <CheckCircle2 size={18} />
//                         </div>
//                         <span className="font-bold text-sm" style={{ color: 'hsl(var(--sv-text))' }}>My Tasks</span>
//                     </div>
//                     <button onClick={onClose} className="sv-icon-btn w-8 h-8 rounded-lg"><X size={16} /></button>
//                 </div>

//                 <div className="flex-1 overflow-y-auto scrollbar-custom p-4 space-y-6">
//                     {/* Pending Section */}
//                     <div className="space-y-3">
//                         <h4 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--sv-text-3))' }}>
//                             Pending — {pendingTasks.length}
//                         </h4>
//                         {pendingTasks.length === 0 ? (
//                             <div className="py-8 text-center border-2 border-dashed rounded-2xl" style={{ borderColor: 'hsl(var(--sv-border) / 0.3)' }}>
//                                 <Clock size={24} className="mx-auto mb-2 opacity-20" />
//                                 <p className="text-xs" style={{ color: 'hsl(var(--sv-text-3))' }}>No pending tasks</p>
//                             </div>
//                         ) : (
//                             pendingTasks.map(task => (
//                                 <TaskItem key={task._id} task={task} onToggle={toggleTaskStatus} onDelete={removeTask} />
//                             ))
//                         )}
//                     </div>

//                     {/* Completed Section */}
//                     {completedTasks.length > 0 && (
//                         <div className="space-y-3 opacity-60">
//                             <h4 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--sv-text-3))' }}>
//                                 Completed — {completedTasks.length}
//                             </h4>
//                             {completedTasks.map(task => (
//                                 <TaskItem key={task._id} task={task} onToggle={toggleTaskStatus} onDelete={removeTask} />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </motion.aside>
//         </>
//     );
// };

// const TaskItem = ({ task, onToggle, onDelete }) => {
//     const isCompleted = task.status === 'completed';
//     const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !isCompleted;

//     return (
//         <motion.div
//             layout
//             className="group p-3.5 rounded-2xl border transition-all hover:bg-black/5"
//             style={{
//                 background: 'hsl(var(--sv-surface-2))',
//                 borderColor: isOverdue ? 'rgba(239, 68, 68, 0.2)' : 'hsl(var(--sv-border) / 0.5)'
//             }}
//         >
//             <div className="flex gap-3">
//                 <button
//                     onClick={() => onToggle(task._id, !isCompleted)}
//                     className="mt-0.5 flex-shrink-0"
//                 >
//                     {isCompleted
//                         ? <CheckCircle2 size={18} className="text-green-500" />
//                         : <Circle size={18} className={isOverdue ? "text-red-500/50" : "text-black/20"} />
//                     }
//                 </button>
//                 <div className="flex-1 min-w-0">
//                     <h5 className={`text-sm font-semibold truncate ${isCompleted ? 'line-through text-sv-text-3' : 'text-sv-text'}`}>
//                         {task.title}
//                     </h5>
//                     {task.description && (
//                         <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: 'hsl(var(--sv-text-3))' }}>
//                             {task.description}
//                         </p>
//                     )}

//                     <div className="flex items-center gap-3 mt-3">
//                         {task.deadline && (
//                             <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${isOverdue ? 'bg-red-500/10 text-red-400' : 'bg-black/5 text-sv-text-3'}`}>
//                                 <Calendar size={10} />
//                                 {new Date(task.deadline).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
//                             </div>
//                         )}
//                         <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
//                                 task.priority === 'medium' ? 'bg-orange-500/10 text-orange-400' :
//                                     'bg-blue-500/10 text-blue-400'
//                             }`}>
//                             {task.priority}
//                         </div>
//                     </div>
//                 </div>
//                 <button
//                     onClick={() => onDelete(task._id)}
//                     className="opacity-0 group-hover:opacity-100 p-1.5 transition-opacity text-red-500/40 hover:text-red-500"
//                 >
//                     <Trash2 size={14} />
//                 </button>
//             </div>
//         </motion.div>
//     );
// };

// export default TaskPanel;




// frontend/src/components/Chat/TaskPanel.jsx (or similar if you have a dedicated right info component)

import React from "react";

const TaskPanel = ({ selectedConversation, tasks, sharedPhotos }) => (
  <div className="flex flex-col h-full overflow-hidden bg-[#191C32]">
    {/* Profile header */}
    <div className="flex flex-col items-center px-4 pt-6 pb-5 border-b border-[#232546]">
      <div className="relative mb-3">
        <img src={selectedConversation.avatar} className="w-15 h-15 rounded-full object-cover border-4 border-[#232546]" alt="" />
        {selectedConversation.online && (
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
        )}
      </div>
      <div className="text-center">
        <h3 className="font-bold text-white mb-0">{selectedConversation.name}</h3>
        <p className="text-[11px] text-[#5F6E8C]">@{selectedConversation.name?.toLowerCase()?.replace(/\s/g, "")}</p>
      </div>
      <div className="mt-2 flex items-center gap-2 bg-[#22C55E20] rounded-full px-3 py-1">
        <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" />
        <span className="text-[10px] font-semibold text-[emerald]">{selectedConversation.online ? "● Online" : "○ Offline"}</span>
      </div>
    </div>
    {/* To-Do list */}
    <div className="px-4 pt-4 pb-2">
      <div className="uppercase font-black text-[10px] tracking-[0.12em] text-[#5F6E8C] mb-2">To-Do Lists</div>
      <div className="flex flex-col gap-2">
        {tasks?.slice(0,5).map((task, i) => (
          <div key={task.id || i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#232546] cursor-pointer hover:bg-[#35395C]">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-lg" style={{ background: "#2b64fc22", border: `1px solid #2b64fc33` }}>{task.emoji}</span>
            <span className="flex-1 text-[12px] text-white">{task.title}</span>
          </div>
        ))}
      </div>
    </div>
    {/* Shared Photos */}
    <div className="px-4 pt-4 pb-5">
      <div className="uppercase font-black text-[10px] tracking-[0.12em] text-[#5F6E8C] mb-2">Shared Photos</div>
      <div className="grid grid-cols-3 gap-2">
        {sharedPhotos?.length
          ? sharedPhotos.slice(0,6).map((img, i) => (
            <img key={i} src={img.src} alt="" className="aspect-square object-cover rounded-xl" />
          ))
          : [1,2,3,4].map(i => (
              <div key={i} className="aspect-square rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-2xl opacity-70">
                🖼️
              </div>
            ))
        }
      </div>
    </div>
  </div>
);

export default TaskPanel;