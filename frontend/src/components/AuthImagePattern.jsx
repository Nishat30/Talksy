const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gray-900 p-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-xl"></div>
      
      <div className="max-w-md text-center relative z-10">
        {/* True Glassmorphic Two Person Icon */}
        <div className="flex items-center justify-center mb-10">
          <div className="relative">
            {/* Glassmorphic container */}
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/40 rounded-3xl p-16 shadow-2xl">
              {/* Two person icon with glassmorphic styling */}
              <div className="flex items-end justify-center gap-10">
                {/* Person 1 - Larger */}
                <div className="relative">
                  {/* Head */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white-200 via-grey-400 to-zinc-00 to-85% shadow-lg mb-2 mx-auto bg-opacity-30"
                  style={{ backgroundColor: '#edf5f1' }}></div>
                  {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-800 shadow-lg"></div> */}

                  {/* Body */}
                  <div className="h-20 w-24 rounded-tl-full rounded-tr-full bg-white/15 bg-gradient-to-r from-gray-100 to-gray-700/80 backdrop-blur-sm border border-white/25 shadow-lg"
                  style={{ backgroundColor: '#edf5f1' }}></div>
                </div>
                
                {/* Person 2 - Smaller, overlapping */}
                <div className="relative -ml-2 bottom-10">
                  {/* Head */}
                  {/* <div
                    className="w-12 h-12 rounded-full backdrop-blur-sm border bg-gradient-to-r from-blue-200 to-blue-900 border-white/30 shadow-lg mb-3 mx-auto"
                    style={{ backgroundColor: 'rgba(3, 78, 252, 0.6)' }} // Original hex with 60% opacity
                  ></div> */}
                  <div className="w-12 h-12 rounded-full bg-gradient-radial from-sky-200 via-blue-400 to-indigo-900 bg-[radial-gradient(at_50%_75%,#bae6fd,#60a5fa,#1e3a8a)] mb-2 mx-auto bg-opacity-30"></div>

                  {/* Body */}
                  <div className="h-16 w-20 rounded-tl-full rounded-tr-full bg-gradient-radial from-sky-200 via-blue-400 to-indigo-900 bg-[radial-gradient(at_50%_75%,#bae6fd,#60a5fa,#1e3a8a)]"
                     style={{ backgroundColor: 'rgba(3, 78, 252, 0.3)' }}></div> {/* Original hex with 40% opacity */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-primary/60"></div>
          <div className="w-2 h-2 rounded-full bg-primary/40"></div>
          <div className="w-2 h-2 rounded-full bg-primary/20"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;