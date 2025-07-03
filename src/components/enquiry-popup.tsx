'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import {
	X,
	Send,
	CheckCircle2,
	GraduationCap,
	Phone,
	Mail
} from 'lucide-react';

const EnquiryPopup = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		course: '',
		message: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		const handleOpenEnquiry = () => {
			setIsOpen(true);
			setIsSuccess(false);
		};

		window.addEventListener('openEnquiry', handleOpenEnquiry);
		return () => window.removeEventListener('openEnquiry', handleOpenEnquiry);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setIsSuccess(true);

		// Auto close after success
		setTimeout(() => {
			setIsOpen(false);
			setIsSuccess(false);
			setFormData({ name: '', email: '', phone: '', course: '', message: '' });
		}, 3000);
	};

	const handleClose = () => {
		setIsOpen(false);
		setIsSuccess(false);
		setFormData({ name: '', email: '', phone: '', course: '', message: '' });
	};

	const isFormValid = formData.name && formData.email && formData.message;

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent
				className='sm:max-w-[600px] p-0 border-0 bg-transparent shadow-none overflow-visible'
				showCloseButton={false}>
				<DialogTitle className='sr-only'>
					Admission Enquiry Form - Bhagwan Parshuram Institute of Technology
				</DialogTitle>
				<AnimatePresence mode='wait'>
					<motion.div
						key='popup'
						initial={{ opacity: 0, scale: 0.96, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.96, y: 20 }}
						transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
						className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative'>
						{/* Header Section */}
						<div className='bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 relative'>
							<button
								onClick={handleClose}
								className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/30'
								aria-label='Close admission enquiry form'
								type='button'>
								<X className='w-4 h-4' />
							</button>

							<div className='flex items-center gap-3 mb-2'>
								<div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
									<GraduationCap className='w-5 h-5 text-white' />
								</div>
								<div>
									<h2 className='text-xl font-semibold text-white'>
										Admission Enquiry
									</h2>
									<p className='text-blue-100 text-sm'>
										Bhagwan Parshuram Institute of Technology
									</p>
								</div>
							</div>
						</div>

						<AnimatePresence mode='wait'>
							{!isSuccess ? (
								<motion.div
									key='form'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
									className='p-8'>
									<div className='mb-6'>
										<p className='text-gray-600 leading-relaxed'>
											Ready to shape your future in engineering and technology?
											Fill out the form below and our admissions team will get
											back to you within 24 hours.
										</p>
									</div>

									<form onSubmit={handleSubmit} className='space-y-5'>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
											<div className='space-y-2'>
												<label
													htmlFor='enquiry-name'
													className='text-sm font-medium text-gray-700'>
													Full Name *
												</label>
												<Input
													id='enquiry-name'
													type='text'
													placeholder='Your full name'
													value={formData.name}
													onChange={e =>
														setFormData(prev => ({
															...prev,
															name: e.target.value
														}))
													}
													className='h-11 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
													required
												/>
											</div>

											<div className='space-y-2'>
												<label
													htmlFor='enquiry-email'
													className='text-sm font-medium text-gray-700'>
													Email Address *
												</label>
												<Input
													id='enquiry-email'
													type='email'
													placeholder='your.email@example.com'
													value={formData.email}
													onChange={e =>
														setFormData(prev => ({
															...prev,
															email: e.target.value
														}))
													}
													className='h-11 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
													required
												/>
											</div>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
											<div className='space-y-2'>
												<label
													htmlFor='enquiry-phone'
													className='text-sm font-medium text-gray-700'>
													Phone Number
												</label>
												<Input
													id='enquiry-phone'
													type='tel'
													placeholder='+91 98765 43210'
													value={formData.phone}
													onChange={e =>
														setFormData(prev => ({
															...prev,
															phone: e.target.value
														}))
													}
													className='h-11 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
												/>
											</div>

											<div className='space-y-2'>
												<label className='text-sm font-medium text-gray-700'>
													Course Interest
												</label>
												<Select
													value={formData.course}
													onValueChange={value =>
														setFormData(prev => ({
															...prev,
															course: value
														}))
													}>
													<SelectTrigger className='h-11 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'>
														<SelectValue placeholder='Select a course' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='Computer Science'>
															Computer Science & Engineering
														</SelectItem>
														<SelectItem value='Electronics'>
															Electronics & Communication
														</SelectItem>
														<SelectItem value='Information Technology'>
															Information Technology
														</SelectItem>
														<SelectItem value='Mechanical'>
															Mechanical Engineering
														</SelectItem>
														<SelectItem value='Civil'>
															Civil Engineering
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className='space-y-2'>
											<label
												htmlFor='enquiry-message'
												className='text-sm font-medium text-gray-700'>
												Message *
											</label>
											<Textarea
												id='enquiry-message'
												placeholder='Tell us about your academic background, career goals, or any specific questions you have about BPIT...'
												value={formData.message}
												onChange={e =>
													setFormData(prev => ({
														...prev,
														message: e.target.value
													}))
												}
												className='min-h-[100px] px-4 py-3 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none'
												required
											/>
										</div>

										<Button
											type='submit'
											disabled={!isFormValid || isSubmitting}
											className='w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl'>
											{isSubmitting ? (
												<div className='flex items-center justify-center gap-2'>
													<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
													Processing...
												</div>
											) : (
												<div className='flex items-center justify-center gap-2'>
													<Send className='w-4 h-4' />
													Submit Enquiry
												</div>
											)}
										</Button>

										<p className='text-xs text-gray-500 text-center'>
											By submitting this form, you agree to receive
											communications from BPIT regarding your enquiry.
										</p>
									</form>

									{/* Contact Info */}
									<div className='mt-8 pt-6 border-t border-gray-100'>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<a
												href='tel:011-2757-1080'
												className='flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group'>
												<div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors'>
													<Phone className='w-4 h-4 text-blue-600' />
												</div>
												<div>
													<p className='text-xs text-gray-500'>Call us</p>
													<p className='text-sm font-medium text-gray-900'>
														011-2757-1080
													</p>
												</div>
											</a>

											<a
												href='mailto:bpitindia@yahoo.com'
												className='flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group'>
												<div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors'>
													<Mail className='w-4 h-4 text-blue-600' />
												</div>
												<div>
													<p className='text-xs text-gray-500'>Email us</p>
													<p className='text-sm font-medium text-gray-900'>
														bpitindia@yahoo.com
													</p>
												</div>
											</a>
										</div>
									</div>
								</motion.div>
							) : (
								<motion.div
									key='success'
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.3 }}
									className='p-8 text-center'>
									<div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
										<CheckCircle2 className='w-10 h-10 text-green-600' />
									</div>
									<h3 className='text-2xl font-semibold text-gray-900 mb-2'>
										Thank You!
									</h3>
									<p className='text-gray-600 mb-4'>
										Your enquiry has been successfully submitted. Our admissions
										team will contact you within 24 hours.
									</p>
									<div className='flex justify-center'>
										<div className='flex gap-1'>
											{[0, 1, 2].map(i => (
												<motion.div
													key={i}
													className='w-2 h-2 bg-blue-400 rounded-full'
													animate={{
														scale: [1, 1.2, 1],
														opacity: [0.7, 1, 0.7]
													}}
													transition={{
														duration: 1.5,
														repeat: Infinity,
														delay: i * 0.2
													}}
												/>
											))}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	);
};

export default EnquiryPopup;
