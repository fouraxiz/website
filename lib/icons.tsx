import {
  BadgeCheck, BarChart3, Boxes, Brain, Briefcase, Calculator, Cloud, Code2, Compass, Factory, FileText,
  Globe, GraduationCap, HeartHandshake, Headset, IdCard, KanbanSquare, Landmark, Layers, LifeBuoy, Lock,
  MessageSquare, MonitorCog, Package, Palette, PenTool, Plug, Rocket, ScanBarcode, Search, ShieldCheck,
  ShoppingBag, ShoppingCart, Smartphone, Sparkles, Stethoscope, TestTube2, TrendingUp, Truck, Users,
  Wallet, Workflow, type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

const icons: Record<IconName, LucideIcon> = {
  boxes: Boxes,
  brain: Brain,
  code: Code2,
  globe: Globe,
  smartphone: Smartphone,
  workflow: Workflow,
  "shopping-cart": ShoppingCart,
  calculator: Calculator,
  users: Users,
  wallet: Wallet,
  kanban: KanbanSquare,
  "scan-barcode": ScanBarcode,
  package: Package,
  truck: Truck,
  "monitor-cog": MonitorCog,
  "shopping-bag": ShoppingBag,
  "badge-check": BadgeCheck,
  "id-card": IdCard,
  "shield-check": ShieldCheck,
  stethoscope: Stethoscope,
  "bar-chart": BarChart3,
  palette: Palette,
  plug: Plug,
  cloud: Cloud,
  "test-tube": TestTube2,
  "life-buoy": LifeBuoy,
  "graduation-cap": GraduationCap,
  "heart-handshake": HeartHandshake,
  landmark: Landmark,
  factory: Factory,
  briefcase: Briefcase,
  "file-text": FileText,
  "message-square": MessageSquare,
  "trending-up": TrendingUp,
  sparkles: Sparkles,
  lock: Lock,
  headset: Headset,
  search: Search,
  compass: Compass,
  "pen-tool": PenTool,
  rocket: Rocket,
  layers: Layers,
};

export function Icon({ name, className, strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const Cmp = icons[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
