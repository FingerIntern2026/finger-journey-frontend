import {
  BadgeCheck, Calculator, CalendarDays, FileCheck2, ShieldCheck,
  Sprout, Star, WalletCards,
} from "lucide-react";

const ICONS = {
  badge: BadgeCheck,
  calculator: Calculator,
  calendar: CalendarDays,
  file: FileCheck2,
  shield: ShieldCheck,
  sprout: Sprout,
  star: Star,
  wallet: WalletCards,
};

export default function HrPolicyIcon({ name }) {
  const Icon = ICONS[name] ?? Sprout;
  return <Icon size={31} strokeWidth={1.8} aria-hidden="true" />;
}
