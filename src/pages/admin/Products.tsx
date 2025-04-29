
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit, Trash, ImagePlus } from "lucide-react";

// Mock product categories
const categories = [
  { id: "1", name: "Cookware", productCount: 12 },
  { id: "2", name: "Home Decor", productCount: 18 },
  { id: "3", name: "Food", productCount: 24 },
  { id: "4", name: "Tableware", productCount: 8 },
  { id: "5", name: "Clothing", productCount: 15 },
  { id: "6", name: "Accessories", productCount: 9 },
];

// Mock products data
const productsData = [
  {
    id: "1",
    name: "Traditional Tajine Pot",
    category: "Cookware",
    price: "3,600 DZD",
    originalPrice: "4,500 DZD",
    inventory: 42,
    status: "In Stock"
  },
  {
    id: "2",
    name: "Handwoven Berber Carpet",
    category: "Home Decor",
    price: "12,500 DZD",
    originalPrice: "15,000 DZD",
    inventory: 8,
    status: "In Stock"
  },
  {
    id: "3",
    name: "Algerian Olive Oil (1L)",
    category: "Food",
    price: "1,200 DZD",
    originalPrice: "1,400 DZD",
    inventory: 65,
    status: "In Stock"
  },
  {
    id: "4",
    name: "Traditional Dates Box",
    category: "Food",
    price: "1,500 DZD",
    originalPrice: "1,800 DZD",
    inventory: 37,
    status: "In Stock"
  },
  {
    id: "5",
    name: "Handmade Pottery Set",
    category: "Tableware",
    price: "5,800 DZD",
    originalPrice: "6,500 DZD",
    inventory: 14,
    status: "In Stock"
  },
  {
    id: "6",
    name: "Traditional Spices Box",
    category: "Food",
    price: "1,600 DZD",
    originalPrice: "1,800 DZD",
    inventory: 28,
    status: "In Stock"
  },
  {
    id: "7",
    name: "Handcrafted Leather Bag",
    category: "Accessories",
    price: "7,500 DZD",
    originalPrice: "8,200 DZD",
    inventory: 9,
    status: "Low Stock"
  },
  {
    id: "8",
    name: "Algerian Honey (500g)",
    category: "Food",
    price: "2,100 DZD",
    originalPrice: "2,400 DZD",
    inventory: 0,
    status: "Out of Stock"
  },
];

const statusColors = {
  "In Stock": "bg-green-100 text-green-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700"
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Filter products based on search term and active category
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductDialogOpen(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleAddCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger className="w-full md:w-60">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.name.toLowerCase()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Original</TableHead>
                        <TableHead>Inventory</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map(product => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell className="text-gray-500">{product.originalPrice}</TableCell>
                          <TableCell>{product.inventory}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              statusColors[product.status as keyof typeof statusColors]
                            }`}>
                              {product.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredProducts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            No products found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map(category => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{category.productCount}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Product Dialog */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update product information" : "Add a new product to your inventory"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input 
                  id="product-name" 
                  placeholder="Enter product name" 
                  defaultValue={editingProduct?.name || ""} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Select defaultValue={editingProduct?.category.toLowerCase() || ""}>
                  <SelectTrigger id="product-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.name.toLowerCase()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price (DZD)</Label>
                  <Input 
                    id="product-price" 
                    placeholder="e.g. 3600" 
                    defaultValue={editingProduct?.price.replace(" DZD", "") || ""} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-original-price">Original Price (DZD)</Label>
                  <Input 
                    id="product-original-price" 
                    placeholder="e.g. 4500" 
                    defaultValue={editingProduct?.originalPrice.replace(" DZD", "") || ""} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-inventory">Inventory</Label>
                <Input 
                  id="product-inventory" 
                  type="number" 
                  placeholder="Enter inventory count" 
                  defaultValue={editingProduct?.inventory || ""} 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-description">Product Description</Label>
                <Textarea 
                  id="product-description" 
                  placeholder="Describe your product" 
                  className="min-h-32" 
                  defaultValue="" 
                />
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-md border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <div className="text-center">
                      <ImagePlus className="h-10 w-10 text-gray-400 mx-auto" />
                      <span className="text-sm text-gray-500">Add Image</span>
                    </div>
                  </div>
                  
                  {editingProduct && (
                    <div className="h-32 rounded-md border border-gray-300 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1579656450812-5b1da79e2474?w=300" 
                        alt="Product" 
                        className="w-full h-full object-cover rounded-md"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setProductDialogOpen(false)}>
              Cancel
            </Button>
            <Button>
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory ? "Update category information" : "Create a new product category"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input 
                id="category-name" 
                placeholder="Enter category name" 
                defaultValue={editingCategory?.name || ""} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-description">Description (Optional)</Label>
              <Textarea 
                id="category-description" 
                placeholder="Describe this category" 
                defaultValue="" 
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button>
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
