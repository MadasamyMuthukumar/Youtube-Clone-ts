import { CategoryPills } from "./components/CategoryPills";
import { PageHeader } from "./layouts/PageHeader";
import { categories, videos } from "./data/home";
import { useState } from "react";
import { VideoGridItem } from "./components/VideoGridItem";
export default function App(){
  //By default selected category was 0th index one
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  //take entire screen sixe (100vh) and flex direction is column
  return <div className="max-h-screen flex flex-col"> 
  <PageHeader/>
   
   {/* SECTION WHICH CONTAINS SIDE BAR , CATEGORIES AND MAIN SECTION FOR VIDEOS 
   1.It will be grid and have two columns. first one will be auto size and second will be 1fr(all remaining space)
   2.flex-grow-1 to make this entire section grow to fill entire screen
   3.overflow-auto to make this section can be scrollable and rest sections remain static*/}

  <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto"> 
    <div>Sidebar</div>
   
    <div className="overflow-x-hidden">
       {/* It will contain categories and videos section 
    1.to make categories sticky on top*/}
    <div className="sticky top-0 bg-white z-10 pb-4">
      <CategoryPills categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory}/>
    </div>

    {/* VIDEO GRID SECTION */}
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {
        videos.map((video)=>(
          <VideoGridItem  key={video.id} {...video}/>
        ))
      }
    </div>
    </div>

  </div>
  </div>
}