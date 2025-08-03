import Link from "next/link"
export default function Navbar() {
    return (
        <nav className="h-14 text-muted-foreground flex items-center ">
            <div className="w-full mx-10 flex justify-between items-center">
                <div className="flex space-x-8">
                    <Link href="/" className="hover:font-semibold">dashboard</Link>
                </div>
                <div className="flex space-x-8">
                    <Link href="/dashboard/progress" className="hover:font-semibold">progress</Link>
                    <Link href="/dashboard/manage-goals" className="hover:font-semibold">goals</Link>
                </div>
            </div>
        </nav>
    )
}