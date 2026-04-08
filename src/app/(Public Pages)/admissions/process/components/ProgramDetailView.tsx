'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	BookOpen,
	Briefcase,
	Calendar,
	CheckCircle,
	FileText,
	User,
	UserPlus
} from 'lucide-react';
import { getAdmissionsIcon } from '@/lib/admissions-icons';
import { Button } from '@/components/ui/button';
import type {
	AdmissionsProcessMeta,
	AdmissionsProgramCatalogItem
} from '@/app/(Private Pages)/actions/admissions';

type Props = {
	program: AdmissionsProgramCatalogItem;
	meta?: AdmissionsProcessMeta | null;
};

type SectionId = 'offering' | 'eligibility' | 'structure' | 'careers' | 'faculty';

const DEFAULT_DETAIL_COPY: AdmissionsProcessMeta['detailCopy'] = {
	backButtonLabel: 'Back to all programs',
	sidebarTitle: 'Program Details',
	tabLabels: {
		offering: 'Content Offering',
		eligibility: 'Eligibility & Selection Criteria',
		structure: 'Programme Structure',
		careers: 'Career Opportunities',
		faculty: 'Faculty'
	},
	durationLabel: 'Duration',
	intakeLabel: 'Intake',
	offeringTitle: 'Content Offering Statement',
	keyAreasTitle: 'Key Areas of Study',
	eligibilityTitle: 'Eligibility Criteria & Selection Process',
	academicQualificationTitle: 'Academic Qualification',
	minimumMarksTitle: 'Minimum Marks Required',
	entranceExamTitle: 'Entrance Examination',
	selectionProcessTitle: 'Selection Process',
	structureTitle: 'Programme Structure',
	totalSemestersLabel: 'Total Semesters',
	totalCreditsLabel: 'Total Credits',
	durationCardLabel: 'Duration',
	semesterCurriculumTitle: 'Semester-wise Curriculum',
	subjectsLabelSuffix: 'Subjects',
	careersTitle: 'Career Opportunities',
	facultyTitle: 'Faculty Members'
};

