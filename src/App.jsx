import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  let [password, setPassword] = useState("")
  let [length, setLength] = useState(6)
  let [allowNum, setAllowNum] = useState(false)
  let [allowChar, setAllowChar] = useState(false)


  //useRef hook

  const passwordRef = useRef(null)
 const copyPassword = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)},[password])

  const passwordGenerator = useCallback(()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(allowNum) str+= "0123456789"
    if(allowChar) str+= "!@#$%^&*_-+={}[]'~"

    for(let i = 1; i<=length; i++){

      let char = Math.floor(Math.random()*str.length+1)
      pass+= str.charAt(char)
    }

    setPassword(pass)
  }, [length, allowNum, allowChar, setPassword ])

  useEffect(()=>{
    passwordGenerator()
  },[length, allowNum, allowChar, passwordGenerator])

  return (
   <>
   
  <div className=' border-white mt-32 bg-#282828 '>



 <h1 className=' m-10 text-4xl text-center text-white font-bold'>Password Generator</h1>
    <div className=' flex items-center justify-center text-center m-8  p-6'>
      <input className='  text-white px-1 py-1.5 w-3/10 border border-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700'  type="text"
      readOnly
      value={password}
      placeholder='password'
      ref={passwordRef}
      
     
      />

      <button  onClick={copyPassword} className='bg-blue-500 hover:bg-blue-600 mx-1 text-white px-4 py-2 rounded-md w-32 transition duration-200 cursor-pointer'>Copy</button>

    </div>

   <div className='flex items-center justify-center text-center gap-5'>



   <div className=' flex justify-center text-center'>
    <input type="range"  className='text-white px-1' 
    min={6}
    max={36}
    onChange={(e)=>{setLength (e.target.value)}}/>
    <label className='px-2 text-white' >Length : {length}</label>

   </div>


   <div className=' flex justify-center text-center'>
    <input type="checkbox"  className='text-white px-1' 
    
   onChange={()=>{
    setAllowNum((prev)=>!prev)
   }}
   />
    <label className='px-2 text-white' >Include Numbers</label>

   </div>

   <div className=' flex justify-center text-center'>
    <input type="checkbox"  className='text-white px-1' 
    onChange={()=>{setAllowChar((prev)=>!prev)}}/>
    <label className='px-2 text-white' >Include Symbols</label>

   </div>




   </div>



  </div>
   
   
   
   
   </>
  )
}

export default App