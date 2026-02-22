import { Star, MapPin, IndianRupee, Info } from 'lucide-react';
import DishCard from './DishCard';

const RestaurantCard = ({ restaurant }) => {
    const { name, rating, price_range, address, why_recommended, famous_dishes } = restaurant;

    return (
        <div className="glass-dark rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-zinc-800 hover:border-orange-500/50 group shadow-2xl">
            <div className="relative h-4 w-full food-gradient opacity-80" />

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">{name}</h3>
                        <div className="flex items-center gap-1 mt-1 text-zinc-400">
                            <MapPin className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-xs truncate max-w-[200px]">{address}</span>
                        </div>
                    </div>
                    <div className="bg-orange-500/20 px-2 py-1 rounded-lg border border-orange-500/30 flex items-center gap-1">
                        <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span className="text-orange-500 font-bold text-sm tracking-tight">{rating}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-zinc-300">
                        <IndianRupee className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm font-semibold">{price_range}</span>
                    </div>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold uppercase text-orange-500 tracking-wider">Why Recommended</span>
                    </div>
                    <p className="text-zinc-400 text-sm italic leading-relaxed">
                        "{why_recommended}"
                    </p>
                </div>

                <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-zinc-500 tracking-widest pl-1">Signature Dishes</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {famous_dishes?.map((dish, index) => (
                            <DishCard key={index} name={dish.name} price={dish.price} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
