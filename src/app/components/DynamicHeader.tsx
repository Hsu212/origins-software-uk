'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#case-studies', label: 'Work' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#methodology', label: 'Methodology' },
  { href: '#differentiators', label: 'Different' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

// Interactive Weather Widget with real API simulation
function WeatherWidget() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState<{ temp: string; condition: string; icon: string; humidity: string; wind: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cities = ['London', 'New York', 'Tokyo', 'Singapore', 'San Francisco', 'Berlin'];

  const fetchWeather = async (selectedCity: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API fetch with realistic data per city
      const data: Record<string, { temp: string; condition: string; icon: string; humidity: string; wind: string }> = {
        'London': { temp: '16°C', condition: 'Light Rain', icon: '🌧️', humidity: '82%', wind: '14 km/h' },
        'New York': { temp: '22°C', condition: 'Partly Cloudy', icon: '⛅', humidity: '55%', wind: '18 km/h' },
        'Tokyo': { temp: '25°C', condition: 'Sunny', icon: '☀️', humidity: '48%', wind: '8 km/h' },
        'Singapore': { temp: '31°C', condition: 'Thunderstorm', icon: '⚡', humidity: '88%', wind: '12 km/h' },
        'San Francisco': { temp: '18°C', condition: 'Foggy', icon: '🌫️', humidity: '75%', wind: '22 km/h' },
        'Berlin': { temp: '19°C', condition: 'Clear', icon: '☀️', humidity: '60%', wind: '10 km/h' },
      };
      setTimeout(() => {
        setWeather(data[selectedCity] || data['London']);
        setLoading(false);
      }, 400);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="flex flex-col gap-3 p-4 bg-bg-secondary rounded-2xl border border-white/10 min-w-[260px] text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌤️</span>
          <span className="text-xs font-medium text-text-secondary">Live Weather</span>
        </div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-bg-primary text-xs px-2 py-1 rounded-lg border border-white/10 text-white focus:outline-none focus:border-accent-primary"
        >
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="py-6 text-center text-xs text-accent-primary animate-pulse">Fetching telemetry...</div>
      ) : error ? (
        <div className="py-4 text-center text-xs text-red-400 bg-red-500/10 rounded-lg border border-red-500/20">
          {error}
        </div>
      ) : weather ? (
        <motion.div
          className="bg-bg-primary/50 p-4 rounded-xl border border-white/5 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">{weather.icon}</span>
            <div>
              <p className="text-xl font-bold font-mono">{weather.temp}</p>
              <p className="text-sm text-text-secondary">{weather.condition}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Hum: {weather.humidity}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Wind: {weather.wind}</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

// Interactive Stock Market Widget
function StockMarketWidget() {
  const [items, setItems] = useState([
    { symbol: 'BTC/USD', price: 67420.50, change: +2.34, sparkline: [65, 66, 64, 67, 68, 67], vol: '1.2B', high24: 67800, low24: 66200 },
    { symbol: 'ETH/USD', price: 3240.20, change: -0.85, sparkline: [33, 32.5, 32.8, 32.2, 32.4], vol: '800M', high24: 3300, low24: 3180 },
    { symbol: 'NVDA', price: 128.40, change: +4.12, sparkline: [120, 122, 123, 125, 128], vol: '2.1B', high24: 130, low24: 127 },
    { symbol: 'AAPL', price: 178.60, change: +1.20, sparkline: [175, 176, 175.5, 177, 178.6], vol: '3.5B', high24: 180, low24: 174 },
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => prev.map((item, idx) => {
        const delta = (Math.random() - 0.48) * (item.price * 0.002);
        const newPrice = Number((item.price + delta).toFixed(2));
        const newChange = Number((item.change + (delta > 0 ? 0.05 : -0.05)).toFixed(2));
        return {
          ...item, 
          price: newPrice, 
          change: newChange,
          high24: item.high24 + (Math.random() - 0.5) * 20,
          low24: item.low24 + (Math.random() - 0.5) * 20
        };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cur = items[selected];

  return (
    <div className="flex flex-col gap-3 p-4 bg-bg-secondary rounded-2xl border border-white/10 min-w-[280px] text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">Market Feed (Live Tick)</span>
        <div className="flex gap-1">
          {items.map((item, i) => (
            <button
              key={item.symbol}
              onClick={() => setSelected(i)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded ${selected === i ? 'bg-accent-primary text-bg-primary font-bold' : 'bg-white/5 text-white/60 hover:text-white'}`}
            >
              {item.symbol.split('/')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bg-primary/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-text-muted">{cur.symbol}</p>
          <p className="text-xl font-bold font-mono">${cur.price.toLocaleString()}</p>
          <div className="flex gap-3 mt-2 text-[10px] text-text-muted">
            <span>H24: ${cur.high24.toLocaleString()}</span>
            <span>L24: ${cur.low24.toLocaleString()}</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-block px-2 py-1 rounded text-xs font-mono font-bold ${cur.change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {cur.change >= 0 ? '+' : ''}{cur.change}%
          </span>
          <p className="text-[10px] text-text-muted mt-1">Real-time simulation</p>
        </div>
      </div>
    </div>
  );
}

// Interactive Bug Fixer Mini-Game
function BugFixerGame({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [bug, setBug] = useState({
    code: 'const calculateTotal = (items) => {\n  return items.reduce((sum, item) => sum + item.price, 0);\n};',
    error: 'TypeError: Cannot read properties of undefined (reading "price")',
    options: ['Add default parameter: items = []', 'Use async/await', 'Change reduce to map'],
    correct: 0,
    solved: false
  });

  const puzzles = [
    {
      code: 'const calculateTotal = (items) => {\n  return items.reduce((sum, item) => sum + item.price, 0);\n};',
      error: 'TypeError: Cannot read properties of undefined (reading "price")',
      options: ['Add default parameter: items = []', 'Use async/await', 'Change reduce to map'],
      correct: 0
    },
    {
      code: 'useEffect(() => {\n  fetchData();\n}, []);',
      error: 'React Hook useEffect has a missing dependency: "fetchData"',
      options: ['Wrap fetchData in useCallback', 'Disable eslint rule', 'Delete useEffect'],
      correct: 0
    },
    {
      code: 'const user = db.users.find({ email });\nconsole.log(user.name);',
      error: 'TypeError: Cannot read properties of null (reading "name")',
      options: ['Add optional chaining: user?.name', 'Restart database', 'Use SQL instead'],
      correct: 0
    }
  ];

  const handleSelect = (idx: number) => {
    if (idx === bug.correct) {
      const newScore = score + 100;
      setScore(newScore);
      if (level < puzzles.length) {
        setLevel(l => l + 1);
        setBug({ ...puzzles[level], solved: false });
      } else {
        setBug(prev => ({ ...prev, solved: true }));
      }
    } else {
      alert('Incorrect fix! Try again.');
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-bg-secondary rounded-2xl border border-white/10 min-w-[300px] text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">Mini-Game: Bug Fixer (Lvl {level}/3)</span>
        <button onClick={onClose} className="p-1 text-white/40 hover:text-white">✕</button>
      </div>

      {!bug.solved ? (
        <div className="space-y-2">
          <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs font-mono text-red-400">
            {bug.error}
          </div>
          <pre className="p-2 bg-bg-primary rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto">
            {bug.code}
          </pre>
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] text-text-muted">Select the correct fix:</p>
            {bug.options.map((opt, i) => (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                className="w-full text-left p-2 rounded-lg bg-bg-primary/80 hover:bg-accent-primary/20 hover:border-accent-primary border border-white/10 text-xs font-mono transition-all"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                {i + 1}. {opt}
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-6 text-center space-y-2">
          <p className="text-lg font-bold text-accent-primary">🎉 All Puzzles Solved!</p>
          <p className="text-xs text-text-secondary">Final Score: {score} points</p>
          <motion.button
            onClick={() => { setLevel(1); setBug({ ...puzzles[0], solved: false }); setScore(0); }}
            className="px-4 py-2 bg-accent-primary text-bg-primary rounded-xl text-xs font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        </div>
      )}
    </div>
  );
}

// Theme Picker Widget
function ThemePickerWidget({ onClose }: { onClose: () => void }) {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div className="flex flex-col gap-3 p-4 bg-bg-secondary rounded-2xl border border-white/10 min-w-[260px] text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">Aesthetic Color Palettes</span>
        <button onClick={onClose} className="p-1 text-white/40 hover:text-white">✕</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {availableThemes.map(t => (
          <motion.button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
              theme === t.name ? 'border-accent-primary bg-accent-primary/10 text-white' : 'border-white/10 bg-bg-primary/50 text-text-secondary hover:border-white/30'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: t.accent }} />
            {t.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function DynamicHeader() {
  const { colors, theme, setTheme, availableThemes } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeWidget, setActiveWidget] = useState<string | null>('weather');
  const [showTerminal, setShowTerminal] = useState(false);

  const { scrollY } = useScroll();
  const islandScale = useSpring(useTransform(scrollY, [0, 100], [1, 0.88]), { stiffness: 300, damping: 30 });
  const islandY = useSpring(useTransform(scrollY, [0, 100], [0, -10]), { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'case-studies', 'capabilities', 'methodology', 'differentiators', 'team', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const terminalCommands = [
    'origins@prod:~$ curl -s https://api.origins.engineering/health',
    '{"status":"operational","uptime":"99.99%","latency_p99":"42ms"}',
    'origins@prod:~$ kubectl get pods -n production',
    'NAME                    READY   STATUS    RESTARTS   AGE',
    'api-gateway-7b8f4c...   2/2     Running   0          14d',
    'worker-pool-3x...       3/3     Running   0          12d',
    'origins@prod:~$ echo "Interactive Dynamic Island Active ✓"'
  ];

  const widgets = [
    { id: 'weather', label: 'Weather', icon: '🌤️', component: <WeatherWidget /> },
    { id: 'stocks', label: 'Markets', icon: '📈', component: <StockMarketWidget /> },
    { id: 'game', label: 'Bug Fixer', icon: '🎮', component: <BugFixerGame onClose={() => setActiveWidget(null)} /> },
    { id: 'theme', label: 'Themes', icon: '🎨', component: <ThemePickerWidget onClose={() => setActiveWidget(null)} /> },
  ];

  return (
    <>
      {/* Dynamic Island Header */}
      <motion.header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        style={{ y: islandY, scale: islandScale }}
      >
        <motion.div
          className="relative pointer-events-auto bg-bg-secondary/90 backdrop-blur-2xl rounded-full border border-white/10 px-5 py-2.5 shadow-2xl transition-all duration-500 flex items-center gap-4"
          animate={{
            width: isExpanded ? '780px' : 'auto',
            borderRadius: isExpanded ? '1.5rem' : '9999px',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-bg-primary font-bold serif-heading"
              style={{ background: 'var(--gradient-accent)' }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              O
            </motion.div>
            <span className="serif-heading font-medium text-white hidden sm:inline">Origins</span>
          </div>

          {/* Expanded Navigation & Widgets */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                className="flex items-center justify-between flex-1 gap-4 overflow-x-auto py-1"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: 0 }}
              >
                <nav className="flex items-center gap-4">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`text-xs font-medium transition-colors ${
                        activeSection === item.href.replace('#', '') ? 'text-accent-primary font-bold' : 'text-text-secondary hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="flex items-center gap-1.5">
                  {widgets.map((w) => (
                    <motion.button
                      key={w.id}
                      onClick={() => setActiveWidget(activeWidget === w.id ? null : w.id)}
                      className={`p-2 rounded-xl text-xs flex items-center gap-1 transition-all ${
                        activeWidget === w.id ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/40' : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{w.icon}</span>
                      <span className="hidden md:inline">{w.label}</span>
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={() => setShowTerminal(true)}
                    className="p-2 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 text-xs flex items-center gap-1"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>⌨️</span>
                    <span className="hidden md:inline">Terminal</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Expand / Status pill when collapsed */}
          {!isExpanded && (
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setActiveWidget(activeWidget ? null : 'weather')}
                className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-text-secondary hover:text-white transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-accent-primary"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span>Interactive Island</span>
              </motion.button>
              <motion.button
                onClick={() => setIsExpanded(true)}
                className="p-1.5 rounded-full bg-white/5 text-white hover:bg-white/10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.header>

      {/* Active Widget Popup Dropdown */}
      <AnimatePresence>
        {activeWidget && !isExpanded && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <motion.div
              className="bg-bg-secondary/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-2 relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-white/5 mb-2">
                <div className="flex gap-1.5">
                  {widgets.map(w => (
                    <motion.button
                      key={w.id}
                      onClick={() => setActiveWidget(w.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${activeWidget === w.id ? 'bg-accent-primary text-bg-primary' : 'text-text-secondary hover:text-white bg-white/5'}`}
                      whileHover={{ y: -2 }}
                    >
                      {w.icon} {w.label}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  onClick={() => setActiveWidget(null)}
                  className="text-white/40 hover:text-white p-1"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                >
                  ✕
                </motion.button>
              </div>
              {widgets.find(w => w.id === activeWidget)?.component}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Modal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTerminal(false)}
          >
            <motion.div
              className="w-full max-w-2xl h-[60vh] bg-bg-primary rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-bg-secondary">
                <span className="text-xs font-mono text-text-muted">origins@prod:~$</span>
                <motion.button
                  onClick={() => setShowTerminal(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                >
                  ✕
                </motion.button>
              </div>
              <div className="flex-1 p-4 font-mono text-xs text-text-secondary space-y-2 overflow-y-auto">
                {terminalCommands.map((c, i) => (
                  <motion.div
                    key={i}
                    className={`font-mono ${c.startsWith('origins@') ? 'text-accent-primary' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    {c}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}