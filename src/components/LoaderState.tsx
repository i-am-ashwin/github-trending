
export default function LoaderState() {
    return (
      <div className="text-center py-16 bg-white border-4 border-black shadow-[8px 8px 0px 0px rgba(0,0,0,1)] p-8">
        <div className="w-20 h-20 bg-yellow-300 border-4 border-black shadow-[4px 4px 0px 0px rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-6 animate-pulse">
        <div className="w-5 h-5 border-2 border-black  animate-spin"></div>
        </div>
        <h3 className="text-2xl font-black text-black mb-4">Loading Repositories...</h3>
        <p className="text-black font-bold text-lg">Fetching the latest repositories from GitHub</p>
      </div>
    );
}