function ButtonSubmit({label, onclick}: {label: string, onclick: (e: any) => void}) {
  return (
    <button onClick={onclick} className='w-full bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 px-6 py-3 rounded-xl text-white font-inter font-semibold text-lg transition-all duration-200'>
      {label}
    </button>
  )
}

export default ButtonSubmit