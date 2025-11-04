import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Calendar, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  room: string;
  created_at: string;
  b64_image: string;
  type: "lost" | "found";
  contact_email?: string;
}

interface ItemCardProps {
  item: Item;
  onViewDetails: (item: Item) => void;
}

export function ItemCard({ item, onViewDetails }: ItemCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onViewDetails(item)}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={item.b64_image}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="flex-1">{item.title}</h3>
          <Badge variant={item.type === "lost" ? "destructive" : "default"}>
            {item.type === "lost" ? "Lost" : "Found"}
          </Badge>
        </div>
        <p className="text-gray-600 line-clamp-2 mb-3">{item.description}</p>
        <div className="space-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{item.room}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{item.created_at}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(item);
          }}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
