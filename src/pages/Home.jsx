import { Link } from 'react-router-dom';
import { ChefHat, Sparkles, Wallet, ArrowRight } from 'lucide-react';

const Home = () => {
    const features = [
        {
            title: 'Smart AI Powered',
            desc: 'Our advanced algorithms analyze thousands of reviews to find your perfect match.',
            icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
        },
        {
            title: 'Personalized Picks',
            desc: 'Get recommendations tailored exactly to your unique cravings and style.',
            icon: <ChefHat className="w-8 h-8 text-orange-400" />,
        },
        {
            title: 'Budget Friendly',
            desc: 'Discover incredible dining experiences that won\'t break the bank.',
            icon: <Wallet className="w-8 h-8 text-red-400" />,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Food background"
                        className="w-full h-full object-cover scale-110 blur-sm opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white animate-fade-in">
                        Discover The Best <br />
                        <span className="food-gradient-text">Restaurants</span> Near You
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Experience culinary excellence with AI-powered recommendations tailored to your taste, budget, and location.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <Link to="/recommend" className="group px-8 py-4 rounded-full food-gradient text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(255,95,31,0.5)] transition-all flex items-center justify-center gap-2">
                            Get Recommendations
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 bg-zinc-950">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose <span className="text-orange-500 underline decoration-red-500/50 underline-offset-8">GourmetAI</span>?</h2>
                    <p className="text-zinc-500 max-w-xl mx-auto text-lg">We combine state-of-the-art AI with local expertise to deliver unmatched dining experiences.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="glass-dark p-8 rounded-3xl border border-zinc-800 hover:border-orange-500/30 transition-all hover:-translate-y-2 group shadow-xl">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors tracking-tight">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-orange-950/20">
                <div className="max-w-4xl mx-auto glass-dark p-12 rounded-[3rem] border border-orange-500/20 text-center shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] -z-1" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 blur-[100px] -z-1" />

                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white leading-tight">Ready to find your <br /> next <span className="text-orange-500">favorite meal</span>?</h2>
                    <p className="text-zinc-400 mb-10 text-lg max-w-xl mx-auto">Join thousands of foodies who use GourmetAI to discover hidden gems and world-class dining.</p>
                    <Link to="/recommend" className="inline-block px-10 py-5 rounded-full bg-white text-zinc-950 font-black text-xl hover:bg-orange-500 hover:text-white transition-all hover:scale-105 shadow-xl">
                        Start Exploring Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
