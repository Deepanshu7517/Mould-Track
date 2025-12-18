import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ChevronDown } from "lucide-preact";

export function ArrayDropdownCell({
  items,
  emptyLabel = "None",
}: {
  items?: string[];
  emptyLabel?: string;
}) {
  if (!items || items.length === 0) {
    return <span className="text-muted-foreground">{emptyLabel}</span>;
  }

  if (items.length === 1) {
    return <span>{items[0]}</span>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs flex items-center gap-1"
        >
          {items[0]}
          <span className="text-muted-foreground">
            +{items.length - 1}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {items.map((item, idx) => (
          <DropdownMenuItem key={idx} className="text-sm">
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
