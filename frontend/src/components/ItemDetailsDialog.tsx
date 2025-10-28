import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Check, Calendar, Tag, Mail, Phone } from "lucide-react";
import { type Item } from "./ItemCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ItemDetailsDialogProps {
  item: Item | null;
  open: boolean;
  onClose: () => void;
}

export function ItemDetailsDialog({
  item,
  open,
  onClose,
}: ItemDetailsDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle>{item.title}</DialogTitle>
            <Badge variant={item.type === "lost" ? "destructive" : "default"}>
              {item.type === "lost" ? "Lost Item" : "Found Item"}
            </Badge>
          </div>
          <DialogDescription>Posted on {item.date}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="mb-1">Description</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p>{item.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{item.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p>{item.date}</p>
                </div>
              </div>
            </div>

            {item.contactInfo && (
              <div className="border-t pt-4 mt-4">
                <h4 className="mb-2">Contact Information</h4>
                <p className="text-gray-600">{item.contactInfo}</p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                {item.type === "lost" ? "Return" : "Collect"}
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <a
                  href={`mailto:${
                    item.contactInfo
                  }?subject=${encodeURIComponent(
                    item.type === "lost"
                      ? "Found your lost item"
                      : "Collecting found item"
                  )}&body=${encodeURIComponent(
                    `Hello,\n\nI'm contacting you regarding the item "${item.title}".`
                  )}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
