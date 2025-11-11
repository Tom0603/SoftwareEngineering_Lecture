import { useState, useEffect } from "react";
import { ItemCard, type Item } from "./components/ItemCard";
import { ItemDetailsDialog } from "./components/ItemDetailsDialog";
import { PostItemDialog } from "./components/PostItemDialog";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";
import { Search, Plus, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { categories } from "./types/constants";


export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectionDialogOpen, setSelectionDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [postType, setPostType] = useState<"lost" | "found">("lost");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItems().catch(console.error);
  }, []);

  const loadItems = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/listings`);
    if (!res.ok) throw new Error("Fehler beim Laden");

    const data: Item[] = await res.json();
    setItems(data);
    setLoading(false);
  };

  const handleViewDetails = (item: Item) => {
    setSelectedItem(item);
    setDetailsOpen(true);
  };

  const handleOpenReportDialog = () => {
    setSelectionDialogOpen(true);
  };

  const handlePostItem = (type: "lost" | "found") => {
    setPostType(type);
    setSelectionDialogOpen(false);
    setPostDialogOpen(true);
  };

  // Filter items based on search, category, and tab
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.room.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    const matchesTab = activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading items...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-8 h-8 text-blue-600" />
              <div>
                <h1>Lost & Found</h1>
                <p className="text-sm text-gray-600">
                  Reuniting people with their belongings
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleOpenReportDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Report Item
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search items, rooms..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="all">All Items ({items.length})</TabsTrigger>
            <TabsTrigger value="lost">
              Lost ({items.filter((i) => i.type === "lost").length})
            </TabsTrigger>
            <TabsTrigger value="found">
              Found ({items.filter((i) => i.type === "found").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No items found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.uuid}
                    item={item}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="lost" className="mt-0">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No lost items found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.uuid}
                    item={item}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="found" className="mt-0">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No found items. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.uuid}
                    item={item}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <Dialog open={selectionDialogOpen} onOpenChange={setSelectionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Report an Item</DialogTitle>
            <DialogDescription>
              Did you lose something or did you find something?
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="h-auto flex-col gap-3 p-6"
              onClick={() => handlePostItem("lost")}
            >
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div className="text-center">
                <div>I Lost</div>
                <div>Something</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col gap-3 p-6"
              onClick={() => handlePostItem("found")}
            >
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="text-center">
                <div>I Found</div>
                <div>Something</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ItemDetailsDialog
        item={selectedItem}
        open={detailsOpen}
        onClose={() => {setDetailsOpen(false);loadItems();}}
      />
      <PostItemDialog
        open={postDialogOpen}
        onClose={() => {setPostDialogOpen(false);loadItems();}}
        type={postType}
      />
    </div>
  );
}
