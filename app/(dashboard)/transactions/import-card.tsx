import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImportTable } from "./import-table"
import { WeekNumberClickEventHandler } from "react-day-picker"

const dateFormat = "yyyy-MM-dd HH:mm:ss"
const outputFormat = "yyyy-MM-dd"

const requiredOptions = ["amount", "data", "payee"]

interface SelectedColumnsState {
	[key: string]: string | null
}

type Props = {
	data: string[][]
	onCancel: () => void
	onSubmit: (data: any) => void
}

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
	const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
		{}
	)
	const headers = data[0]
	const body = data.slice(1)

	const onTableHeadSelectChange = (
		columnIndex: number,
		value: string | null
	) => {
		setSelectedColumns((curr) => {
			const newSelectedColumns = { ...curr }
			for (const key in newSelectedColumns) {
				if (newSelectedColumns[key] === value) newSelectedColumns[key] = null
			}

			if (value === "skip") value = null

			newSelectedColumns[`column_${columnIndex}`] = value
			return newSelectedColumns
		})
	}

	const progress = Object.values(selectedColumns).filter(Boolean).length

	return (
		<div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
			<Card className="border-none drop-shadow-sm">
				<CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
					<CardTitle className="line-clamp-1 text-xl">
						Import transactions
					</CardTitle>
					<div className="flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row">
						<Button
							className="w-full lg:w-auto"
							size="sm"
							onClick={onCancel}
						>
							Cancel
						</Button>
						<Button
							className="w-full lg:w-auto"
							size="sm"
							disabled={progress < requiredOptions.length}
							onClick={() => {}}
						>
							Continue ({progress} / {requiredOptions.length})
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<ImportTable
						headers={headers}
						body={body}
						selectedColumns={selectedColumns}
						onTableHeadSelectChange={onTableHeadSelectChange}
					/>
				</CardContent>
			</Card>
		</div>
	)
}
