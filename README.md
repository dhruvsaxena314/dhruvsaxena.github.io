# dhruvsaxena.github.io
// ==== FILE: package.json ==== 
{
  "name": "dhruv-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^9.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.5.4",
    "vite": "^5.0.0"
  }
}

// ==== FILE: index.html ==== 
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dhruv Saxena — Portfolio</title>
  </head>
  <body class="bg-[#0b0f12] text-slate-200">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

// ==== FILE: postcss.config.cjs ==== 
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}

// ==== FILE: tailwind.config.cjs ==== 
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: '#00ff7a' // neon green accent to match reference
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg,#071018 0%, #061216 40%, #041114 100%)'
      }
    }
  },
  plugins: []
}

// ==== FILE: src/main.jsx ==== 
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// ==== FILE: src/styles.css ==== 
@tailwind base;
@tailwind components;
@tailwind utilities;

:root{
  --accent: #00ff7a;
}

html,body,#root{height:100%;}

/* Small tweaks to resemble reference */
.hero-bg{
  background: radial-gradient(ellipse at top left, rgba(0,255,122,0.06), transparent 20%), radial-gradient(ellipse at bottom right, rgba(0,255,122,0.03), transparent 12%), linear-gradient(180deg,#071018 0%, #041114 100%);
}

.avatar-shadow{box-shadow: 0 10px 30px rgba(0,255,122,0.07);} 

// ==== FILE: src/App.jsx ==== 
import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Admin from './components/Admin'

export default function App(){
  return (
    <div className="min-h-screen hero-bg text-slate-200 antialiased">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/skills" element={<Skills/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function Header(){
  return (
    <header className="py-6 px-6 md:px-12 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff7a] to-transparent p-[3px]">
          <div className="w-full h-full rounded-full bg-[#041114] flex items-center justify-center text-[10px]">DS</div>
        </div>
        <span className="font-semibold text-accent">Dhruv Saxena</span>
      </Link>
      <nav className="space-x-6 hidden md:flex items-center">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/skills">Skills</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <Link to="/admin" className="text-sm px-3 py-1 border rounded border-slate-700">Admin</Link>
      </nav>
    </header>
  )
}

function NavLink({to, children}){
  return (
    <Link to={to} className="text-sm hover:text-accent transition-colors">{children}</Link>
  )
}

function Footer(){
  return (
    <footer className="mt-20 py-6 text-center text-sm text-slate-400">
      © {new Date().getFullYear()} Dhruv Saxena. Designed with ❤️ • <a href="https://github.com/" className="text-accent">GitHub</a>
    </footer>
  )
}

// ==== FILE: src/components/Home.jsx ==== 
import React from 'react'
import { motion } from 'framer-motion'

export default function Home(){
  return (
    <section id="home" className="pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1 initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.1}} className="text-5xl md:text-7xl font-extrabold leading-tight text-accent">Dhruv Saxena</motion.h1>
          <motion.p initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.3}} className="mt-4 text-lg md:text-xl max-w-xl text-slate-300">I build clean, minimal frontend experiences — React, Tailwind, animations, and delightful micro-interactions. Currently exploring gesture interfaces and creative web UIs.</motion.p>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="mt-6 flex gap-4">
            <a href="/projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-700 hover:bg-[#06221a]">View projects</a>
            <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-black font-medium">Hire me</a>
          </motion.div>
        </div>
        <div className="flex justify-center md:justify-end">
          <motion.img src="/src/assets/profile.jpg" alt="Dhruv" initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.6}} className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover avatar-shadow border border-slate-800"/>
        </div>
      </div>
    </section>
  )
}

// ==== FILE: src/components/About.jsx ==== 
import React from 'react'
import { motion } from 'framer-motion'

