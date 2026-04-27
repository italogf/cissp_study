"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AiExplainPanel, type AiExplainCopy } from "@/components/study/ai-explain-panel";

type Block = {
  id: string;
  type: string;
  title: string | null;
  body: string;
  movieTitle: string | null;
  movieCue: string | null;
};

type DeckCopy = {
  cardCounter: string;
  prevCard: string;
  nextCard: string;
  allCardsRead: string;
  tryQuestionAction: string;
  movieCueLabel: string;
  pauseAction: string;
  listenCardAction: string;
  stopCardAudioAction: string;
  audioUnavailableLabel?: string;
  aiExplain: AiExplainCopy;
};

type Props = {
  blocks: Block[];
  sessionId: string;
  locale: string;
  domainTitle: string;
  lessonTitle: string;
  advanceAction: (formData: FormData) => Promise<void>;
  pauseAction: (formData: FormData) => Promise<void>;
  copy: DeckCopy;
};

export function StudyCardDeck({ blocks, sessionId, locale, domainTitle, lessonTitle, advanceAction, pauseAction, copy }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const total = blocks.length;
  const isLast = currentIndex === total - 1;
  const block = blocks[currentIndex];
  const isAudioAvailable = typeof window !== "undefined" && "speechSynthesis" in window;

  const speechText = useMemo(() => {
    if (!block) {
      return "";
    }

    return [block.title, block.body].filter(Boolean).join(". ");
  }, [block]);
  const counterText = copy.cardCounter
    .replace("{current}", String(currentIndex + 1))
    .replace("{total}", String(total));
  const bodyParagraphs = useMemo(() => {
    return block.body
      .split(/(?<=[.!?])\s+(?=[0-9A-ZÀ-ÖØ-Ý])/u)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [block.body]);

  const cancelSpeech = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  const getMatchingVoice = useCallback(() => {
    const normalizedLocale = locale.toLowerCase();

    return (
      voicesRef.current.find((voice) => voice.lang.toLowerCase() === normalizedLocale) ??
      voicesRef.current.find((voice) => normalizedLocale.startsWith("pt") && voice.lang.toLowerCase().startsWith("pt")) ??
      voicesRef.current.find((voice) => normalizedLocale.startsWith("en") && voice.lang.toLowerCase().startsWith("en")) ??
      null
    );
  }, [locale]);

  const handleAudioToggle = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || speechText.length === 0) {
      return;
    }

    if (isPlaying) {
      cancelSpeech();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(speechText);
    const voice = getMatchingVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = locale === "pt-BR" ? "pt-BR" : "en-US";
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
    };

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  }, [cancelSpeech, getMatchingVoice, isPlaying, locale, speechText]);

  useEffect(() => {
    if (!isAudioAvailable) {
      return;
    }

    const updateVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
      window.speechSynthesis.cancel();
    };
  }, [isAudioAvailable]);

  if (!block) {
    return null;
  }

  return (
    <div className="card-deck-shell">
      <div className="card-deck-header">
        <span className="card-deck-counter">{counterText}</span>
        <div className="card-deck-header-actions">
          <button
            type="button"
            className="card-audio-button"
            onClick={handleAudioToggle}
            disabled={!isAudioAvailable}
            aria-pressed={isPlaying}
            aria-label={
              !isAudioAvailable && copy.audioUnavailableLabel
                ? copy.audioUnavailableLabel
                : isPlaying
                  ? copy.stopCardAudioAction
                  : copy.listenCardAction
            }
            title={!isAudioAvailable ? copy.audioUnavailableLabel : undefined}
          >
            {isPlaying ? copy.stopCardAudioAction : copy.listenCardAction}
          </button>
          <div className="card-dots">
            {blocks.map((_, i) => (
              <span
                key={i}
                className={
                  i === currentIndex
                    ? "card-dot card-dot--active"
                    : i < currentIndex
                      ? "card-dot card-dot--done"
                      : "card-dot"
                }
              />
            ))}
          </div>
        </div>
      </div>

      {block.type === "MOVIE_CUE" ? (
        <div className="movie-cue-card">
          <span className="concept-card__breadcrumb">{domainTitle} · {lessonTitle}</span>
          <span className="movie-cue-card__eyebrow">🎬 {copy.movieCueLabel}</span>
          <h2 className="movie-cue-card__title">{block.movieTitle ?? block.title}</h2>
          {bodyParagraphs.map((paragraph) => (
            <p key={paragraph} className="movie-cue-card__body">{paragraph}</p>
          ))}
          <AiExplainPanel sessionId={sessionId} blockId={block.id} locale={locale} copy={copy.aiExplain} />
        </div>
      ) : (
        <div className="concept-card">
          <span className="concept-card__breadcrumb">{domainTitle} · {lessonTitle}</span>
          {block.title ? <h2 className="concept-card__title">{block.title}</h2> : null}
          {bodyParagraphs.map((paragraph) => (
            <p key={paragraph} className="concept-card__body">{paragraph}</p>
          ))}
          <AiExplainPanel sessionId={sessionId} blockId={block.id} locale={locale} copy={copy.aiExplain} />
        </div>
      )}

      <div className="card-deck-nav">
        <button
          type="button"
          className="button-link button-link--ghost"
          onClick={() => {
            cancelSpeech();
            setCurrentIndex((i) => Math.max(0, i - 1));
          }}
          disabled={currentIndex === 0}
        >
          {copy.prevCard}
        </button>
        {!isLast ? (
          <button
            type="button"
            className="button-link button-link--primary"
            onClick={() => {
              cancelSpeech();
              setCurrentIndex((i) => Math.min(total - 1, i + 1));
            }}
          >
            {copy.nextCard}
          </button>
        ) : null}
      </div>

      {isLast ? (
        <div className="card-deck-ready">
          <p>{copy.allCardsRead}</p>
          <div className="button-row">
            <form action={advanceAction} className="inline-form">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="sessionId" value={sessionId} />
              <button type="submit" className="button-link button-link--primary">
                {copy.tryQuestionAction}
              </button>
            </form>
            <form action={pauseAction} className="inline-form">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="sessionId" value={sessionId} />
              <button type="submit" className="button-link button-link--ghost">
                {copy.pauseAction}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
