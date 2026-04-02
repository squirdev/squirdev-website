import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
                  <DialogTitle className="text-xl font-bold leading-tight sm:text-2xl">
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
              </div>
            </div>

            <div className="flex w-full shrink-0 items-stretch gap-3 bg-background px-5 py-4 sm:px-6">
              {live && project.link ? (
                <Button
                  asChild
                  className="h-11 min-h-11 min-w-0 flex-1 basis-0 gap-2 px-2 text-sm font-semibold sm:px-4"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 items-center justify-center gap-2"
                  >
                    <span className="truncate">Visit this site</span>
                    <ExternalLink className="size-4 shrink-0" aria-hidden />
                  </a>
                </Button>
              ) : null}
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-11 min-h-11 min-w-0 shrink-0 border-primary/45 bg-primary/8 text-sm font-semibold text-primary shadow-sm",
                    "hover:border-primary/65 hover:bg-primary/15 hover:text-primary",
                    live && project.link ? "flex-1 basis-0" : "ml-auto w-1/2",
                  )}
                >
                  Close
                </Button>
              </DialogClose>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