export default function ProgramDetailView({ program, meta }: Props) {
	const router = useRouter();
	const [activeSection, setActiveSection] = useState<SectionId>('offering');
	const ProgramIcon = getAdmissionsIcon(program.icon);
	const detailCopy = meta?.detailCopy ?? DEFAULT_DETAIL_COPY;
	const card = meta?.supportCard ?? null;
	const safeCategories = meta?.categories ?? [];
	const taxonomyLabel = useMemo(() => {
		const category = safeCategories.find(item => item.id === program.categoryId);
		const subcategory = category?.subcategories.find(item => item.id === program.subcategoryId);
		return subcategory?.title ?? category?.title ?? '';
	}, [program.categoryId, program.subcategoryId, safeCategories]);

	const sections = useMemo(
		() => [
			{
				id: 'offering' as const,
				label: detailCopy.tabLabels.offering,
				icon: <BookOpen className='h-5 w-5' />
			},
			{
				id: 'eligibility' as const,
				label: detailCopy.tabLabels.eligibility,
				icon: <CheckCircle className='h-5 w-5' />
			},
			{
				id: 'structure' as const,
				label: detailCopy.tabLabels.structure,
				icon: <Calendar className='h-5 w-5' />
			},
			{
				id: 'careers' as const,
				label: detailCopy.tabLabels.careers,
				icon: <Briefcase className='h-5 w-5' />
			},
			{
				id: 'faculty' as const,
				label: detailCopy.tabLabels.faculty,
				icon: <User className='h-5 w-5' />
			}
		],
		[detailCopy]
	);

	const handlePrimaryCta = () => {
		if (!card) return;
		window.open(card.primaryCtaHref, '_blank');
	};

	const handleSecondaryCta = () => {
		if (!card) return;
		if (card.secondaryCtaHref.endsWith('.pdf')) {
			const link = document.createElement('a');
			link.href = card.secondaryCtaHref;
			link.download = 'BPIT_Admission_Brochure.pdf';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			return;
		}
		window.open(card.secondaryCtaHref, '_blank');
	};

	const renderContent = () => {
		switch (activeSection) {
			case 'offering':
				return (
					<motion.div
						key='offering'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						<h2 className='mb-6 text-xl font-bold text-gray-900 sm:text-2xl'>
							{detailCopy.offeringTitle}
						</h2>
						<div className='space-y-6'>
							<p className='text-base leading-relaxed text-gray-700 sm:text-lg'>
								{program.details.contentOffering.statement}
							</p>
							<div>
								<h3 className='mb-4 text-lg font-semibold text-gray-900 sm:text-xl'>
									{detailCopy.keyAreasTitle}
								</h3>
								<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
									{program.details.contentOffering.keyAreas.map(area => (
										<div key={area} className='flex items-center gap-3 rounded-lg bg-blue-50 p-3'>
											<CheckCircle className='h-5 w-5 flex-shrink-0 text-green-500' />
											<span className='text-gray-700'>{area}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				);

			case 'eligibility':
				return (
					<motion.div
						key='eligibility'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						<h2 className='mb-6 text-xl font-bold text-gray-900 sm:text-2xl'>
							{detailCopy.eligibilityTitle}
						</h2>
						<div className='space-y-6'>
							<div className='rounded-lg border border-gray-200 bg-white p-6'>
								<h3 className='mb-3 text-lg font-semibold text-gray-900'>
									{detailCopy.academicQualificationTitle}
								</h3>
								<p className='text-gray-700'>{program.details.eligibilityAndSelection.academic}</p>
							</div>
							<div className='rounded-lg border border-gray-200 bg-white p-6'>
								<h3 className='mb-3 text-lg font-semibold text-gray-900'>
									{detailCopy.minimumMarksTitle}
								</h3>
								<p className='text-gray-700'>{program.details.eligibilityAndSelection.minimumMarks}</p>
							</div>
							<div className='rounded-lg border border-gray-200 bg-white p-6'>
								<h3 className='mb-3 text-lg font-semibold text-gray-900'>
									{detailCopy.entranceExamTitle}
								</h3>
								<p className='text-gray-700'>{program.details.eligibilityAndSelection.entranceExam}</p>
							</div>
							<div className='rounded-lg border border-gray-200 bg-white p-6'>
								<h3 className='mb-4 text-lg font-semibold text-gray-900'>
									{detailCopy.selectionProcessTitle}
								</h3>
								<div className='space-y-3'>
									{program.details.eligibilityAndSelection.selectionProcess.map((step, index) => (
										<div key={step} className='flex items-center gap-3 rounded-lg bg-blue-50 p-3'>
											<div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-semibold text-white'>
												{index + 1}
											</div>
											<span className='text-gray-700'>{step}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				);

			case 'structure': {
				const semesterDetails = program.details.programStructure.semesterDetails ?? [];

				return (
					<motion.div
						key='structure'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						<h2 className='mb-6 text-xl font-bold text-gray-900 sm:text-2xl'>
							{detailCopy.structureTitle}
						</h2>
						<div className='space-y-6'>
							<div className='grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6'>
								<div className='rounded-lg border border-gray-200 bg-white p-6 text-center'>
									<h3 className='mb-2 text-3xl font-bold text-blue-600'>
										{program.details.programStructure.semesters}
									</h3>
									<p className='text-gray-600'>{detailCopy.totalSemestersLabel}</p>
								</div>
								<div className='rounded-lg border border-gray-200 bg-white p-6 text-center'>
									<h3 className='mb-2 text-3xl font-bold text-blue-600'>
										{program.details.programStructure.totalCredits}
									</h3>
									<p className='text-gray-600'>{detailCopy.totalCreditsLabel}</p>
								</div>
								<div className='rounded-lg border border-gray-200 bg-white p-6 text-center'>
									<h3 className='mb-2 text-3xl font-bold text-blue-600'>{program.duration}</h3>
									<p className='text-gray-600'>{detailCopy.durationCardLabel}</p>
								</div>
							</div>

							{semesterDetails.length > 0 ? (
								<div>
									<h3 className='mb-6 text-xl font-semibold text-gray-900'>
										{detailCopy.semesterCurriculumTitle}
									</h3>
									<div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
										{semesterDetails.map((semester, index) => (
											<motion.div
												key={`${semester.semester}-${semester.title}`}
												className='rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md'
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.3, delay: index * 0.1 }}>
												<div className='mb-4 flex items-center gap-4'>
													<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100'>
														<span className='font-bold text-blue-600'>S{semester.semester}</span>
													</div>
													<div>
														<h4 className='font-semibold text-gray-900'>{semester.title}</h4>
														<p className='text-sm text-gray-600'>
															{semester.subjects.length} {detailCopy.subjectsLabelSuffix}
														</p>
													</div>
												</div>
												<div className='space-y-2'>
													{semester.subjects.map(subject => (
														<div key={subject} className='flex items-center gap-2'>
															<div className='h-2 w-2 flex-shrink-0 rounded-full bg-blue-500' />
															<span className='text-sm text-gray-700'>{subject}</span>
														</div>
													))}
												</div>
											</motion.div>
										))}
									</div>
								</div>
							) : null}
						</div>
					</motion.div>
				);
			}

			case 'careers':
				return (
					<motion.div
						key='careers'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						<h2 className='mb-6 text-xl font-bold text-gray-900 sm:text-2xl'>
							{detailCopy.careersTitle}
						</h2>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							{program.details.careerOpportunities.map(opportunity => (
								<div
									key={opportunity}
									className='rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md'>
									<div className='flex items-center gap-3'>
										<Briefcase className='h-6 w-6 text-blue-500' />
										<span className='font-medium text-gray-900'>{opportunity}</span>
									</div>
								</div>
							))}
						</div>
					</motion.div>
				);

			case 'faculty':
				return (
					<motion.div
						key='faculty'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						<h2 className='mb-6 text-xl font-bold text-gray-900 sm:text-2xl'>
							{detailCopy.facultyTitle}
						</h2>
						<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
							{program.details.faculty.map(member => (
								<div
									key={`${member.name}-${member.designation}`}
									className='group overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md'>
									<div className='relative h-64 bg-gray-100'>
										{member.photo ? (
											<Image
												src={member.photo}
												alt={member.name}
												fill
												className='object-cover grayscale transition-all duration-500 group-hover:grayscale-0'
												onError={event => {
													event.currentTarget.style.display = 'none';
													const fallback = event.currentTarget
														.nextElementSibling as HTMLDivElement | null;
													if (fallback) {
														fallback.style.display = 'flex';
													}
												}}
											/>
										) : null}
										<div
											className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-4xl font-bold text-white transition-all duration-500 ${
												member.photo ? 'hidden' : 'flex'
											}`}>
											{member.name
												.split(' ')
												.map(part => part[0] ?? '')
												.join('')
												.slice(0, 2)}
										</div>
									</div>
									<div className='p-6 text-center'>
										<h3 className='mb-2 text-xl font-bold text-gray-900'>{member.name}</h3>
										<p className='mb-1 text-sm text-gray-600'>{member.designation}</p>
										<p className='mb-2 text-sm text-gray-500'>{member.specialization}</p>
										{taxonomyLabel ? (
											<p className='mb-4 text-sm font-medium text-gray-900'>{taxonomyLabel}</p>
										) : null}
									</div>
								</div>
							))}
						</div>
					</motion.div>
				);

			default:
				return null;
		}
	};

	return (
		<div>
			<div className='border-b bg-white shadow-sm'>
				<div className='container mx-auto px-4 py-5 sm:py-6'>
					<div className='mb-4 flex flex-col gap-4 sm:flex-row sm:items-center'>
						<Button
							variant='ghost'
							onClick={() => router.back()}
							className='rounded-lg p-2 transition-colors hover:bg-gray-100'
							trackingEvent='program_details_back'
							trackingData={{ program: program.id }}>
							<ArrowLeft className='h-5 w-5 text-gray-600' />
						</Button>
						<div className='flex min-w-0 items-center gap-3'>
							<div className='flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600 sm:h-12 sm:w-12'>
								<ProgramIcon className='h-5 w-5 sm:h-6 sm:w-6' />
							</div>
							<div className='min-w-0'>
								<h1 className='text-xl font-bold text-gray-900 sm:text-2xl'>
									{program.title}
								</h1>
								<p className='text-sm text-gray-600 sm:text-base'>
									{program.duration} • {detailCopy.intakeLabel}: {program.intake}
								</p>
							</div>
						</div>
					</div>
					<p className='text-sm text-gray-600 sm:text-base'>{program.description}</p>
				</div>
			</div>

			<div className='container mx-auto px-4 py-6 sm:py-8'>
				<div className='flex flex-col gap-8 lg:flex-row'>
					<div className='w-full lg:w-80 lg:flex-shrink-0'>
						<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md lg:sticky lg:top-4'>
							<div className='border-b border-gray-100 p-6'>
								<h2 className='text-lg font-bold text-gray-900'>{detailCopy.sidebarTitle}</h2>
							</div>
							<div className='p-4'>
								{sections.map(section => (
									<Button
										key={section.id}
										variant='ghost'
										onClick={() => setActiveSection(section.id)}
										className={`mb-2 h-auto w-full justify-start gap-3 rounded-lg p-3 text-left transition-all duration-200 last:mb-0 ${
											activeSection === section.id
												? 'bg-blue-500 text-white hover:bg-blue-600'
												: 'text-gray-700 hover:bg-gray-50'
										}`}
										trackingEvent='program_section_clicked'
										trackingData={{ section: section.id, program: program.id }}>
										<span className={activeSection === section.id ? 'text-white' : 'text-blue-600'}>
											{section.icon}
										</span>
										{section.label}
									</Button>
								))}
							</div>
						</div>

						{card ? (
							<div className='mt-6 space-y-3 rounded-xl border border-gray-200 bg-white p-6'>
								<Button
									onClick={handlePrimaryCta}
									className='h-auto w-full justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-600'
									trackingEvent='program_apply_now'
									trackingData={{ program: program.id }}>
									<UserPlus className='h-4 w-4' />
									{card.primaryCtaLabel}
								</Button>
								<Button
									variant='outline'
									onClick={handleSecondaryCta}
									className='h-auto w-full justify-center gap-2 rounded-lg border-2 border-blue-500 bg-white px-4 py-3 font-semibold text-blue-500 transition-colors hover:bg-blue-500 hover:text-white'
									trackingEvent='program_download_brochure'
									trackingData={{ program: program.id }}>
									<FileText className='h-4 w-4' />
									{card.secondaryCtaLabel}
								</Button>
							</div>
						) : null}
					</div>

					<div className='flex-1'>
						<div className='min-h-[420px] rounded-xl bg-gray-50 p-4 sm:min-h-[520px] sm:p-6 lg:min-h-[600px] lg:p-8'>
							<AnimatePresence mode='wait'>{renderContent()}</AnimatePresence>
						</div>
						<div className='mt-6'>
							<Button
								variant='outline'
								onClick={() => router.back()}
								className='gap-2 rounded-lg border-slate-300'
								trackingEvent='program_details_back_bottom'
								trackingData={{ program: program.id }}>
								<ArrowLeft className='h-4 w-4' />
								{detailCopy.backButtonLabel}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