export default function About(){
  return (
    <section id="about" className="pt-16">
      <motion.h2 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-3xl font-bold text-accent">About</motion.h2>
      <div className="mt-6 grid md:grid-cols-3 gap-8 items-center">
        <div className="col-span-1 flex justify-center md:justify-start">
          <img src="/src/assets/profile.jpg" alt="profile" className="w-44 h-44 rounded-full object-cover avatar-shadow border border-slate-800" />
        </div>
        <div className="md:col-span-2 text-slate-300">
          <p className="leading-relaxed">I'm Dhruv — a frontend engineer who loves minimal design, subtle motion, and building interfaces that feel alive. I work on projects using React, Tailwind CSS, and Framer Motion. I also experiment with computer vision for gesture-based input and like sharing learnings via short blog posts.</p>
          <p className="mt-4">Short summary from resume: Experienced in building responsive web apps, optimizing accessibility, and shipping polished UIs. Comfortable with tooling like Vite, Git, and CI workflows.</p>
        </div>
      </div>
    </section>
  )
}

// ==== FILE: src/components/Skills.jsx ==== 
import React from 'react'
import { motion } from 'framer-motion'

const skills = [
  {title:'Frontend', items:['React','Tailwind','HTML','CSS']},
  {title:'Tools', items:['Vite','Git','CI/CD']},
  {title:'Other', items:['Framer Motion','Accessibility','Design Systems']}
]

