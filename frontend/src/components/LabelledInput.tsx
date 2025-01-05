interface LabelledInputProps {
    label: string
    placeholder: string
    onchange: (e: any) => void
    type?: string
}
function LabelledInput({label, placeholder, onchange,type}: LabelledInputProps) {
  return (
    <>
        <label htmlFor="password" className='font-serif text-gray-600 font-semibold mb-2'>{label}</label>
        <input id="password" name="label" placeholder={placeholder} onChange={onchange} type={type||"text"} className='w-full border-2 px-4 py-2 border-gray-300 focus:outline-none rounded-md focus:border-blue-500 mb-4'/>
    </>
  )
}
export default LabelledInput