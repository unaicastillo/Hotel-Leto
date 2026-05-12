import { Link } from "react-router-dom";

interface Props {
  item: { label: string; url: string };
  className?: string;
  onClick?: () => void;
}

export const NavItem = ({ item, className, onClick }: Props) => {
  const isExternal = item.url.startsWith("http");
  
  if (isExternal) {
    return (
      <a href={item.url} className={className} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }
  return (
    <Link to={item.url} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
};