export default function Skills(){
  return (
    <section id="skills" className="pt-16">
      <motion.h2 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-3xl font-bold text-accent">Skills & Experience</motion.h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {skills.map((s, idx)=> (
          <motion.div whileHover={{y:-6}} key={s.title} className="p-6 rounded-2xl bg-[#041114] border border-slate-800">
            <h3 className="text-lg font-semibold text-accent">{s.title}</h3>
            <ul className="mt-3 text-slate-300 space-y-2">
              {s.items.map(it=> <li key={it} className="text-sm">{it}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <h4 className="text-xl font-semibold text-accent">Experience</h4>
        <div className="mt-4 space-y-4">
          <ExperienceCard role="Frontend Developer" period="2023 - Present" company="Freelance & Projects"/>
          <ExperienceCard role="Intern — UI Engineer" period="2022" company="Project Org"/>
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({role, period, company}){
  return (
    <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="p-4 border-l-2 border-accent bg-[#041114] rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-slate-300 font-medium">{role}</div>
          <div className="text-sm text-slate-500">{company}</div>
        </div>
        <div className="text-sm text-slate-400">{period}</div>
      </div>
    </motion.div>
  )
}

// ==== FILE: src/components/Projects.jsx ==== 
import React, {useEffect,useState} from 'react'
import { motion } from 'framer-motion'

export default function Projects(){
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('projects') || 'null')
    if(stored) setProjects(stored)
    else {
      const sample = [
        {id:1,title:'PacMan Finger Controller',desc:'Gesture based game controller using CV.',img:'/src/assets/project1.jpg',tags:['cv','react']},
        {id:2,title:'Portfolio Site Clone',desc:'Design-forward minimal portfolio.',img:'/src/assets/project2.jpg',tags:['design','react']}
      ]
      setProjects(sample)
      localStorage.setItem('projects', JSON.stringify(sample))
    }
  },[])

  return (
    <section id="projects" className="pt-16">
      <h2 className="text-3xl font-bold text-accent">Projects</h2>
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map(p=> (
          <motion.a key={p.id} whileHover={{scale:1.02}} className="block group bg-[#041114] border border-slate-800 rounded-2xl overflow-hidden" href="#">
            <div className="relative h-40">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-4">
              <h3 className="text-accent font-semibold">{p.title}</h3>
              <p className="text-sm text-slate-300 mt-2">{p.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

// ==== FILE: src/components/Contact.jsx ==== 
import React from 'react'

export default function Contact(){
  return (
    <section id="contact" className="pt-16">
      <h2 className="text-3xl font-bold text-accent">Contact</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <div className="bg-[#041114] p-6 rounded-2xl border border-slate-800">
          <form action="https://formspree.io/f/xzzkvjjk" method="POST" className="space-y-4">
            <label className="block">
              <input required name="name" placeholder="Your name" className="w-full bg-transparent border border-slate-700 rounded-md p-3" />
            </label>
            <label className="block">
              <input required name="email" placeholder="your@domain.com" className="w-full bg-transparent border border-slate-700 rounded-md p-3" />
            </label>
            <label className="block">
              <textarea required name="message" placeholder="Message" className="w-full bg-transparent border border-slate-700 rounded-md p-3 h-32"></textarea>
            </label>
            <button type="submit" className="px-4 py-2 bg-accent text-black rounded-md">Send</button>
          </form>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="text-slate-300">Or reach out on:</div>
          <div className="flex gap-4">
            <a href="https://linkedin.com/" aria-label="linkedin" className="w-10 h-10 rounded-md flex items-center justify-center bg-[#071718] border border-slate-800">in</a>
            <a href="https://github.com/" aria-label="github" className="w-10 h-10 rounded-md flex items-center justify-center bg-[#071718] border border-slate-800">gh</a>
            <a href="mailto:dhruvisgood13@gmail.com" aria-label="email" className="w-10 h-10 rounded-md flex items-center justify-center bg-[#071718] border border-slate-800">@</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==== FILE: src/components/Admin.jsx ==== 
import React, {useState, useEffect} from 'react'

// Simple client-side admin. WARNING: This is a demo (no secure backend).
// Admin email must be dhruvisgood13@gmail.com — this check is performed client-side.

export default function Admin(){
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [imgFile, setImgFile] = useState(null)

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('projects')||'null')
    if(stored) setProjects(stored)
  },[])

  function login(e){
    e.preventDefault()
    if(email.trim().toLowerCase() !== 'dhruvisgood13@gmail.com'){
      alert('Access denied — use the admin email.')
      return
    }
    // password is only checked client-side if set; accept any for demo
    setUser({email})
    localStorage.setItem('admin', JSON.stringify({email}))
  }

  function logout(){
    setUser(null)
    localStorage.removeItem('admin')
  }

  function handleImageUpload(e){
    const f = e.target.files[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = () => setImgFile(reader.result)
    reader.readAsDataURL(f)
  }

  function addProject(e){
    e.preventDefault()
    const p = {id:Date.now(), title, desc, img: imgFile || '/src/assets/project-placeholder.jpg'}
    const updated = [p, ...projects]
    setProjects(updated)
    localStorage.setItem('projects', JSON.stringify(updated))
    setTitle(''); setDesc(''); setImgFile(null)
    alert('Project added (client-side).')
  }

  return (
    <section className="pt-16">
      <h2 className="text-3xl font-bold text-accent">Admin</h2>
      {!user ? (
        <form onSubmit={login} className="mt-6 max-w-md bg-[#041114] p-6 rounded-2xl border border-slate-800">
          <label className="block mb-3">
            <div className="text-sm text-slate-400">Admin email</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} required className="w-full p-3 bg-transparent border border-slate-700 rounded-md" />
          </label>
          <label className="block mb-3">
            <div className="text-sm text-slate-400">Password (demo)</div>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full p-3 bg-transparent border border-slate-700 rounded-md" />
          </label>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-accent text-black rounded-md">Login</button>
            <button type="button" onClick={()=>{setEmail('dhruvisgood13@gmail.com'); setPassword('demo')}} className="px-4 py-2 border rounded-md">Fill demo</button>
          </div>
          <p className="mt-3 text-sm text-slate-500">Note: This admin is client-side only. For production, wire to a secure backend or use GitHub-backed CMS.</p>
        </form>
      ):(
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>Signed in as <strong>{user.email}</strong></div>
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          </div>

          <form onSubmit={addProject} className="bg-[#041114] p-6 rounded-2xl border border-slate-800 max-w-xl">
            <h3 className="text-lg font-semibold text-accent">Add Project</h3>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-3 mt-3 bg-transparent border border-slate-700 rounded-md" />
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description" className="w-full p-3 mt-3 bg-transparent border border-slate-700 rounded-md"></textarea>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-3" />
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-accent text-black rounded">Add</button>
            </div>
          </form>

          <div>
            <h4 className="text-accent font-semibold">Existing projects (client-side)</h4>
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              {projects.map(p=> (
                <div key={p.id} className="p-3 bg-[#041114] rounded-md border border-slate-800">
                  <div className="text-sm font-semibold text-slate-200">{p.title}</div>
                  <div className="text-xs text-slate-400">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ==== FILE: src/assets/README ==== 
// Placeholders: add your own images here.
// - src/assets/profile.jpg  (profile photo)
// - src/assets/project1.jpg
// - src/assets/project2.jpg
// - src/assets/project-placeholder.jpg

// ==== END OF FILES ==== 
