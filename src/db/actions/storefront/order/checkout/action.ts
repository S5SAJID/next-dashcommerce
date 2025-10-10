"use server";
import { checkoutFormSchema } from "@/components/storefront/organisms/forms/checkout/schema";
import { actionClient } from "@/lib/safe-action";

export const checkoutFormAction = actionClient
  .inputSchema(checkoutFormSchema)
  .action(async (data) => {
    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Order placed", data.parsedInput);
    // In a real application, you would process the checkout data here
    return { success: true, message: "Order placed successfully!", orderId: "ORD_203203_SDJ" };
  });