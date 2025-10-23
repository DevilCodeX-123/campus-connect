// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { getMyChats } from '../firebase/db';
import ChatScreen from '../components/Chat/ChatScreen';
import { auth } from '../firebase/firebase';

export default function Home() {
  const [chats, setChats] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    getMyChats().then(setChats);
  }, []);

  if (selected) return <ChatScreen otherUser={selected} />;

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">तुम्हारे चैट्स</h1>
      {chats.map(chat => {
        const otherUid = chat.user1 === auth.currentUser?.uid ? chat.user2 : chat.user1;
        return (
          <div key={chat.id} onClick={() => setSelected({ uid: otherUid, name: "User " + otherUid.slice(-4) })} className="p-4 border-b cursor-pointer">
            <p className="font-bold">User {otherUid.slice(-4)}</p>
            <p className="text-sm text-gray-600">{chat.lastMessage}</p>
          </div>
        );
      })}
    </div>
  );
}
