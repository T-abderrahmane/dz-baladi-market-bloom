
interface ProductDescriptionProps {
  description: string;
  features: string[];
}

const ProductDescription = ({ description, features }: ProductDescriptionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-12">
      <h2 className="text-2xl font-bold text-baladi-navy mb-4">About this product</h2>
      <p className="text-baladi-navy/80 mb-6">{description}</p>
      
      <h3 className="text-xl font-semibold text-baladi-navy mb-3">Key Features</h3>
      <ul className="list-disc pl-5 space-y-2 text-baladi-navy/80">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDescription;
