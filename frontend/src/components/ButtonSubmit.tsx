function ButtonSubmit({label, onclick}: {label: string, onclick: (e: any) => void}) {
  return (
    <button onClick={onclick} className='w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white font-mono font-semibold text-2xl transition-colors duration-150'>{label}</button>
  )
}

export default ButtonSubmit 