"use client"
import { Loader2, Plus } from "lucide-react"

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { columns } from "./colums"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"

const TransactionsPage = () => {
	const newTransaction = useNewTransaction()
	const transactionsQuery = useGetTransactions()
	const deleteTransactions = useBulkDeleteTransactions()
	const transactions = transactionsQuery.data || []

	console.log(transactionsQuery.data)
	const isDisabled = transactionsQuery.isLoading || transactionsQuery.isPending

	if (transactionsQuery.isLoading) {
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
						Transaction History
					</CardTitle>
					<Button
						size="sm"
						onClick={newTransaction.onOpen}
					>
						<Plus className="mr-2 size-4" />
						Add New
					</Button>
				</CardHeader>
				<CardContent>
					<DataTable
						columns={columns}
						data={transactions}
						filterKey="payee"
						onDelete={(row) => {
							const ids = row.map((r) => r.original.id)
							deleteTransactions.mutate({ ids })
						}}
						disabled={isDisabled}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

export default TransactionsPage
