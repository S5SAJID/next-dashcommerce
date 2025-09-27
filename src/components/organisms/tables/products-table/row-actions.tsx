import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Archive, Edit, MoreHorizontal, Rocket, Trash2 } from "lucide-react";
import { DashboardProduct } from "@/db/actions/dashboard/products/types";
import { deleteDashboardProduct, updateDashboardProduct } from "@/db/actions/dashboard/products/actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next";

export default function ProductTableRowActions({ product }: { product: DashboardProduct }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  async function handleRowAction(type: "status" | "delete" | "edit") {
    switch (type) {
      case 'status':
        toast.promise(
          updateDashboardProduct({ ...product, is_published: !product.is_published }), {
          loading: "Updating...",
          success: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'] });
            return `Product "${product.name}" Updated`
          },
          error: "Product updating failed."
        })
        break;
      case 'delete':
        toast.error(`Are you sure to delete "${product.name}"?`, {
          id: `delete-toast-${product.id}`,
          dismissible: true,
          cancel: {
            label: "Cancel",
            onClick: () => toast.dismiss(`delete-toast-${product.id}`)
          },
          action: {
            label: "Delete",
            onClick: () => {
              toast.dismiss(`delete-toast-${product.id}`)
              toast.promise(deleteDashboardProduct(product.id), {
                loading: "Deleting product...",
                success: async () => {
                  await queryClient.invalidateQueries({ queryKey: ['products'] });
                  return `Product "${product.name}" deleted`
                },
                error: "Error deleting product."
              })
            }
          }
        })
        break;
      case 'edit':
        router.push(`/products/${product.slug}`)
        break;
      default:
        break;
    }
  }
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex justify-between">
            <span className="block">Edit</span>
            <Edit />
          </DropdownMenuItem>
          {product.is_published ? (
            <DropdownMenuItem className="flex justify-between" onClick={() => handleRowAction("status")}>
              <span className="block">Draft</span>
              <Archive />
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="flex justify-between" onClick={() => handleRowAction("status")}>
              <span className="block">Publish</span>
              <Rocket />
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between" onClick={() => handleRowAction("delete")} variant="destructive">
            <span className="block">Delete</span>
            <Trash2 />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}