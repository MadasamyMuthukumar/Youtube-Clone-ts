import { useEffect, useRef, useState } from "react"
import { formatDuration } from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatPostedTime"

type VideoGridItemProps = {
    id: string,
    title: string,
    channel: {
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
//provides compact notation in K and M for views
const VIDEO_FORMATTER = Intl.NumberFormat(undefined,{notation: "compact"})

export function VideoGridItem({ id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl }: VideoGridItemProps) {


    const [isVideoPlaying,setVideoPlaying] = useState(false);
    //to refer video tag
    const videoRef = useRef<HTMLVideoElement>(null)

useEffect(()=>{
    if(videoRef.current==null) return
    if(isVideoPlaying){
        //whenever hover the video starts from beggining currenttime=0
        videoRef.current.currentTime=0
        videoRef.current.play();
    }else{
        videoRef.current.pause();
    }

},[isVideoPlaying])

    //returns a single video card (image and desc needs to be vertically aligned so flex direction column was used)
    return <div className="flex flex-col gap-2" onMouseEnter={()=>setVideoPlaying(true)} onMouseLeave={()=>setVideoPlaying(false)}>
        {/* usually video elements having aspect ratio of 16:9 */}
        <a href={`/watch?v=${id}`} className="relative aspect-video">
            {/* img tag takes the full widht and heigh of anchor tag */}
            <img src={thumbnailUrl} alt="thumbnail" className="block h-full w-full object-cover rounded-xl" />
            {/* TIMESTAMP SECTION */}
            <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
                {formatDuration(duration)}
            </div>

            {/* VIDEO SECTION 
            playsInline because it wont fullcreen on mobile
            muted for no audio
            making video tag take entire space of the grid (inset-0 applies left right top bottom all to 0)
            block will make it take 100% space of container
            providing opacity as 0 when video not plays make makes 100 when video plays*/}
            <video ref={videoRef} className={` block object-cover h-full w-full absolute inset-0  transition-opacity duration-200 ${isVideoPlaying ? "opacity-100" : "opacity-0"}`} src={videoUrl} muted playsInline/>
        </a>
         
         {/* BOTTOM SECTION HAS CHANNEL LOGO AND DETAILS */}
        <div className="flex gap-2">
            <a href={`/@${channel.id}`} className="flex-shrink-0">
            <img src={channel.profileUrl} alt="LOGO" className="w-12 h-12 rounded-full" />
            </a>
            {/* HAs video name and channel name views details */}
            <div className="flex flex-col">
                <a href={`/watch?v=${id}`} className="font-bold">{title}</a>
                <a href={`/@${channel.id}`} className="text-secondary-text text-sm">{channel.name}</a>
                 <div className="text-secondary-text text-sm">
                {VIDEO_FORMATTER.format(views)} Views {formatTimeAgo(postedAt)}
                 </div>
            </div>

        </div>
    </div>

}