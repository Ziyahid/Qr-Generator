import { useState } from 'react'


const QrCode = () => {

  const [img,setImg] = useState("");
  const [loading,setLoading] = useState(false);
  const [qrData,setQRData] = useState("");
  const [qrSize,setQRSize] = useState()


  async function generateQR(){
    setLoading(true)
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
      setImg(url) 
    }
    catch(err){
      console.error(err)
    }
    finally{
      setLoading(false)
    }
  }

function downloadQR(){
  fetch(img)
  .then((response)=>response.blob())
  .then((blob)=>{
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Qr.png"
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
  })
}
  return (
    <div className='app-container'>
      <h1>Qr Code Generator</h1>
      {loading && <p>Loading...</p>}
      {img && <img src={img} className='qr-code-image' />}
      <div>

      <label htmlFor="dataInput">Enter data for generate QR</label>
      <input type="text" value={qrData} placeholder='Enter Value' id='dataInput' onChange={(e)=>{
        setQRData(e.target.value)
      }} />

      <label htmlFor="sizeInput">Enter data for generate QR</label>
      <input type="text" value={qrSize} placeholder='Enter Value' id='sizeInput' onChange={(e)=>{
        setQRSize(e.target.value)
      }} />

      <button className='Generate-button' onClick={generateQR}>Generate Qr</button>
      <button className='Download-button' onClick={downloadQR}>Download QR</button>

      </div>
      <p className='footer'>Designed by <span>Ziyahid</span></p>


      
    </div>
  )
}

export default QrCode

