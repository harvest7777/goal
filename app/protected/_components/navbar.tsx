import Link from "next/link"
export default function Navbar() {
    return (
        <nav className="px-5 h-14 text-muted-foreground flex items-center justify-between bg-background">

            <Link href="/" className="hover:font-semibold">hahahah 🍃</Link>
            <div className="flex space-x-8">
                <Link href="/protected/goals" className="hover:font-semibold">goals</Link>
                <Link href="/protected/progress" className="hover:font-semibold">progress</Link>
            </div>
        </nav>
    )
}