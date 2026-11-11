"use server";

import { createClient } from "@/lib/supabase/client";

export interface NewsletterState {
  status: "idle" | "success" | "error";
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNIQUE_VIOLATION = "23505";

// Adds an email to `newsletter_subscribers` (docs/09-database-design.md).
// Row-level security lets the public key insert but never read the list —
// see supabase/migrations/20261111000000_newsletter_subscribers.sql.
export async function subscribeToNewsletter(
  _previous: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  try {
    const { error } = await createClient()
      .from("newsletter_subscribers")
      .insert({ email });

    // Already subscribed: answer exactly as for a new sign-up, so the form
    // never reveals whether an address is on the list.
    if (error && error.code !== UNIQUE_VIOLATION) {
      // Log the code only — Postgres messages can echo the email back.
      console.error("Newsletter sign-up failed:", error.code);
      return {
        status: "error",
        message:
          "Sorry, we couldn’t save your email just now. Please try again later.",
      };
    }

    return {
      status: "success",
      message:
        "Thank you. We’ll write when new stories and photographs are added.",
    };
  } catch {
    console.error("Newsletter sign-up failed: Supabase unreachable");
    return {
      status: "error",
      message:
        "Sorry, we couldn’t save your email just now. Please try again later.",
    };
  }
}
