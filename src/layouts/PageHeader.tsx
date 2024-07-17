import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';
import logo1 from '../assets/logo1.png'
import { Button } from '../components/Button';
import { useState } from 'react';
export const PageHeader=()=>{
    const [showFullWidthSearch, setShowFullWidthSearch]=useState(false);

    //gap between elements in header was 10 when smaller screen and 20 when large screen
return <div className={`flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4`}>
   
   {/* LEFT SECTION */}

    {/* vetically aligned center, this section(logo) does not shrinkwhen the size of screen reducer 
    NOTE: when search clicked in saller screen then logo should disappear inorder to provide full width for search bar*/}
    <div className={`gap-4 items-center flex-shrink-0  ${showFullWidthSearch ? "hidden" : "flex"}`}>
        <Button variant="ghost" size="icon">
            <Menu />
        </Button>
        <a href="/">
        <img src={logo1} alt="logo" className='h-6'/>
        </a>
   
    </div>

{/* //MIDDLE SECTION */}

     {/* flex-grow : this section grows as large it can */}
     {/* NOTE: the entire form section needs to appear only in larger screen and disappper inn smaller screen 
     so provide md:flex(will show section above medium secreen and normaly hiddenn) and defaulty hidden in medium screen
     2.when search icon of small screen was clicked then search bar will shown in smallerscreen otherwise
     it should be defaulty hidden and only dispaly when above medium screen
     */}
   <form className={`gap-4 flex-grow justify-center  ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}>
    
  {showFullWidthSearch && ( <Button onClick={()=>setShowFullWidthSearch(false)} type="button" size="icon" variant="ghost" className='flex-shrink-0'>
        <ArrowLeft/>
    </Button>
  )
}

    {/* INPUT SECTION
    can grow as it can and mar width only be 600px it wont grow above that */}
    <div className='flex flex-grow max-w-[600px]'>
        {/* left side will be rounded
        provided border color and inner shadow, text will be large and input take full width of its parent */}
      <input type='search' placeholder='Search' className='rounded-l-full border border-secondary-border 
      shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none'/>
      {/* making border left 0 dont need double borders */}
      <Button type="button" className='py-2 px-4 rounded-r-full border-secondary-border border border-l-0  flex-shrink-0'>
        <Search />
    </Button>
    </div>

    {/* Mic Section -- variant will be default */}
    <Button type="button" size="icon" className='flex-shrink-0'>
        <Mic/>
    </Button>
   </form>

{/* RIGHT SECTION */}


    {/* adding medium gap. when larger screen size the gap will be space between, when the screen shrinks it will be 2 */}
    <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}>
        {/* NOTE: when the screen is smaller we need to dispaly the search icon and mic icon on last section. 
        ANd hide those two when screen size gets large */}
    <Button onClick={()=>setShowFullWidthSearch(true)} size="icon" variant="ghost" className='md:hidden'>
        {/* on medium above this will be hidden
        NOTE: 
        1.In mobile view when search icon was clicked need to hide entire left and right section
        2.only search input(form section), left arrow(needs to be added) and mic will be shown
        */}

        <Search />
    </Button>
    <Button size="icon" variant="ghost" className='md:hidden'>
        {/* on medium above this will be hidden */}
        <Mic />
    </Button>
        <Button size="icon" variant="ghost">
            <Upload />
        </Button>

        <Button size="icon" variant="ghost">
            <Bell />
        </Button>
        <Button size="icon" variant="ghost">
            <User />
        </Button>
    </div>
</div>;
}