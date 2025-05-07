import React, {useState, useEffect} from 'react'

const HeaderToolbar: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>(new Date().toLocaleString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(timer) // Cleanup on component unmount
  }, [])

  return (
    <div className="toolbar d-flex align-items-center justify-content-between px-4 py-3 bg-light shadow-sm">
      {/* Left Section: Title */}
      <div className="d-flex align-items-center">
        <h1 className="fs-4 fw-bold text-primary m-0">SkyFleet - Air Transport Management</h1>
      </div>

      {/* Right Section: Date and Time */}
      <div className="d-flex align-items-center bg-primary text-white px-3 py-2 rounded">
        <label className="fs-6 fw-semibold m-0">
          {currentDateTime}
        </label>
      </div>
    </div>
  )
}

export {HeaderToolbar}