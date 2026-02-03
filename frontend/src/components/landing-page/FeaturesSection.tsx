const FeaturesSection = () => {
    return (
        <main className="relative pt-24 pb-20">
            {/* Background Ambient Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[20%] left-[20%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]"></div>
                <div className="absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]"></div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        Version 2.0 Now Live
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        Next-Gen <br />
                        <span className="gradient-text bg-gradient-to-r from-primary via-purple-400 to-blue-400">Task Management</span>
                    </h1>
                    <p className="text-lg leading-8 text-gray-400">
                        Experience the future of productivity with our AI-driven features designed to streamline your workflow and adapt to your unique style.
                    </p>
                </div>
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Feature 1: AI Chatbot */}
                    <div className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(137,91,245,0.3)]">
                        {/* Gradient Border */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 opacity-100 transition-all duration-500 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-cyan-400 group-hover:opacity-100"></div>
                        {/* Card Content */}
                        <div className="relative h-full flex flex-col justify-between rounded-[23px] bg-[#151022] p-8 glass-card">
                            <div className="mb-6">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-pink-500 shadow-lg shadow-purple-500/20 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <span className="material-symbols-outlined text-3xl">smart_toy</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white transition-all">AI Chatbot</h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    Talk to your tasks. Our advanced NLP engine understands natural language and context for seamless interaction.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                    {/* Feature 2: Smart Reminders */}
                    <div className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(137,91,245,0.3)]">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 opacity-100 transition-all duration-500 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-cyan-400"></div>
                        <div className="relative h-full flex flex-col justify-between rounded-[23px] bg-[#151022] p-8 glass-card">
                            <div className="mb-6">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <span className="material-symbols-outlined text-3xl">notifications_active</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white transition-all">Smart Reminders</h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    Never miss a beat. Context-aware notifications exactly when you need them, based on location and priority.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-cyan-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                Explore reminders <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                    {/* Feature 3: Cloud Sync */}
                    <div className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(137,91,245,0.3)]">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 opacity-100 transition-all duration-500 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-cyan-400"></div>
                        <div className="relative h-full flex flex-col justify-between rounded-[23px] bg-[#151022] p-8 glass-card">
                            <div className="mb-6">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <span className="material-symbols-outlined text-3xl">cloud_sync</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white transition-all">Cloud Sync</h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    Always with you. Real-time synchronization across all your devices with end-to-end encryption.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                See how it works <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                    {/* Feature 4: Event-Driven */}
                    <div className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(137,91,245,0.3)]">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 opacity-100 transition-all duration-500 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-cyan-400"></div>
                        <div className="relative h-full flex flex-col justify-between rounded-[23px] bg-[#151022] p-8 glass-card">
                            <div className="mb-6">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <span className="material-symbols-outlined text-3xl">bolt</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white transition-all">Event-Driven</h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    Trigger based automations. Automatically create tasks based on calendar events, emails, or webhooks.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-orange-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                View integrations <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                    {/* Feature 5: Recurring Tasks */}
                    <div className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(137,91,245,0.3)]">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 opacity-100 transition-all duration-500 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-cyan-400"></div>
                        <div className="relative h-full flex flex-col justify-between rounded-[23px] bg-[#151022] p-8 glass-card">
                            <div className="mb-6">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <span className="material-symbols-outlined text-3xl">update</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white transition-all">Recurring Tasks</h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    Set and forget. Powerful logic for complex repeating schedules like &quot;Every last Friday of the month&quot;.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-indigo-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                Scheduling details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                    {/* Feature 6: Multi-Platform */}
                    <div className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(137,91,245,0.3)]">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 opacity-100 transition-all duration-500 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-cyan-400"></div>
                        <div className="relative h-full flex flex-col justify-between rounded-[23px] bg-[#151022] p-8 glass-card">
                            <div className="mb-6">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/20 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <span className="material-symbols-outlined text-3xl">devices</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white transition-all">Multi-Platform</h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    Everywhere you are. Native apps for Mac, Windows, iOS, and Android with seamless handoff.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-rose-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                Download apps <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FeaturesSection;