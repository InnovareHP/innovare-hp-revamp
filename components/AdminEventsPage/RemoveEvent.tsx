import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Props = {
  onRemove: () => void;
};

export default function RemoveEvent({ onRemove }: Props) {
  const [open, setOpen] = useState(false);

  const handleRemove = async () => {
    onRemove();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <TrashIcon className="w-4 h-4" />
          Remove Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Event</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to remove this event?{" "}
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={handleRemove}>
            Remove
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
