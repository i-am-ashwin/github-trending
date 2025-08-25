export default function ErrorState({error}: {error: string}) {
       return (
      <div className="text-center py-16 bg-white border-4 border-black shadow-[8px 8px 0px 0px rgba(0,0,0,1)] p-8">
        <div className="w-20 h-20 bg-red-300 border-4 border-black shadow-[4px 4px 0px 0px rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">❌</span>
        </div>
        <h3 className="text-2xl font-black text-black mb-4">Error Loading Repositories</h3>
        <p className="text-black font-bold text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-lime-300 border-2 border-black shadow-[4px 4px 0px 0px rgba(0,0,0,1)] hover:shadow-[6px 6px 0px 0px rgba(0,0,0,1)] font-bold text-black transition-all"
        >
          Try Again
        </button>
      </div>
    );
}