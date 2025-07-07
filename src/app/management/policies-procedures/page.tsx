'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Shield,
	BookOpen,
	Users,
	Award,
	Briefcase,
	Eye,
	UserCheck,
	Target
} from 'lucide-react';

const PoliciesProceduresPage = () => {
	return (
		<div className='space-y-8'>
			<div className='bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200'>
				<div className='text-center mb-8'>
					<div className='w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Shield className='w-12 h-12 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Policies & Procedures
					</h1>
					<p className='text-amber-600 font-medium'>
						Framework for Institutional Excellence
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8'>
					<div className='space-y-6'>
						<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
							<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
								<BookOpen className='w-5 h-5 text-blue-600' />
								Academic Policies
							</h3>
							<ul className='space-y-2 text-gray-700'>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Admission Policy & Procedures</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Examination & Evaluation Policy</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Anti-Ragging Policy</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Student Grievance Redressal</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Research & Publication Policy</span>
								</li>
							</ul>
						</div>

						<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
							<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
								<Users className='w-5 h-5 text-green-600' />
								Faculty Policies
							</h3>
							<ul className='space-y-2 text-gray-700'>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Faculty Recruitment Policy</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Performance Evaluation System</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Professional Development Policy</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Leave & Attendance Policy</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Code of Conduct</span>
								</li>
							</ul>
						</div>
					</div>

					<div className='space-y-6'>
						<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
							<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
								<Award className='w-5 h-5 text-purple-600' />
								Quality Assurance
							</h3>
							<ul className='space-y-2 text-gray-700'>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>IQAC Guidelines & Procedures</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>NBA Accreditation Compliance</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>NAAC Assessment Framework</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Continuous Improvement Process</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>External Quality Audit</span>
								</li>
							</ul>
						</div>

						<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
							<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
								<Briefcase className='w-5 h-5 text-orange-600' />
								Administrative Policies
							</h3>
							<ul className='space-y-2 text-gray-700'>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Financial Management Policy</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Procurement & Purchase Policy</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>IT Security & Data Protection</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Infrastructure Development</span>
								</li>
								<li className='flex items-start gap-2'>
									<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
									<span>Safety & Security Protocols</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
					<h3 className='text-lg font-bold text-gray-900 mb-4 text-center'>
						Policy Implementation Framework
					</h3>
					<div className='grid md:grid-cols-4 gap-4'>
						<div className='text-center'>
							<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<Eye className='w-6 h-6 text-blue-600' />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>Review</h4>
							<p className='text-sm text-gray-600'>
								Regular policy review and updates
							</p>
						</div>
						<div className='text-center'>
							<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<UserCheck className='w-6 h-6 text-green-600' />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>Approval</h4>
							<p className='text-sm text-gray-600'>
								Stakeholder consultation and approval
							</p>
						</div>
						<div className='text-center'>
							<div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<BookOpen className='w-6 h-6 text-purple-600' />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>
								Communication
							</h4>
							<p className='text-sm text-gray-600'>
								Policy dissemination and training
							</p>
						</div>
						<div className='text-center'>
							<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<Target className='w-6 h-6 text-orange-600' />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>Monitoring</h4>
							<p className='text-sm text-gray-600'>
								Compliance monitoring and evaluation
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoliciesProceduresPage;
