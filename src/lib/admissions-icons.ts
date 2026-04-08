import {
	Award,
	Brain,
	BookOpen,
	Building2,
	Calendar,
	CheckCircle2,
	Computer,
	Cpu,
	CreditCard,
	FileText,
	Globe,
	GraduationCap,
	HelpCircle,
	IndianRupee,
	Leaf,
	Mail,
	MapPin,
	Phone,
	Star,
	TrendingUp,
	Trophy,
	Users
} from 'lucide-react';

const ICON_MAP = {
	Award,
	Brain,
	BookOpen,
	Building2,
	Calendar,
	CheckCircle2,
	Computer,
	Cpu,
	CreditCard,
	FileText,
	Globe,
	GraduationCap,
	HelpCircle,
	IndianRupee,
	Leaf,
	Mail,
	MapPin,
	Phone,
	Star,
	TrendingUp,
	Trophy,
	Users
} as const;

export type AdmissionsIconName = keyof typeof ICON_MAP;
export const ADMISSIONS_ICON_NAMES = Object.keys(ICON_MAP) as AdmissionsIconName[];

export function getAdmissionsIcon(name: string) {
	return ICON_MAP[name as AdmissionsIconName] ?? BookOpen;
}
