import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectModalMedia } from "@/components/projects/ProjectModalMedia";
import { cn } from "@/lib/utils";
import type { DisplayProject } from "@/components/projects/project-types";

function isLiveProjectLink(url?: string) {
  return Boolean(url && (url.startsWith("http://") || url.startsWith("https://")));
}

const DEFAULT_HEADER_GRADIENT = "from-primary/20 to-accent/10";

export type ProjectDetailModalProps = {
  project: DisplayProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Matches Featured Work cards when there is no image */
  fallbackGradient?: string;
};

export function ProjectDetailModal({
  project,
  open,
  onOpenChange,
  fallbackGradient = DEFAULT_HEADER_GRADIENT,
}: ProjectDetailModalProps) {
  const live = project ? isLiveProjectLink(project.link) : false;
  const gradient = project?.color ?? fallbackGradient;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex h-[min(90vh,44rem)] w-[min(34rem,calc(100vw-2rem))] max-w-[34rem] flex-col gap-0 overflow-hidden border-border p-0",
          "sm:w-[38rem] sm:max-w-[38rem] sm:rounded-xl",
        )}
      >
        {project ? (
          <>
            <ProjectModalMedia project={project} gradientClass={gradient} />

            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-background">
              <div className="space-y-5 p-5 pt-5 sm:p-6">
                <DialogHeader className="space-y-3 text-left">
                  <DialogTitle className="pr-8 text-xl font-bold leading-tight sm:text-2xl">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.description}
                  </DialogDescription>
                </DialogHeader>

                {(project.skills?.length ?? 0) > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((tag) => (
                      <span
                        key={`${project.id}-${tag}`}
                        className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {live && project.link ? (
                  <DialogFooter className="flex-col gap-2 pt-1 sm:flex-row sm:justify-start">
                    <Button asChild className="w-full">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Visit live site
                        <ExternalLink className="size-4 shrink-0" aria-hidden />
                      </a>
                    </Button>
                  </DialogFooter>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
