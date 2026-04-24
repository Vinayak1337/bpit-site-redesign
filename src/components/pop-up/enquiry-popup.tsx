'use client';

import React, { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';
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
import { ContactType } from '@prisma/client';

type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

const EnquiryPopup = ({ contacts }: { contacts: ContactDTO[] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const posthog = usePostHog();
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
			posthog?.capture('enquiry_popup_opened');
		};

		window.addEventListener('openEnquiry', handleOpenEnquiry);
		return () => window.removeEventListener('openEnquiry', handleOpenEnquiry);
	}, [posthog]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		posthog?.capture('enquiry_form_submitted', {
			course: formData.course || 'unspecified',
			has_phone: Boolean(formData.phone)
		});

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setIsSuccess(true);
		posthog?.capture('enquiry_form_success', {
			course: formData.course || 'unspecified'
		});

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

	const phones = contacts.filter(c => c.type === 'PHONE');
	const primaryPhone = phones[0] ?? null;
	const emailContact = contacts.find(c => c.type === 'EMAIL') ?? null;
	const sanitizeTel = (input: string): string => input.replace(/[^+\d]/g, '');
	const phoneTel = primaryPhone ? sanitizeTel(primaryPhone.value) : '';
	const phoneDisplay = primaryPhone?.displayValue ?? primaryPhone?.value ?? '';
	const email = emailContact?.value ?? '';

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent
				className='max-w-[95vw] sm:max-w-[90vw] md:max-w-[600px] p-0 border-0 bg-transparent shadow-none overflow-visible max-h-[95vh] overflow-y-auto'
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
						className='bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative mx-2 sm:mx-0'>
						{/* Header Section */}
						<div className='bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 relative'>
							<button
								onClick={handleClose}
								className='absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/30'
								aria-label='Close admission enquiry form'
								type='button'>
								<X className='w-4 h-4 sm:w-5 sm:h-5' />
							</button>

							<div className='flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 pr-10 sm:pr-12'>
								<div className='w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0'>
									<GraduationCap className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
								</div>
								<div className='min-w-0 flex-1'>
									<h2 className='text-lg sm:text-xl font-semibold text-white truncate'>
										Admission Enquiry
									</h2>
									<p className='text-blue-100 text-xs sm:text-sm truncate'>
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
									className='p-4 sm:p-6 md:p-8'>
									<div className='mb-4 sm:mb-6'>
										<p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
											Ready to shape your future in engineering and technology?
											Fill out the form below and our admissions team will get
											back to you within 24 hours.
										</p>
									</div>

									<form
										onSubmit={handleSubmit}
										className='space-y-4 sm:space-y-5'>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5'>
											<div className='space-y-2'>
												<label
													htmlFor='enquiry-name'
													className='text-sm font-medium text-gray-700 block'>
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
													className='h-12 sm:h-11 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-base sm:text-sm'
													required
												/>
											</div>

											<div className='space-y-2'>
												<label
													htmlFor='enquiry-email'
													className='text-sm font-medium text-gray-700 block'>
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
													className='h-12 sm:h-11 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-base sm:text-sm'
													required
												/>
											</div>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5'>
											<div className='space-y-2'>
												<label
													htmlFor='enquiry-phone'
													className='text-sm font-medium text-gray-700 block'>
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
													className='h-12 sm:h-11 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-base sm:text-sm'
												/>
											</div>

											<div className='space-y-2'>
												<label className='text-sm font-medium text-gray-700 block'>
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
													<SelectTrigger className='h-12 sm:h-11 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-base sm:text-sm'>
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
												className='text-sm font-medium text-gray-700 block'>
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
												className='min-h-[120px] sm:min-h-[100px] px-4 py-3 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none text-base sm:text-sm'
												required
											/>
										</div>

										<Button
											type='submit'
											disabled={!isFormValid || isSubmitting}
											className='w-full h-14 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-sm'>
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

										<p className='text-xs text-gray-500 text-center leading-relaxed px-2'>
											By submitting this form, you agree to receive
											communications from BPIT regarding your enquiry.
										</p>
									</form>

									{/* Contact Info */}
									<div className='mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100'>
										<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
											<a
												href={`tel:${phoneTel}`}
												className='flex items-center gap-3 p-3 sm:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group'>
												<div className='w-10 h-10 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors flex-shrink-0'>
													<Phone className='w-5 h-5 sm:w-4 sm:h-4 text-blue-600' />
												</div>
												<div className='min-w-0 flex-1'>
													<p className='text-xs text-gray-500'>Call us</p>
													<p className='text-sm font-medium text-gray-900 truncate'>
														{phoneDisplay}
													</p>
												</div>
											</a>

											<a
												href={`mailto:${email}`}
												className='flex items-center gap-3 p-3 sm:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group'>
												<div className='w-10 h-10 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors flex-shrink-0'>
													<Mail className='w-5 h-5 sm:w-4 sm:h-4 text-blue-600' />
												</div>
												<div className='min-w-0 flex-1'>
													<p className='text-xs text-gray-500'>Email us</p>
													<p className='text-sm font-medium text-gray-900 truncate'>
														{email}
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
									className='p-6 sm:p-8 text-center'>
									<div className='w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6'>
										<CheckCircle2 className='w-8 h-8 sm:w-10 sm:h-10 text-green-600' />
									</div>
									<h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-2'>
										Thank You!
									</h3>
									<p className='text-gray-600 mb-4 text-sm sm:text-base leading-relaxed px-2'>
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
