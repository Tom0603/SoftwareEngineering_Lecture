import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { rooms } from "../types/constants";
import { categories } from "../types/constants";
import { type Item } from "./ItemCard";

interface PostItemDialogProps {
  open: boolean;
  onClose: () => void;
  type: "lost" | "found";
}

export function PostItemDialog({ open, onClose, type }: PostItemDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    room: "",
    created_at: "",
    contact_email: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.room ||
      !formData.created_at
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    let base64Image: string | null = null;
    if (image) {
      base64Image = await toBase64(image);
    }

    const newItem: Item = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      room: formData.room,
      created_at: formData.created_at,
      b64_image: base64Image || null,
      type: type,
      contact_email: formData.contact_email || null,
    };

    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error("Fehler beim Erstellen des Posts");

    const data: Item = await res.json();
    //setResponse(data);
    toast.success(`Your ${type} item has been posted successfully!`);

    setFormData({
      title: "",
      description: "",
      category: "",
      room: "",
      created_at: "",
      contact_email: "",
    });
    setImage(null);
    setImagePreview(null);

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Post a {type === "lost" ? "Lost" : "Found"} Item
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to help reunite{" "}
            {type === "lost" ? "you with your" : "the owner with their"} item.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <div>
            <Label htmlFor="title">Item Name *</Label>
            <Input
              id="title"
              placeholder="e.g., Black leather wallet"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the item..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              required
            />
          </div>

          {/* IMAGE UPLOAD — modern design */}
          <div>
            <Label htmlFor="image">Upload Image</Label>
            {!imagePreview ? (
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary/60 transition-colors bg-muted/30"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-400">
                  PNG, JPG or JPEG up to 5MB
                </span>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="relative w-full mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-60 w-full object-cover rounded-xl border"
                />
                <Button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            )}
          </div>

          {/* CATEGORY + created_at */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">
                Date {type === "lost" ? "Lost" : "Found"} *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.created_at}
                onChange={(e) =>
                  setFormData({ ...formData, created_at: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* ROOM */}
          <div>
            <Label htmlFor="room">Room *</Label>
            <Select
              value={formData.room}
              onValueChange={(value) =>
                setFormData({ ...formData, room: value })
              }
              required
            >
              <SelectTrigger id="rooms">
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((room) => (
                  <SelectItem key={room} value={room}>
                    {room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* CONTACT */}
          <div>
            <Label htmlFor="contact">Contact Information</Label>
            <Input
              id="contact"
              type="email"
              placeholder="your.email@example.com"
              value={formData.contact_email}
              onChange={(e) =>
                setFormData({ ...formData, contact_email: e.target.value })
              }
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional: We'll use this to help people reach you
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Post Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
