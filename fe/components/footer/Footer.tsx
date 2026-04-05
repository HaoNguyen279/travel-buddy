import React from 'react'


// declare type chuan production vip pro max
type FooterItems = {
    itemName : string,
    linkTo : string
}
type FooterProps = {
    footerTitle : string,
    footerItems : FooterItems[]
}


export default function Footer({props} : {props : FooterProps[]}) {
  return (
    <div style={{backgroundColor : "#f5f5f5"}} className="w-full text-center text-sm text-gray-500 flex-shrink-0 py-5">
        <div className='flex flex-row items-start justify-around max-w-6xl background-color: #f5f5f5 mx-auto px-2 py-2'>
                {props.map((item)=>{
                    return (<div className='items-center gap-2'>
                                <h3 className='text-start text-gray-700 font-bold text-lg mb-3'>{item.footerTitle}</h3>
                                <ul className='flex flex-col items-start gap-2'>
                                    {item.footerItems.map((footItem)=>{
                                        return <li><a href={footItem.linkTo} className='hover:text-blue-500 transition-colors duration-300 ease-in-out'>{footItem.itemName}</a></li>
                                    })}
                                </ul>
                            </div>
                    )
                })} 
        </div>
        <hr className='max-w-5xl mx-auto border-gray py-3' />
        <div>© Copyright 2069</div>
        <div>This booking site was developed by h nguyen</div>


    </div>
  )
}
