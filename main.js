// main.js
const ACC_DARK = '#334443';
const ACC = '#016B61';

// ---------- utility local storage helpers ----------
function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
}
function saveBlogs(blogs) {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

// ---------- Data filled from resume ----------
const PROFILE = {
  name: "Dhruv Saxena",
  title: "ResearchGate Fellow • AI & ML Developer",
  location: "Varanasi, India",
  email: "dhruvisgood13@gmail.com",
  phone: "+91 7080880393",
  linkedin: "https://www.linkedin.com/in/dhruv-saxena-3a2b4e7a/",
  github: "https://github.com/dhruvisgood",
  researchgate: "https://www.researchgate.net/profile/Dhruv-Saxena-11",
  miniSummary: "Young AI researcher from Varanasi merging scientific research, open-source ML, and leadership to build ethical, reproducible AI tools.",
  summary: `A dedicated ResearchGate Fellow with strong background in AI development, scientific writing, leadership and ImagoPedia creation. Expertise across ML, NLP, CV and research collaboration with institutions like IITBHU and Cambridge.`,
  accomplishments: [
    "ResearchGate Fellow",
    "ImagoPedia (AI Tool)",
    "Next Voters Fellow",
    "Perplexity Student Partner",
    "InternShala Student Partner",
    "INSPIRE MANAK awardee",
    "NVIDIA DLI — LLM development certified",
    "IBM — Quantum Computing certified",
    "GeeksForGeeks — CS & Math certified"
  ],
  // Visual skill percentages (you can edit any of these values)
  skills: [
    { group: "Project Management", items: [
      { name: "Project Management", pct: 88 },
      { name: "Research Analysis", pct: 90 },
      { name: "Team Collaboration", pct: 86 },
      { name: "Problem Solving", pct: 89 },
      { name: "AI Tool Development", pct: 82 }
    ]},
    { group: "Programming & Data Science", items: [
      { name: "Python (NumPy/Pandas)", pct: 95 },
      { name: "Machine Learning", pct: 90 },
      { name: "Deep Learning", pct: 86 },
      { name: "NLP", pct: 85 },
      { name: "Computer Vision", pct: 82 },
      { name: "SQL & DSA", pct: 78 }
    ]},
    { group: "Academic & Research", items: [
      { name: "Scientific Writing", pct: 92 },
      { name: "Quizzing & Competitions", pct: 94 },
      { name: "Critical Thinking", pct: 90 }
    ]}
  ],
  languages: [
    { name: "Hindi", prof: "C2", pct: 98 },
    { name: "English", prof: "C1", pct: 92 },
    { name: "French", prof: "A2", pct: 55 },
    { name: "Japanese", prof: "A1", pct: 30 },
    { name: "Bengali", prof: "A1", pct: 28 }
  ],
  education: {
    school: "Sunbeam School Lahartara (Varanasi)",
    notes: "IMO Gold, IEO Gold, Scholarship holder, Founding member of Young Society Science Club. Dissertation topics: Programming, AI & ML, Physics, Mathematics."
  },
  projects: [
    { title: "ImagoPedia — Visual AI tool", desc: "Prototype pipeline for mapping images to conceptual tags; research demo and reproducible experiments." },
    { title: "Text Summarization (NLP)", desc: "Few-shot fine-tuning experiments across multilingual datasets and evaluation." },
    { title: "Model Bias Detection", desc: "Worked on experiments to detect and reduce bias in classification models." }
  ]
};

// ---------- main component ----------
function App() {
  const [loadedPct, setLoadedPct] = React.useState(0);
  const [opened, setOpened] = React.useState(false);
  const [stats, setStats] = React.useState({ papers: 8, projects: 6, awards: 9 });
  const [page, setPage] = React.useState("home");
  const [blogs, setBlogs] = React.useState(getBlogs());
  const [authorized, setAuthorized] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  // loader animation
  React.useEffect(() => {
    const stages = [
      { dur: 500, rate: 0.35 },
      { dur: 900, rate: 0.12 },
      { dur: 600, rate: 0.6 },
      { dur: 300, rate: 1.5 },
    ];
    let idx = 0;
    function tick() {
      if (idx >= stages.length) {
        setLoadedPct(100);
        setTimeout(() => setOpened(true), 400);
        return;
      }
      const s = stages[idx];
      const start = performance.now();
      function step(now) {
        const t = Math.min(1, (now - start) / s.dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const add = Math.round(eased * s.rate * 100);
        setLoadedPct((prev) => Math.min(99, prev + add));
        if (t < 1) requestAnimationFrame(step);
        else {
          idx++;
          setTimeout(tick, Math.random() * 100 + 60);
        }
      }
      requestAnimationFrame(step);
    }
    tick();
  }, []);

  // counters after open
  React.useEffect(() => {
    if (!opened) return;
    const targets = { papers: stats.papers, projects: stats.projects, awards: stats.awards };
    const start = performance.now();
    function animate(now) {
      const t = Math.min(1, (now - start) / 1200);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setStats({
        papers: Math.round(targets.papers * ease),
        projects: Math.round(targets.projects * ease),
        awards: Math.round(targets.awards * ease),
      });
      if (t < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [opened]);

  // blog functions
  function addBlog(title, content) {
    const newBlog = { id: Date.now(), title, content, date: new Date().toLocaleString() };
    const newBlogs = [newBlog, ...blogs];
    setBlogs(newBlogs);
    saveBlogs(newBlogs);
  }

  // page: blogs
  if (page === "blogs") {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded bg-white/10 hover:bg-white/20" onClick={() => setPage("home")}>← Back</button>
            <h1 className="text-3xl font-bold">📝 Blogs</h1>
          </div>
          <div className="flex items-center gap-2">
            {!authorized && <small className="text-white/60">Admin: locked</small>}
            {authorized && <small className="text-white/60">Admin: unlocked</small>}
          </div>
        </div>

        {authorized && <AddBlogForm onAdd={addBlog} />}

        {blogs.length === 0 ? (
          <p className="text-white/70">No blogs yet — you can add one using the editor above.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map(b => (
              <article key={b.id} className="bg-white/10 p-5 rounded-xl">
                <h3 className="font-semibold text-xl">{b.title}</h3>
                <p className="text-xs text-white/60 mb-3">{b.date}</p>
                <div className="prose prose-invert max-w-none text-sm" style={{whiteSpace:'pre-wrap'}}>{b.content}</div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }

  // home page
  return (
    <div className="relative max-w-6xl mx-auto px-6 py-10 space-y-6">
      {/* top-left menu */}
      <button onClick={() => setShowMenu(!showMenu)} className="fixed top-4 left-4 z-50 text-2xl font-bold bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md">☰</button>
      {showMenu && (
        <div className="fixed top-14 left-4 bg-white/10 backdrop-blur-md rounded-xl p-3 space-y-2 z-40">
          <button className="block text-left w-full px-2 py-1 hover:bg-white/10 rounded" onClick={() => {setPage("home");setShowMenu(false);}}>🏠 Home</button>
          <button className="block text-left w-full px-2 py-1 hover:bg-white/10 rounded" onClick={() => {setPage("blogs");setShowMenu(false);}}>📝 Blogs</button>
          {!authorized && (
            <button className="block text-left w-full px-2 py-1 hover:bg-white/10 rounded" onClick={() => {
              const email = prompt("Enter your authorized email to unlock editor:");
              if (email === "dhruvisgood13@gmail.com") {
                setAuthorized(true);
                alert("Welcome Dhruv! Blog editor unlocked.");
              } else {
                alert("Access denied.");
              }
            }}>🔒 Admin Login</button>
          )}
          {authorized && (
            <button className="block text-left w-full px-2 py-1 hover:bg-white/10 rounded" onClick={() => { setAuthorized(false); alert("Admin locked."); }}>🔓 Logout Admin</button>
          )}
        </div>
      )}

      {/* header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-4">
          <img src="profile.jpg" alt="Dhruv Saxena" className="w-24 h-24 rounded-2xl border-2 border-white/20 object-cover" />
          <div>
            <h1 className="text-3xl font-bold">{PROFILE.name}</h1>
            <div className="text-white/70 text-sm">{PROFILE.title} • {PROFILE.location}</div>
            <div className="mt-2 text-white/60 text-sm italic">{PROFILE.miniSummary}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <a href="dhruv_cv.pdf" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20" target="_blank">Resume</a>
          <a href={PROFILE.researchgate} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20" target="_blank">ResearchGate</a>
        </div>
      </header>

      {/* main content */}
      <section className="grid md:grid-cols-3 gap-6">
        <aside className="space-y-4">
          {/* Summary & Stats */}
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Profile</h2>
            <p className="text-sm text-white/80">{PROFILE.summary}</p>
          </div>

          {/* Quick stats */}
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Quick Stats</h2>
            <div className="flex justify-between text-center">
              <div>
                <div className="text-2xl font-bold">{stats.papers}</div>
                <p className="text-xs">Papers</p>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.projects}</div>
                <p className="text-xs">Projects</p>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.awards}</div>
                <p className="text-xs">Awards</p>
              </div>
            </div>
          </div>

          {/* Skills with visual bars */}
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-3">Skills</h2>
            {PROFILE.skills.map(group => (
              <div key={group.group} className="mb-3">
                <div className="text-sm font-medium mb-2">{group.group}</div>
                <div className="space-y-2">
                  {group.items.map(it => (
                    <div key={it.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <div>{it.name}</div>
                        <div className="text-white/60">{it.pct}%</div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/6 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${it.pct}%`, background: 'linear-gradient(90deg,#fff,#aaf)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Languages with bars */}
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-3">Languages</h2>
            <div className="space-y-3">
              {PROFILE.languages.map(lang => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <div>{lang.name} <span className="text-white/60">({lang.prof})</span></div>
                    <div className="text-white/60">{lang.pct}%</div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/6 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${lang.pct}%`, background: 'linear-gradient(90deg,#fff,#aaf)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>

        <main className="md:col-span-2 space-y-4">
          {/* Projects & Research */}
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Projects & Research</h2>
            <div className="space-y-2 text-sm text-white/80">
              {PROFILE.projects.map(p => (
                <div key={p.title}>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-white/60 mb-1">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Education & Training</h2>
            <p className="text-sm text-white/80">{PROFILE.education.school}</p>
            <p className="text-xs text-white/60 mt-1">{PROFILE.education.notes}</p>
          </div>

          {/* Accomplishments */}
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Accomplishments</h2>
            <ul className="text-sm text-white/80 list-disc pl-5">
              {PROFILE.accomplishments.map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>

          {/* Contact & mini summary */}
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Contact</h2>
            <p className="text-sm text-white/80">{PROFILE.email} | {PROFILE.phone}</p>
            <div className="mt-3 text-sm text-white/70">{PROFILE.miniSummary}</div>
          </div>
        </main>
      </section>

      <footer className="text-center text-white/60 text-sm">© {new Date().getFullYear()} {PROFILE.name} • Built with React + Tailwind</footer>
    </div>
  );
}

// ---------- small sub-components ----------
function Stat({label,value}) {
  return (
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs">{label}</p>
    </div>
  );
}

function AddBlogForm({onAdd}) {
  const [title,setTitle]=React.useState("");
  const [content,setContent]=React.useState("");
  return (
    <div className="bg-white/10 p-4 rounded-xl mb-4">
      <h3 className="font-semibold mb-2">➕ Add New Blog</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-2 bg-white/10 rounded"/>
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" rows="6" className="w-full p-2 bg-white/10 rounded mb-2"></textarea>
      <div className="flex gap-2">
        <button onClick={()=>{ if(title&&content){onAdd(title,content); setTitle(""); setContent(""); alert('Blog saved locally.'); }}} className="px-3 py-2 bg-[var(--accent)] rounded-md">Save</button>
        <button onClick={()=>{ setTitle(''); setContent(''); }} className="px-3 py-2 bg-white/10 rounded-md">Clear</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
