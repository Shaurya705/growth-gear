"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  module: z.string().default("netM"),
  status: z.enum(["New", "In Progress", "Resolved", "Cancelled"], {
    required_error: "Please select a status.",
  }),
  assignedTo: z.string().optional(),
})

// Mock users for demonstration
const mockUsers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Johnson" },
]

export function NetMQueryForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [commandInputValue, setCommandInputValue] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      module: "netM",
      status: "New",
      assignedTo: "unassigned",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Here you would typically make an API call to create the query
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "netM Query created!",
        description: "Your netM query has been successfully created.",
      })

      // Redirect to netM queries page
      router.push("/dashboard/netm-queries")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Query Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the title of your netM query" {...field} />
              </FormControl>
              <FormDescription>A brief title describing the issue or request related to netM.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Provide details about your netM query" className="min-h-[150px]" {...field} />
              </FormControl>
              <FormDescription>Detailed information about the netM issue or request.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="module"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormDescription>This query is specifically for the netM module.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The current status of the query.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Assigned To</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? mockUsers.find((user) => user.id === field.value)?.name || field.value
                        : "Select or enter a user"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search user..."
                      onValueChange={setCommandInputValue}
                      value={commandInputValue}
                    />
                    <CommandList>
                      <CommandEmpty>
                        <div className="px-2 py-3 text-sm">No user found. Press enter to add "{commandInputValue}"</div>
                      </CommandEmpty>
                    </CommandList>
                    <CommandList>
                      <CommandGroup>
                        {mockUsers.map((user) => (
                          <CommandItem
                            key={user.id}
                            value={user.name}
                            onSelect={() => {
                              form.setValue("assignedTo", user.id)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", user.id === field.value ? "opacity-100" : "opacity-0")}
                            />
                            {user.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          form.setValue("assignedTo", commandInputValue)
                          setCommandInputValue("")
                        }}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add custom user
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                The user assigned to handle this netM query. You can select an existing user or enter a custom name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create netM Query"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/netm-queries")}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

