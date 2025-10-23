// src/firebase/db.ts
import { db, auth } from './firebase';
import { 
  collection, addDoc, getDocs, query, where, 
  orderBy, onSnapshot, serverTimestamp, doc, updateDoc 
} from "firebase/firestore";

const getChatId = (uid1: string, uid2: string) => [uid1, uid2].sort().join('_');

export const saveUserProfile = async (data: any) => {
  await addDoc(collection(db, "users"), {
    uid: auth.currentUser?.uid,
    ...data,
    createdAt: serverTimestamp()
  });
};

export const sendConfession = async (toUid: string, message: string, anonymous: boolean) => {
  await addDoc(collection(db, "confessions"), {
    fromUid: auth.currentUser?.uid,
    toUid,
    message,
    anonymous,
    seen: false,
    timestamp: serverTimestamp()
  });
};

export const sendMessage = async (toUid: string, text: string) => {
  const chatId = getChatId(auth.currentUser!.uid, toUid);
  const msgRef = collection(db, "chats", chatId, "messages");
  
  await addDoc(msgRef, {
    senderUid: auth.currentUser?.uid,
    text,
    timestamp: serverTimestamp()
  });

  await updateDoc(doc(db, "chats", chatId), {
    lastMessage: text,
    timestamp: serverTimestamp(),
    user1: auth.currentUser!.uid < toUid ? auth.currentUser!.uid : toUid,
    user2: auth.currentUser!.uid < toUid ? toUid : auth.currentUser!.uid,
  });
};

export const listenToMessages = (toUid: string, callback: (msgs: any[]) => void) => {
  const chatId = getChatId(auth.currentUser!.uid, toUid);
  const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

export const getMyChats = async () => {
  const uid = auth.currentUser!.uid;
  const q1 = query(collection(db, "chats"), where("user1", "==", uid));
  const q2 = query(collection(db, "chats"), where("user2", "==", uid));
  const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  return [...s1.docs, ...s2.docs].map(d => ({ id: d.id, ...d.data() }));
};
