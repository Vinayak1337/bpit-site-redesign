'use client';

import React from 'react';
import { Building2, Award, Users, Shield } from 'lucide-react';

const GovernanceStructurePage = () => {
	return (
		<div className='space-y-8'>
			<div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200'>
				<div className='text-center mb-8'>
					<div className='w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Building2 className='w-12 h-12 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Governance Structure
					</h1>
					<p className='text-green-600 font-medium'>
						Organizational Framework for Excellence
					</p>
				</div>

				<div className='space-y-6'>
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
							<Award className='w-6 h-6 text-green-600' />
							Board of Governors
						</h3>
						<p className='text-gray-700 mb-4'>
							The Board of Governors provides strategic oversight and policy
							direction for the institution. Comprising eminent personalities
							from academia, industry, and public service, the board ensures
							BPIT maintains its commitment to excellence.
						</p>
						<div className='grid md:grid-cols-2 gap-4'>
							<div className='bg-green-50 rounded-lg p-4'>
								<h4 className='font-semibold text-green-800 mb-2'>
									Key Responsibilities
								</h4>
								<ul className='text-sm text-green-700 space-y-1'>
									<li>• Strategic planning and policy formulation</li>
									<li>• Financial oversight and budget approval</li>
									<li>• Academic quality assurance</li>
									<li>• Institutional development initiatives</li>
								</ul>
							</div>
							<div className='bg-green-50 rounded-lg p-4'>
								<h4 className='font-semibold text-green-800 mb-2'>
									Composition
								</h4>
								<ul className='text-sm text-green-700 space-y-1'>
									<li>• Chairman (Industry Leader)</li>
									<li>• Academic Representatives</li>
									<li>• Government Nominees</li>
									<li>• Alumni Representatives</li>
								</ul>
							</div>
						</div>
					</div>

					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
							<Users className='w-6 h-6 text-blue-600' />
							Academic Council
						</h3>
						<p className='text-gray-700 mb-4'>
							The Academic Council is the primary academic decision-making body,
							responsible for maintaining and enhancing the quality of
							education, research, and academic programs.
						</p>
						<div className='grid md:grid-cols-2 gap-4'>
							<div className='bg-blue-50 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-800 mb-2'>Functions</h4>
								<ul className='text-sm text-blue-700 space-y-1'>
									<li>• Curriculum development and review</li>
									<li>• Faculty recruitment and promotion</li>
									<li>• Research policy formulation</li>
									<li>• Academic calendar planning</li>
								</ul>
							</div>
							<div className='bg-blue-50 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-800 mb-2'>Members</h4>
								<ul className='text-sm text-blue-700 space-y-1'>
									<li>• Principal (Chairperson)</li>
									<li>• Heads of Departments</li>
									<li>• Senior Faculty Members</li>
									<li>• External Academic Experts</li>
								</ul>
							</div>
						</div>
					</div>

					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
							<Shield className='w-6 h-6 text-purple-600' />
							Administrative Structure
						</h3>
						<p className='text-gray-700 mb-4'>
							Our administrative structure ensures efficient operations, student
							services, and support for academic activities through well-defined
							roles and responsibilities.
						</p>
						<div className='grid md:grid-cols-3 gap-4'>
							<div className='bg-purple-50 rounded-lg p-4'>
								<h4 className='font-semibold text-purple-800 mb-2'>
									Academic Affairs
								</h4>
								<ul className='text-sm text-purple-700 space-y-1'>
									<li>• Admissions Office</li>
									<li>• Examination Cell</li>
									<li>• Training & Placement</li>
									<li>• Student Affairs</li>
								</ul>
							</div>
							<div className='bg-purple-50 rounded-lg p-4'>
								<h4 className='font-semibold text-purple-800 mb-2'>
									Support Services
								</h4>
								<ul className='text-sm text-purple-700 space-y-1'>
									<li>• Library Services</li>
									<li>• IT Infrastructure</li>
									<li>• Finance & Accounts</li>
									<li>• Human Resources</li>
								</ul>
							</div>
							<div className='bg-purple-50 rounded-lg p-4'>
								<h4 className='font-semibold text-purple-800 mb-2'>
									Quality Assurance
								</h4>
								<ul className='text-sm text-purple-700 space-y-1'>
									<li>• IQAC Cell</li>
									<li>• Research & Development</li>
									<li>• Industry Relations</li>
									<li>• Alumni Affairs</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GovernanceStructurePage;
