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

// Mock data for lost and found items
const mockItems: Item[] = [
  {
    uuid: "1",
    title: "Black Leather Wallet",
    description:
      "Lost black leather wallet with several credit cards and ID. Last seen near the coffee machine.",
    category: "Accessories",
    room: "Cafeteria",
    created_at: "2025-10-20",
    b64_image:
      "https://b64_images.unsplash.com/photo-1634511468843-257ab657a87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "lost",
    contact_email: "john.doe@email.com",
  },
  {
    uuid: "2",
    title: "iPhone 14 Pro",
    description:
      "Found a silver iPhone 14 Pro near the printer. Clear case with stickers.",
    category: "Electronics",
    room: "1.OG Kopierraum",
    created_at: "2025-10-21",
    b64_image:
      "https://b64_images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "found",
    contact_email: "finder@email.com",
  },
  {
    uuid: "3",
    title: "Set of House Keys",
    description:
      "Lost a set of house keys with a red keychain. Has 4 keys attached including a car key.",
    category: "Keys",
    room: "B005",
    created_at: "2025-10-19",
    b64_image:
      "https://b64_images.unsplash.com/photo-1595944356863-e624f8234e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "lost",
    contact_email: "student@university.edu",
  },
  {
    uuid: "4",
    title: "Blue Backpack",
    description:
      "Found a blue backpack with textbooks and a water bottle in the library area.",
    category: "Bags & Luggage",
    room: "B013",
    created_at: "2025-10-22",
    b64_image:
      "https://b64_images.unsplash.com/photo-1680039211156-66c721b87625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "found",
    contact_email: "librarian@library.org",
  },
  {
    uuid: "5",
    title: "Silver Wristwatch",
    description:
      "Lost a silver Seiko wristwatch with metal band. Sentimental value, reward offered.",
    category: "Accessories",
    room: "A006",
    created_at: "2025-10-18",
    b64_image:
      "https://b64_images.unsplash.com/photo-1640416822842-1d1cd0c6b9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "lost",
    contact_email: "owner@email.com",
  },
  {
    uuid: "6",
    title: "Designer Sunglasses",
    description:
      "Found Ray-Ban sunglasses near the windowsill in the cafeteria. Black frames with case included.",
    category: "Accessories",
    room: "Cafeteria",
    created_at: "2025-10-21",
    b64_image:
      "https://b64_images.unsplash.com/photo-1760446032400-506ec8963e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "found",
    contact_email: "beachgoer@email.com",
  },
  {
    uuid: "7",
    title: "MacBook Pro Laptop",
    description:
      "Lost MacBook Pro 15 inch, silver finish with stickers. Possibly left on a table.",
    category: "Electronics",
    room: "A105",
    created_at: "2025-10-23",
    b64_image:
      "https://b64_images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "lost",
    contact_email: "techuser@email.com",
  },
  {
    uuid: "8",
    title: "Golden Retriever Dog",
    description:
      "Found friendly golden retriever in the courtyard near the entrance (EG). No collar.",
    category: "Pets",
    room: "EG",
    created_at: "2025-10-22",
    b64_image:
      "https://b64_images.unsplash.com/photo-1659532007275-47f55316818c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "found",
    contact_email: "petlover@email.com",
  },
  {
    uuid: "9",
    title: "Diamond Ring",
    description:
      "Lost engagement ring with diamond stone. Gold band. Extremely sentimental.",
    category: "Jewelry",
    room: "EG Toilette Damen",
    created_at: "2025-10-20",
    b64_image:
      "https://b64_images.unsplash.com/photo-1673131158657-4404fd1f041a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "lost",
    contact_email: "desperate@email.com",
  },
  {
    uuid: "10",
    title: "Black Umbrella",
    description: "Found black umbrella with wooden handle near the staircase.",
    category: "Other",
    room: "B017",
    created_at: "2025-10-19",
    b64_image:
      "https://b64_images.unsplash.com/photo-1523772721666-22ad3c3b6f90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "found",
    contact_email: "commuter@email.com",
  },
  {
    uuid: "11",
    title: "Wireless Headphones",
    description:
      "Lost Sony wireless headphones in black carrying case. Possibly left in a classroom.",
    category: "Electronics",
    room: "B207",
    created_at: "2025-10-21",
    b64_image:
      "https://b64_images.unsplash.com/photo-1707777193615-26732d6b7e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "lost",
    contact_email: "traveler@email.com",
  },
  {
    uuid: "12",
    title: "Passport and Documents",
    description:
      "Found passport and travel documents in a folder. Name on passport: Smith. Please contact to verify.",
    category: "Documents",
    room: "B223",
    created_at: "2025-10-23",
    b64_image:
      "https://b64_images.unsplash.com/photo-1613244470042-e69e8ccb303a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "found",
    contact_email: "goodsamaritan@email.com",
  },
];

export default function App() {
  const [items, setItems] = useState<Item[]>(mockItems);
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
    const res = await fetch("http://127.0.0.1:5000/listings");
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
