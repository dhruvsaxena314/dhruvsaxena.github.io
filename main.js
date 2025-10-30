// main.js — FINAL PORTFOLIO VERSION (green headings, message form, icons)
const ACC = '#016B61';
const ACC_DARK = '#334443';
const FORM_ENDPOINT = "https://formspree.io/f/xzzkvjjk";  // your live Formspree link

function getBlogs(){return JSON.parse(localStorage.getItem("blogs")||"[]");}
function saveBlogs(b){localStorage.setItem("blogs",JSON.stringify(b));}

const PROFILE={
  name:"Dhruv Saxena",
  title:"ResearchGate Fellow • AI & ML Developer",
  location:"Varanasi, India",
  email:"dhruvisgood13@gmail.com",
  phone:"+91 7080880393",
  linkedin:"https://www.linkedin.com/in/dhruv-saxena-3a2b4e7a/",
  github:"https://github.com/dhruvisgood",
  researchgate:"https://www.researchgate.net/profile/Dhruv-Saxena-11",
  miniSummary:"Young AI researcher from Varanasi merging research, open-source ML, and leadership to build ethical, reproducible AI tools.",
  summary:"ResearchGate Fellow with experience in AI, NLP, CV and academic collaboration with IIT-BHU and Cambridge. Passionate about reproducible, ethical AI.",
  accomplishments:[
    "ResearchGate Fellow","ImagoPedia (AI Tool)","Next Voters Fellow","Perplexity Student Partner","InternShala Student Partner","INSPIRE MANAK awardee","NVIDIA DLI — LLM development certified","IBM — Quantum Computing certified","GeeksForGeeks — CS & Math certified"
  ],
  skills:[
    {group:"Project Management",items:[{name:"Research Analysis",pct:90},{name:"Team Collaboration",pct:86},{name:"Problem Solving",pct:89},{name:"AI Tool Development",pct:82}]},
    {group:"Programming & Data Science",items:[{name:"Python (NumPy/Pandas)",pct:95},{name:"Machine Learning",pct:90},{name:"Deep Learning",pct:86},{name:"NLP",pct:85},{name:"Computer Vision",pct:82},{name:"SQL & DSA",pct:78}]},
    {group:"Academic & Research",items:[{name:"Scientific Writing",pct:92},{name:"Quizzing & Competitions",pct:94},{name:"Critical Thinking",pct:90}]}
  ],
  languages:[{name:"Hindi",prof:"C2",pct:98},{name:"English",prof:"C1",pct:92},{name:"French",prof:"A2",pct:55}],
  education:{school:"Sunbeam School Lahartara (Varanasi)",notes:"IMO & IEO Gold, Scholarship holder, Founding member of Young Society Science Club. Focused on Programming, AI & ML, Physics, Mathematics."},
  projects:[{title:"ImagoPedia — Visual AI tool",desc:"Prototype pipeline for mapping images to conceptual tags; research demo and reproducible experiments."},{title:"Text Summarization (NLP)",desc:"Few-shot fine-tuning experiments across multilingual datasets and evaluation."}]
};

