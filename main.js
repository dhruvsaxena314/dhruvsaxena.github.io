const ACC_DARK = '#334443';
const ACC = '#016B61';

// ---------- utility local storage helpers ----------
function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
}
function saveBlogs(blogs) {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

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

  if (!opened)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl mb-4 font-semibold">Dhruv Saxena</h1>
        <div className="w-80 bg-white/20 rounded-full overflow-hidden mb-2">
          <div className="h-3 bg-white transition-all duration-300" style={{ width: `${loadedPct}%` }}></div>
        </div>
        <p className="text-sm text-white/70">{loadedPct}% Loading Portfolio...</p>
      </div>
    );

  // ---------- blog functions ----------
  function addBlog(title, content) {
    const newBlog = { id: Date.now(), title, content, date: new Date().toLocaleDateString() };
    const newBlogs = [newBlog, ...blogs];
    setBlogs(newBlogs);
    saveBlogs(newBlogs);
  }

  // ---------- render pages ----------
  if (page === "blogs") {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <button className="px-3 py-1 rounded bg-white/10 hover:bg-white/20" onClick={() => setPage("home")}>← Back</button>
        <h1 className="text-3xl font-bold mt-2">📝 Blogs</h1>

        {authorized && (
          <AddBlogForm onAdd={addBlog} />
        )}

        {blogs.length === 0 ? (
          <p className="text-white/70">No blogs yet.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map(b => (
              <div key={b.id} className="bg-white/10 p-4 rounded-xl">
                <h3 className="font-semibold text-xl">{b.title}</h3>
                <p className="text-xs text-white/60 mb-2">{b.date}</p>
                <p className="text-white/80 text-sm whitespace-pre-wrap">{b.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---------- main home page ----------
  return (
    <div className="relative max-w-6xl mx-auto px-6 py-10 space-y-6">
      {/* top left menu */}
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
        </div>
      )}

      {/* header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-4">
          <img src="profile.jpg" alt="Dhruv Saxena" className="w-24 h-24 rounded-2xl border-2 border-white/20 object-cover" />
          <div>
            <h1 className="text-3xl font-bold">Dhruv Saxena</h1>
            <p className="text-white/70 text-sm">AI & ML Researcher | ImagoPedia | Varanasi</p>
            <p className="text-white/60 text-xs mt-1 italic">Building intelligent systems that connect ideas to impact.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <a href="dhruv_cv.pdf" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20" target="_blank">Resume</a>
          <a href="https://www.researchgate.net/profile/Dhruv-Saxena-11" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20" target="_blank">ResearchGate</a>
        </div>
      </header>

      {/* content */}
      <section className="grid md:grid-cols-3 gap-6">
        <aside className="space-y-4">
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Quick Stats</h2>
            <div className="flex justify-between text-center">
              <Stat label="Papers" value={stats.papers}/>
              <Stat label="Projects" value={stats.projects}/>
              <Stat label="Awards" value={stats.awards}/>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Skills</h2>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• Python, PyTorch, Pandas</li>
              <li>• NLP, CV, ML</li>
              <li>• Research Writing</li>
            </ul>
          </div>
        </aside>

        <main className="md:col-span-2 space-y-4">
          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Projects & Research</h2>
            <p className="text-sm text-white/80">
              • ImagoPedia — Visual AI tool for concept mapping <br/>
              • Text Summarization NLP model for multilingual datasets <br/>
              • Research on Low-resource language translation <br/>
              • AI Ethics paper on Model Bias Detection
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Contact Me</h2>
            <p className="text-sm text-white/80 mb-2">dhruvisgood13@gmail.com | +91 7080880393</p>
            <form onSubmit={(e)=>{e.preventDefault();alert('Form sent (dummy demo).');}} className="grid gap-3">
              <input name="name" placeholder="Your Name" className="p-2 bg-white/10 rounded-md"/>
              <input name="email" placeholder="Your Email" className="p-2 bg-white/10 rounded-md"/>
              <textarea name="message" placeholder="Message" className="p-2 bg-white/10 rounded-md"></textarea>
              <button type="submit" className="px-4 py-2 bg-[var(--accent)] rounded-md text-white">Send</button>
            </form>
          </div>
        </main>
      </section>
      <footer className="text-center text-white/60 text-sm">© {new Date().getFullYear()} Dhruv Saxena • Built with React + Tailwind</footer>
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
    <div className="bg-white/10 p-4 rounded-xl">
      <h3 className="font-semibold mb-2">➕ Add New Blog</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-2 bg-white/10 rounded"/>
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" rows="5" className="w-full p-2 bg-white/10 rounded mb-2"></textarea>
      <button onClick={()=>{ if(title&&content){onAdd(title,content);setTitle("");setContent("");}}} className="px-3 py-2 bg-[var(--accent)] rounded-md">Save</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

