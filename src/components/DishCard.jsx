const DishCard = ({ name, price }) => {
    return (
        <div className="bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/50 hover:border-orange-500/30 transition-all group">
            <p className="text-zinc-200 font-medium text-sm group-hover:text-orange-400 transition-colors uppercase tracking-wider">{name}</p>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium">Starting from</span>
                <span className="text-orange-500 font-bold text-sm">₹{price}</span>
            </div>
        </div>
    );
};

export default DishCard;
