import { z } from "zod"

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction"
import { TransactionForm } from "@/features/transactions/components/transaction-form"

import { useCreateCategory } from "@/features/categories/api/use-create-category"
import { useGetCategories } from "@/features/categories/api/use-get-categories"

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"
import { useCreateAccount } from "@/features/accounts/api/use-create-account"

import { insertTransactionSchema } from "@/db/schema"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react"

const formSchema = insertTransactionSchema.omit({
	id: true
})

type FormValues = z.input<typeof formSchema>

export const NewTransactionSheet = () => {
	const { isOpen, onClose } = useNewTransaction()

	const createMutation = useCreateTransaction()

	const categoryQuery = useGetCategories()
	const categoryMutation = useCreateCategory()
	const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
		label: category.name,
		value: category.id
	}))
	const onCreateCategory = (name: string) =>
		categoryMutation.mutate({
			name
		})

	const accountQuery = useGetAccounts()
	const accountMutation = useCreateAccount()
	const accountOptions = (accountQuery.data ?? []).map((account) => ({
		label: account.name,
		value: account.id
	}))
	const onCreateAccount = (name: string) =>
		accountMutation.mutate({
			name
		})

	const isPending =
		createMutation.isPending ||
		categoryMutation.isPending ||
		accountMutation.isPending

	const isLoading = categoryQuery.isLoading || accountQuery.isLoading

	const onSubmit = (values: FormValues) => {
		createMutation.mutate(values, {
			onSuccess: () => {
				onClose()
			}
		})
	}

	return (
		<Sheet
			open={isOpen}
			onOpenChange={onClose}
		>
			<SheetContent className="space-y-4">
				<SheetHeader>
					<SheetTitle>New Transaction</SheetTitle>
					<SheetDescription>
						Create a new transaction to track your transactions.
					</SheetDescription>
				</SheetHeader>
				{isLoading ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<Loader2 className="size-4 animate-spin text-muted-foreground" />
					</div>
				) : (
					<TransactionForm
						onSubmit={onSubmit}
						disabled={isPending}
						categoryOptions={categoryOptions}
						onCreateCategory={onCreateCategory}
						accountOptions={accountOptions}
						onCreateAccount={onCreateAccount}
					/>
				)}
			</SheetContent>
		</Sheet>
	)
}
