'use client';

import { useState, useEffect } from 'react';

interface AnimatedNumberProps {
	value: number;
	suffix?: string;
	duration?: number;
	animated: boolean;
}

export default function AnimatedNumber({ value, suffix = '', duration = 2000, animated }: AnimatedNumberProps) {
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		if (!animated) {
			setDisplayValue(value);
			return;
		}

		let start = 0;
		const end = value;
		const increment = end / (duration / 16);

		const timer = setInterval(() => {
			start += increment;
			if (start >= end) {
				setDisplayValue(end);
				clearInterval(timer);
			} else {
				setDisplayValue(Math.floor(start));
			}
		}, 16);

		return () => clearInterval(timer);
	}, [value, duration, animated]);

	return (
		<span>
			{displayValue}
			{suffix}
		</span>
	);
}
