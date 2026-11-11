"use client";

import { useActionState } from "react";

import {
  subscribeToNewsletter,
  type NewsletterState,
} from "@/app/actions/newsletter";
import { cn } from "@/lib/utils";

const INITIAL_STATE: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    INITIAL_STATE
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2.5 rounded-[14px] border border-linen-white/15 bg-linen-white/6 p-6"
    >
      <label htmlFor="newsletter-email" className="text-body font-semibold">
        Get archive updates
      </label>
      <p className="text-small leading-normal text-[#C9D3C4]">
        A short note when new stories and photographs are added.
      </p>
      <div className="mt-1 flex flex-wrap gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby="newsletter-note newsletter-status"
          className="h-12 min-w-0 flex-[1_1_220px] rounded-[10px] border border-linen-white/35 bg-linen-white px-3.5 text-body text-uli-ink placeholder:text-[#6B6B63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-palm-gold bg-palm-gold px-6 text-body font-semibold tracking-button text-uli-ink transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#B88B30] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-linen-white disabled:opacity-70"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p
        id="newsletter-status"
        aria-live="polite"
        className={cn(
          "text-small",
          state.status === "success" && "text-[#E3C17F]",
          state.status === "error" && "text-[#F2C4B8]",
          state.status === "idle" && "sr-only"
        )}
      >
        {state.message}
      </p>
      <p
        id="newsletter-note"
        className="text-[0.8125rem] leading-normal text-[#B9C4B4]"
      >
        We only use your email for these updates. Unsubscribe at any time.
      </p>
    </form>
  );
}
