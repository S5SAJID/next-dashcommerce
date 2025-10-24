"use client"

import type React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { Search, Loader2, SearchIcon } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { storefrontSearchProducts } from "@/db/actions/storefront/products/search/action"
import Image from "next/image"
import Link from "next/link"
import { Table } from "@/components/ui/table"

interface Product {
  name: string
  price: number
  images: string[]
  description: string
  slug: string
}


export function SearchModal() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)


  const handleSelectProduct = useCallback(
    (product: Product) => {
      // Handle product selection - replace with your logic
      console.log("Selected product:", product)
      setIsModalOpen(false)
    },
    [],
  )

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (query.length < 1 || !query.trim()) return;
    setIsLoading(true)
    const products = await storefrontSearchProducts({ query })

    if (!products.data) return;
    setResults(products.data)
    setIsLoading(false)
  }, [])

  // Debounce search input
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      debounceTimer.current = setTimeout(() => {
        performSearch(value)
      }, 300)
    },
    [performSearch],
  )

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          // Navigate through results
          break
        case "ArrowUp":
          e.preventDefault()
          // Navigate through results
          break
        case "Enter":
          e.preventDefault()
          if (results.length > 0) {
            handleSelectProduct(results[0])
          }
          break
        case "Escape":
          e.preventDefault()
          setIsModalOpen(false)
          break
      }
    },
    [results, handleSelectProduct],
  )

  // Focus input when modal opens
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden font-['PP_Mori']">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        {/* Search Input Section */}
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        {/* Results Section */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : results.length > 0 ? (
            <Table>
              {results.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-3 py-4 block text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex gap-4">
                    {product.images.length > 0 && (
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="h-16 w-16 rounded-lg object-cover bg-muted"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
                          {product.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{product.description}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">ARABIC</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground whitespace-nowrap">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Table>
          ) : searchQuery ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <Search className="h-8 w-8 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground text-center">No products found for &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Try different keywords</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <Search className="h-8 w-8 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground text-center">Start typing to search products</p>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-stretch w-full">
          {results.length > 0 && (
            <div className="border-t w-full border-border bg-muted/30 px-6 py-3">
              <p className="text-xs text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </p>
            </div>
          )}
        </DialogFooter>
        {/* Footer Info */}
      </DialogContent>
    </Dialog>
  )
}
