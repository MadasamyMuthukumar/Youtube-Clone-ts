import { Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';
import logo1 from '../assets/logo1.png'
import { Button } from '../components/Button';
export const PageHeader=()=>{
    //gap between elements in header was 10 when smaller screen and 20 when large screen
return <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
    {/* vetically aligned center, this section(logo) does not shrinkwhen the size of screen reducer */}
    <div className='flex gap-4 items-center flex-shrink-0'>
        <Button variant="ghost" size="icon">
            <Menu />
        </Button>
        <a href="/">
        <img src={logo1} alt="logo" className='h-6'/>
        </a>
   
    </div>
     {/* flex-grow : this section grows as large it can */}
     {/* NOTE: the entire form section needs to appear only in larger screen and disappper inn smaller screen 
     so provide md(medium screen) and defaulty hidden in medium screen
     */}
   <form className='md:flex hidden gap-4 flex-grow justify-center'>
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


    {/* adding medium gap. when larger screen size the gap will be space between, when the screen shrinks it will be 2 */}
    <div className='flex flex-shrink-0 md:gap-2'>
        {/* NOTE: when the screen is smaller we need to dispaly the search icon and mic icon on last section. 
        ANd hide those two when screen size gets large */}
    <Button size="icon" variant="ghost" className='md:hidden'>
        {/* on medium above this will be hidden */}
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