interface LabelledInputProps {
    label: string
    placeholder: string
    onchange: (e: any) => void
    type?: string
}
function LabelledInput({label, placeholder, onchange,type}: LabelledInputProps) {
  return (
    <div className="w-full relative mb-5">
        <label className='font-inter text-sm text-slate-500 font-medium mb-1 block capitalize'>{label}</label>
        <input name="label" placeholder={placeholder} onChange={onchange} type={type||"text"} className='w-full border border-slate-300 px-4 py-3 focus:outline-none rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 text-slate-800 bg-slate-50 focus:bg-white placeholder:text-slate-400'/>
    </div>
  )
}
export default LabelledInput