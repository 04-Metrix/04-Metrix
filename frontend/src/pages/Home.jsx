export default function Home() {
  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDashboardPreview = () => {
    const element = document.getElementById('dashboard-preview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 font-sans selection:bg-indigo-100">
      {/* 1. Navigation Bar */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
             <span className="text-white font-bold text-xs">04</span>
          </div>
          <span className="font-bold text-xl tracking-tight">04-Metrix</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <button onClick={scrollToFeatures} className="hover:text-black transition">Features</button>
        </div>
        <button onClick={() => window.location.href = '/dashboard'} className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition">
          Get Started
        </button>
      </nav>

      {/* 2. Hero Section */}
      <main className="pt-32 pb-20 flex flex-col items-center px-6">

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-center max-w-4xl mb-6">
          An AI tutor made <br /> <span className="text-slate-500">for you</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 text-center max-w-2xl mb-10 leading-relaxed">
          Turns your learning materials into notes, interactive chats, quizzes, and more.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button onClick={scrollToDashboardPreview} className="px-8 py-3 rounded-full border border-slate-200 font-semibold hover:bg-slate-50 transition">
            See features
          </button>
          <button onClick={() => window.location.href = '/dashboard'} className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-200">
            Start Learning
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col items-center gap-3 mb-20">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
              <img src="/images/ME.jpeg" alt="ME" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
              <img src="/images/Bamm.jpeg" alt="Bamm" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
              <img src="/images/Babai.jpeg" alt="Babai" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
              <img src="/images/kaala.jpeg" alt="kaala" />
            </div>
          </div>
          <p className="text-sm text-slate-500">Built by <span className="font-bold text-slate-900">4 legendary developers</span></p>
        </div>

        {/* 3. Product Preview Image */}
        <div id="dashboard-preview" className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-200 shadow-2xl overflow-hidden bg-slate-50 transform perspective-1000">
             {/* Replace this div with an <img> of your actual dashboard */}
            <div className="aspect-video bg-gradient-to-tr from-slate-100 to-white p-4">
                <div className="w-full h-full rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-300">
                    [ Dashboard Preview Image ]
                </div>
            </div>
        </div>
      </main>

      <div id="features" className="py-20">
        {/* Features content goes here */}
      </div>
    </div>
  )
}