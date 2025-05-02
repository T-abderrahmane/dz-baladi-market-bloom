
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { algeriaWilayas, getCommunesByWilaya } from "@/data/algeria-regions";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import { customerModel, orderModel } from "@/models/databaseModel";
import { OrderStatus } from "@/schema/database";

const FormSchema = z.object({
  fullName: z.string().min(3, "Name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits"),
  wilaya: z.string().min(1, "Province is required"),
  commune: z.string().min(1, "City is required"),
  address: z.string().min(5, "Address is required"),
  deliveryMethod: z.string().min(1, "Delivery method is required"),
});

interface DeliveryFormProps {
  productId: string;
  quantity: number;
  price: number;
  setStep: (step: number) => void;
  orderComplete: () => void;
}

const DeliveryForm = ({ productId, quantity, price, setStep, orderComplete }: DeliveryFormProps) => {
  const [communes, setCommunes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { clearCart } = useCart();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      wilaya: "",
      commune: "",
      address: "",
      deliveryMethod: "home",
    },
  });

  // Update communes when wilaya changes
  const selectedWilaya = form.watch("wilaya");
  useEffect(() => {
    if (selectedWilaya) {
      setCommunes(getCommunesByWilaya(selectedWilaya));
      form.setValue("commune", "");
    }
  }, [selectedWilaya, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    
    try {
      // First create or get customer
      const customer = await customerModel.create({
        name: data.fullName,
        phoneNumber: data.phoneNumber,
        wilaya: data.wilaya,
        commune: data.commune,
        address: data.address
      });
      
      // Create order
      const order = await orderModel.create({
        productId,
        date: new Date(),
        status: OrderStatus.PENDING,
        customerId: customer.id,
        customerName: customer.name,
        customerPhone: customer.phoneNumber,
        wilaya: customer.wilaya,
        commune: customer.commune,
        address: customer.address,
        quantity,
        price,
        notes: `Delivery Method: ${data.deliveryMethod === 'home' ? 'Home Delivery' : 'Post Office'}` 
      });
      
      if (order) {
        // Success - clear cart and complete order
        toast({
          title: "Order Submitted",
          description: "Your order has been placed successfully!",
        });
        clearCart();
        orderComplete();
      } else {
        toast({
          variant: "destructive",
          title: "Order Failed",
          description: "There was a problem with your order. The product might be out of stock.",
        });
        setStep(1); // Go back to the ordering step
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: "There was a problem with your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province (Wilaya)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your province" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {algeriaWilayas.map((wilaya) => (
                      <SelectItem key={wilaya} value={wilaya}>
                        {wilaya}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commune"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City (Commune)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedWilaya}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {communes.map((commune) => (
                      <SelectItem key={commune} value={commune}>
                        {commune}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Your detailed address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryMethod"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Delivery Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="home">Home Delivery</SelectItem>
                    <SelectItem value="post">Post Office Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Place Order"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DeliveryForm;
