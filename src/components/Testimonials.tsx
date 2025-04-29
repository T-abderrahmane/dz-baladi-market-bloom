
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Yasmine Benali",
      location: "Algiers",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      text: "The quality of the dates and olive oil is incredible! It reminds me of my grandmother's kitchen. Fast shipping and beautiful packaging too.",
      rating: 5
    },
    {
      name: "Karim Hadji",
      location: "Oran",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      text: "I ordered the artisan pottery set as a gift and was amazed by the craftsmanship. Authentic Algerian quality that you can't find elsewhere.",
      rating: 5
    },
    {
      name: "Amina Khelif",
      location: "Constantine",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      text: "The spice mixes are exactly what I needed to recreate traditional dishes. Everything arrived fresh and the customer service was excellent.",
      rating: 4
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-baladi-navy text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-baladi-gold">Customers</span> Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Don't just take our word for it - hear from some of our satisfied customers about their experience with Baladi Market
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? "text-baladi-gold fill-baladi-gold" : "text-gray-400"}`} 
                  />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-100 mb-6">"{testimonial.text}"</p>
              
              {/* Customer Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-300 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
