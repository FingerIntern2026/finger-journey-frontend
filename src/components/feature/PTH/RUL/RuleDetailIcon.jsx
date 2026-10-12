import {
  CalendarDays, CircleAlert, Clock3, ClipboardCheck, Coffee, FileText,
  Flower2, Luggage, Mail, PackageCheck, Sprout, Star, Umbrella,
  UserCheck, UsersRound, UserX,
} from "lucide-react";

const ICONS = {
  alert: CircleAlert,
  calendar: CalendarDays,
  check: ClipboardCheck,
  clock: Clock3,
  coffee: Coffee,
  file: FileText,
  flower: Flower2,
  luggage: Luggage,
  mail: Mail,
  package: PackageCheck,
  sprout: Sprout,
  star: Star,
  umbrella: Umbrella,
  "user-check": UserCheck,
  users: UsersRound,
  "user-x": UserX,
};

export default function RuleDetailIcon({ name }) {
  const Icon = ICONS[name] ?? Sprout;
  return <Icon size={31} strokeWidth={1.8} aria-hidden="true" />;
}
