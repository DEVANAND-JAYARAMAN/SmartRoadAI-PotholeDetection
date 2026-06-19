import { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const KB = [
  // Pothole basics
  { keys: ['what is pothole', 'define pothole', 'meaning of pothole', 'pothole mean'], a: 'A pothole is a depression or cavity in a road surface caused by wear, water infiltration, traffic load, and environmental conditions. They vary in size from small dips to large craters.' },
  { keys: ['cause', 'why pothole', 'how pothole form', 'reason for pothole', 'origin'], a: 'Potholes form due to water seeping into cracks, freeze-thaw cycles, heavy traffic load, poor drainage, aging asphalt, and inadequate road maintenance.' },
  { keys: ['dangerous', 'risk', 'hazard', 'unsafe', 'accident', 'harm'], a: 'Potholes are dangerous because they can cause tire blowouts, suspension damage, loss of vehicle control, accidents, and injuries to drivers, passengers, and cyclists.' },
  { keys: ['severe', 'severity', 'how bad', 'serious', 'deep', 'size'], a: 'Severity is judged by depth, width, and location. A pothole deeper than 2 inches or wider than 6 inches is considered high severity and needs urgent repair.' },
  { keys: ['prevent', 'avoid formation', 'stop pothole', 'reduce pothole'], a: 'Prevention includes regular road inspections, proper drainage systems, timely crack sealing, quality construction materials, and preventive maintenance programs.' },

  // Safety & driving
  { keys: ['precaution', 'driver', 'driving', 'what should i do', 'safe driving', 'tip'], a: 'Reduce speed on damaged roads, maintain safe following distance, grip the steering wheel firmly, avoid sudden braking, and stay alert for potholes ahead.' },
  { keys: ['encounter', 'hit pothole', 'drive over', 'ran over', 'drove into'], a: 'If you hit a pothole: check your tires immediately, inspect wheel alignment, listen for unusual noises, and visit a mechanic if you notice vibrations or pulling.' },
  { keys: ['report', 'authority', 'complain', 'notify', 'inform'], a: 'Report potholes to your local municipal authority, road maintenance department, or use city apps/hotlines. Timely reporting accelerates road repair.' },
  { keys: ['community', 'citizen', 'public', 'society', 'people'], a: 'Communities can improve road safety by reporting damage promptly, supporting road maintenance budgets, promoting safe driving, and participating in local road safety programs.' },
  { keys: ['authority', 'government', 'local body', 'municipality', 'council'], a: 'Authorities should conduct routine road inspections, prioritize high-risk zones, repair damage quickly, improve drainage infrastructure, and allocate adequate maintenance budgets.' },

  // Vehicle damage
  { keys: ['damage', 'vehicle', 'car', 'tire', 'tyre', 'suspension', 'wheel', 'alignment'], a: 'Potholes can damage tires (punctures/blowouts), suspension components, wheel rims, steering alignment, shock absorbers, and the vehicle underbody. Repair costs can be significant.' },
  { keys: ['insurance', 'claim', 'cost', 'repair bill', 'expense'], a: 'Vehicle damage from potholes may be covered under comprehensive car insurance. Document the pothole, take photos, and file a claim with your insurer promptly.' },

  // AI / System
  { keys: ['confidence', 'confidence score', 'percentage', 'score mean', 'what does % mean'], a: 'The confidence score (e.g. 97%) indicates how certain the AI model is about its prediction. Higher confidence means the model strongly identified the road condition based on visual patterns.' },
  { keys: ['accurate', 'accuracy', 'how good', 'reliable', 'precision', 'performance'], a: 'The ResNet18 model achieves high accuracy on test data. Real-world accuracy depends on image quality, lighting, angle, and road visibility. Clear, well-lit images yield the best results.' },
  { keys: ['how does it work', 'how ai work', 'how model work', 'detection work', 'process', 'algorithm'], a: 'The system uses ResNet18, a deep convolutional neural network trained on labeled road images. It extracts visual features and classifies the road as "potholes" or "normal" with a confidence score.' },
  { keys: ['resnet', 'resnet18', 'model', 'neural network', 'deep learning', 'cnn'], a: 'ResNet18 is a deep residual neural network with 18 layers. It uses skip connections to prevent vanishing gradients, making it efficient and accurate for image classification tasks.' },
  { keys: ['pytorch', 'framework', 'technology', 'built with', 'tech stack'], a: 'The backend uses PyTorch for model inference, FastAPI for the REST API, and React (Vite) for the frontend. The model was trained using transfer learning on ResNet18.' },
  { keys: ['transfer learning', 'pretrained', 'fine tune', 'training'], a: 'Transfer learning reuses a model pre-trained on ImageNet and fine-tunes it on road/pothole images. This reduces training time and improves accuracy even with smaller datasets.' },
  { keys: ['upload', 'image format', 'what image', 'file type', 'jpg', 'png', 'jpeg'], a: 'You can upload JPG, JPEG, or PNG road images. For best results, use clear, well-lit photos taken from a straight-on angle showing the road surface clearly.' },
  { keys: ['api', 'endpoint', 'backend', 'fastapi', 'post'], a: 'The backend exposes POST /predict. Send a multipart form with a "file" field containing the road image. It returns { "prediction": "potholes" | "normal", "confidence": 0-100 }.' },
  { keys: ['normal', 'safe road', 'no pothole', 'green', 'good road'], a: 'A "Normal" prediction means the AI detected no significant potholes. The road surface appears intact. Always stay alert as conditions can change quickly.' },
  { keys: ['red', 'danger badge', 'danger', 'critical'], a: 'A red Danger badge appears when the model predicts potholes with over 80% confidence — indicating high certainty of significant road damage requiring immediate attention.' },
  { keys: ['orange', 'warning badge', 'warning'], a: 'An orange Warning badge appears when pothole confidence is between 50–80%. The road may have moderate damage. Drive cautiously and inspect further.' },
  { keys: ['green', 'safe badge', 'safe'], a: 'A green Safe badge means the road appears normal with low pothole probability. Standard safe driving practices still apply.' },

  // General road safety
  { keys: ['road safety', 'safe road', 'road rule', 'traffic'], a: 'Road safety involves obeying speed limits, maintaining vehicles, staying alert, avoiding distractions, and reporting hazards like potholes to authorities.' },
  { keys: ['night', 'dark', 'visibility', 'low light'], a: 'Potholes are especially dangerous at night due to low visibility. Use full headlights, reduce speed on unfamiliar roads, and avoid sudden swerving if you spot one late.' },
  { keys: ['rain', 'water', 'flood', 'wet road'], a: 'Waterlogged potholes are hard to see and can be deeper than they appear. Slow down on wet roads and be cautious around puddles — they may conceal large potholes.' },
  { keys: ['motorcycle', 'bike', 'cyclist', 'two wheel'], a: 'Motorcycles and bicycles are especially vulnerable to potholes. Even small potholes can cause loss of control. Riders should scan the road ahead and reduce speed in damaged areas.' },
  { keys: ['pedestrian', 'walk', 'footpath', 'sidewalk'], a: 'Potholes near pedestrian areas and crossings are hazardous. Pedestrians should watch for uneven surfaces, and authorities should ensure safe walkways near damaged roads.' },

  // Greetings / meta
  { keys: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greet'], a: 'Hello! I\'m the SmartRoadAI Assistant. Ask me anything about potholes, road safety, or how the detection system works.' },
  { keys: ['thank', 'thanks', 'appreciate', 'helpful'], a: 'You\'re welcome! Stay safe on the roads. Feel free to ask anything else about pothole detection or road safety.' },
  { keys: ['bye', 'goodbye', 'see you', 'exit'], a: 'Goodbye! Drive safe and stay alert on the roads. 🛣️' },
  { keys: ['who are you', 'what are you', 'your name', 'introduce'], a: 'I\'m the SmartRoadAI Assistant — a chatbot built to answer questions about pothole detection, road safety, and the AI system powering SmartRoadAI.' },
  { keys: ['help', 'what can you do', 'options', 'topics'], a: 'I can answer questions about: potholes (causes, severity, prevention), road safety tips, vehicle damage, how the AI detection works, confidence scores, and how to report road damage.' },
];

const FALLBACK = "I'm not sure about that specific question. Try asking about potholes, road safety, vehicle damage, how the AI works, or confidence scores. I'm happy to help!";

function getResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.a;
  }
  return FALLBACK;
}

const SUGGESTIONS = [
  'What is a pothole?', 'How does the AI work?', 'What causes potholes?',
  'Is my road safe?', 'What does confidence score mean?', 'Can potholes damage my car?',
  'What precautions should I take?', 'How do I report a pothole?',
];

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm SmartRoadAI Assistant. Ask me anything about potholes, road safety, or this detection system." },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    const response = getResponse(msg);
    setMessages((m) => [...m, { from: 'user', text: msg }, { from: 'bot', text: response }]);
    setInput('');
  };

  const onKey = (e) => { if (e.key === 'Enter') send(); };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            {m.from === 'bot' && <span className="avatar">🤖</span>}
            <p>{m.text}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="suggestion-chip" onClick={() => send(s)}>{s}</button>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask about potholes, road safety, AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
        />
        <button className="send-btn" onClick={() => send()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
