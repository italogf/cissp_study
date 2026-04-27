"use client";

import { useEffect, useRef, useState } from "react";

export type QuestionSlug = "daily_use" | "simple_explain" | "cissp_context" | "real_example" | "exam_tip";

export type AiExplainCopy = {
  action: string;
  close: string;
  loading: string;
  error: string;
  questions: Record<QuestionSlug, string>;
};

type Props = {
  sessionId: string;
  blockId: string;
  locale: string;
  copy: AiExplainCopy;
};

const SLUGS: QuestionSlug[] = ["daily_use", "simple_explain", "cissp_context", "real_example", "exam_tip"];
const REQUEST_TIMEOUT_MS = 25_000;

export function AiExplainPanel({ sessionId, blockId, locale, copy }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<QuestionSlug | null>(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsOpen(false);
    setActiveSlug(null);
    setResponse("");
    setHasError(false);
    setIsLoading(false);
  }

  async function handleChipClick(slug: QuestionSlug) {
    abortRef.current?.abort();

    const controller = new AbortController();
    let didTimeout = false;
    const requestId = requestIdRef.current + 1;
    abortRef.current = controller;
    requestIdRef.current = requestId;
    const timeoutId = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    setActiveSlug(slug);
    setResponse("");
    setHasError(false);
    setIsLoading(true);

    try {
      const res = await fetch("/api/study/ai-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ sessionId, blockId, questionSlug: slug, locale }),
      });

      if (!res.ok || !res.body) {
        if (isMountedRef.current && requestIdRef.current === requestId) {
          setHasError(true);
        }
        return;
      }

      const contentType = res.headers.get("content-type") ?? "";
      const nextResponse = contentType.includes("application/json")
        ? await res.json().then((payload: unknown) => {
            if (
              typeof payload === "object" &&
              payload !== null &&
              "answer" in payload &&
              typeof payload.answer === "string"
            ) {
              return payload.answer.trim();
            }

            return "";
          })
        : (await res.text()).trim();

      if (!isMountedRef.current || controller.signal.aborted || requestIdRef.current !== requestId) {
        return;
      }

      if (!nextResponse) {
        setHasError(true);
        return;
      }

      setResponse(nextResponse);
    } catch (error) {
      if (!didTimeout && (controller.signal.aborted || (error instanceof DOMException && error.name === "AbortError"))) {
        return;
      }

      if (isMountedRef.current && requestIdRef.current === requestId) {
        setHasError(true);
      }
    } finally {
      window.clearTimeout(timeoutId);

      if (isMountedRef.current && requestIdRef.current === requestId) {
        setIsLoading(false);
        abortRef.current = null;
      }
    }
  }

  if (!isOpen) {
    return (
      <button type="button" className="ai-explain-trigger" onClick={handleOpen}>
        {copy.action}
      </button>
    );
  }

  return (
    <div className="ai-explain-panel">
      <div className="ai-question-chips">
        {SLUGS.map((slug) => (
          <button
            key={slug}
            type="button"
            className={
              activeSlug === slug
                ? "ai-question-chip ai-question-chip--active"
                : "ai-question-chip"
            }
            onClick={() => {
              void handleChipClick(slug);
            }}
            disabled={isLoading}
          >
            {copy.questions[slug]}
          </button>
        ))}
      </div>

      {(isLoading || response || hasError) ? (
        <div className={isLoading ? "ai-response ai-response--loading" : "ai-response"}>
          {hasError
            ? copy.error
            : !response && isLoading
              ? copy.loading
              : response}
        </div>
      ) : null}

      <button type="button" className="ai-explain-close" onClick={handleClose}>
        {copy.close}
      </button>
    </div>
  );
}
