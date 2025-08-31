import Link from "next/link"
export default function Navbar() {
    return (
        <nav className="px-5 h-14 text-muted-foreground flex items-center justify-between bg-background sticky top-0 z-50">

            <Link href="/" className="hover:font-semibold">hahahah 🍃</Link>
            <div className="flex space-x-8">
                <Link href="/protected/goals" className="hover:font-semibold">investments</Link>
                <Link href="/protected/progress?view=day" className="hover:font-semibold">stats</Link>
            </div>
        </nav>
    )
}