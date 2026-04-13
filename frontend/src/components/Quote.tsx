function Quote() {
  return (
    <div className='bg-gradient-to-br from-primary-900 to-indigo-900 text-white p-8 md:p-16 w-full h-full flex justify-center items-center relative overflow-hidden'>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-400 via-transparent to-transparent"></div>
      <div className='flex flex-col justify-center items-start z-10 max-w-xl font-outfit'>
        <div className='text-4xl md:text-5xl font-bold leading-tight mb-6 animate-fade-in text-white/90'>
          "The best way to write is to write. Build an audience, one post at a time."
        </div>
        <div className='text-xl font-medium text-primary-200 animate-slide-up'>CEO, Postly Inc.</div>
      </div>
    </div>
  );
}

export default Quote;