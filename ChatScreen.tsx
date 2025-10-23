// src/components/Chat/ChatScreen.tsx
import { useState, useEffect, useRef } from 'react';
import { sendMessage, listenToMessages } from '../../firebase/db';
import { auth } from '../../firebase/firebase';

export default function ChatScreen({ otherUser }: { otherUser: any }) {
  const [msgs, setMsgs] = useState<any[]>([]);
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = listenToMessages(otherUser.uid, setMsgs);
    return unsub;
  }, [otherUser.uid]);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [msgs]);

  const send = async () => {
    if (text.trim()) {
      await sendMessage(otherUser.uid, text);
      setText('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-gray-100 font-bold">{otherUser.name}</div>
      <div className="flex-1 overflow-y-auto p-4">
        {msgs.map(m => (
          <div key={m.id} className={m.senderUid === auth.currentUser?.uid ? "text-right" : "text-left"}>
            <div className={`inline-block p-2 rounded-lg mb-2 ${m.senderUid === auth.currentUser?.uid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-4 flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} className="flex-1 input" />
        <button onClick={send} className="btn">Send</button>
      </div>
    </div>
  );
}
