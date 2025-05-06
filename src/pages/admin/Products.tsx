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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Plus, Edit, Trash, ImagePlus } from "lucide-react";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import { Skeleton } from "@/components/ui/skeleton";

const Products = () => {
  const {
    products,
    categories,
    isLoading,
    productDialogOpen,
    categoryDialogOpen,
    setProductDialogOpen,
    setCategoryDialogOpen,
    editingProduct,
    editingCategory,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    handleAddProduct,
    handleEditProduct,
    handleAddCategory,
    handleEditCategory,
    saveProduct,
    deleteProduct,
    saveCategory,
    deleteCategory
  } = useAdminProducts();

  // Form states
  const [productForm, setProductForm] = useState({
    name: '',
    categoryId: '',
    price: '',
    oldPrice: '',
    stock: 0,
    shortDescription: '',
    longDescription: '',
    images: [] as string[],
    colors: [] as string[],
    sizes: [] as string[]
  });
  const [categoryForm, setcategoryForm] = useState({
    name: '',
    description: ''
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'product' | 'category'} | null>(null);

  // Initialize form with product data when editing
  const initProductForm = (product: any) => {
    setProductForm({
      name: product?.name || '',
      categoryId: product?.categoryId || '',
      price: product?.price ? String(product.price) : '',
      oldPrice: product?.oldPrice ? String(product.oldPrice) : '',
      stock: product?.stock || 0,
      shortDescription: product?.shortDescription || '',
      longDescription: product?.longDescription || '',
      images: product?.images || [],
      colors: product?.colors || [],
      sizes: product?.sizes || []
    });
  };

  // Initialize form with category data when editing
  const initCategoryForm = (category: any) => {
    setcategoryForm({
      name: category?.name || '',
      description: category?.description || ''
    });
  };

  // Handle product form field changes
  const handleProductChange = (field: string, value: any) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle category form field changes
  const handleCategoryChange = (field: string, value: string) => {
    setcategoryForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle product form submission
  const handleProductSubmit = () => {
    // Convert string values to numbers where needed
    const formattedProduct = {
      ...productForm,
      price: parseFloat(productForm.price),
      oldPrice: productForm.oldPrice ? parseFloat(productForm.oldPrice) : null,
      stock: parseInt(String(productForm.stock), 10)
    };
    saveProduct(formattedProduct);
  };

  // Handle category form submission
  const handleCategorySubmit = () => {
    saveCategory(categoryForm);
  };

  // Confirm delete dialog
  const confirmDelete = (id: string, type: 'product' | 'category') => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  // Handle actual deletion
  const handleDelete = () => {
    if (itemToDelete) {
      if (itemToDelete.type === 'product') {
        deleteProduct(itemToDelete.id);
      } else {
        deleteCategory(itemToDelete.id);
      }
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
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
                        <SelectItem key={category.id} value={category.id}>
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
                      {isLoading ? (
                        // Loading state with skeletons
                        Array(5).fill(0).map((_, idx) => (
                          <TableRow key={idx}>
                            {Array(7).fill(0).map((_, cellIdx) => (
                              <TableCell key={cellIdx}>
                                <Skeleton className="h-6 w-20" />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : products.length > 0 ? (
                        products.map((product) => {
                          // Determine product status based on inventory levels
                          let status = "In Stock";
                          let statusClass = "bg-green-100 text-green-700";
                          
                          if (product.stock <= 0) {
                            status = "Out of Stock";
                            statusClass = "bg-red-100 text-red-700";
                          } else if (product.stock < 10) {
                            status = "Low Stock";
                            statusClass = "bg-amber-100 text-amber-700";
                          }
                          
                          // Find category name
                          const category = categories.find(c => c.id === product.categoryId);
                          
                          return (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{category?.name || "Uncategorized"}</TableCell>
                              <TableCell>{`${product.price.toLocaleString('fr-DZ')} DZD`}</TableCell>
                              <TableCell className="text-gray-500">
                                {product.oldPrice ? `${product.oldPrice.toLocaleString('fr-DZ')} DZD` : '-'}
                              </TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                                  {status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => {
                                  handleEditProduct(product);
                                  initProductForm(product);
                                }}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => confirmDelete(product.id, 'product')}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
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
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        // Loading state with skeletons
                        Array(3).fill(0).map((_, idx) => (
                          <TableRow key={idx}>
                            {Array(3).fill(0).map((_, cellIdx) => (
                              <TableCell key={cellIdx}>
                                <Skeleton className="h-6 w-20" />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : categories.length > 0 ? (
                        categories.map((category) => {
                          // Count products in this category
                          const productCount = products.filter(p => p.categoryId === category.id).length;
                          
                          return (
                            <TableRow key={category.id}>
                              <TableCell className="font-medium">{category.name}</TableCell>
                              <TableCell>{category.description || '-'}</TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => {
                                  handleEditCategory(category);
                                  initCategoryForm(category);
                                }}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => confirmDelete(category.id, 'category')}
                                  disabled={productCount > 0} // Prevent deleting categories with products
                                  title={productCount > 0 ? "Cannot delete category with products" : "Delete category"}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8">
                            No categories found.
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
      </Tabs>

      {/* Add/Edit Product Dialog */}
      <Dialog open={productDialogOpen} onOpenChange={(open) => {
        setProductDialogOpen(open);
        if (open && editingProduct) {
          initProductForm(editingProduct);
        } else if (open) {
          initProductForm({});
        }
      }}>
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
                  value={productForm.name} 
                  onChange={(e) => handleProductChange('name', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Select 
                  value={productForm.categoryId || undefined} 
                  onValueChange={(value) => handleProductChange('categoryId', value)}
                >
                  <SelectTrigger id="product-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Changed from empty string to "none" */}
                    <SelectItem value="none">Uncategorized</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
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
                    value={productForm.price} 
                    onChange={(e) => handleProductChange('price', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-original-price">Original Price (DZD)</Label>
                  <Input 
                    id="product-original-price" 
                    placeholder="e.g. 4500" 
                    value={productForm.oldPrice} 
                    onChange={(e) => handleProductChange('oldPrice', e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-inventory">Inventory</Label>
                <Input 
                  id="product-inventory" 
                  type="number" 
                  placeholder="Enter inventory count" 
                  value={productForm.stock} 
                  onChange={(e) => handleProductChange('stock', parseInt(e.target.value, 10))} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-short-description">Short Description</Label>
                <Input 
                  id="product-short-description" 
                  placeholder="Brief product description" 
                  value={productForm.shortDescription} 
                  onChange={(e) => handleProductChange('shortDescription', e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-description">Product Description</Label>
                <Textarea 
                  id="product-description" 
                  placeholder="Describe your product in detail" 
                  className="min-h-32" 
                  value={productForm.longDescription} 
                  onChange={(e) => handleProductChange('longDescription', e.target.value)} 
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
                  
                  {productForm.images.length > 0 && productForm.images.map((img, index) => (
                    <div key={index} className="h-32 rounded-md border border-gray-300 relative">
                      <img 
                        src={img} 
                        alt="Product" 
                        className="w-full h-full object-cover rounded-md"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
                        onClick={() => {
                          const newImages = [...productForm.images];
                          newImages.splice(index, 1);
                          handleProductChange('images', newImages);
                        }}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setProductDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProductSubmit}>
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={(open) => {
        setCategoryDialogOpen(open);
        if (open && editingCategory) {
          initCategoryForm(editingCategory);
        } else if (open) {
          initCategoryForm({});
        }
      }}>
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
                value={categoryForm.name} 
                onChange={(e) => handleCategoryChange('name', e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-description">Description (Optional)</Label>
              <Textarea 
                id="category-description" 
                placeholder="Describe this category" 
                value={categoryForm.description} 
                onChange={(e) => handleCategoryChange('description', e.target.value)} 
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCategorySubmit}>
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the {itemToDelete?.type}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Products;
