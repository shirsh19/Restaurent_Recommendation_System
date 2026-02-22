import { Github, Linkedin, Mail, Info, Terminal, Layout } from 'lucide-react';

const Contact = () => {
    const socials = [
        {
            name: 'GitHub',
            icon: <Github className="w-6 h-6" />,
            value: 'Project Repository',
            link: 'https://github.com',
            color: 'hover:text-white hover:bg-zinc-800'
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin className="w-6 h-6" />,
            value: 'Professional Profile',
            link: 'https://linkedin.com',
            color: 'hover:text-blue-500 hover:bg-blue-500/10'
        },
        {
            name: 'Email',
            icon: <Mail className="w-6 h-6" />,
            value: 'shirsh@example.com',
            link: 'mailto:shirsh@example.com',
            color: 'hover:text-orange-500 hover:bg-orange-500/10'
        },
    ];

    const techStack = [
        { name: 'FastAPI', type: 'Backend', icon: <Terminal className="w-5 h-5 text-green-500" /> },
        { name: 'React (Vite)', type: 'Frontend', icon: <Layout className="w-5 h-5 text-blue-400" /> },
        { name: 'Tailwind CSS', type: 'Styling', icon: <div className="text-cyan-400 font-bold">T</div> },
        { name: 'Axios', type: 'API Client', icon: <Terminal className="w-5 h-5 text-zinc-400" /> },
    ];

    return (
        <div className="min-h-screen py-20 px-4 bg-zinc-950">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-7xl font-black mb-6 food-gradient-text tracking-tight uppercase">Get In Touch</h1>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Discover the technology and the developer behind the GourmetAI Recommendation System.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="glass-dark p-8 rounded-[2rem] border border-zinc-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                                <Info className="w-6 h-6 text-orange-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">About Project</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            GourmetAI is an advanced restaurant recommendation engine that leverages machine learning and real-time district data to curate perfect dining experiences.
                        </p>
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase text-zinc-600 tracking-widest pl-1">Tech Stack</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {techStack.map((tech, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                                        {tech.icon}
                                        <div>
                                            <p className="text-xs text-zinc-500 font-medium">{tech.type}</p>
                                            <p className="text-sm text-white font-bold">{tech.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {socials.map((social, i) => (
                            <a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-between p-6 rounded-[2rem] border border-zinc-800 bg-zinc-900/30 transition-all duration-300 group ${social.color}`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-zinc-800 rounded-2xl group-hover:scale-110 transition-transform">
                                        {social.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{social.name}</h3>
                                        <p className="text-zinc-500 text-sm">{social.value}</p>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all">
                                    <Github className="w-4 h-4" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="glass-dark p-12 rounded-[3rem] border border-zinc-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500" />
                    <h2 className="text-3xl font-bold text-white mb-4">Want to collaborate?</h2>
                    <p className="text-zinc-400 mb-8 max-w-md mx-auto">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
                    <a href="mailto:shirsh@example.com" className="inline-flex items-center gap-3 px-8 py-4 rounded-full food-gradient text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(255,95,31,0.5)] transition-all">
                        Drop an Email
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
