import { useMemo } from "react";
import type { DisplayProject } from "@/components/projects/project-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { getProjectGalleryUrls } from "@/utils/project-gallery";

const MEDIA_HEIGHT = "h-[min(22rem,40vh)]";

type ProjectModalMediaProps = {
  project: DisplayProject;
  gradientClass: string;
};

export function ProjectModalMedia({ project, gradientClass }: ProjectModalMediaProps) {
  const urls = useMemo(() => getProjectGalleryUrls(project), [project]);

  if (urls.length === 0) {
    return (
      <div
        className={cn(
          MEDIA_HEIGHT,
          "w-full shrink-0 border-b border-border bg-gradient-to-br",
          gradientClass,
        )}
      />
    );
  }

  if (urls.length === 1) {
    return (
      <div
        className={cn(
          MEDIA_HEIGHT,
          "relative w-full shrink-0 overflow-hidden border-b border-border bg-muted/10",
        )}
      >
        <img src={urls[0]} alt="" className="block h-full w-full object-cover object-center" />
      </div>
    );
  }

  return (
    <div className={cn(MEDIA_HEIGHT, "relative w-full shrink-0 border-b border-border bg-muted/10")}>
      <Carousel opts={{ align: "start", loop: true }} className="h-full w-full [&>div]:h-full">
        <CarouselContent className="-ml-0 h-full">
          {urls.map((src, idx) => (
            <CarouselItem key={`${project.id}-${idx}-${src}`} className="h-full basis-full pl-0">
              <img src={src} alt="" className="block h-full w-full object-cover object-center" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2 z-10 h-9 w-9 -translate-y-1/2 border-border bg-background/95 text-foreground shadow-md hover:bg-background" />
        <CarouselNext className="right-2 top-1/2 z-10 h-9 w-9 -translate-y-1/2 border-border bg-background/95 text-foreground shadow-md hover:bg-background" />
      </Carousel>
    </div>
  );
}
