import { useState } from "react";
import { Star, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addReview, getApprovedReviews, type CustomerReview } from "@/services/cmsStore";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addReview, getApprovedReviews, type CustomerReview } from "@/services/cmsStore";
import { toast } from "sonner";

interface ReviewSectionProps {
  targetType: "cruise" | "blog";
  targetId: string;
  targetName: string;
}

function StarRating({ rating, onChange, size = "md" }: { rating: number; onChange?: (r: number) => void; size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i)}
          disabled={!onChange}
          className={onChange ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
        >
          <Star
            className={`${s} ${i <= rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewSection({ targetType, targetId, targetName }: ReviewSectionProps) {
  const { t, lang } = useLanguage();
  const [reviews, setReviews] = useState(() => getApprovedReviews(targetType, targetId));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      toast.error(t.review.nameRequired);
      return;
    }
    if (form.name.length > 100 || form.comment.length > 1000) {
      toast.error(t.review.inputTooLong);
      return;
    }

    setSubmitting(true);
    addReview({
      targetType,
      targetId,
      targetName,
      name: form.name.trim(),
      email: form.email.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
    });

    setForm({ name: "", email: "", rating: 5, comment: "" });
    setShowForm(false);
    setSubmitting(false);
    toast.success(t.review.thankYou);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-400 fill-amber-400" /> {t.review.customerReviews}
          </h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(Number(avgRating))} size="sm" />
              <span className="text-sm font-bold text-foreground">{avgRating}</span>
              <span className="text-sm text-muted-foreground">({reviews.length} {t.review.reviews})</span>
            </div>
          )}
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Star className="h-4 w-4" /> Write a Review
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Your Rating *</label>
                <StarRating rating={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Name *</label>
                  <Input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    maxLength={100}
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Email (optional)</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    maxLength={255}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Your Review *</label>
                <Textarea
                  value={form.comment}
                  onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                  placeholder="Share your experience..."
                  rows={4}
                  maxLength={1000}
                  required
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground text-right">{form.comment.length}/1000</p>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting} className="gap-2 bg-primary text-primary-foreground">
                  <Send className="h-4 w-4" /> Submit Review
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
              <p className="text-xs text-muted-foreground">Your review will be visible after admin approval.</p>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map(review => (
            <Card key={review.id} className="border-border">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-foreground">{review.name}</span>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        !showForm && (
          <div className="text-center py-8 rounded-xl border border-dashed border-border bg-muted/30">
            <Star className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" />
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          </div>
        )
      )}
    </div>
  );
}
