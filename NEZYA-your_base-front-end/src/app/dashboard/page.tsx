import type { Metadata } from 'next'
import { Dashboard } from './Dashboard'

export const metadata: Metadata = {
  title: 'PageTitle',
}

export default function page() {
  return (
    <div>
      <Dashboard />
    </div>
  )
}
