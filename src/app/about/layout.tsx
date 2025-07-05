import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'About BPIT - Bhagwan Parshuram Institute of Technology',
	description: 'Learn about BPIT\'s history, vision, mission, and leadership. Discover our commitment to excellence in engineering education and innovation.',
	keywords: [
		'About BPIT',
		'Bhagwan Parshuram Institute of Technology',
		'engineering college history',
		'Chairman message',
		'Principal message',
		'founder tribute',
		'BPIT leadership',
		'engineering education Delhi',
		'NBA accredited college',
		'GGSIPU affiliated college'
	]
}

const AboutLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
  return (
    <main className="relative">
      {children}
    </main>
  )
}

export default AboutLayout