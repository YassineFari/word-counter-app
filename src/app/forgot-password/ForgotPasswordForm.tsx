"use client";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setSubmitting(false);

    if (data.error) {
      setError(data.error);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-text mb-4">Check Your Email</h1>
        <p className="text-text-secondary leading-relaxed">
          If an account with that email exists, we&apos;ve sent a password reset link. Please check your inbox.
        </p>
        <a href="/login" className="inline-block mt-6 text-sm text-primary hover:underline">
          Back to Login
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-text mb-2 text-center">Forgot Password</h1>
      <p className="text-sm text-text-secondary text-center mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-1">Email</label>
          <input
            id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
            placeholder="your@email.com" required
          />
        </div>
        <button
          type="submit" disabled={submitting}
          className="w-full py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <p className="mt-4 text-sm text-text-secondary text-center">
        <a href="/login" className="text-primary hover:underline">Back to Login</a>
      </p>
    </div>
  );
}
