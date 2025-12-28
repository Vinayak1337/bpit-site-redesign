import { getMandatoryDisclosure } from '@/app/(Private Pages)/actions/mandatory-disclosure';
import { FileText, ExternalLink, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
	title: 'Mandatory Disclosure | BPIT',
	description:
		'Mandatory Disclosure documents for Bhagwan Parshuram Institute of Technology (BPIT) including AICTE approvals, fee structures, and committee details.'
};

export default async function MandatoryDisclosurePage() {
	const data = await getMandatoryDisclosure();

	// Group items by category
	const groupedItems = data.items.reduce((acc, item) => {
		const category = item.category || 'General';
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(item);
		return acc;
	}, {} as Record<string, typeof data.items>);

	// Get sorted categories (General first, others alphabetical)
	const categories = Object.keys(groupedItems).sort((a, b) => {
		if (a === 'General') return -1;
		if (b === 'General') return 1;
		return a.localeCompare(b);
	});

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			{/* Hero Section */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-12">
					<div className="max-w-4xl">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Mandatory Disclosure
						</h1>
						<p className="text-lg text-gray-600">
							Important documents and disclosures in compliance with regulatory bodies.
						</p>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-12">
				<div className="max-w-5xl mx-auto space-y-12">
					{categories.map((category) => (
						<div key={category} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
							<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
								<div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
									<FileText className="w-5 h-5 text-blue-600" />
								</div>
								{category}
							</h2>
							
							<div className="grid gap-4 md:grid-cols-2">
								{groupedItems[category].map((item) => (
									<Link
										key={item.id}
										href={item.url}
										target={item.url.startsWith('http') ? '_blank' : undefined}
										className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
									>
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
												<ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
											</div>
											<span className="font-medium text-gray-700 group-hover:text-blue-700">
												{item.title}
											</span>
										</div>
										<ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
									</Link>
								))}
							</div>
						</div>
					))}

                    {data.items.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No disclosure documents available at the moment.
                        </div>
                    )}
				</div>
			</div>
		</div>
	);
}

