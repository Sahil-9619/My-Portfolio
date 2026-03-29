import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
    Menu,
    ArrowRight,
    Github,
    Linkedin,
    Twitter,
    Code2,
    Server,
    Database,
    Cuboid,
    LineChart,
    ShoppingCart,
    Bot
} from 'lucide-react';

export default function App() {
    const canvasRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle Navbar Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Three.js Background Setup
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.05);

        // 2. Camera Setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        // 3. Renderer Setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // A. Main Center Geometry (Abstract Wireframe Knot)
        const knotGeometry = new THREE.TorusKnotGeometry(1.8, 0.5, 128, 32);
        const knotMaterial = new THREE.MeshBasicMaterial({
            color: 0x4f46e5, // Tailwind indigo-600
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const mainKnot = new THREE.Mesh(knotGeometry, knotMaterial);
        scene.add(mainKnot);

        // B. Secondary Geometry (Outer floating rings)
        const ringGeometry = new THREE.IcosahedronGeometry(3.5, 1);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x818cf8, // Tailwind indigo-400
            wireframe: true,
            transparent: true,
            opacity: 0.05
        });
        const outerRing = new THREE.Mesh(ringGeometry, ringMaterial);
        scene.add(outerRing);

        // C. Particle System (Stars/Dust)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xc7d2fe, // Tailwind indigo-200
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Interaction & Animation
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        const onMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };
        document.addEventListener('mousemove', onMouseMove);

        const onResize = () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', onResize);

        const clock = new THREE.Clock();
        let animationFrameId;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Rotate Geometries
            mainKnot.rotation.y = 0.1 * elapsedTime;
            mainKnot.rotation.x = 0.05 * elapsedTime;

            outerRing.rotation.y = -0.05 * elapsedTime;
            outerRing.rotation.z = 0.02 * elapsedTime;

            // Rotate Particles
            particlesMesh.rotation.y = -0.02 * elapsedTime;
            particlesMesh.rotation.x = 0.01 * elapsedTime;

            // Mouse Parallax
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            camera.position.x += 0.05 * (targetX - camera.position.x);
            camera.position.y += 0.05 * (-targetY - camera.position.y);
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup on component unmount
        return () => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            knotGeometry.dispose();
            knotMaterial.dispose();
            ringGeometry.dispose();
            ringMaterial.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return (
        <div className="antialiased selection:bg-indigo-500 selection:text-white min-h-screen text-white font-sans">
            <style>{`
        body {
            background-color: #050505;
            margin: 0;
            overflow-x: hidden;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>

            {/* 3D Background Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none"
            />

            {/* Navigation */}
            <nav
                className={`fixed w-full z-50 transition-all duration-300 border-b border-white/5 backdrop-blur-md ${isScrolled ? 'bg-black/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-black/40'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" className="text-xl font-bold tracking-tighter">
                        SAHIL<span className="text-indigo-500">.</span>
                    </a>
                    <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                        <a href="#home" className="hover:text-white transition-colors">Home</a>
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <button className="md:hidden text-gray-300 hover:text-white">
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Main Content Wrapper */}
            <main className="relative z-10">

                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass-panel text-xs font-semibold tracking-wide text-indigo-300 uppercase">
                            Open to new opportunities
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Sahil Kumar</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            A passionate developer creating immersive digital experiences. I specialize in building scalable web applications with a focus on interactive design and modern technologies.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#projects" className="px-8 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]">
                                View My Work
                            </a>
                            <a href="#contact" className="px-8 py-3.5 rounded-lg glass-panel hover:bg-white/10 text-white font-medium transition-all">
                                Contact Me
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About <span className="text-indigo-500">Me</span></h2>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <h3 className="text-2xl font-semibold mb-4 text-white">My Journey</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Based in Patna, Bihar, I've spent years honing my craft in software development. I bridge the gap between complex backend logic and beautiful, user-centric frontend designs.
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    When I'm not writing code, I'm exploring new technologies, contributing to open-source, or experimenting with 3D web graphics to push the boundaries of what browsers can do.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass-panel rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center">
                                    <Code2 size={40} className="text-blue-400 mb-4" />
                                    <h4 className="font-medium text-gray-200">Frontend</h4>
                                </div>
                                <div className="glass-panel rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center">
                                    <Server size={40} className="text-green-500 mb-4" />
                                    <h4 className="font-medium text-gray-200">Backend</h4>
                                </div>
                                <div className="glass-panel rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center">
                                    <Database size={40} className="text-purple-400 mb-4" />
                                    <h4 className="font-medium text-gray-200">Database</h4>
                                </div>
                                <div className="glass-panel rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center">
                                    <Cuboid size={40} className="text-indigo-400 mb-4" />
                                    <h4 className="font-medium text-gray-200">3D Graphics</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-24 px-6 bg-black/20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Featured <span className="text-indigo-500">Projects</span></h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Project 1 */}
                            <div className="glass-panel rounded-2xl overflow-hidden group">
                                <div className="h-48 bg-gray-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <LineChart size={56} className="text-indigo-400/50" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex gap-2 mb-3">
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">React</span>
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/5 text-gray-300">Three.js</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">Data Visualizer 3D</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">An interactive web application that transforms complex datasets into beautiful, comprehensible 3D models running directly in the browser.</p>
                                    <a href="#" className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300">
                                        View Project <ArrowRight size={16} className="ml-2" />
                                    </a>
                                </div>
                            </div>

                            {/* Project 2 */}
                            <div className="glass-panel rounded-2xl overflow-hidden group">
                                <div className="h-48 bg-gray-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <ShoppingCart size={56} className="text-teal-400/50" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex gap-2 mb-3">
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">Next.js</span>
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/5 text-gray-300">Stripe</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">E-Commerce Platform</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">A fully responsive, high-performance e-commerce storefront with seamless checkout, real-time inventory, and an integrated CMS.</p>
                                    <a href="#" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300">
                                        View Project <ArrowRight size={16} className="ml-2" />
                                    </a>
                                </div>
                            </div>

                            {/* Project 3 */}
                            <div className="glass-panel rounded-2xl overflow-hidden group">
                                <div className="h-48 bg-gray-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <Bot size={56} className="text-purple-400/50" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex gap-2 mb-3">
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-purple-500/20 text-purple-300">Python</span>
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/5 text-gray-300">OpenAI</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">AI Assistant Dashboard</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">A comprehensive dashboard that interfaces with advanced LLMs to automate workflows, summarize documents, and generate content.</p>
                                    <a href="#" className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300">
                                        View Project <ArrowRight size={16} className="ml-2" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-24 px-6 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work <span className="text-indigo-500">Together</span></h2>
                        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                            Currently open for new opportunities and freelance projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="glass-panel p-8 md:p-12 rounded-2xl max-w-2xl mx-auto text-left">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" placeholder="Tell me about your project..."></textarea>
                                </div>
                                <button type="button" className="w-full py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-500/25">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
                    <div className="flex justify-center space-x-6 mb-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Sahil Kumar. All rights reserved.</p>
                </footer>

            </main>
        </div>
    );
}