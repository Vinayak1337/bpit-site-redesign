export const IMPACT_STAT_COLORS = [
	'text-blue-600', 'text-green-600', 'text-purple-600',
	'text-orange-600', 'text-red-600', 'text-indigo-600',
	'text-teal-600', 'text-yellow-600'
] as const;

export type ImpactStatColor = (typeof IMPACT_STAT_COLORS)[number];
export const IMPACT_STAT_COLOR_OPTIONS = IMPACT_STAT_COLORS;
