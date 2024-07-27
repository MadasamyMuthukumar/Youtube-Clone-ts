//we want different types of button so creating this component

import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
//takes two parameters
// 1.takes array of classes adds to every buttonStyles
//2.takes an object which has variants poperty wich determines what keys we want to set
//transition color makes cool transtion when color changes while hovering
export const buttonStyles = cva(["transition-colors"],{
variants:{
//own key which contains differnt styles of button
    variant:{
        
        //normal button with background
    default:["bg-secondary","hover:bg-secondary-hover"],
    //ghost style which has no backgroung until hover
    ghost:["hover:bg-gray-100"],
    dark: ["bg-secondary-dark","hover:bg-secondary-dark-hover","text-secondary"]
    },
    //specify all idffernt size you want
  size:{

      default:["rounded","p-2"],
      //icon buttons will be rounded buttons
      icon:["rounded-full","w-10","h-10","flex","items-center","justify-center","p-2.5"]
  }
},
//defaulty applies to the buttons when nothing is provided
defaultVariants:{
    //when we did not pass variant or size it will use the default ones we have created
variant:"default",
size:"default"
}
})
//include normal button props to our custom button
type ButtonProps=VariantProps<typeof buttonStyles> & ComponentProps<"button">

//also destructing all addition props from button normally
//merging the custom  classes(className) passing through the Button component with tailwind css for perfect workinng behavior
export function Button({variant,size,className, ...props}:ButtonProps){
    return <button {...props} className={twMerge(buttonStyles({variant,size}),className)} />
}