export type ItemProps = {
  title: string;
  icon: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}