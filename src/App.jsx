import React from 'react'
import { Link } from 'react-router'

export default function Home() {
  return (
    <div>
      <div className="header-container">
        <div className='image-container'>
          <img src="" alt="Logo" />
          </div>
        <div className='btn-container'>
            <Link to={"/upload"}>
            <button className='upload-btn' >Upload</button>
            </Link>
        </div>
      </div>
      <div className='main-container'>
        <div className='container-left'>
            <ul>
                <li>Love</li>
                <li>Friend</li>
                <li>Appa</li>
                <li>Amma</li>
                <li>Siblings</li>
            </ul>
        </div>
        <div className='right container'>
                       
        </div>
      </div>
    </div>
  )
}
