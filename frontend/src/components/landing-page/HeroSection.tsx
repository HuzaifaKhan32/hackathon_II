import Image from 'next/image';

const HeroSection = () => {
    return (
        <main className="flex-grow flex items-center justify-center relative px-6 py-12 lg:py-0">
            <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10">
                    {/* Meta Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 shadow-lg shadow-primary/5 hover:shadow-primary/20 transition-all cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium tracking-wide text-gray-300 uppercase">v2.0 AI Engine Live</span>
                    </div>
                    {/* Headings */}
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                            <span className="block text-white">Evolution of</span>
                            <span className="block gradient-text-heading pb-2">Todo Management</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-[600px] lg:max-w-none leading-relaxed">
                            AI-Powered task management that never sleeps. Experience the future of productivity with a chatbot that anticipates your needs before you do.
                        </p>
                    </div>
                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                        <button className="group relative flex items-center justify-center gap-2 h-14 px-8 rounded-full gradient-button-primary text-white font-bold text-base shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                            <span>Get Started</span>
                            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 h-14 px-8 rounded-full glass-button-secondary text-cyan-50 font-bold text-base transition-all duration-300 w-full sm:w-auto hover:-translate-y-1">
                            <span className="material-symbols-outlined text-cyan-400">play_circle</span>
                            <span>Watch Demo</span>
                        </button>
                    </div>
                    {/* Trust Elements / Social Proof */}
                    <div className="pt-8 flex flex-col gap-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Trusted by teams at</p>
                        <div className="flex items-center gap-6 opacity-40 grayscale">
                            {/* Simple CSS shapes/text to represent logos without images */}
                            <span className="text-lg font-bold font-sans tracking-tight">ACME</span>
                            <span className="text-lg font-black font-serif italic">Globex</span>
                            <div className="flex items-center gap-1"><div className="size-4 rounded-full bg-white"></div><span className="font-bold">Soylent</span></div>
                        </div>
                    </div>
                </div>
                {/* Right Visual */}
                <div className="relative flex justify-center lg:justify-end items-center h-[500px] lg:h-[700px] w-full perspective-1000">
                    {/* Abstract Background Behind Image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-cyan-500/20 rounded-full filter blur-[80px] animate-pulse-slow"></div>
                    {/* Main 3D Floating Illustration */}
                    <div className="relative w-full max-w-[500px] aspect-square animate-float z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-3xl backdrop-blur-sm border border-white/20 transform rotate-6 shadow-2xl"></div>
                        <div className="absolute inset-0 bg-[#131118]/80 rounded-3xl transform -rotate-3 border border-white/10 overflow-hidden shadow-2xl flex flex-col">
                            {/* Fake Chat UI inside the 3D card */}
                            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
                                <div className="size-3 rounded-full bg-red-500"></div>
                                <div className="size-3 rounded-full bg-yellow-500"></div>
                                <div className="size-3 rounded-full bg-green-500"></div>
                                <div className="ml-auto text-xs text-gray-400">AI Assistant</div>
                            </div>
                            <div className="p-6 space-y-4 flex-1 overflow-hidden relative">
                                {/* Chat Bubbles */}
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-purple-800 flex-shrink-0"></div>
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-sm text-gray-200 max-w-[80%]">
                                        Analyzing your schedule for next week...
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-purple-800 flex-shrink-0 animate-pulse"></div>
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-sm text-gray-200 max-w-[80%]">
                                        I found 3 conflicts. Should I reschedule your &quot;Product Sync&quot;?
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-end mt-4">
                                    <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%] shadow-lg shadow-primary/20">
                                        Yes, move it to Friday afternoon.
                                    </div>
                                </div>
                                {/* Floating 3D Elements over UI */}
                                <Image
                                    className="absolute -bottom-10 -right-10 w-48 h-48 object-cover rounded-full border-4 border-[#151022] shadow-2xl animate-float-delayed"
                                    data-alt="Abstract 3D glass shape representing AI processing"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw_N8W2SeFkrUT2k72dfO1KtjwszYGFEZ4IRIonCYMly-dxeSecu1BSqma7FH9rsdqlI24_VOec0QqcMK8bX9Irp-m8q2WB_hzXlOS-PByQeybiFrDRPMMo7i7sgGprNrkTItojp99xBdqxmMXwLMdIftK-BCtR-s0ZFim1Lg7tXgeK2VUvU7ef52QZduQaLKp8spfkKvYkz-rpI0YZx8uIkyf7AdTk0PLrmet1E64BwMciRQ7MgI0xovZwXlRtT1cjjFO5R9HJlMl"
                                    alt="Abstract 3D glass shape representing AI processing"
                                    width={192} // 48 * 4 (tailwind w-48 is 192px)
                                    height={192} // 48 * 4
                                />
                            </div>
                        </div>
                    </div>
                    {/* Decorative Floating Elements */}
                    <div className="absolute top-[10%] left-[10%] p-3 glass-panel rounded-2xl animate-float-delayed flex items-center gap-2 shadow-xl">
                        <span className="material-symbols-outlined text-green-400">check_circle</span>
                        <span className="text-sm font-bold">Task Complete</span>
                    </div>
                    <div className="absolute bottom-[20%] right-[-5%] lg:right-[10%] p-3 glass-panel rounded-2xl animate-float flex items-center gap-2 shadow-xl z-20">
                        <span className="material-symbols-outlined text-yellow-400">bolt</span>
                        <span className="text-sm font-bold">Efficiency +240%</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HeroSection;