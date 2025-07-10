import { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isListening, setIsListening] = useState(false); // State to track if listening
  const chatRef = useRef(null);

  const recognitionRef = useRef(null); // Ref to store recognition object

  // 🔄 Loader disappears after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved && JSON.parse(saved).length > 0) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        { from: "bot", text: "👋 Hello! I’m Hashim’s AI. How can I help you today?" },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Initialize SpeechRecognition once
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false; // Get final results only
      recognition.maxAlternatives = 1; // Get the most probable result

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Optional: Automatically send message after speech recognition
        // if (transcript) {
        //   handleSend(transcript);
        // }
      };

      recognition.onend = () => {
        setIsListening(false); // Stop listening state when recognition ends
        console.log("Speech recognition ended.");
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false); // Reset listening state on error
        alert(`Speech recognition error: ${event.error}. Please try again.`);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition API not supported in this browser.");
    }

    // Cleanup: Stop recognition if component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const customResponses = {
    "hi": "👋 Hello! I'm Hashim’s AI assistant. How can I help you today?",
    "hello": "Hey there! 👋 What would you like to talk about?",
    "hey": "Hi! I'm right here if you need anything!",
    "how are you": "I'm just lines of code, but I’m doing great! 😄",
    "your name": "I'm Hashim’s AI — smart, responsive, and friendly!",
    "created you": "🛠️ I was created by Hashim — a talented AI enthusiast and full-stack developer!",
    "hashim": "👨‍💻 Hashim is a passionate developer from Mangalore, currently pursuing AI & ML.",
    "hashims age": "🎂 Hashim is in his early 20s, already building cool things like me!",
    "hashims study": "📚 Hashim is studying AI & ML after completing a diploma in Computer Science.",
    "hashims college": "🏫 Hashim is enrolled at Sahyadri College of Engineering.",
    "hashims education": "🎓 Hashim is diploma holder in Computer Science & Engineering.And currently pusuing Engoneering.",
    "hashims location": "📍 Mangalore, India.",
    "hashims skills": "🧠 React, Tailwind, Flask, Git, Python, HTML/CSS, JavaScript.",
    "hashims interests": "🎯 Open Source, Cricket, Teaching, Fitness, and Meditation.",
    "hashims projects": "💼 Projects like AI Resume Analyzer, Car Rental System, and this chatbot!",
    "hashims linkedin": "🔗 LinkedIn: https://www.linkedin.com/in/hashim-nihal",
    "hashims github": "🧑‍💻 GitHub: https://github.com/hashimnihal",
    "hashims portfolio": "🌐 Portfolio: <a href='https://hashimnihal.github.io/portfolio/' Click here",
    "is hashims development good": "💯 Absolutely! Hashim is a creative, hardworking, and always learning.",
    "hashims hobbies": "🎯 Coding, Cricket, Meditation, and exploring new technologies.",
    "hashims resume": "📄 You can access Hashim’s resume via his portfolio.",
    "hashims languages": "🗣️ English, Kannada, Hindi,Beary,Tulu.",
    "hashims achievements": "🏆 Full-stack projects, AI tools, open source contributions, and more.",
    "hashims current work": "🔧 Hashim is focused on frontend, backend, AI tools, and creative UI.",
    "hashims current project": "🛠️ A smart chatbot, 3D UI, and Resume Analyzer.",
    "hashims favorite tech": "❤️ React and Tailwind CSS.",
    "hashims dream": "🌟 To be a world-class AI innovator and full-stack developer.",
    "help me": "Absolutely! Just ask anything and I’ll try my best.",
    "who am i": "You are chatting with Hashim’s AI. You must be awesome too! 😄",
    "what you can do": "I can share Hashim’s info, answer questions, and chat with you.",
    "joke": "😂 Why did Hashim’s code break up with the server? Too many timeouts!",
    "fact": "💡 Hashim’s chatbot was built using React, Flask, and Ollama!",
    "see hashims work": "Of course! Visit Hashim’s portfolio: https://hashimnihal.github.io/portfolio/",
    "hashims whatsapp": "📱 That’s private. Use Hashim’s portfolio contact page instead.",
    "hashims email": "📧 Email is listed on his portfolio.",
    "hashims status": "📶 Active and always improving!",
    "hashims dream company": "🏢 Google, OpenAI, or building Hashim’s own startup!",
    "hashims motto": "💬 “Code with purpose. Build with passion.”",
    "hashims favorite quote": "🧠 “First, solve the problem. Then, write the code.” — John Johnson",
    "hashims favorite food": "🍕 Likely pizza or biryani — but only Hashim knows for sure!",
    "hashims style": "🖌️ Clean UI, animations, and elegant designs — especially in dark mode!",
    "hashims chatbot": "🤖 I’m Hashim’s personal AI chatbot powered by Ollama!",
    "hashims front-end": "🎨 React.js, Tailwind CSS, and creative responsive UI.",
    "hashims back-end": "🧠 Flask and Python connected to Ollama’s LLaMA3 model.",
    "hashims ai model": "🔍 LLaMA3 via Ollama — a powerful local AI engine.",
    "hashims dark mode": "🌑 Sleek, modern look. Hashim’s favorite design aesthetic.",
    "hashims nickname": "🤫 Secret! Ask Hashim directly.",
    "hashims voice tool": "🎤 Speech-to-text built into this chatbot using Web Speech API.",
    "hashims chatbot name": "👾 Hashim’s AI — smooth UI, real voice input, and smart replies.",
    "hashims project list": "📚 AI Resume Analyzer, Car Rental, Chatbot, and Portfolio.",
    "hashims tech stack": "💻 React, Flask, Python, Tailwind, Node, Git.",
    "hashims stack": "🛠️ Full-stack development — frontend + backend + AI.",
    "hashims favorite tool": "🧩 React + Tailwind — fast UI with amazing flexibility.",
    "hashims animation style": "✨ Smooth entry transitions and cinematic chatbot effects.",
    "hashims contact form": "📬 Available on his portfolio website.",
    "hashims favorite subject": "🧠 AI, Web Development, and real-world problem solving.",
    "hashims strength": "💪 Self-learning, creativity, and consistency.",
    "hashims chatbot frontend": "🌐 React.js + Tailwind with real-time interaction features.",
    "hashims chatbot backend": "🚀 Flask API connected to local LLaMA3 model.",
    "hashims chatbot stack": "💻 Full-stack: React (frontend), Flask (backend), Ollama (AI).",
    "hashims website": "🌍 Portfolio: 'https://hashimnihal.github.io/portfolio/'",
    "hashims educationn": "🎓 Diploma in Computer Science + AI & ML Engineering.",
    "hashims certifications": "📜 Completed multiple coding courses and certifications online.",
    "hashims future plan": "📈 To innovate in AI, help others, and make an impact in tech!",
    "hashims open source": "🌍 Yes! Hashim loves GitHub and open-source contributions.",
    "hashims chatbot model": "🧠 Powered by LLaMA3 locally using Ollama server.",
    "hashims chatbot features": "🎯 Typing animation, voice input, scroll memory, and local history.",
    "hashims chatbot data": "💬 Chat history is saved in your browser localStorage.",
    "hashims chatbot voice": "🎤 Voice input via browser’s speech recognition API.",
    "hashims chatbot personality": "😄 Friendly, smart, and full of facts about Hashim!",
    "hashims learning style": "📘 Hashim is a visual and hands-on learner. He believes in building projects while learning concepts, not just reading about them.",
    "hashims favorite frontend library": "⚛️ React.js — Hashim enjoys its flexibility, component system, and how fast it makes building UIs.",
    "hashims favorite backend tool": "🧠 Flask — simple, powerful, and Pythonic. Hashim uses it for most of his backend work.",
    "hashims favorite course": "🎓 A React course by freeCodeCamp and AI basics on Coursera shaped much of his foundation.",
    "hashims favorite teacher": "👨‍🏫 Hashim values teachers who explain things practically. Some of his favorites include online educators like Net Ninja and Traversy Media.",
    "hashims social media presence": "📱 Hashim shares coding snippets, updates, and creative ideas mainly on GitHub and LinkedIn.",
    "hashims leadership quality": "🤝 Hashim often guides team projects, delegates clearly, and ensures everyone learns during collaboration.",
    "hashims personality": "😄 Curious, consistent, helpful, and quietly confident — that's how people describe Hashim.",
    "hashims biggest strength": "💪 Self-learning and consistency — he never gives up until he solves the problem.",
    "hashims biggest weakness": "🔍 Sometimes he spends too much time refining UI, striving for pixel-perfect design.",
    "hashims favorite IDE": "🛠️ VSCode with custom themes and plugins like Prettier, GitLens, and Tailwind IntelliSense.",
    "hashims daily schedule": "🗓️ After college, Hashim spends 2–4 hours coding, learning new tech, or improving existing projects.",
    "hashims favorite book": "📖 ‘Atomic Habits’ by James Clear has inspired Hashim to improve one step at a time.",
    "hashims time management": "⏳ He uses Notion and sticky notes to plan tasks and breaks work into deep focus sessions.",
    "hashims design tool": "🎨 He uses Figma to prototype UI layouts before building them in code.",
    "hashims favorite YouTubers": "📺 Fireship, Kevin Powell, and JS Mastery — all teach in fun and powerful ways.",
    "hashims GitHub activity": "📊 Regular commits, clean code, and well-documented projects define his GitHub.",
    "hashims approach to failure": "🧩 Every error is a stepping stone. Hashim believes in debugging until things work!",
    "hashims debugging style": "🔧 Console.log, dev tools, and staying calm — Hashim works logically through problems.",
    "hashims team experience": "👥 In college and personal projects, he has led and collaborated effectively using Git and Trello.",
    "hashims favorite color scheme": "🌈 Dark theme with cyan and purple hues — futuristic, elegant, and readable.",
    "hashims hosting platform": "☁️ GitHub Pages for frontend, Render for Flask apps — simple, fast, and free-tier friendly.",
    "hashims favorite anime": "🎥 He enjoys Studio Ghibli's calm art style — inspiration for aesthetic UI design.",
    "hashims favorite sport": "🏏 Cricket — a stress-buster and something he’s been playing since school.",
    "hashims fitness habit": "💪 Regular push-ups and short workouts keep him active and refreshed.",
    "hashims meditation style": "🧘‍♂️ Focused breathing and reflection for 10–15 minutes daily keeps him balanced.",
    "hashims travel dreams": "🌍 He dreams of visiting Japan and Silicon Valley — both tech and culture hubs!",
    "hashims online presence": "🔗 Portfolio, GitHub, LinkedIn — he keeps them updated with real projects.",
    "hashims open-source contributions": "🌐 From bug fixes to UI improvements, Hashim contributes where he can and learns by doing.",
    "hashims email habits": "📬 Clean, clear, and formal — especially when applying or connecting professionally.",
    "hashims college activities": "📣 Active in technical events, seminars, and mini project expos.",
    "hashims mini project": "🔧 Built a car rental system in a team — managed frontend, UI, and collaboration.",
    "hashims team role": "🧑‍💻 Usually the one handling frontend or full-stack integration. Leads clean code and design choices.",
    "hashims project goals": "🎯 Projects should solve problems, have smooth UI/UX, and be scalable.",
    "hashims client project": "🛒 Recently helped a client with a product inquiry + booking page integrated with WhatsApp.",
    "hashims use of Git": "🌿 Branching, commits, pull requests — Hashim uses Git daily like a second language.",
    "hashims favorite emoji": "🤖 + 💡 — best mix of AI and creativity!",
    "hashims startup idea": "📦 Build an AI-powered resume builder + mentor chatbot for career support.",
    "hashims mobile development": "📱 He’s experimenting with React Native — plans to build a personal tracker app.",
    "hashims CMS knowledge": "📰 He has explored WordPress and is curious about headless CMS like Strapi for future projects.",
    "hashims hosting experience": "🚀 Deployed static sites, Flask APIs, and full-stack apps using multiple services.",
    "hashims AI knowledge": "🧠 Knows basics of NLP, LLMs, classification models — learning daily!",
    "hashims deployment skill": "🔧 Has deployed both frontend and backend apps together using GitHub and Render.",
    "hashims top 3 strengths": "🔥 Creativity, curiosity, and focus. Hashim builds with purpose and polish.",
    "hashims 3 goals for 2025": "📌 1. Build a SaaS app. 2. Intern in AI startup. 3. Contribute to open source.",
    "hashims UI philosophy": "💎 UI should be smooth, clean, responsive, and speak to the user without words.",
    "hashims JavaScript love": "💛 JavaScript lets him turn ideas into interactive, working products — pure magic.",
    "hashims hosting pain": "😅 Faced DNS errors, SSL issues, and backend timeouts — fixed by research and patience.",
    "hashims favorite part of coding": "🧩 The moment when the UI and logic come together — feels like art and science.",
    "hashims go-to frameworks": "🔧 React, Tailwind CSS, Flask — his reliable tech stack trio.",
    "hashims Figma workflow": "📐 Design -> export spacing ideas -> start building with Tailwind right away.",
    "hashims biggest fear": "😰 Losing momentum — so he keeps pushing himself even on slow days.",
    "hashims long-term goal": "🚀 To lead or build a product that makes education or career guidance smarter and more accessible.",
    "hashims community love": "🫂 He wants to create a dev community in Mangalore someday to mentor and grow together.",
    "hashims motivation": "⚡ He finds motivation in helping others and seeing people use what he built.",
    "hashims use of Notion": "📒 Task planner, roadmap tracker, project checklist — Hashim organizes life with Notion.",
    "hashims interview preparation": "🎤 He practices coding problems, common HR questions, and builds mini projects to stand out.",
    "hashims college placement": "🎓 Aiming for companies that focus on web or AI tools — he's ready with portfolio and code!",
    "hashims dream portfolio site": "🌌 3D, animated, voice-controlled, fully responsive — and shows his journey beautifully.",
    "hashims habit builder": "📊 Focuses on improving 1% daily — tracking habits on paper and Notion weekly.",
    "hashims message to juniors": "💬 Start building now. Learn by doing, not just watching tutorials.",
    "hashims proudest moment": "🏆 Seeing his chatbot respond smartly — built completely by him!",
    "hashims favorite quote in life": "🧠 'Discipline is the bridge between goals and success.' Hashim lives by this.",
    "hashims way of learning AI": "🤖 He builds tools like resume analyzers and chatbots while learning theory behind ML models.",
    "hashims approach to challenges": "🧱 Break it down. Solve step-by-step. Google is your best teammate.",
    "hashims style of explanation": "🗣️ Simple language, real-life examples — he explains as if teaching a friend.",
    "hashims type of projects": "🔬 Real-world focused. Not just flashy UI, but functional and problem-solving tools.",
    "hashims ideal workspace": "💻 Dark mode setup, calm music, a clean desk — and lots of Post-it notes for ideas!",
    "hashims web dev journey": "🌱 From HTML/CSS basics to full-stack deployments, he’s self-taught and always evolving.",
    "hashims inspiration to start coding": "⚙️ Curiosity to build his own app in diploma — turned into a full-time passion.",
    "hashims current coding challenge": "🚧 Working on integrating better AI responses and memory in his chatbot.",
    "hashims morning routine": "🌅 Starts early with prayer, journaling, and planning his top 3 tasks of the day.",
    "hashims night ritual": "🌙 Ends the day reviewing progress, planning tomorrow, and relaxing with tech blogs or cricket highlights."
  };

  const majorPrompts = [
    "hashims education",
    "hashims favorite book",
    "hashims skills",
    "hashims favorite sport",
    "hashims favorite frontend library",
    "hashims college",
    "hashims portfolio",
    "what you can do",
    "hashims inspiration to start coding",
    "hashims tech stack"
  ];

  const handleSend = (messageToSend = input) => {
    if (!messageToSend.trim()) return;
    const userMessage = messageToSend;
    const lowerInput = userMessage.trim().toLowerCase();

    // Check custom responses first
    if (customResponses[lowerInput]) {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: userMessage },
        { from: "bot", text: "⏳ Hashims bot is typing..." },
      ]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        const response = customResponses[lowerInput];
        typeMessage(response, (animatedText) => {
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { from: "bot", text: animatedText },
          ]);
        });
        setIsTyping(false);
      }, 2000); // Wait 2 seconds before starting animation
      return;
    }

    // Fallback to API if no custom response
    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage },
      { from: "bot", text: "⏳ Hashims AI is typing..." },
    ]);
    setInput("");
    setIsTyping(true);

    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage }),
    })
      .then((res) => res.json())
      .then((data) => {
  const fallbackReply = "🤖 Sorry, I couldn’t find a confident or safe answer to that. I'm still improving every day!";
  const reply = data?.response?.trim()
    ? data.response
    : fallbackReply;

  setMessages((prev) => [
    ...prev.slice(0, -1),
    { from: "bot", text: reply },
  ]);
})

       
      .catch(() => {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { from: "bot", text: "❌ Failed to get response." },
        ]);
      })
      .finally(() => setIsTyping(false));
  };

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert("🎤 Voice recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      // If already listening, stop it
      recognition.stop();
      setIsListening(false);
      return;
    }

    // Start listening
    try {
      recognition.start();
      setIsListening(true);
      console.log("Speech recognition started...");
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setIsListening(false);
      alert("Could not start voice recognition. Please try again or check your browser permissions.");
    }
  };

  if (showLoader) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white animate-fade-in">
        <FaRobot className="text-6xl text-cyan-400 animate-bounce mb-4 drop-shadow-glow" />
        <h1 className="text-2xl font-semibold animate-pulse text-center">Welcome to Hashim's AI...</h1>
      </div>
    );
  }

  const typeMessage = (text, callback) => {
    const words = text.split(" ");
    let index = 0;
    let displayed = "";

    const interval = setInterval(() => {
      if (index < words.length) {
        displayed += (index === 0 ? "" : " ") + words[index];
        callback(displayed + " ▌"); // Add cursor effect
        index++;
      } else {
        clearInterval(interval);
        callback(text); // Full text after done
      }
    }, 100); // 100ms per word
  };

  const clearChat = () => {
    const confirmClear = window.confirm("Are you sure you want to clear the chat?");
    if (confirmClear) {
      setMessages([
        { from: "bot", text: "👋 Hello! I’m Hashim’s AI. How can I help you today?" },
      ]);
      localStorage.removeItem("chatHistory");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl sm:max-w-lg md:max-w-xl bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.2)] p-6 border border-white/10 transition-all duration-500 ease-in-out hover:scale-[1.02]">
        <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
          <FaRobot className="text-5xl text-cyan-400 drop-shadow-glow animate-pulse" />
          <h1 className="text-white text-3xl font-bold">Hashim's AI</h1>
        </div>

        <div
          ref={chatRef}
          className="space-y-4 h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-900 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-white px-4 py-3 rounded-2xl break-words text-sm md:text-base max-w-[75%] ${
                msg.from === "bot" ? "bg-cyan-700 self-start" : "bg-gray-700 self-end ml-auto"
              } animate-slide-up`}
            >
              <span dangerouslySetInnerHTML={{
                __html: msg.text.replace(/(https?:\/\/[^\s]+)/g, (url) =>
                  `<a href="${url}" class="underline text-blue-300 hover:text-blue-500" target="_blank" rel="noopener noreferrer">${url}</a>`
                )
              }} />
            </div>
          ))}
        </div>

        {/* Suggested Prompts Section - RENDERED ALWAYS */}
        <div className="mt-6">
          <h3 className="text-white text-lg font-semibold mb-3">Suggested Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {majorPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSend(prompt)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-full transition-colors duration-300"
              >
                {prompt.charAt(0).toUpperCase() + prompt.slice(1).replace(/s /g, "'s ")}
              </button>
            ))}
          </div>
        </div>
        {/* End Suggested Prompts Section */}

      <div className="mt-6 flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto">
  <input
    className="flex-1 p-3 rounded-full bg-gray-700 text-white placeholder-gray-500 outline-none min-w-[120px]"
    placeholder="Type your message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSend()}
  />
  <button
    onClick={() => handleSend()}
    className="bg-cyan-500 hover:bg-cyan-600 transition-all text-white px-4 py-3 rounded-full font-semibold shadow-md flex-shrink-0"
  >
    Send
  </button>
  <button
    onClick={startListening}
    className={`transition-all text-white py-3 rounded-full shadow-md flex items-center justify-center flex-shrink-0 ${
      isListening ? "bg-red-500 animate-pulse px-3" : "bg-pink-500 hover:bg-pink-600 px-3"
    }`}
  >
    {isListening ? "🔴Stop" : "🎤"}
  </button>
  <button
    onClick={clearChat}
    className="bg-red-500 hover:bg-red-500 transition-all text-white px-3 py-3 rounded-full shadow-md flex-shrink-0"
  >
    🗑️ Clear Chat
  </button>
</div>
      </div>
    </div>
  );
}