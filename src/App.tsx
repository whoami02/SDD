import React, { useState, useEffect } from 'react';
import { curriculum } from './data';
import { DayPlan } from './types';
import { cn } from './lib/utils';
import { CheckCircle2, Circle, Clock, Layout, Bell, ChevronRight, Menu, X, Check, ExternalLink, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showReminders, setShowReminders] = useState(false);
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('system-design-progress');
    if (saved) {
      try {
        setCompletedTopics(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    const newProgress = {
      ...completedTopics,
      [topicId]: !completedTopics[topicId]
    };
    setCompletedTopics(newProgress);
    localStorage.setItem('system-design-progress', JSON.stringify(newProgress));
  };

  const togglePhase = (phaseId: string) => {
    setCollapsedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const getDayPlan = (dayNumber: number): DayPlan | undefined => {
    for (const phase of curriculum) {
      const day = phase.days.find(d => d.dayNumber === dayNumber);
      if (day) return day;
    }
    return undefined;
  };

  const currentDayPlan = getDayPlan(selectedDay);

  const calculateProgress = () => {
    let total = 0;
    let completed = 0;
    curriculum.forEach(p => {
      p.days.forEach(d => {
        d.topics.forEach(t => {
          total++;
          if (completedTopics[t.id]) completed++;
        });
      });
    });
    return Math.round((completed / total) * 100) || 0;
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0 md:ml-0" : "-translate-x-full md:-ml-72"
        )}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center">
              <Layout size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight uppercase text-indigo-950 leading-none">System Design</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Daily Grind</p>
            </div>
          </div>
          <button className="md:hidden text-slate-400 hover:text-slate-900" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Progress</span>
            <span className="text-xs font-bold text-indigo-600">{calculateProgress()}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
          {curriculum.map((phase) => (
            <div key={phase.id} className="space-y-2">
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center justify-between text-left focus:outline-none group"
              >
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest pl-2 group-hover:text-slate-600 transition-colors">
                  {phase.title.split(':')[0]}
                </h3>
                <ChevronDown 
                  size={14} 
                  className={cn(
                    "text-slate-400 transition-transform duration-200", 
                    collapsedPhases[phase.id] ? "-rotate-90" : ""
                  )} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {!collapsedPhases[phase.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1.5 pt-1">
                      {phase.days.map((day) => {
                        const isSelected = selectedDay === day.dayNumber;
                        const allCompleted = day.topics.every(t => completedTopics[t.id]);
                        
                        return (
                          <button
                            key={day.dayNumber}
                            onClick={() => {
                              setSelectedDay(day.dayNumber);
                              if (window.innerWidth < 768) setIsSidebarOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-all group",
                              isSelected 
                                ? "bg-indigo-50 text-indigo-700 font-bold" 
                                : "hover:bg-slate-50 text-slate-500 hover:text-slate-900"
                            )}
                          >
                            <div className={cn(
                              "flex items-center justify-center w-5 h-5 rounded-[4px] border text-[10px]",
                              allCompleted 
                                ? "bg-green-100 border-green-200 text-green-600"
                                : isSelected
                                  ? "border-indigo-600 bg-indigo-600 text-white"
                                  : "border-slate-200 text-slate-400 group-hover:border-slate-300"
                            )}>
                              {allCompleted ? <Check size={12} strokeWidth={3} /> : day.dayNumber}
                            </div>
                            <span className="text-sm truncate">Day {day.dayNumber}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={() => setShowReminders(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
          >
            <Bell size={18} className="text-indigo-600" />
            <span className="text-sm font-bold">Daily Reminders</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center px-4 md:px-8 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <nav className="flex text-xs font-bold uppercase tracking-widest text-slate-400 items-center gap-2">
            <span>{curriculum.find(p => p.days.some(d => d.dayNumber === selectedDay))?.title.split(':')[0]}</span>
            <ChevronRight size={14} />
            <span className="text-slate-600">Day {selectedDay}</span>
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="max-w-4xl mx-auto">
            {currentDayPlan && (
              <motion.div
                key={currentDayPlan.dayNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-12">
                  <span className="inline-block px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-3">
                    Module Progress
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
                    {currentDayPlan.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} /> ~60 mins
                    </span>
                    {currentDayPlan.isMockInterview && (
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                        Mock Interview Day
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-12">
                  {currentDayPlan.topics.map((topic, index) => {
                    const isCompleted = completedTopics[topic.id];
                    return (
                      <div key={topic.id} className="relative">
                        {/* Connecting line */}
                        {index !== currentDayPlan.topics.length - 1 && (
                          <div className="absolute left-[19px] top-12 bottom-[-48px] w-px bg-slate-200" />
                        )}
                        
                        <div className="flex items-start gap-6">
                          <button
                            onClick={() => toggleTopic(topic.id)}
                            className="mt-1 shrink-0 bg-[#F8FAFC] z-10"
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={38} className="text-green-600" strokeWidth={1.5} />
                            ) : (
                              <Circle size={38} className="text-slate-300 hover:text-indigo-600 transition-colors" strokeWidth={1.5} />
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <h3 className={cn(
                              "text-xl font-bold mb-6 transition-colors",
                              isCompleted ? "text-slate-400" : "text-slate-900"
                            )}>
                              {topic.title}
                            </h3>

                            {(!topic.hook && !topic.explanation) ? (
                              <div className="p-6 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 italic">
                                Content outline for advanced topic. Reference Layrs curriculum.
                              </div>
                            ) : (
                              <div className={cn(
                                "grid md:grid-cols-3 gap-6 transition-all duration-500",
                                isCompleted ? "opacity-50 grayscale" : ""
                              )}>
                                {/* The Hook */}
                                {topic.hook && (
                                  <div className="bg-white p-6 border border-slate-200 rounded-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                      <span className="text-4xl font-black">01</span>
                                    </div>
                                    <h4 className="text-xs font-bold text-indigo-600 uppercase mb-3 tracking-wider">The Hook</h4>
                                    <p className="text-sm leading-relaxed text-slate-600 italic">"{topic.hook}"</p>
                                  </div>
                                )}
                                
                                {/* Explanation */}
                                {topic.explanation && (
                                  <div className="bg-white p-6 border border-slate-200 rounded-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                      <span className="text-4xl font-black">02</span>
                                    </div>
                                    <h4 className="text-xs font-bold text-indigo-600 uppercase mb-3 tracking-wider">Deep Dive</h4>
                                    <p className="text-sm leading-relaxed text-slate-600">{topic.explanation}</p>
                                  </div>
                                )}

                                {/* Practice */}
                                {topic.practice && (
                                  <div className="bg-white p-6 border border-slate-200 rounded-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                      <span className="text-4xl font-black">03</span>
                                    </div>
                                    <h4 className="text-xs font-bold text-indigo-600 uppercase mb-3 tracking-wider">Practice</h4>
                                    <p className="text-sm leading-relaxed text-slate-600">{topic.practice}</p>
                                  </div>
                                )}

                                {/* Diagram */}
                                {topic.diagramUrl && (
                                  <div className="bg-white p-6 border border-slate-200 rounded-xl relative overflow-hidden group md:col-span-3">
                                    <h4 className="text-xs font-bold text-indigo-600 uppercase mb-4 tracking-wider">Visual Architecture</h4>
                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                      <img src={topic.diagramUrl} alt={topic.title} className="w-full md:w-1/2 h-48 md:h-64 rounded-lg border border-slate-200 object-contain bg-white p-4 shadow-sm" />
                                      <div className="w-full md:w-1/2">
                                        <p className="text-sm leading-relaxed text-slate-600 mb-4">{topic.diagramExplanation}</p>
                                        
                                        {topic.articleUrl && (
                                          <div className="flex">
                                            <a 
                                              href={topic.articleUrl} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider hover:text-indigo-800 transition-colors"
                                            >
                                              Read Further <ExternalLink size={14} />
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Reminders Modal */}
      <AnimatePresence>
        {showReminders && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowReminders(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 md:p-8"
            >
              <button 
                onClick={() => setShowReminders(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
              
              <div className="w-12 h-12 rounded-sm bg-indigo-600 flex items-center justify-center mb-6">
                <Bell className="text-white" size={24} />
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Weekly Progress & Reminders</h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Configure your email to receive weekly progress reports and a nudge if you miss a day.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <input type="checkbox" id="missed" className="accent-indigo-600 w-4 h-4 rounded border-slate-300" defaultChecked />
                  <label htmlFor="missed" className="text-sm font-medium text-slate-700 select-none cursor-pointer">
                    Email me if I miss a daily session
                  </label>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <input type="checkbox" id="weekly" className="accent-indigo-600 w-4 h-4 rounded border-slate-300" defaultChecked />
                  <label htmlFor="weekly" className="text-sm font-medium text-slate-700 select-none cursor-pointer">
                    Send weekly progress summary
                  </label>
                </div>
                
                <button 
                  onClick={() => setShowReminders(false)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg py-3 mt-4 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-100">
                <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wide leading-relaxed">
                  <strong>Note on Static Hosting:</strong> Since this app runs purely in the browser for static deployment (GitHub Pages/Google Sites), saving these settings locally will not actually trigger emails without a backend service (like SendGrid or AWS). You would need to connect an external API endpoint to handle the dispatch.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
