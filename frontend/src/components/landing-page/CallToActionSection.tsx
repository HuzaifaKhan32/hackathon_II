import Link from 'next/link';

const CallToActionSection = () => {
    return (
        <section className="relative overflow-hidden py-24">
            {/* Decorative bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark z-0"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-purple-900/50 via-background-dark to-purple-900/50 px-6 py-24 text-center shadow-2xl ring-1 ring-white/10 sm:px-16">
                    {/* Inner glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/30 blur-[100px] rounded-full"></div>
                    <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Ready to organize your life?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                        Join thousands of users who have switched to the future of task management. Start your free trial today.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button className="relative flex h-12 min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-primary/50">
                            <span className="relative z-10">Start Free Trial</span>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-purple-400 to-primary opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                        </button>
                        <Link className="text-sm font-semibold leading-6 text-white transition-colors hover:text-primary" href="#">Learn more <span aria-hidden="true">→</span></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
