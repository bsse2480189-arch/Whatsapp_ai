import { Send, Phone, Video, MoreVertical, CheckCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  id: string;
  text: string;
  isOutgoing: boolean;
  timestamp: string;
}

const mockMessages: Message[] = [
  { id: '1', text: "Hello! I'm interested in the Premium Enterprise plan details.", isOutgoing: false, timestamp: '10:30 AM' },
  { id: '2', text: "Hi! Thanks for your interest. I'm the Business Pro assistant. Would you like to see our tiered pricing structure or schedule a demo?", isOutgoing: true, timestamp: '10:31 AM' },
  { id: '3', text: "Pricing structure please.", isOutgoing: false, timestamp: '10:32 AM' },
];

export default function ChatPreview() {
  return (
    <div className="w-full max-w-sm rounded-none overflow-hidden border border-outline-variant shadow-2xl bg-white flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-primary p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-none bg-zinc-700 overflow-hidden border border-white/20">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sassy" alt="Contact" />
          </div>
          <div>
            <p className="font-bold text-[11px] uppercase tracking-wider">Alex Rivera</p>
            <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest">SESSION_ACTIVE</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <Video size={16} />
          <Phone size={16} />
          <MoreVertical size={16} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-zinc-50 p-4 flex flex-col gap-3 overflow-y-auto">
        <div className="self-center bg-zinc-200 text-[9px] py-1 px-3 rounded-none uppercase font-bold tracking-[0.2em] text-zinc-600 mb-2 border border-zinc-300">
          ONBOARDING_SYSTEM // v.1.0
        </div>
        
        {mockMessages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, x: msg.isOutgoing ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={msg.id}
            className={`max-w-[85%] p-4 rounded-none text-[13px] relative border ${
              msg.isOutgoing 
                ? 'self-end bg-primary text-white border-primary ml-4' 
                : 'self-start bg-white text-primary border-outline-variant mr-4'
            }`}
          >
            {msg.text}
            <div className={`mt-2 flex items-center justify-end gap-1 text-[9px] font-mono tracking-tighter ${msg.isOutgoing ? 'text-zinc-400' : 'text-zinc-300'}`}>
              {msg.timestamp}
              {msg.isOutgoing && <CheckCheck size={12} />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-outline-variant flex items-center gap-3">
        <div className="flex-1 bg-zinc-50 rounded-none px-4 py-2 text-[12px] border border-outline-variant text-zinc-400 uppercase tracking-widest font-bold">
          TERMINAL_INPUT...
        </div>
        <button className="w-10 h-10 rounded-none bg-primary text-white flex items-center justify-center">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
