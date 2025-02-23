import { Navbar } from '@/components/layout/Navbar'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar variant="marketing" />
      {children}
    </>
  )
} 