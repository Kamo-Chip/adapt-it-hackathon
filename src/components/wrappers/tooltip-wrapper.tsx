import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipWrappersProps = {
  triggerContent: React.ReactNode;
  tooltipContent: React.ReactNode;
};
const TooltipWrapper = ({
  triggerContent,
  tooltipContent,
}: TooltipWrappersProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerContent}</TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
