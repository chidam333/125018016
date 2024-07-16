'use client'
import { useState } from "react"


export default function Home() {
  const [n,setn]=useState('10')
  const [min,setMin]=useState('1')
  const [max,setMax]=useState('10000')
  const [exp,setExp]=useState('amz,flp')
  const [page,setPage]=useState('1')
  const [catName,setCat]=useState('Phone')
  const [data,setData]=useState([])
  async function callInternalApi(){
    let response = await  fetch(`/api/categories/${catName}/products?n=${n}&page=${page}&min=${min}&max=${max}&ex_cmp=${exp}`)
    let d = await response.json()
    console.log(d)
    setData(d)
  }
  return (
    <div>
    <div className="grid mt-[20vh] h-[50vh] w-[100vw] place-items-center">
      <div className="n "> enter n : &nbsp;&nbsp;&nbsp; <input className="text-black" onChange={(e)=>{setn(e.target.value)}} value={n} type="text" placeholder="10"/></div>
      <div className="n"> enter min : <input className="text-black" onChange={(e)=>{setMin(e.target.value)}} type="text" value={min} placeholder="1"/></div>
      <div className="n"> enter max : <input className="text-black" onChange={(e)=>{setMax(e.target.value)}} type="text" value={max} placeholder="10000"/></div>
      <div className="n"> enter exc : <input className="text-black" onChange={(e)=>{setExp(e.target.value)}} type="text"value={exp} placeholder="amz,flp"/></div>
      <div className="n"> enter cat : <input className="text-black" onChange={(e)=>{setCat(e.target.value)}} type="text" value={catName} placeholder="amz"/></div>
      <div className="n"> enter page : <input className="text-black" onChange={(e)=>{setPage(e.target.value)}} type="text" value={page} placeholder="1"/></div>
      <button className="bg-red-300 p-2 " onClick={()=>{callInternalApi()}}>submit</button>
    </div>
    {data.map((d,e)=>{
      return (
        <div key={e}>
                Name-{d.productName} , Rating-{d.rating} , Price-{d.price}  
        </div>
      )
    })}
    </div>
  )
}