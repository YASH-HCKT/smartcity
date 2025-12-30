const StatusGrid = ({ infrastructure }) => {
  const getStatusCount = (status) => {
    return infrastructure.filter(item => item.status === status).length;
  };

  const statusTypes = [
    { type: 'streetlight', label: 'Lighting', icon: '💡', color: 'blue' },
    { type: 'traffic_signal', label: 'Traffic', icon: '🚦', color: 'purple' },
    { type: 'water_supply', label: 'Hydraulics', icon: '💧', color: 'cyan' },
    { type: 'waste_bin', label: 'Sanitation', icon: '🗑️', color: 'emerald' }
  ];

  const stats = [
    { label: 'Healthy', count: getStatusCount('green'), color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Warning', count: getStatusCount('yellow'), color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Critical', count: getStatusCount('red'), color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { label: 'Total units', count: infrastructure.length, color: 'text-blue-500', bg: 'bg-blue-500/10' }
  ];

  return (
    <div className="space-y-12">
      {/* High-level stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[32px] border border-white/10 shadow-xl transition-all hover:scale-[1.02]">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-xl font-bold mb-6`}>
              {stat.count}
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusTypes.map(({ type, label, icon, color }) => {
          const items = infrastructure.filter(item => item.type === type);
          const healthy = items.filter(item => item.status === 'green').length;
          const percentage = items.length > 0 ? (healthy / items.length) * 100 : 0;

          return (
            <div key={type} className="bg-white dark:bg-dark-card p-8 rounded-[32px] shadow-lg border border-gray-100 dark:border-gray-800 group hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="text-4xl group-hover:scale-110 transition-transform">{icon}</div>
                <div className="text-right">
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{items.length}</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Units</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{label}</h3>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="text-gray-500">{healthy} operational</span>
                <span className="font-bold text-emerald-500">{percentage.toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="px-10 py-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Active Infrastructure</h2>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">LIVE DATA</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-[10px] font-black text-gray-400 uppercase tracking-widest px-10">
                <th className="px-10 py-6">Asset Name</th>
                <th className="px-6 py-6">Category</th>
                <th className="px-6 py-6">Coordinates</th>
                <th className="px-6 py-6">Metric</th>
                <th className="px-6 py-6">Health</th>
                <th className="px-10 py-6">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {infrastructure.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full bg-${item.status === 'green' ? 'emerald' : item.status === 'yellow' ? 'amber' : 'rose'}-500 shadow-[0_0_8px_rgba(0,0,0,0.2)] animate-pulse`} />
                      <div className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase text-sm">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 text-[10px] font-black uppercase rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                      {item.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-xs font-medium text-gray-500 font-mono">
                    {item.location.lat.toFixed(3)}, {item.location.lng.toFixed(3)}
                  </td>
                  <td className="px-6 py-6">
                    <div className="text-sm font-black text-gray-900 dark:text-white">{item.value.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${item.status === 'green' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'yellow' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-[10px] font-bold text-gray-400">
                    {new Date(item.lastUpdated).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatusGrid;