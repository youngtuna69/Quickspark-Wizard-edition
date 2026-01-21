
import React, { useState, useEffect, useMemo } from 'react';
import { TRUCK_MENU, HISTORICAL_SALES, GOOGLE_REVIEWS, LOCAL_EVENTS, CUSTOMERS } from './constants';
import { InventoryItem, Transaction, BusinessInsight, SocialAccount, CustomerPersona } from './types';
import { DashboardCard } from './components/DashboardCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line, ComposedChart } from 'recharts';
import { GoogleGenAI } from "@google/genai";

type TabType = 'intelligence' | 'inventory' | 'cohorts' | 'slump' | 'loyalty' | 'social';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('intelligence');
  const [socialText, setSocialText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [magicSparkles, setMagicSparkles] = useState<{ x: number, y: number, id: number }[]>([]);

  const socialAccounts: SocialAccount[] = [
    { platform: 'instagram', connected: true, username: '@losmagos_sebastopol' },
    { platform: 'facebook', connected: true, username: 'Los Magos Truck' },
    { platform: 'tiktok', connected: true, username: 'losmagostruck' }
  ];

  const addSparkle = (e: React.MouseEvent) => {
    if (Math.random() > 0.98) {
      const newSparkle = { x: e.clientX, y: e.clientY, id: Date.now() };
      setMagicSparkles(prev => [...prev, newSparkle]);
      setTimeout(() => setMagicSparkles(prev => prev.filter(s => s.id !== newSparkle.id)), 1000);
    }
  };

  const generateAIPost = async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const birriaSales = HISTORICAL_SALES.find(s => s.name === 'Queso birria')?.qty || 0;
    const upcomingEvent = LOCAL_EVENTS.find(e => new Date(e.date).getMonth() === new Date().getMonth());
    
    const prompt = `Los Magos Food Truck Sebastopol. 
    Context: Sold ${birriaSales} birria portions recently. Scarcity logic: Almost out of Birria for tonight.
    Event: ${upcomingEvent?.name || 'Local Weekend Rush'}.
    Task: Write a punchy social media post. Use 10% magic-themed words (Spark, Spell, Magic). Focus on FOMO and high quality.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setSocialText(response.text || "Vision obscured. Try again.");
    } catch (e) {
      setSocialText("Error channeling the digital ether.");
    }
  };

  const handlePost = () => {
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setSocialText('');
      alert("Successfully posted to Instagram, Facebook, and TikTok!");
    }, 1200);
  };

  const insights = useMemo(() => {
    const list: BusinessInsight[] = [
      { type: 'EVENT_ALERT', severity: 'high', message: "Apple Blossom Festival approaching (April 20).", action: "Increase prep by 45% for Birria and Super Burritos.", },
      { type: 'YIELD_ALERT', severity: 'medium', message: "Birria velocity down 12% vs. Tuesday baseline.", action: "Queue 'Flash Birria' social post to trigger evening surge." },
      { type: 'DEAD_ZONE', severity: 'high', message: "Predicted 2:30 PM Collapse.", action: "Shift labor to prep-only. Halt grill at 2:15 PM." }
    ];
    return list;
  }, []);

  const heatmapData = [
    { hour: '11AM', solo: 40, family: 5 },
    { hour: '12PM', solo: 95, family: 10 },
    { hour: '1PM', solo: 80, family: 15 },
    { hour: '2PM', solo: 20, family: 10 },
    { hour: '3PM', solo: 5, family: 5 }, // Slump
    { hour: '4PM', solo: 15, family: 20 },
    { hour: '5PM', solo: 30, family: 65 },
    { hour: '6PM', solo: 20, family: 95 },
    { hour: '7PM', solo: 10, family: 110 }, // Family Peak
    { hour: '8PM', solo: 5, family: 85 },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans cursor-default overflow-hidden selection:bg-indigo-500/30" onMouseMove={addSparkle}>
      {magicSparkles.map(s => (
        <div key={s.id} className="pointer-events-none fixed z-[999] opacity-30 animate-pulse" style={{ left: s.x, top: s.y }}>
          <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
        </div>
      ))}

      <div className="flex h-screen overflow-hidden">
        {/* SIDEBAR */}
        <nav className="w-72 bg-[#0b1120] border-r border-slate-800 p-8 flex flex-col space-y-2 shrink-0">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <i className="fas fa-bolt text-white"></i>
            </div>
            <div>
              <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">QuickSpark</h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Efficiency Engine</p>
            </div>
          </div>

          {[
            { id: 'intelligence', label: 'Intelligence', icon: 'fa-brain' },
            { id: 'inventory', label: 'Inventory Map', icon: 'fa-boxes-stacked' },
            { id: 'cohorts', label: 'Member Entity', icon: 'fa-users-viewfinder' },
            { id: 'slump', label: 'Slump Logic', icon: 'fa-chart-line-down' },
            { id: 'loyalty', label: 'Rewards Hub', icon: 'fa-ticket' },
            { id: 'social', label: 'Social FOMO', icon: 'fa-hashtag' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} className={`flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all group ${activeTab === tab.id ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-md' : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'}`}>
              <i className={`fas ${tab.icon} w-5 text-center group-hover:scale-110 transition-transform`}></i>
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
            </button>
          ))}

          <div className="mt-auto p-5 bg-[#020617] rounded-2xl border border-slate-800/50">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Engine Pulse</p>
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-indigo-400">Optimization</span>
              <span className="text-emerald-500">98%</span>
            </div>
            <div className="h-1 w-full bg-slate-800 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[98%]"></div>
            </div>
          </div>
        </nav>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-12 bg-[#020617]/50 scrollbar-hide relative">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* OVERVIEW / INTELLIGENCE */}
            {activeTab === 'intelligence' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <header className="flex justify-between items-end">
                  <div>
                    <h2 className="text-5xl font-black tracking-tighter uppercase text-white">Intelligence Cockpit</h2>
                    <p className="text-slate-500 font-medium italic mt-1">Real-time SpotOn Ingestion Engine.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">30D Net Sales</p>
                    <p className="text-4xl font-black text-white mono">$12,485.91</p>
                  </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <DashboardCard title="Solo Tickets" value="941" icon="fa-user" trend="+12%" trendUp />
                  <DashboardCard title="Family Orders" value="407" icon="fa-people-group" trend="+5%" trendUp />
                  <DashboardCard title="Margin Avg" value="72%" icon="fa-chart-pie" />
                  <DashboardCard title="Waste Risk" value="2.4%" icon="fa-triangle-exclamation" trend="-0.5%" trendUp={false} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-[#0b1120] border border-slate-800 rounded-[2.5rem] p-10 h-[450px]">
                    <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-8 italic">Commuter Solo vs. Family Bulk Heatmap</h3>
                    <ResponsiveContainer width="100%" height="90%">
                      <ComposedChart data={heatmapData}>
                        <XAxis dataKey="hour" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip contentStyle={{backgroundColor:'#0b1120', border:'none', borderRadius:'12px'}} />
                        <Area type="monotone" dataKey="solo" fill="#6366f1" fillOpacity={0.1} stroke="#6366f1" strokeWidth={3} />
                        <Bar dataKey="family" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={20} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-[2.5rem]">
                      <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Event Insight</h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        "{LOCAL_EVENTS[0].name} is tomorrow. Expect a 40% surge in 'Solo Commuter' tickets between 11:30 AM and 2:00 PM."
                      </p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Recent Reviews</h4>
                      {GOOGLE_REVIEWS.slice(0, 2).map((r, i) => (
                        <p key={i} className="text-[11px] text-slate-400 italic">"{r.comment}"</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INVENTORY MAP */}
            {activeTab === 'inventory' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <header>
                  <h2 className="text-5xl font-black tracking-tighter uppercase text-white">Inventory Map</h2>
                  <p className="text-slate-500 font-medium italic mt-1">Velocity vs. Margin Optimization.</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-[#0b1120] border border-slate-800 rounded-[2.5rem] p-10 overflow-hidden">
                    <h3 className="text-xs font-black uppercase text-slate-500 mb-8 tracking-widest">Velocity Matrix</h3>
                    <div className="space-y-4">
                      {HISTORICAL_SALES.map(sale => (
                        <div key={sale.name} className="flex items-center justify-between p-4 bg-[#020617] rounded-xl border border-slate-800">
                          <div className="flex items-center space-x-4">
                            <span className={`w-2 h-2 rounded-full ${sale.qty > 500 ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : sale.qty > 100 ? 'bg-indigo-400/50' : 'bg-rose-500/50'}`}></span>
                            <span className="text-sm font-bold text-slate-300">{sale.name}</span>
                          </div>
                          <div className="flex items-center space-x-8">
                            <span className="text-xs font-black text-slate-500 uppercase">{sale.qty > 500 ? 'High Vel' : 'Mid Vel'}</span>
                            <span className="mono text-indigo-400 font-black">{sale.qty} sold</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-indigo-500/5 border border-indigo-500/20 p-10 rounded-[2.5rem] space-y-8">
                    <h3 className="text-xl font-black uppercase text-white">Optimization Ritual</h3>
                    <div className="space-y-6">
                      <div className="p-6 bg-[#020617] rounded-2xl border border-slate-800">
                        <p className="text-xs text-indigo-300 font-medium italic">"Gorditas and Tortas are in the 'Low Velocity' zone. Suggest removing Tortas to save $420/month in specialized inventory storage."</p>
                      </div>
                      <div className="p-6 bg-[#020617] rounded-2xl border border-slate-800">
                        <p className="text-xs text-emerald-400 font-medium italic">"Queso Birria is your 'Margin Champion'. Maximize prep efficiency for 6 PM peak."</p>
                      </div>
                    </div>
                    <button className="w-full py-4 bg-indigo-600 text-white font-black uppercase text-xs rounded-2xl shadow-lg shadow-indigo-500/20">Print Prep Sheet</button>
                  </div>
                </div>
              </div>
            )}

            {/* COHORTS / MEMBER ENTITY */}
            {activeTab === 'cohorts' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <header>
                  <h2 className="text-5xl font-black tracking-tighter uppercase text-white">Member Entity</h2>
                  <p className="text-slate-500 font-medium italic mt-1">KYC & Habit Cohort Mapping.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CUSTOMERS.map(c => (
                    <div key={c.id} className="bg-[#0b1120] border border-slate-800 p-8 rounded-[2.5rem] hover:border-indigo-500/50 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 font-black text-xl">
                          {c.name[0]}
                        </div>
                        <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest">{c.cohort}</span>
                      </div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">{c.name}</h4>
                      <div className="space-y-3 pt-4 border-t border-slate-800">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                          <span>Fav: {c.favoriteItem}</span>
                          <span className="text-indigo-400">{c.visitCount} visits</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <span className="text-[10px] font-black text-emerald-500">STREAK: {c.streak} WEEKS</span>
                           <i className="fas fa-fire text-orange-500 text-xs animate-bounce"></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SLUMP LOGIC */}
            {activeTab === 'slump' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <header>
                  <h2 className="text-5xl font-black tracking-tighter uppercase text-white">Slump Logic</h2>
                  <p className="text-slate-500 font-medium italic mt-1">2:15 PM Cliff & Pivot Management.</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-rose-500/5 border border-rose-500/20 p-10 rounded-[3rem] space-y-8">
                    <div className="w-16 h-16 bg-rose-500 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-rose-500/20">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter">The 2:15 PM Cliff</h3>
                      <p className="text-slate-400 text-sm mt-2 leading-relaxed">Daily revenue collapses by 70% at 2:30 PM. Labor cost currently outweighs earnings by $115 per hour during this window.</p>
                    </div>
                    <div className="bg-[#020617] p-6 rounded-2xl border border-rose-500/10">
                      <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-3">Pivot Protocol</h4>
                      <ul className="space-y-3 text-xs text-slate-500 font-medium">
                        <li className="flex items-center space-x-3"><i className="fas fa-check text-emerald-500"></i> <span>Halt fresh meat drops at 2:10 PM.</span></li>
                        <li className="flex items-center space-x-3"><i className="fas fa-check text-emerald-500"></i> <span>Assign Team B to Birria Shredding.</span></li>
                        <li className="flex items-center space-x-3"><i className="fas fa-check text-emerald-500"></i> <span>Switch social media to 'Dinner Tease'.</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-[#0b1120] border border-slate-800 p-10 rounded-[3rem] h-fit">
                    <h3 className="text-xs font-black uppercase text-slate-500 mb-8 tracking-widest">Slump Intensity Chart</h3>
                    <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={heatmapData.slice(3, 8)}>
                           <Area type="monotone" dataKey="solo" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} strokeWidth={4} />
                         </AreaChart>
                       </ResponsiveContainer>
                    </div>
                    <p className="text-center text-[10px] font-black text-slate-600 uppercase mt-4 italic">Estimated Savings: $28.50/hr by Halting Grill</p>
                  </div>
                </div>
              </div>
            )}

            {/* LOYALTY HUB */}
            {activeTab === 'loyalty' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-5xl font-black tracking-tighter uppercase text-white">Rewards Hub</h2>
                    <p className="text-slate-500 font-medium italic mt-1">The Digital Punch Card System.</p>
                  </div>
                  <div className="relative">
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"></i>
                    <input 
                      type="text" 
                      placeholder="Search Identifier..." 
                      className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </header>
                <div className="bg-[#0b1120] border border-slate-800 p-10 rounded-[3rem] space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-[#020617] rounded-3xl border border-slate-800 relative group overflow-hidden">
                      <div className="absolute -right-4 -top-4 text-6xl text-indigo-500/10 group-hover:rotate-12 transition-transform"><i className="fas fa-star"></i></div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">Punch Card Status</h4>
                      <p className="text-2xl font-black text-white">8 / 10 Visited</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase mt-2">2 more for free burrito</p>
                    </div>
                    <div className="p-8 bg-[#020617] rounded-3xl border border-slate-800">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">Streak Multiplier</h4>
                      <p className="text-2xl font-black text-indigo-400">3x Spark</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Active: 3 visits this week</p>
                    </div>
                    <div className="p-8 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
                      <h4 className="text-[10px] font-black text-emerald-500 uppercase mb-2">Surprise Available</h4>
                      <p className="text-xl font-black text-white">Free Consomé Shot</p>
                      <button className="mt-4 px-4 py-2 bg-emerald-600 text-white font-black uppercase text-[9px] rounded-lg">Redeem Now</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SOCIAL FOMO */}
            {activeTab === 'social' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <header className="flex justify-between items-end">
                  <div>
                    <h2 className="text-5xl font-black tracking-tighter uppercase text-white">Social FOMO</h2>
                    <p className="text-slate-500 font-medium italic mt-1">Data-Driven Scarcity Posting.</p>
                  </div>
                  <div className="flex space-x-3">
                    {socialAccounts.map(acc => (
                      <div key={acc.platform} className="w-10 h-10 rounded-xl flex items-center justify-center border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                        <i className={`fab fa-${acc.platform}`}></i>
                      </div>
                    ))}
                  </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-[#0b1120] border border-slate-800 p-10 rounded-[3rem] space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-black uppercase text-white">AI Draft Engine</h3>
                      <button onClick={generateAIPost} className="flex items-center space-x-3 px-6 py-3 bg-indigo-600 rounded-2xl text-white font-black uppercase text-[10px] hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                        <i className="fas fa-sparkles"></i>
                        <span>Generate Scarcity Post</span>
                      </button>
                    </div>
                    <div className="min-h-[250px] bg-[#020617] p-8 rounded-[2rem] border border-slate-800 relative group">
                      {socialText ? (
                        <textarea 
                          className="w-full bg-transparent border-none text-slate-300 italic text-sm leading-relaxed text-center font-medium focus:outline-none resize-none h-40"
                          value={socialText}
                          onChange={(e) => setSocialText(e.target.value)}
                        />
                      ) : (
                        <p className="text-xs text-slate-600 font-black uppercase tracking-widest text-center mt-12">Click above to scry tomorrow's rush...</p>
                      )}
                    </div>
                    <button 
                      onClick={handlePost} 
                      disabled={!socialText || isPosting}
                      className="w-full py-5 bg-indigo-600 disabled:bg-slate-800 text-white font-black uppercase text-[12px] tracking-widest rounded-[2rem] shadow-xl shadow-indigo-500/20 transition-all active:scale-95"
                    >
                      {isPosting ? 'Propagating to Connected Ley Lines...' : 'Deploy to Instagram, Facebook & TikTok'}
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-indigo-600/5 border border-indigo-500/20 p-8 rounded-[2.5rem] space-y-4">
                      <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Live Momentum</h4>
                      <p className="text-2xl font-black text-white">407 portions</p>
                      <p className="text-xs text-slate-400 italic">"Queso Birria velocity is critical. Suggested FOMO: 'Last 20 portions until Sunday!'"</p>
                    </div>
                    <div className="bg-[#0b1120] border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Post Performance</h4>
                       <div className="h-40">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={HISTORICAL_SALES.slice(0, 5)}>
                               <Bar dataKey="qty" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                         </ResponsiveContainer>
                       </div>
                       <p className="text-center text-[9px] font-black text-slate-600 uppercase">Sales Correlated with Posting</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* FOOTER PERSISTENCE */}
      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-[#0b1120]/95 backdrop-blur-2xl border-t border-slate-800 z-[200] px-8 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Persistence: Verified</span>
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Sebastopol Regional Node • Los Magos Feed Active</p>
        </div>
        <div className="flex items-center space-x-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
           <span className="text-indigo-400">Optimal Prep: 11:15 AM</span>
           <span className="bg-[#020617] px-4 py-1.5 rounded-full border border-slate-800">
             <i className="fas fa-shield-check text-emerald-500 mr-2"></i> Integrity: 100%
           </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
