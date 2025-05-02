
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  productName: string;
}

const Breadcrumb = ({ productName }: BreadcrumbProps) => {
  return (
    <div className="mb-8">
      <nav className="flex items-center text-sm text-baladi-navy/70">
        <Link to="/" className="hover:text-baladi-terracotta">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link to="/products" className="hover:text-baladi-terracotta">Products</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-baladi-terracotta font-semibold">{productName}</span>
      </nav>
    </div>
  );
};

export default Breadcrumb;
