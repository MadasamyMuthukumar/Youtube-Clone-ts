
import { Button } from "./Button";
type CategoryPillProps={
    categories:string[],
    selectedCategory:string,
    onSelect:(category:string)=>void
}
export function CategoryPills({categories, selectedCategory,onSelect }:CategoryPillProps){
    console.log(categories);
    
    /**
     * 1.making overflow hidden to allow arrow icons to make scroll
     * relative to make arrrows absolute to it
     *  */ 
    return <div className="overflow-x-hidden relative">
        {/* Arraning items side by side, making no wrap then only we can make scrollable 
        transition transform for making sliding when arrow was clicked 
        take maximum space it can*/}
        <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">

            {
                categories.map(category=>(
                    <Button onClick={()=>onSelect(category)} key={category} variant={selectedCategory === category ? "dark" : "default"} className="py-1 px-3 rounded-lg whitespace-nowrap">
                        {category}
                    </Button>
                ))
            }
        </div>

    </div>;
}