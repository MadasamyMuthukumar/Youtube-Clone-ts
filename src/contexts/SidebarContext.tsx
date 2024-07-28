import { createContext, ReactNode, useContext, useEffect, useState } from "react"
/**
 * Creating context for providing information to PageHEader Comp and Sidebar comp for Expand and collapsing sidebar
 * Sidebar will independently work for smaller and large screens..so we need to handle for two screens seperatey
 */
type SidebarProviderProps ={
    children:ReactNode
}

type SiebarContextType ={
    isLargeOpen : boolean //to determin the large screen
    isSmallOpen : boolean //to determine the small screen
    toggle:()=>void
    close:()=>void
}

const SidebarContext = createContext<SiebarContextType | null>(null)

export function useSidebarContext(){
const value = useContext(SidebarContext);
if(value == null) throw Error ("Cannot use outside of SidebarProvider")
return value;
}

export function SidebarProvider ({children}:SidebarProviderProps) {
    const [isLargeOpen,setIsLargeOpen] = useState(true) //default in large screen sidebar needs Open
    const [isSmallOpen,setIsSmallOpen] = useState(false) //sidebar needs to be defaultyl close in small screen

{/**
    at small screen the sidebar was open after that the screen is made to larger
    2.then again shrink to smaller scrreen this time  the large side bar doesnot show in small screen
    3. to do that..add resize evernt listener
    4.whenever the we are not in small screen set smallOpen to false
    5.this will automatically close the large sidebar in smaller screens */}
    useEffect(()=>{
        const handler=()=>{
            if(!isSmallScreen()) setIsSmallOpen(false)
        }
        window.addEventListener("resize",handler)
        return ()=>{
            window.removeEventListener("resize",handler);
        }
    },[])
    function isSmallScreen(){
        return window.innerWidth < 1024 //check for smaller screen
    }

    function toggle(){
        //if screen size is small toggling will work for small screen otherwise
        //toggling will work for large screen
        if(isSmallScreen()){
            setIsSmallOpen(s=>!s)
        }
        else{
            setIsLargeOpen(l=>!l)
        }
    } 
    function close (){
        //close() is used to close the sidebar
        if(isSmallScreen()){
            setIsSmallOpen(false)
        }
        else{
            setIsLargeOpen(false)
        }
    }
    return <SidebarContext.Provider value={{isLargeOpen,
        isSmallOpen, toggle,close
    }}>
        {children}
    </SidebarContext.Provider>

}