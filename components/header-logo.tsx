import Image from "next/image"
import Link from "next/link"

export const HeaderLogo = () => {
	return (
		<Link href="/">
			<div className="hidden items-center lg:flex">
				<Image src="logo.svg" alt="logo" width={28} height={28} />
				<span className="ml-2.5 block text-2xl font-semibold text-white">Finance Tracker</span>
			</div>
		</Link>
	)
}
