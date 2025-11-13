import { useState } from 'react';
import './KimiChat.css';

export default function KimiChat() {
  const [input, setInput] = useState('');
  const [msgs, setMsgs]   = useState([
    {role:'assistant', content:'Bonjour, je suis ton IA locale. Pose-moi une question !'}
  ]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = {role:'user', content:input};
    setMsgs(m => [...m, userMsg, {role:'assistant', content:''}]);
    setInput('');

    const res = await fetch('/api/ai', {
      method : 'POST',
      headers: {'Content-Type':'application/json'},
      body   : JSON.stringify({message:input})
    });

    const reader = res.body.getReader();
    const decoder= new TextDecoder();
    let answer = '';
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      answer += decoder.decode(value, {stream:true});
      setMsgs(m => { const tmp=[...m]; tmp[tmp.length-1].content=answer; return tmp; });
    }
  };

  return (
    <div className="kimi-box">
      <div className="kimi-msgs">
        {msgs.map((m,i) => <div key={i} className={`msg ${m.role}`}><span>{m.content}</span></div>)}
      </div>
      <div className="kimi-input">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Tape ton message…"/>
        <button onClick={send}>Envoyer</button>
      </div>
    </div>
  );
}
