import { formatDuration } from "../utils/formatDuration"

type VideoGridItemProps = {
    id: string,
    title:string,
    channel : {
        id: string
        name: string
        profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string

}
export function VideoGridItem({id,title,channel,views,postedAt,duration,thumbnailUrl,videoUrl}:VideoGridItemProps){
//returns a single video card (image and desc needs to be vertically aligned so flex direction column was used)
    return <div className="flex flex-col gap-2">
        {/* usually video elements having aspect ratio of 16:9 */}
        <a href={`/watch?v=${id}`} className="relative aspect-video">
        {/* img tag takes the full widht and heigh of anchor tag */}
        <img src={thumbnailUrl} alt="thumbnail" className="block h-full w-full object-cover rounded-xl" />
        {/* TIMESTAMP SECTION */}
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        </a>
    </div>

}