"use client";

import { useState } from "react";
import { PlayIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  poster: string;
  posterAlt: string;
  playLabel: string;
  className?: string;
}

/**
 * Click-to-play facade: a local poster and a play button until the visitor
 * asks for the video, then the real YouTube iframe (no-cookie domain). Keeps
 * the page free of third-party scripts until there is intent.
 */
export function YouTubeEmbed({ videoId, title, poster, posterAlt, playLabel, className }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-black", className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel}: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <img
            src={poster}
            alt={posterAlt}
            width={1280}
            height={720}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110 lg:h-20 lg:w-20">
              <PlayIcon className="ml-1 size-7 fill-current lg:size-8" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium text-white">{playLabel}</span>
        </button>
      )}
    </div>
  );
}
