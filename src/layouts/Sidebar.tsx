import { ChevronDown, ChevronUp, Clapperboard, Clock1, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react"
import { Children, ElementType, ReactNode, useState } from "react"
import { Button, buttonStyles } from "../components/Button"
import { twMerge } from "tailwind-merge"
import { playlists, subscriptions } from "../data/sidebar"
import { useSidebarContext } from "../contexts/SidebarContext"
import { PageHeaderFirstSection } from "./PageHeader"

export function Sidebar(){
    const {isLargeOpen,isSmallOpen,close}=useSidebarContext();
    return <>
    {/* /**
    SMALLER SIDEBAR SSECTION
     * sticky ot the top and overflow y direction as auto to make it scrollable
     * flex-col to arrrange items in vertical and scrollbar hiddien to make hide default scrollbar
     * When the large screen was open then Smaller icons section was not shown
     * In large screen the menu was clicked then isLargeOpen set to false then the Sidebar should be minimized and small section needs to show
     * If larger section was opened then smaller  should be hide, otherwise smaller should be shown
     * We are doing this  last three things only for lg(large screens) for small screens it always flex(showinng)
     */ }
    <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 mr-3 ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}> 
    <SmallSidebarItem Icon={Home} title="Home" url="/" />
    <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
    </aside>

{/* when on small screen when the sidebar was open then make entire all section darker
here this div will become giant div occpuying entire space  
it should be hidden on large screen only appplicable for smaller screen
when the remaining area was clicked then it call close function which makes sidebar to close*/}
    {
      isSmallOpen && (
        <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"/>
      )
    }

    {/* LARGER SIDEBAR SECTION 
    width will be hardcoded, large screen size it will be stcky
    making absolute because in smaller screensize this section needs to be pop up and for larger it sticky
    overflow will be true and scrollbar hidden
    lg:flex hidden for making large section vsible only in large screen and defualtly hidden
    when isLarge is true then the large section should display in larger screens
    when isSmall is true which means in smaller screens the large section should display as pop up and hidden when toggled*/}

    <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 
      ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
        {/* WE have differenc sections in large side bar each has items so we are having below two components
        large side bar section can have title of section and number of visible items for a section(remaining will be inn show more) */}
         
         {/* Rendering pageHeader in Larger SideBar to show menu icon in larger section 
         hiding in large screen to avoid doube logo problem*/}
         <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
          </div>
         
         <LargeSidebarSection>
            <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
            <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
         </LargeSidebarSection>

         <hr/>

         <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock1}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {
            playlists.map((playlist)=>(
                <LargeSidebarItem
                key={playlist.id}
                IconOrImgUrl={ListVideo}
                title={playlist.name}
                url={`/playlist?list=${playlist.id}`}
              /> 
            ))
          }
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title="Subscriptions">
            {
                subscriptions.map((subscription)=>(
                    <LargeSidebarItem
                key={subscription.id}
                IconOrImgUrl={subscription.imgUrl}
                title={subscription.channelName}
                url={`/@${subscription.id}`}
              /> 
                ))
            }
         
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>


    </aside>
    </> 
}
type SmallSidebarItemProps = {
    Icon: ElementType | string
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
    const [isExpanded , setIsExpanded ] = useState(false);
    //making children elements to array of children and flat to make 1D array
    const childrenArray = Children.toArray(children).flat();
    //if isExpanded was set then dispaly all children..otherwise only showthe visbileCount no of items
    const vibileChilren =isExpanded ? childrenArray :  childrenArray.slice(0,visibleItemCount);
    //need to show (show more) button when children array has more item that visible count value
    const showExpandedButton = childrenArray.length > visibleItemCount

    const ButtonIcon = isExpanded  ? ChevronUp : ChevronDown ;
    return <div>
        {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div> }
        {vibileChilren}
        {
            showExpandedButton && (
               <Button onClick={()=> setIsExpanded(e=>!e)} variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3">
                <ButtonIcon className="w-6 h-6" />
                <div>{isExpanded ? "Show Less" : "Show More"}</div>
               </Button>
            )
        }
        </div>

}

type LargeSidebarItemProps = {
    //can be icon element or img url
    IconOrImgUrl: ElementType | string
    title: string
    url: string
    isActive?: boolean //to  determine the selected item
}

function LargeSidebarItem ({IconOrImgUrl: Icon,title,url, isActive=false}:LargeSidebarItemProps){
    /**
     * will take full width of section
     */
    return <a href={url} className={twMerge(buttonStyles({variant:"ghost"}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
        {/* //if icon was string the it was a url img tag will be loaded */}
    {typeof(Icon) === "string" ? (<img src={Icon} className="w-6 h-6 rounded-full" />) : ( <Icon className="w-6 h-6" />)}    
   
    <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>

  </a>

}