// frontend/src/components/landing-page/LandingPageFeatures.tsx
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  linkText: string;
  iconGradientFrom: string;
  iconGradientTo: string;
  shadowColor: string;
  textColorClass: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  linkText,
  iconGradientFrom,
  iconGradientTo,
  shadowColor,
  textColorClass,
}) => (
  <div className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(137,91,245,0.3)] light:hover:shadow-[0_10px_40px_-10px_rgba(137,91,245,0.2)]">
    {/* Gradient Border */}
    <div className="absolute inset-0 rounded-3xl opacity-100 transition-all duration-500
                    bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800
                    group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-cyan-400
                    light:from-purple-400 light:via-pink-400 light:to-purple-600"></div>
    {/* Card Content */}
    <div className="relative h-full flex flex-col justify-between rounded-[23px] p-8 glass-card
                    bg-[#151022]
                    light:bg-white/60">
      <div className="mb-6">
        <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
                         ${iconGradientFrom} ${iconGradientTo} ${shadowColor}`}>
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 transition-all
                       text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white
                       light:text-slate-900 light:group-hover:from-primary light:group-hover:to-blue-600 light:group-hover:bg-clip-text light:group-hover:text-transparent">
          {title}
        </h3>
        <p className="leading-relaxed transition-colors
                      text-gray-400 group-hover:text-gray-300
                      light:text-slate-600 light:group-hover:text-slate-900">
          {description}
        </p>
      </div>
      <div className={`flex items-center gap-2 text-sm font-medium opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${textColorClass}`}>
        {linkText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </div>
    </div>
  </div>
);


const LandingPageFeatures: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] left-[20%] h-[500px] w-[500px] rounded-full blur-[100px]
                        bg-primary/20
                        light:bg-purple-300/30 light:mix-blend-multiply"></div>
        <div className="absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full blur-[120px]
                        bg-blue-600/10
                        light:bg-blue-200/40 light:mix-blend-multiply"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm mb-6
                          border-white/10 bg-white/5 text-primary
                          light:border-slate-200 light:bg-white light:shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Version 2.0 Now Live
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6
                         text-white
                         light:text-slate-900">
            Next-Gen <br />
            <span className="gradient-text bg-clip-text text-transparent
                             bg-gradient-to-r from-primary via-purple-400 to-blue-400
                             light:via-purple-600 light:to-blue-600">Task Management</span>
          </h1>
          <p className="text-lg leading-8
                        text-gray-400
                        light:text-slate-600">
            Experience the future of productivity with our AI-driven features designed to streamline your workflow and adapt to your unique style.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard
            icon="smart_toy"
            title="AI Chatbot"
            description="Talk to your tasks. Our advanced NLP engine understands natural language and context for seamless interaction."
            linkText="Learn more"
            iconGradientFrom="from-primary"
            iconGradientTo="to-pink-500"
            shadowColor="shadow-purple-500/20 light:shadow-purple-500/30"
            textColorClass="text-primary"
          />
          <FeatureCard
            icon="notifications_active"
            title="Smart Reminders"
            description="Never miss a beat. Context-aware notifications exactly when you need them, based on location and priority."
            linkText="Explore reminders"
            iconGradientFrom="from-blue-500"
            iconGradientTo="to-cyan-400"
            shadowColor="shadow-blue-500/20 light:shadow-blue-500/30"
            textColorClass="text-cyan-400 light:text-blue-600"
          />
          <FeatureCard
            icon="cloud_sync"
            title="Cloud Sync"
            description="Always with you. Real-time synchronization across all your devices with end-to-end encryption."
            linkText="See how it works"
            iconGradientFrom="from-emerald-500"
            iconGradientTo="to-teal-400"
            shadowColor="shadow-emerald-500/20 light:shadow-emerald-500/30"
            textColorClass="text-emerald-400 light:text-emerald-600"
          />
          <FeatureCard
            icon="bolt"
            title="Event-Driven"
            description="Trigger based automations. Automatically create tasks based on calendar events, emails, or webhooks."
            linkText="View integrations"
            iconGradientFrom="from-orange-500"
            iconGradientTo="to-amber-500"
            shadowColor="shadow-orange-500/20 light:shadow-orange-500/30"
            textColorClass="text-orange-400 light:text-orange-600"
          />
          <FeatureCard
            icon="update"
            title="Recurring Tasks"
            description="Set and forget. Powerful logic for complex repeating schedules like 'Every last Friday of the month'."
            linkText="Scheduling details"
            iconGradientFrom="from-indigo-500"
            iconGradientTo="to-violet-500"
            shadowColor="shadow-indigo-500/20 light:shadow-indigo-500/30"
            textColorClass="text-indigo-400 light:text-indigo-600"
          />
          <FeatureCard
            icon="devices"
            title="Multi-Platform"
            description="Everywhere you are. Native apps for Mac, Windows, iOS, and Android with seamless handoff."
            linkText="Download apps"
            iconGradientFrom="from-pink-500"
            iconGradientTo="to-rose-500"
            shadowColor="shadow-pink-500/20 light:shadow-pink-500/30"
            textColorClass="text-rose-400 light:text-rose-600"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPageFeatures;