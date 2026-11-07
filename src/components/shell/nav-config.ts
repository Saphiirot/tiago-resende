import {
  CalendarDays,
  Dumbbell,
  House,
  LayoutDashboard,
  PlayCircle,
  Settings,
  UserRound,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type ShellArea = "cliente" | "treinador";

export interface NavItem {
  href: string;
  label: string;
  short?: string;
  icon: LucideIcon;
  /** Só fica ativo com correspondência exata (ex.: /app). */
  exact?: boolean;
  /** Grupo na barra lateral (painel do treinador). */
  group?: string;
}

export const shellConfig: Record<
  ShellArea,
  { label: string; home: string; nav: NavItem[]; mobilePrimary: string[] }
> = {
  cliente: {
    label: "Área de cliente",
    home: "/app",
    nav: [
      { href: "/app", label: "Início", icon: House, exact: true },
      { href: "/app/treinos", label: "Treinos", icon: Dumbbell },
      { href: "/app/plano-alimentar", label: "Plano alimentar", short: "Alimentação", icon: Utensils },
      { href: "/app/videos", label: "Vídeos", icon: PlayCircle },
      { href: "/app/calendario", label: "Calendário", icon: CalendarDays },
      { href: "/app/perfil", label: "Perfil", icon: UserRound },
    ],
    mobilePrimary: ["/app", "/app/treinos", "/app/videos", "/app/calendario"],
  },
  treinador: {
    label: "Painel do treinador",
    home: "/admin",
    nav: [
      { href: "/admin", label: "Painel", icon: LayoutDashboard, exact: true, group: "Operação" },
      { href: "/admin/clientes", label: "Clientes", icon: Users, group: "Operação" },
      { href: "/admin/calendario", label: "Calendário", icon: CalendarDays, group: "Operação" },
      { href: "/admin/treinos", label: "Treinos", icon: Dumbbell, group: "Conteúdos" },
      { href: "/admin/planos-alimentares", label: "Planos alimentares", short: "Alimentação", icon: Utensils, group: "Conteúdos" },
      { href: "/admin/videos", label: "Vídeos", icon: PlayCircle, group: "Conteúdos" },
      { href: "/admin/definicoes", label: "Definições", icon: Settings, group: "Conta" },
    ],
    mobilePrimary: ["/admin", "/admin/clientes", "/admin/treinos", "/admin/calendario"],
  },
};

export function isActive(pathname: string, item: NavItem) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}
