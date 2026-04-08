import {
  Shield,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Eye,
  Award,
  FileText,
  BarChart3,
  Settings,
  BookOpen,
  Calendar,
  Star,
  Lightbulb,
  UserX,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Lock,
  Scale,
  Heart
} from 'lucide-react';

export const IconMap: Record<string, any> = {
  Shield,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Eye,
  Award,
  FileText,
  BarChart3,
  Settings,
  BookOpen,
  Calendar,
  Star,
  Lightbulb,
  UserX,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Lock,
  Scale,
  Heart
};

export const getIconComponent = (iconName: string) => {
  return IconMap[iconName] || Shield;
};

