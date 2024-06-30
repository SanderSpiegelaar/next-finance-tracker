import { z } from "zod"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { insertTransactionSchema } from "@/db/schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/select"
import { DatePicker } from "@/components/date-picker"
import { Textarea } from "@/components/ui/textarea"
import { AmountInput } from "@/components/amount-input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { convertAmountToMiliUnits } from "@/lib/utils"

const formSchema = z.object({
	date: z.coerce.date(),
	accountId: z.string(),
	categoryId: z.string().nullable().optional(),
	payee: z.string(),
	amount: z.string(),
	notes: z.string().nullable().optional()
})

const apiSchema = insertTransactionSchema.omit({
	id: true
})

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
	id?: string
	defaultValues?: FormValues
	disabled?: boolean
	accountOptions: { label: string; value: string }[]
	categoryOptions: { label: string; value: string }[]
	onSubmit: (values: ApiFormValues) => void
	onDelete?: () => void
	onCreateAccount: (name: string) => void
	onCreateCategory: (name: string) => void
}

export const TransactionForm = ({
	id,
	defaultValues,
	onSubmit,
	onDelete,
	disabled,
	accountOptions,
	categoryOptions,
	onCreateAccount,
	onCreateCategory
}: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	const handleSubmit = (values: FormValues) => {
		const amount = parseFloat(values.amount)
		const amountInMiliUnits = convertAmountToMiliUnits(amount)

		onSubmit({
			...values,
			amount: amountInMiliUnits
		})
	}

	const handleDelete = () => {
		onDelete?.()
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4 pt-4"
			>
				<FormField
					name="date"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<DatePicker
									value={field.value}
									onChange={field.onChange}
									disabled={disabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="accountId"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account</FormLabel>
							<FormControl>
								<Select
									placeholder="Select an Account"
									options={accountOptions}
									value={field.value}
									onCreate={onCreateAccount}
									onChange={field.onChange}
									disabled={disabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="categoryId"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Select
									placeholder="Select a Category"
									options={categoryOptions}
									value={field.value}
									onCreate={onCreateCategory}
									onChange={field.onChange}
									disabled={disabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="payee"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payee</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder="Add a Payee"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="amount"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<AmountInput
									{...field}
									disabled={disabled}
									placeholder="0.00"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="notes"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									value={field.value ?? ""}
									disabled={disabled}
									placeholder="Optional Notes"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					className="w-full"
					disabled={disabled}
				>
					{id ? "Save changes" : "Create account"}
				</Button>
				{!!id && (
					<Button
						type="button"
						disabled={disabled}
						onClick={handleDelete}
						className="w-full"
						variant="outline"
					>
						<Trash className="mr-2 size-4" />
						Delete Transaction
					</Button>
				)}
			</form>
		</Form>
	)
}
