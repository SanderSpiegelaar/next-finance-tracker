import Image from "next/image"
import { Loader2 } from "lucide-react"
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"

export default function Page() {
	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
			<div className="h-full lg:flex flex-col items-center justify-center px-4">
				<div className="text-center space-y-4 pt-16">
					<h1 className="font-bold text-3xl text-muted-foreground">Welcome!</h1>
				</div>
				<p className="text-base text-muted-foreground/80">Log in or Create account to get back to your dashboard</p>
				<div className="flex items-center justify-center mt-8">
					<ClerkLoaded>
						<SignUp path="/sign-up" />
					</ClerkLoaded>
					<ClerkLoading>
						<Loader2 className="animate-spin text-muted-foreground" />
					</ClerkLoading>
				</div>
			</div>
			<div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
				<Image src="logo.svg" alt="logo" width={100} height={100} />
			</div>
		</div>
	)
}
