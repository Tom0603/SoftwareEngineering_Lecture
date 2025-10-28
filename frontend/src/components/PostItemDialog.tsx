import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";

interface PostItemDialogProps {
  open: boolean;
  onClose: () => void;
  type: "lost" | "found";
}

const categories = [
  "Electronics",
  "Accessories",
  "Bags & Luggage",
  "Clothing",
  "Documents",
  "Pets",
  "Jewelry",
  "Keys",
  "Other"
];

export function PostItemDialog({ open, onClose, type }: PostItemDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    contactInfo: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Show success message
    toast.success(`Your ${type} item has been posted successfully!`);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      date: "",
      contactInfo: ""
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a {type === "lost" ? "Lost" : "Found"} Item</DialogTitle>
          <DialogDescription>
            Fill in the details below to help reunite {type === "lost" ? "you with your" : "the owner with their"} item
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Item Name *</Label>
            <Input
              id="title"
              placeholder="e.g., Black leather wallet"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the item..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
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
              <Label htmlFor="date">Date {type === "lost" ? "Lost" : "Found"} *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="e.g., Central Park, NY"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact Information</Label>
            <Input
              id="contact"
              type="email"
              placeholder="your.email@example.com"
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
            />
            <p className="text-sm text-gray-500 mt-1">Optional: We'll use this to help people reach you</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
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
