import React, { useState } from 'react';

export default function SolarRooftopPortal() {
  const [activeTab, setActiveTab] = useState('rts'); // 'rts' | 'np' | 'mobile_preview' | 'audit'
  const [mobileScreen, setMobileScreen] = useState('dashboard'); // 'splash' | 'login' | 'dashboard' | 'consumers' | 'add' | 'details' | 'docs' | 'camera' | 'sync' | 'profile'
  const [searchQuery, setSearchQuery] = useState('');
  const [rtsFilter, setRtsFilter] = useState('ALL');
  const [npFilter, setNpFilter] = useState('ALL');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consumer_number: '',
    discom_name: 'MSEDCL',
    category: 'Residential',
    inverter_capacity: '3 kW',
    address: ''
  });

  // Consumer List State matching reference photo
  const [consumers, setConsumers] = useState([
    {
      id: 1,
      name: "Rajesh Sharma",
      phone: "+91 98765 43210",
      consumer_number: "C-001234",
      discom_name: "MSEDCL",
      category: "Residential",
      agent_name: "Ravi Kumar (Field Agent)",
      inverter_capacity: "4 kW",
      rts_status: "DONE",
      national_portal_status: "DONE",
      documents_count: 3,
      created_at: "2025-04-24 10:30 AM"
    },
    {
      id: 2,
      name: "Priya Kumari",
      phone: "+91 91234 56789",
      consumer_number: "C-002345",
      discom_name: "Tata Power",
      category: "Residential",
      agent_name: "Ravi Kumar (Field Agent)",
      inverter_capacity: "3 kW",
      rts_status: "DONE",
      national_portal_status: "NOT_DONE",
      documents_count: 2,
      created_at: "2025-04-25 11:20 AM"
    },
    {
      id: 3,
      name: "Amit Kumar",
      phone: "+91 99887 76655",
      consumer_number: "C-003456",
      discom_name: "BESCOM",
      category: "Commercial",
      agent_name: "Priya Verma (Agent)",
      inverter_capacity: "10 kW",
      rts_status: "NOT_DONE",
      national_portal_status: "NOT_DONE",
      documents_count: 1,
      created_at: "2025-04-23 09:15 AM"
    },
    {
      id: 4,
      name: "Sunita Singh",
      phone: "+91 87654 32109",
      consumer_number: "C-004567",
      discom_name: "Adani",
      category: "Residential",
      agent_name: "Ravi Kumar (Field Agent)",
      inverter_capacity: "5 kW",
      rts_status: "DONE",
      national_portal_status: "DONE",
      documents_count: 4,
      created_at: "2025-04-25 08:00 AM"
    },
    {
      id: 5,
      name: "Vikram Mehta",
      phone: "+91 86543 21098",
      consumer_number: "C-005678",
      discom_name: "MSEDCL",
      category: "Commercial",
      agent_name: "Priya Verma (Agent)",
      inverter_capacity: "15 kW",
      rts_status: "NOT_DONE",
      national_portal_status: "NOT_DONE",
      documents_count: 0,
      created_at: "2025-04-25 09:30 AM"
    }
  ]);

  // Toggles
  const handleToggleRTS = (id) => {
    setConsumers(prev => prev.map(c => c.id === id ? { ...c, rts_status: c.rts_status === 'DONE' ? 'NOT_DONE' : 'DONE' } : c));
  };

  const handleToggleNP = (id) => {
    setConsumers(prev => prev.map(c => c.id === id ? { ...c, national_portal_status: c.national_portal_status === 'DONE' ? 'NOT_DONE' : 'DONE' } : c));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.consumer_number) return;
    const newConsumer = {
      id: Date.now(),
      ...formData,
      agent_name: "Ravi Kumar (Field Agent)",
      rts_status: "NOT_DONE",
      national_portal_status: "NOT_DONE",
      documents_count: 0,
      created_at: new Date().toLocaleString()
    };
    setConsumers([newConsumer, ...consumers]);
    setIsAddModalOpen(false);
  };

  const filteredConsumers = consumers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.includes(searchQuery) ||
                          c.consumer_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.discom_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRts = rtsFilter === 'ALL' ? true : c.rts_status === rtsFilter;
    const matchesNp = npFilter === 'ALL' ? true : c.national_portal_status === npFilter;
    return matchesSearch && matchesRts && matchesNp;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Top Banner Matching Reference Image Branding */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/10">
            ☀️
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wide text-white flex items-center gap-2">
              Alka Green Energy <span className="text-amber-500 text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full font-extrabold">PM SURYA GHAR APP</span>
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">Solar Rooftop Consumer Management System • <span className="text-slate-200 font-semibold">Clean Energy | Better Tomorrow</span></p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab(activeTab === 'mobile_preview' ? 'rts' : 'mobile_preview')}
            className={`px-4 py-2.5 rounded-xl border text-xs font-extrabold transition flex items-center gap-2 ${
              activeTab === 'mobile_preview' ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span>📱</span> {activeTab === 'mobile_preview' ? 'Exit Mobile Preview' : 'Interactive App Screen Preview'}
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 text-sm"
          >
            <span>➕</span> Add Consumer
          </button>
        </div>
      </div>

      {/* Field Agent Dashboard Metric Cards matching reference image */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl">
          <p className="text-emerald-400 text-xs font-bold">✓ RTS Done</p>
          <p className="text-2xl font-black text-white mt-1">8</p>
        </div>

        <div className="bg-amber-500/20 border border-amber-500/40 p-4 rounded-2xl">
          <p className="text-amber-400 text-xs font-bold">⏳ RTS Pending</p>
          <p className="text-2xl font-black text-white mt-1">4</p>
        </div>

        <div className="bg-blue-500/20 border border-blue-500/40 p-4 rounded-2xl">
          <p className="text-blue-400 text-xs font-bold">🏛️ NP Done</p>
          <p className="text-2xl font-black text-white mt-1">6</p>
        </div>

        <div className="bg-sky-400/20 border border-sky-400/40 p-4 rounded-2xl">
          <p className="text-sky-300 text-xs font-bold">⏳ NP Pending</p>
          <p className="text-2xl font-black text-white mt-1">6</p>
        </div>

        <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl">
          <p className="text-emerald-400 text-xs font-bold">📄 Docs Complete</p>
          <p className="text-2xl font-black text-white mt-1">9</p>
        </div>

        <div className="bg-red-500/20 border border-red-500/40 p-4 rounded-2xl">
          <p className="text-red-400 text-xs font-bold">📑 Docs Pending</p>
          <p className="text-2xl font-black text-white mt-1">3</p>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'mobile_preview' ? (
        <div className="max-w-7xl mx-auto bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              📱 Interactive Mobile Screen Simulator <span className="text-xs text-slate-400 font-normal">(Click buttons to preview all 10 app screens)</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {['splash', 'login', 'dashboard', 'consumers', 'add', 'details', 'docs', 'camera', 'sync', 'profile'].map((scr) => (
                <button
                  key={scr}
                  onClick={() => setMobileScreen(scr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                    mobileScreen === scr ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {scr}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Screen Preview Container */}
          <div className="flex justify-center">
            <div className="w-[360px] h-[720px] bg-slate-950 rounded-[40px] border-[10px] border-slate-800 shadow-2xl overflow-hidden relative flex flex-col justify-between">
              {/* Phone Status Bar */}
              <div className="bg-slate-950 text-white text-[11px] px-6 py-2 flex justify-between items-center font-bold z-10">
                <span>9:41</span>
                <span>📶 🔋</span>
              </div>

              {/* Dynamic Screen Viewport */}
              <div className="flex-1 overflow-y-auto">
                {mobileScreen === 'splash' && (
                  <div className="h-full bg-slate-900 text-white p-6 flex flex-col justify-between items-center text-center py-16">
                    <div className="mt-12 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-4xl mb-4">☀️</div>
                      <h3 className="text-xl font-black">Alka Green Energy</h3>
                      <p className="text-xs text-slate-400 mt-1">Solar Rooftop Solutions</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-300 tracking-wider">Clean Energy | Better Tomorrow</p>
                    </div>
                  </div>
                )}

                {mobileScreen === 'login' && (
                  <div className="h-full bg-slate-50 text-slate-900 p-6 flex flex-col justify-between">
                    <div className="text-center mt-6">
                      <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500 mx-auto flex items-center justify-center text-2xl mb-2">☀️</div>
                      <h3 className="font-black text-lg">Alka Green Energy</h3>
                      <p className="text-xs text-slate-500">Solar Rooftop Solutions</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 space-y-3">
                      <h4 className="font-extrabold text-sm text-center">Welcome Back</h4>
                      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                        <button className="flex-1 py-1.5 bg-amber-500 text-white rounded-lg">Field Agent</button>
                        <button className="flex-1 py-1.5 text-slate-600">System Admin</button>
                      </div>
                      <input type="text" value="agent1@alkaindustry.com" readOnly className="w-full bg-slate-50 border p-2 rounded-xl text-xs" />
                      <input type="password" value="••••••••" readOnly className="w-full bg-slate-50 border p-2 rounded-xl text-xs" />
                      <button onClick={() => setMobileScreen('dashboard')} className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs">Login</button>
                    </div>
                    <p className="text-center text-xs text-slate-400">🏠⚡🌱</p>
                  </div>
                )}

                {mobileScreen === 'dashboard' && (
                  <div className="h-full bg-slate-900 text-white p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                      <span className="font-bold text-amber-500">≡ Alka Green Energy</span>
                      <span>👤</span>
                    </div>
                    <div>
                      <h3 className="font-black text-base">Hello, Ravi Kumar</h3>
                      <p className="text-xs text-slate-400">Field Agent</p>
                    </div>
                    <div className="bg-amber-500 text-slate-950 p-3 rounded-xl font-bold flex justify-between items-center text-xs">
                      <div>
                        <p className="text-[10px]">My Assigned Consumers</p>
                        <p className="text-lg font-black">12</p>
                      </div>
                      <span>❯</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <div className="bg-emerald-500 p-2.5 rounded-xl">✓ RTS Done: 8</div>
                      <div className="bg-amber-500 p-2.5 rounded-xl">⏳ RTS Pending: 4</div>
                      <div className="bg-blue-500 p-2.5 rounded-xl">🏛️ NP Done: 6</div>
                      <div className="bg-sky-400 p-2.5 rounded-xl text-slate-950">⏳ NP Pending: 6</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between text-xs font-bold">
                      <span>☁️ Pending Sync</span>
                      <span className="text-amber-400">2 ❯</span>
                    </div>
                  </div>
                )}

                {mobileScreen === 'consumers' && (
                  <div className="h-full bg-slate-900 text-white p-4 space-y-3">
                    <h3 className="font-black text-sm text-center">Consumers</h3>
                    <input type="text" placeholder="🔍 Search..." readOnly className="w-full bg-white text-slate-900 p-2 rounded-xl text-xs" />
                    <div className="space-y-2">
                      {consumers.map(c => (
                        <div key={c.id} onClick={() => setMobileScreen('details')} className="bg-white text-slate-900 p-2.5 rounded-xl flex items-center justify-between text-xs cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">{c.name.charAt(0)}</div>
                            <div>
                              <p className="font-bold text-xs">{c.name}</p>
                              <p className="text-[10px] text-slate-500">{c.consumer_number} | {c.discom_name}</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">RTS</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mobileScreen === 'details' && (
                  <div className="h-full bg-slate-900 text-white p-4 space-y-3">
                    <h3 className="font-black text-sm text-center">Consumer Details</h3>
                    <div className="bg-white text-slate-900 p-4 rounded-xl space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center">RS</div>
                        <div>
                          <p className="font-black text-sm">Rajesh Sharma</p>
                          <p className="text-xs text-slate-500">+91 98765 43210</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                        <div className="bg-emerald-500 text-white p-2 rounded-lg text-center">✓ RTS Done</div>
                        <div className="bg-sky-400 text-slate-950 p-2 rounded-lg text-center">⏳ NP Pending</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Nav Bar matching photo */}
              <div className="bg-white text-slate-600 text-[10px] py-2 px-4 flex justify-between items-center border-t border-slate-200 font-bold z-10">
                <span onClick={() => setMobileScreen('dashboard')} className="cursor-pointer text-blue-600">🏠 Dashboard</span>
                <span onClick={() => setMobileScreen('consumers')} className="cursor-pointer">👥 Consumers</span>
                <span onClick={() => setMobileScreen('add')} className="cursor-pointer bg-slate-900 text-white p-1 rounded-full">➕</span>
                <span onClick={() => setMobileScreen('sync')} className="cursor-pointer">☁️ Sync</span>
                <span onClick={() => setMobileScreen('profile')} className="cursor-pointer">👤 Profile</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Web Portal View */
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredConsumers.map((c) => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-black">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">{c.name}</h3>
                    <p className="text-xs text-amber-500 font-semibold">{c.consumer_number} | {c.discom_name}</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs text-slate-300 mb-4">
                  <p>📞 Phone: {c.phone}</p>
                  <p>🔌 Capacity: {c.inverter_capacity}</p>
                  <p>👷 Agent: {c.agent_name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => handleToggleRTS(c.id)}
                  className={`py-2 px-3 rounded-xl border text-center text-xs font-extrabold transition ${
                    c.rts_status === 'DONE' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-amber-500/20 border-amber-500 text-amber-400'
                  }`}
                >
                  {c.rts_status === 'DONE' ? '✓ RTS DONE' : '⏳ RTS PENDING'}
                </button>

                <button
                  onClick={() => handleToggleNP(c.id)}
                  className={`py-2 px-3 rounded-xl border text-center text-xs font-extrabold transition ${
                    c.national_portal_status === 'DONE' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-sky-400/20 border-sky-400 text-sky-300'
                  }`}
                >
                  {c.national_portal_status === 'DONE' ? '✓ NP DONE' : '⏳ NP PENDING'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Consumer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-900 border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black">Add Consumer</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Consumer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter consumer name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Connection Number *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter connection number"
                  value={formData.consumer_number}
                  onChange={(e) => setFormData({ ...formData, consumer_number: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">DISCOM Utility *</label>
                <select
                  value={formData.discom_name}
                  onChange={(e) => setFormData({ ...formData, discom_name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                >
                  <option value="MSEDCL">MSEDCL</option>
                  <option value="Tata Power">Tata Power</option>
                  <option value="BESCOM">BESCOM</option>
                  <option value="Adani">Adani</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded-xl font-extrabold">Save Consumer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
