"use client"
import { Loader2, Plus } from "lucide-react"

import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { columns } from "./colums"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"

const CategoriesPage = () => {
	const newCategory = useNewCategory()
	const categoriesQuery = useGetCategories()
	const deleteCategories = useBulkDeleteCategories()
	const categories = categoriesQuery.data || []

	const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending

	if (categoriesQuery.isLoading) {
		return (
			<div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
				<Card className="border-none drop-shadow-sm">
					<CardHeader>
						<Skeleton className="h-8 w-48" />
					</CardHeader>
					<CardContent>
						<div className="flex h-[500px] w-full items-center justify-center">
							<Loader2 className="size-6 animate-spin text-slate-300" />
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
			<Card className="border-none drop-shadow-sm">
				<CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
					<CardTitle className="line-clamp-1 text-xl">
						Categories Page
					</CardTitle>
					<Button
						size="sm"
						onClick={newCategory.onOpen}
					>
						<Plus className="mr-2 size-4" />
						Add New
					</Button>
				</CardHeader>
				<CardContent>
					<DataTable
						columns={columns}
						data={categories}
						filterKey="name"
						onDelete={(row) => {
							const ids = row.map((r) => r.original.id)
							deleteCategories.mutate({ ids })
						}}
						disabled={isDisabled}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

export default CategoriesPage
