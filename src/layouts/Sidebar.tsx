import { Clapperboard, Home, Library, Repeat } from "lucide-react"
import { Children, ElementType, ReactNode } from "react"
import { buttonStyles } from "../components/Button"
import { twMerge } from "tailwind-merge"

export function Sidebar(){
    
    return <>
    {/* /**
    SMALLER SIDEBAR SSECTION
     * sticky ot the top and overflow y direction as auto to make it scrollable
     * flex-col to arrrange items in vertical and scrollbar hiddien to make hide default scrollbar
     */ }
    <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 mr-3 lg:hidden"> 
    <SmallSidebarItem Icon={Home} title="Home" url="/" />
    <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
    </aside>

    {/* LARGER SIDEBAR SECTION 
    width will be hardcoded, large screen size it will be stcky
    making absolute because in smaller screensize this section needs to be pop up and for larger it sticky
    overflow will be true and scrollbar hidden*/}

    <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 flex">
        {/* WE have differenc sections in large side bar each has items so we are having below two components
        large side bar section can have title of section and number of visible items for a section(remaining will be inn show more) */}
         
         <LargeSidebarSection visibleItemCount={1} title="Hero">
            <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
         </LargeSidebarSection>

    </aside>
    </> 
}
type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
}
//function for smaller sidebar icons
function SmallSidebarItem({Icon,title,url}:SmallSidebarItemProps){
    //merging the custom  classes(className) passing through the a tag with tailwind css for perfect workinng behavior
  return <a href={url} className={twMerge(buttonStyles({variant:"ghost"}), "py-4 px-1 flex flex-col items-center gap-1 rounded-lg")}>
    <Icon className="w-6 h-6" />
    <div className="text-sm">{title}</div>

  </a>
}

type LargeSidebarSectionProps ={
    children: ReactNode
    title?: string   //title of section
    visibleItemCount?: number  //number of items to show in a section
}
//default count of visible items must be all items
function LargeSidebarSection({children,title,visibleItemCount=Number.POSITIVE_INFINITY}: LargeSidebarSectionProps){
    const childrenArray = Children.toArray(children).flat();
    const vibileChilren = childrenArray.slice(0,visibleItemCount);
    return <div>
        {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div> }
        {vibileChilren}
        </div>

}

type LargeSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
    isActive?: boolean //to  determine the selected item
}

function LargeSidebarItem ({Icon,title,url, isActive=false}:LargeSidebarItemProps){
    /**
     * will take full width of section
     */
    return <a href={url} className={twMerge(buttonStyles({variant:"ghost"}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
    <Icon className="w-6 h-6" />
    <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>

  </a>

}