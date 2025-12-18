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
  // Local form state for all item fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    room: "",
    created_at: "",
    contact_email: "",
  });

  // Image upload and preview state
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // If the backend returns a 409, this will contain the similar listings
  const [duplicateMatches, setDuplicateMatches] = useState<Item[] | null>(null);

  // Indicates whether the user is forcing the request (?force=true)
  const [forceMode, setForceMode] = useState(false);

  // ------------------------------------------------------------
  // Handle image upload and preview generation
  // ------------------------------------------------------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ------------------------------------------------------------
  // Convert an uploaded image file to base64 so it can be sent in JSON
  // ------------------------------------------------------------
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // Clear image and preview
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // ------------------------------------------------------------
  // Core logic to send the item to the backend. 
  // This is shared between the normal submit and the forced submit.
  // ------------------------------------------------------------
  const submitItem = async (force: boolean) => {
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
      b64_image: base64Image,
      type: type,
      contact_email: formData.contact_email || null,
    };

    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/listings${
      force ? "?force=true" : ""
    }`;

    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
  };


  // ------------------------------------------------------------
  // Initial submit handler (non-forced)
  // This is triggered when the user clicks "Post Item"
  // ------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await submitItem(false);
    
    if (res.status === 409) {
      const data = await res.json();
      setDuplicateMatches(data.matches);
      return;
    }

    if (!res.ok) {
      toast.error("Error creating the post.");
      return;
    }

    finishSuccess();
  };


  // ------------------------------------------------------------
  // Forced submit logic. Triggered when user clicks "Publish Anyway"
  // ------------------------------------------------------------
  const handleForceSubmit = async () => {
    const res = await submitItem(true);

    if (!res.ok) {
      toast.error("Error forcing publish.");
      return;
    }

    finishSuccess();
  };


  // ------------------------------------------------------------
  // Common cleanup and UI-reset logic after successful submission
  // ------------------------------------------------------------
  const finishSuccess = () => {
    toast.success(`Your ${type} item has been posted successfully.`);

    // Close duplicate dialog if open
    setDuplicateMatches(null);

    // Reset forced mode
    setForceMode(false);

    // Reset form fields
    setFormData({
      title: "",
      description: "",
      category: "",
      room: "",
      created_at: "",
      contact_email: "",
    });

    // Reset images
    setImage(null);
    setImagePreview(null);

    // Close main dialog
    onClose();
  };

// ------------------------------------------------------------
// reset form after canceled duo dublicate detected
// ------------------------------------------------------------
const resetForm = () => {
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
  setForceMode(false);
};


  return (
    <>
      {/* Main dialog for creating a new listing */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Post a {type === "lost" ? "Lost" : "Found"} Item
            </DialogTitle>
            <DialogDescription>
              Provide information about the item you lost or found.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title field */}
            <div>
              <Label htmlFor="title">Item Name *</Label>
              <Input
                id="title"
                value={formData.title}
                placeholder="Example: Black leather wallet"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Description field */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Provide a detailed description of the item"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            {/* Image upload logic */}
            <div>
              <Label htmlFor="image">Upload Image</Label>

              {!imagePreview ? (
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer bg-muted/30"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Click to upload or drag and drop
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
                <div className="relative mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-60 w-full object-cover rounded-xl border"
                  />
                  <Button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Category + Date fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
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
                <Label htmlFor="created_at">
                  Date {type === "lost" ? "Lost" : "Found"} *
                </Label>
                <Input
                  id="created_at"
                  type="date"
                  value={formData.created_at}
                  onChange={(e) =>
                    setFormData({ ...formData, created_at: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Room selection */}
            <div>
              <Label htmlFor="room">Room *</Label>
              <Select
                value={formData.room}
                onValueChange={(value) =>
                  setFormData({ ...formData, room: value })
                }
              >
                <SelectTrigger>
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

            {/* Contact email */}
            <div>
              <Label htmlFor="contact_email">Contact Information (optional)</Label>
              <Input
                id="contact_email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.contact_email}
                onChange={(e) =>
                  setFormData({ ...formData, contact_email: e.target.value })
                }
              />
            </div>

            {/* Form actions */}
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Post Item</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Duplicate match dialog, shown only when backend returns 409 */}
      {duplicateMatches && (
        <Dialog open={true} onOpenChange={() => setDuplicateMatches(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Possible Duplicate Found</DialogTitle>
              <DialogDescription>
                The following items appear to be similar to your submission.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {duplicateMatches.map((item) => (
                <div key={item.uuid} className="p-3 border rounded">
                  <strong>{item.title}</strong>
                  <br />
                  <span className="text-sm">{item.description}</span>
                  <br />
                  <span className="text-xs text-gray-500">
                    Room: {item.room}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setDuplicateMatches(null);    // close duplicate modal
                  resetForm();                  // clear all data
                  onClose();                    // close main dialog
                }}
              >
                Cancel
              </Button>

              <Button onClick={handleForceSubmit}>Publish Anyway</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
