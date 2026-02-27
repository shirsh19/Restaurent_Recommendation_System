import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Loader2, AlertCircle, RefreshCcw, Zap, Timer, Settings } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';

const Recommend = () => {
    const [formData, setFormData] = useState({
        location: '',
        cuisine: '',
        budget: '',
        preferences: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [isWaking, setIsWaking] = useState(false);

    useEffect(() => {
        let timer;
        if (countdown !== null && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsWaking(false);
            setCountdown(null);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleWakeUp = async () => {
        setIsWaking(true);
        setCountdown(90);
        try {
            // Ping the backend to trigger cold start
            await axios.get('/api/docs');
        } catch (err) {
            console.log("Wake up ping sent");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setRestaurants([]);

        try {
            const response = await axios.post('/api/recommend', formData);
            if (response.data && response.data.restaurants) {
                setRestaurants(response.data.restaurants);
            } else {
                setError('No restaurants found for your criteria.');
            }
        } catch (err) {
            console.error('API Error:', err);
            const msg = err.response?.data?.detail
                ? JSON.stringify(err.response.data.detail)
                : err.message || 'System connection failure. Please try again later.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 food-gradient-text tracking-tighter">Find Your Perfect Meal</h1>
                    <p className="text-zinc-500 text-lg">Tell us what you crave, and our AI will handle the rest.</p>
                </div>

                {/* Backend Wake-up Section */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="glass-dark p-6 rounded-[2rem] border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-zinc-800 rounded-2xl">
                                <Settings className="w-6 h-6 text-zinc-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white tracking-tight">System Configuration</h2>
                                <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Backend Protocol: Render Cold Start</p>
                            </div>
                        </div>

                        <button
                            disabled={isWaking}
                            onClick={handleWakeUp}
                            className={`min-w-[200px] flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${isWaking
                                ? 'bg-orange-500/10 border-orange-500/50 text-orange-500'
                                : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-orange-500/50 hover:text-white'
                                }`}
                        >
                            {isWaking ? (
                                <>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Timer className="w-4 h-4 animate-pulse" />
                                        <span className="text-sm font-bold">Waking Up...</span>
                                    </div>
                                    <span className="text-2xl font-black">{countdown}s</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5 mb-1 text-orange-500" />
                                    <span className="font-bold">Wake up Backend</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mb-16">
                    <form onSubmit={handleSubmit} className="glass-dark p-8 md:p-10 rounded-[2.5rem] border border-zinc-800 shadow-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">Target Location</label>
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Mumbai, New Delhi, New York"
                                    className="w-full bg-zinc-900/50 border border-zinc-700 p-4 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-zinc-600"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">Cuisine Style</label>
                                <input
                                    required
                                    type="text"
                                    name="cuisine"
                                    placeholder="e.g. South Indian, Vegan, Italian"
                                    className="w-full bg-zinc-900/50 border border-zinc-700 p-4 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-zinc-600"
                                    value={formData.cuisine}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">Budget (in rupees)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 font-bold">₹</span>
                                    <input
                                        type="text"
                                        name="budget"
                                        placeholder="e.g. <100"
                                        className="w-full bg-zinc-900/50 border border-zinc-700 p-4 pl-8 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-zinc-600"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">Special Preferences</label>
                                <textarea
                                    name="preferences"
                                    rows="1"
                                    placeholder="e.g. Rooftop, Dog friendly, Quiet"
                                    className="w-full bg-zinc-900/50 border border-zinc-700 p-4 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-zinc-600 resize-none"
                                    value={formData.preferences}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-5 rounded-2xl food-gradient text-white font-black text-xl hover:shadow-[0_0_40px_rgba(255,95,31,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tighter"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Finding Best Spots...
                                </>
                            ) : (
                                <>
                                    <Search className="w-6 h-6" />
                                    Orchestrate Selection
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="space-y-12">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
                            <div className="w-16 h-16 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                            <p className="text-zinc-400 font-bold uppercase tracking-widest">Scanning district establishments...</p>
                        </div>
                    )}

                    {error && (
                        <div className="fade-in max-w-xl mx-auto glass-dark p-6 rounded-3xl border border-red-500/20 flex flex-col items-center text-center">
                            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Operation Halted</h3>
                            <p className="text-zinc-500 mb-6">{error}</p>
                            <button
                                onClick={() => setError(null)}
                                className="px-6 py-2 rounded-full border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-2"
                            >
                                <RefreshCcw className="w-4 h-4" />
                                Retry System
                            </button>
                        </div>
                    )}

                    {restaurants.length > 0 && (
                        <div className="fade-in">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span className="w-2 h-8 food-gradient rounded-full" />
                                    Elite Selections Found
                                </h2>
                                <span className="text-zinc-500 font-medium">{restaurants.length} establishments listed</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {restaurants.map((res, index) => (
                                    <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <RestaurantCard restaurant={res} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!loading && !error && restaurants.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-zinc-700" />
                            </div>
                            <p className="text-zinc-600 font-medium text-lg italic tracking-wide">System idle. Waiting for target coordinates...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recommend;
