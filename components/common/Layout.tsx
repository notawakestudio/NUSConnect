export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="container mx-auto justify-center py-10 relative">{children}</div>
}
