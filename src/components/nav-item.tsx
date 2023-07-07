import Link from "next/link";
type NavProps = {
  text: string;
  href: string;
  active: boolean;
};
const NavItem = (props: NavProps) => {
  const { text, href, active } = props;
  return (
    <Link className={`nav__item ${active ? "active" : ""}`} href={href}>
      {text}
    </Link>
  );
};

export default NavItem;
