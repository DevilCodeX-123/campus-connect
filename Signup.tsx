import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { saveUserProfile } from '../../firebase/db';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handle = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      await saveUserProfile({ name, email, gender: 'male', photoURL: '', verified: false });
      alert("साइनअप हो गया!");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="input w-full mb-2" />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input w-full mb-2" />
      <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} className="input w-full mb-4" />
      <button onClick={handle} className="btn w-full">साइनअप</button>
    </div>
  );
}
