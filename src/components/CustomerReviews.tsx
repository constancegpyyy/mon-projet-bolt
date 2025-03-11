import React from 'react';
import { Star, Quote, Check } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
  verified?: boolean;
}

interface CustomerReviewsProps {
  reviews: Review[];
}

export function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-lobster text-shadow">
        Ce que disent nos clients
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="card backdrop-blur-sm bg-white/80"
          >
            <div className="flex items-start gap-4">
              {review.image && (
                <img
                  src={review.image}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.author}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-accent fill-current'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-accent/20" />
                  <p className="text-secondary pl-6">{review.comment}</p>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-muted">
                  <span>{review.date}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-success">
                      <Check className="w-4 h-4" />
                      Achat vérifié
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}