import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Building2, Users, Calendar, Shield, BookOpen, LayoutDashboard } from 'lucide-react';

const sections = [
	{
		title: "Main Overview",
		description: "Edit the main Student Life page highlights and intro.",
		href: "/admin/student-life/overview",
		icon: LayoutDashboard
	},
	{
		title: "Campus Facilities",
		description: "Manage facility sections, items, and features.",
		href: "/admin/student-life/facilities",
		icon: Building2
	},
	{
		title: "Clubs & Societies",
		description: "Update clubs, categories, and activities.",
		href: "/admin/student-life/clubs",
		icon: Users
	},
	{
		title: "Events & Festivals",
		description: "Manage upcoming and past events.",
		href: "/admin/student-life/events",
		icon: Calendar
	},
	{
		title: "Grievance Cell",
		description: "Update grievance procedures and contact info.",
		href: "/admin/student-life/grievance",
		icon: Shield
	},
	{
		title: "Code of Conduct",
		description: "Edit rules, regulations, and policies.",
		href: "/admin/student-life/conduct",
		icon: BookOpen
	}
];

export default async function AdminStudentLifePage() {
	await requireAdmin();

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Student Life Management</h1>
				<p className="text-gray-600">Select a section to edit content.</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{sections.map((section) => (
					<Link key={section.href} href={section.href} className="block group">
						<Card className="h-full hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-blue-600">
							<CardHeader>
								<div className="flex items-center justify-between mb-2">
									<div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
										<section.icon className="w-6 h-6 text-blue-600" />
									</div>
									<ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
								</div>
								<CardTitle className="text-xl group-hover:text-blue-700 transition-colors">
									{section.title}
								</CardTitle>
								<CardDescription>{section.description}</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
