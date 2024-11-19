import React from 'react'
import { imgPath } from '../helpers/functions-general'

const MenuList = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
        <button>
            <img src={`${imgPath}/nav-burger.webp`} alt="" />
            <h6 className="font-bold">Regular Yumburger</h6>
            <p className="text-sm">P 150.00</p>
        </button>
        <button>
            <img src={`${imgPath}/nav-burger.webp`} alt="" />
            <h6 className="font-bold">Regular Yumburger</h6>
            <p className="text-sm">P 150.00</p>
        </button>
        <button>
            <img src={`${imgPath}/nav-burger.webp`} alt="" />
            <h6 className="font-bold">Regular Yumburger</h6>
            <p className="text-sm">P 150.00</p>
        </button>
        <button>
            <img src={`${imgPath}/nav-burger.webp`} alt="" />
            <h6 className="font-bold">Regular Yumburger</h6>
            <p className="text-sm">P 150.00</p>
        </button>
    </div>
  )
}

export default MenuList
