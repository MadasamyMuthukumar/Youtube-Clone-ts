

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
type CategoryPillProps={
    categories:string[],
    selectedCategory:string,
    onSelect:(category:string)=>void
}
export function CategoryPills({categories, selectedCategory,onSelect }:CategoryPillProps){
    // console.log(categories)

    const [translate,setTranslate]=useState(0);
    const [isLeftVisible,setLeftVisible]=useState(false);
    const [isRightVisible,setRightVisible]=useState(false);
    //using ref for container class to calculate the size of the container to make decistion for scroling
    const containerRef = useRef<HTMLDivElement>(null);
    const TRANSLATE_AMOUNT=200;

    useEffect(()=>{
        if(containerRef.current == null) return
      const observer = new ResizeObserver(entries=>{
          const container = entries[0]?.target; //entires[0] will have the div (containerRef.current)
          if(container == null) return
          setLeftVisible(translate > 0) //if translate value greater than 0 then icon must display
          //translate value + client widhth must be less than possible scrollable width to show right icon
          setRightVisible(translate + container.clientWidth < container.scrollWidth)
      })  
      //it will obser the div element
      observer.observe(containerRef.current)
      //cleanup code
      return () => {
        observer.disconnect();
      }

    },[translate]) //need to determine showcase of icon if translate or categories change
    
    /**
     * 1.making overflow hidden to allow arrow icons to make scroll
     * relative to make arrrows absolute to it
     *  */ 
    return <div ref={containerRef} className="overflow-x-hidden relative">
        {/* Arraning items side by side, making no wrap then only we can make scrollable 
        transition transform for making sliding when arrow was clicked 
        take maximum space it can*/}
        <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{transform: `translateX(-${translate}px)`}}>

            {
                categories.map(category=>(
                    <Button onClick={()=>onSelect(category)} key={category} variant={selectedCategory === category ? "dark" : "default"} className="py-1 px-3 rounded-lg whitespace-nowrap">
                        {category}
                    </Button>
                ))
            }
        </div>
        {/* Left Arrow Section  
        top:50% and vertically lifting upwards 50% to make perfect fit 
        translte-y to move the element upward by half of its own height (1/2). This centers the element perfectly vertically within its parent container.*/}
        {isLeftVisible &&
         <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
            {/* aspect-square : It ensures that the element remains a perfect square regardless of the viewport size or the content inside it */}
            <Button variant="ghost" size="icon" className="h-full aspect-square w-auto p-1.5"
            onClick={()=>{
                setTranslate((translate)=>{
                    //function to slide div 100px for each time click
            const newTranslate = translate - TRANSLATE_AMOUNT;
            // console.log(translate," ",newTranslate);
            //if reducted value less than equal to 0 then move the div to orginal position 0
            if(newTranslate<=0) return 0;        
            return newTranslate;
                })
            }}>
                <ChevronLeft />
            </Button>
         </div>
        }

    {isRightVisible &&
    // justify end is to put right arrow to the maximum right(irrespective of its parent contianer)
         <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent 
         w-24 h-full flex justify-end">
            {/* aspect-square : It ensures that the element remains a perfect square regardless of the viewport size or the content inside it */}
            <Button variant="ghost" size="icon" className="h-full aspect-square w-auto p-1.5"
            onClick={()=>{
                setTranslate((translate)=>{
                    //function to slide div 100px for each time click
                    //to check before scrolling if container exist or not. 
                    //containerref used to determine the overall size and how far we have before we need to stop translating
            if(containerRef.current==null) return translate;
            /**
             * edge will give the entire  scrollable width of a div
             * width will give the visible width (amount of width showing on the screen)
             */
            const edge = containerRef.current.scrollWidth;
            const width = containerRef.current.clientWidth;
            const newTranslate = translate + TRANSLATE_AMOUNT;
            // console.log(translate," ",newTranslate);
            /**to determine we have room to scroll
             * newtranslate plus the current widht(showing on screen) is greater than total possible edge, then we too far across screen
             * then return only the possible scrollabe remaining value (edge-width)
             */
            if(newTranslate + width >= edge){
                return edge - width;
            }     
            return newTranslate;
                })
            }}>
                <ChevronRight />
            </Button>
         </div>
        }

    </div>;
}