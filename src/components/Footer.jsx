import { Utensils } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Utensils className="w-6 h-6 text-orange-500" />
                        <span className="text-xl font-bold food-gradient-text tracking-tight">GourmetAI</span>
                    </div>

                    <div className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} GourmetAI Recommendation System. All rights reserved.
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm font-medium">Privacy Policy</a>
                        <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm font-medium">Terms of Service</a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-zinc-900 text-center">
                    <p className="text-zinc-600 text-xs">
                        Powered by FastAPI & React. Designed with passion for foodies.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
