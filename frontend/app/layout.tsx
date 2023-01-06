import Link from 'next/link'
import './globals.css'
const Navbar = () => {
  return (
    <nav className="flex justify-between p-4">
      <section className="flex gap-2">
        <Link href="/discover">Discover</Link>
        <Link href="/create">Start a Project</Link>
      </section>
      <section className="">
        <Link href="/" className="font-bold text-2xl text-green-400">Kickstarter</Link>
      </section>
      <section>
        <Link href="/login">Login</Link>
      </section>
    </nav>
  )
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
