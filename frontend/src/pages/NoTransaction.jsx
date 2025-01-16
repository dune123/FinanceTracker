import React from 'react'

const NoTransaction = () => {
  return (
    <div 
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"100%",
            flexDirection:"column",
            marginBottom:"2rem"
        }}
    >
        <img src="/transac.svg" alt="Example Icon" style={{width:"400px",margin:"4rem"}}/>
        <p style={{textAlign:"center",fontSize:"1.2rem"}}>
            You Have No Transactions Currently
        </p>
    </div>
  )
}

export default NoTransaction