function App(){
  const[loadedPct,setLoadedPct]=React.useState(0);
  const[opened,setOpened]=React.useState(false);
  const[stats,setStats]=React.useState({papers:0,projects:0,awards:0});
  const[page,setPage]=React.useState("home");
  const[blogs,setBlogs]=React.useState(getBlogs());
  const[authorized,setAuthorized]=React.useState(false);
  const[showMenu,setShowMenu]=React.useState(false);
  const[showMsg,setShowMsg]=React.useState(false);

  React.useEffect(()=>{
    const stages=[{dur:500,rate:0.35},{dur:900,rate:0.12},{dur:600,rate:0.6},{dur:300,rate:1.5}];
    let idx=0;function tick(){if(idx>=stages.length){setLoadedPct(100);setTimeout(()=>setOpened(true),400);return;}
      const s=stages[idx];const start=performance.now();
      function step(now){const t=Math.min(1,(now-start)/s.dur);const eased=1-Math.pow(1-t,3);
        const add=Math.round(eased*s.rate*100);setLoadedPct(p=>Math.min(99,p+add));
        if(t<1)requestAnimationFrame(step);else{idx++;setTimeout(tick,Math.random()*100+60);}
      }requestAnimationFrame(step);}tick();
  },[]);
  React.useEffect(()=>{if(!opened)return;const target={papers:8,projects:6,awards:9};
    const start=performance.now();function frame(now){const t=Math.min(1,(now-start)/1800);const ease=t<0.5?2*t*t:-1+(4-2*t)*t;
      setStats({papers:Math.round(target.papers*ease),projects:Math.round(target.projects*ease),awards:Math.round(target.awards*ease)});
      if(t<1)requestAnimationFrame(frame);}requestAnimationFrame(frame);
  },[opened]);

  function addBlog(title,content){const b={id:Date.now(),title,content,date:new Date().toLocaleString()};
    const arr=[b,...blogs];setBlogs(arr);saveBlogs(arr);}
  function sendMessage(e){e.preventDefault();fetch(FORM_ENDPOINT,{method:"POST",body:new FormData(e.target),headers:{Accept:"application/json"}}).then(()=>{alert("Message sent successfully!");setShowMsg(false);e.target.reset();}).catch(()=>alert("Failed to send."));}

  if(page==="blogs"){
    return(<div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button className="px-3 py-1 rounded bg-[var(--accent)]/20 hover:bg-[var(--accent)]/40" onClick={()=>setPage("home")}>← Back</button>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-white animate-[shine_4s_linear_infinite]">Blogs</h1>
      </div>
      {authorized&&<AddBlogForm onAdd={addBlog}/>}
      {blogs.map(b=>(<article key={b.id} className="bg-white/10 p-5 rounded-xl">
        <h3 className="font-semibold text-xl text-[var(--accent)]">{b.title}</h3>
        <p className="text-xs text-white/60 mb-3">{b.date}</p>
        <div className="text-sm text-white/80 whitespace-pre-wrap">{b.content}</div>
      </article>))}
    </div>);
  }

  return(
  <div className="relative max-w-6xl mx-auto px-6 py-10 space-y-6" style={{'--accent':ACC,'--accent-dark':ACC_DARK}}>
    <style>{`
      @keyframes shine{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    `}</style>

    {/* Top menu */}
    <button onClick={()=>setShowMenu(!showMenu)} className="fixed top-4 left-4 z-50 text-2xl font-bold bg-[var(--accent)]/20 hover:bg-[var(--accent)]/40 px-3 py-1 rounded-md">☰</button>
    {showMenu&&(<div className="fixed top-14 left-4 bg-[var(--accent-dark)]/80 backdrop-blur-md rounded-xl p-3 space-y-2 z-40">
      <button className="block w-full text-left hover:bg-[var(--accent)]/20 rounded px-2 py-1" onClick={()=>{setPage('home');setShowMenu(false);}}>🏠 Home</button>
      <button className="block w-full text-left hover:bg-[var(--accent)]/20 rounded px-2 py-1" onClick={()=>{setPage('blogs');setShowMenu(false);}}>📝 Blogs</button>
      <button className="block w-full text-left hover:bg-[var(--accent)]/20 rounded px-2 py-1" onClick={()=>setShowMsg(true)}>💬 Message</button>
    </div>)}

    {/* Header */}
    <header className="flex flex-col md:flex-row justify-between items-center gap-3">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img src="profile.jpg" alt="Dhruv Saxena" className="w-44 h-44 rounded-3xl border-4 border-[var(--accent)] object-cover shadow-xl"/>
          <div className="absolute inset-0 rounded-3xl ring-4 ring-[var(--accent)]/30 animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[#00bfa5] to-white animate-[shine_4s_linear_infinite] bg-[length:200%_auto]">{PROFILE.name}</h1>
          <div className="text-white/70 text-sm">{PROFILE.title} • {PROFILE.location}</div>
          <p className="mt-2 text-white/70 text-sm italic">{PROFILE.miniSummary}</p>
        </div>
      </div>

      {/* Icons */}
      <div className="flex gap-4 mt-3 md:mt-0">
        <a href="dhruv_cv.pdf" title="Resume" target="_blank"><img src="resume.svg" className="w-8 h-8 hover:scale-110 transition-transform"/></a>
        <a href={PROFILE.linkedin} target="_blank"><img src="linkedin.svg" className="w-8 h-8 hover:scale-110 transition-transform"/></a>
        <a href={PROFILE.github} target="_blank"><img src="github.svg" className="w-8 h-8 hover:scale-110 transition-transform"/></a>
        <a href={PROFILE.researchgate} target="_blank"><img src="researchgate.svg" className="w-8 h-8 hover:scale-110 transition-transform"/></a>
      </div>
    </header>

    {/* Sections */}
    <section className="grid md:grid-cols-3 gap-6">
      <aside className="space-y-4">
        <Card title="Profile"><p className="text-sm text-white/80">{PROFILE.summary}</p></Card>
        <Card title="Quick Stats">
          <div className="flex justify-around text-[var(--accent)] mt-2">
            <Stat label="Papers" value={stats.papers}/>
            <Stat label="Projects" value={stats.projects}/>
            <Stat label="Awards" value={stats.awards}/>
          </div>
        </Card>
        <SkillsBlock/><LangBlock/>
      </aside>

      <main className="md:col-span-2 space-y-4">
        <Card title="Projects & Research">{PROFILE.projects.map(p=>(<div key={p.title} className="mb-3"><div className="font-medium text-[var(--accent)]">{p.title}</div><div className="text-xs text-white/70">{p.desc}</div></div>))}</Card>
        <Card title="Education"><p className="text-sm">{PROFILE.education.school}</p><p className="text-xs text-white/70 mt-1">{PROFILE.education.notes}</p></Card>
        <Card title="Accomplishments"><ul className="list-disc pl-5 text-sm space-y-1">{PROFILE.accomplishments.map(a=><li key={a}>{a}</li>)}</ul></Card>
      </main>
    </section>

    <footer className="text-center text-white/60 text-sm mt-6">© {new Date().getFullYear()} {PROFILE.name} • Built with React + Tailwind</footer>

    {/* Message modal */}
    {showMsg&&(
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#1e1e1e] p-6 rounded-xl w-[90%] max-w-md">
          <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Send a Message</h2>
          <form onSubmit={sendMessage} className="space-y-3">
            <input name="name" required placeholder="Your Name" className="w-full p-2 bg-white/10 rounded"/>
            <input name="email" required placeholder="Your Email" className="w-full p-2 bg-white/10 rounded"/>
            <textarea name="message" required rows="4" placeholder="Message..." className="w-full p-2 bg-white/10 rounded"/>
            <div className="flex justify-between">
              <button type="button" onClick={()=>setShowMsg(false)} className="px-3 py-2 bg-white/10 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[var(--accent)] rounded text-white">Send</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>);
}

function Card({title,children}){return(<div className="bg-white/10 p-4 rounded-xl"><h2 className="font-semibold mb-2 text-[var(--accent)]">{title}</h2>{children}</div>);}
function Stat({label,value}){return(<div><div className="text-4xl font-bold">{value}</div><div className="text-xs text-white/70">{label}</div></div>);}
function SkillsBlock(){return(<div className="bg-white/10 p-4 rounded-xl"><h2 className="font-semibold mb-3 text-[var(--accent)]">Skills</h2>{PROFILE.skills.map(g=>(<div key={g.group} className="mb-3"><div className="text-sm font-medium mb-2">{g.group}</div>{g.items.map(it=>(<div key={it.name}><div className="flex justify-between text-xs mb-1"><div>{it.name}</div><div className="text-white/60">{it.pct}%</div></div><div className="w-full h-2 rounded-full bg-[var(--accent)]/20 overflow-hidden"><div className="h-full bg-[var(--accent)] rounded-full" style={{width:`${it.pct}%`}}></div></div></div>))}</div>))}</div>);}
function LangBlock(){return(<div className="bg-white/10 p-4 rounded-xl"><h2 className="font-semibold mb-3 text-[var(--accent)]">Languages</h2>{PROFILE.languages.map(l=>(<div key={l.name}><div className="flex justify-between text-xs mb-1"><div>{l.name} ({l.prof})</div><div>{l.pct}%</div></div><div className="w-full h-2 rounded-full bg-[var(--accent)]/20"><div className="h-full bg-[var(--accent)] rounded-full" style={{width:`${l.pct}%`}}></div></div></div>))}</div>);}
function AddBlogForm({onAdd}){const[title,setTitle]=React.useState("");const[content,setContent]=React.useState("");return(<div className="bg-white/10 p-4 rounded-xl mb-4"><h3 className="font-semibold mb-2 text-[var(--accent)]">➕ Add Blog</h3><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-2 bg-white/10 rounded"/><textarea value={content} onChange={e=>setContent(e.target.value)} rows="6" placeholder="Content" className="w-full p-2 bg-white/10 rounded mb-2"></textarea><button onClick={()=>{if(title&&content){onAdd(title,content);setTitle("");setContent("");}}} className="px-3 py-2 bg-[var(--accent)] rounded-md text-white">Save</button></div>);}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
