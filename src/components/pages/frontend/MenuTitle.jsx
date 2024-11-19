import React from 'react'
import { imgPath } from '../helpers/functions-general'

const MenuTitle = () => {
  return (
    <>
        <div className="p-4 bg-primary flex items-center text-white gap-5">
            <img src={`${imgPath}/jollibee-logo.png`} alt="" />
            <h2 className="mb-0">Palabok</h2>
        </div>
    </>
  )
}

export default MenuTitle
