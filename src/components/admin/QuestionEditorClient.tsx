'use client'

import { useMemo, useState, useTransition } from 'react'
import { QuestionEditorForm, type DifficultyLabel, type OptionDraft } from '@/components/admin/QuestionEditorForm'
import { MetadataPanel, type ExamFreqLabel, type MateriLinkOption } from '@/components/admin/MetadataPanel'
import { LivePreviewCard } from '@/components/admin/LivePreviewCard'
import { saveQuestion, uploadQuestionImage } from '@/app/admin/questions/actions'
import { KAMOKU_LIST, type KamokuPart } from '@/lib/constants'
import type { MaterialSection, Vocabulary } from '@/types/material'

interface QuestionEditorClientProps {
  mode: 'new' | 'edit'
  questionId?: string
  displayId: string
  initialKamokuId: number
  initialSource: string
  initialDifficulty: DifficultyLabel
  initialQuestionText: string
  initialImageUrl: string | null
  initialOptions: OptionDraft[]
  initialCorrectOption: number
  initialFrequency: ExamFreqLabel
  initialVocabKanji: string[]
  initialLinkedMaterialIds: string[]
  allMaterialSections: MaterialSection[]
  allVocab: Vocabulary[]
}

export function QuestionEditorClient({
  mode,
  questionId,
  displayId,
  initialKamokuId,
  initialSource,
  initialDifficulty,
  initialQuestionText,
  initialImageUrl,
  initialOptions,
  initialCorrectOption,
  initialFrequency,
  initialVocabKanji,
  initialLinkedMaterialIds,
  allMaterialSections,
  allVocab,
}: QuestionEditorClientProps) {
  const initialKamoku = KAMOKU_LIST.find((k) => k.id === initialKamokuId) ?? KAMOKU_LIST[0]

  const [part, setPart] = useState<KamokuPart>(initialKamoku.part)
  const [kamokuId, setKamokuId] = useState(initialKamokuId)
  const [source, setSource] = useState(initialSource)
  const [difficulty, setDifficulty] = useState<DifficultyLabel>(initialDifficulty)
  const [questionText, setQuestionText] = useState(initialQuestionText)
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl)
  const [imageUploading, setImageUploading] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)
  const [options, setOptions] = useState<OptionDraft[]>(initialOptions)
  const [correctOption, setCorrectOption] = useState(initialCorrectOption)
  const [vocabChips, setVocabChips] = useState<string[]>(initialVocabKanji)
  const [linkedMaterialIds, setLinkedMaterialIds] = useState<Set<string>>(new Set(initialLinkedMaterialIds))
  const [frequency, setFrequency] = useState<ExamFreqLabel>(initialFrequency)
  const [isPending, startTransition] = useTransition()
  const [justSaved, setJustSaved] = useState(false)

  const materiLinks: MateriLinkOption[] = useMemo(
    () =>
      allMaterialSections
        .filter((section) => section.kamoku_id === kamokuId)
        .map((section) => {
          const kamokuForSection = KAMOKU_LIST.find((k) => k.id === section.kamoku_id)
          return {
            key: section.id,
            labelJp: section.title_jp,
            furiganaMap: [],
            partCode: kamokuForSection ? `${kamokuForSection.part}${kamokuForSection.id}` : '',
            linked: linkedMaterialIds.has(section.id),
          }
        }),
    [allMaterialSections, kamokuId, linkedMaterialIds]
  )

  const vocabSuggestions = useMemo(
    () => allVocab.filter((v) => v.kamoku_id === kamokuId).map((v) => v.kanji),
    [allVocab, kamokuId]
  )

  const kamokuOptions = useMemo(
    () =>
      KAMOKU_LIST.filter((k) => k.part === part).map((k) => ({
        id: k.id,
        label: `${k.id}. ${k.nameJp}`,
      })),
    [part]
  )

  const selectedKamoku = KAMOKU_LIST.find((k) => k.id === kamokuId) ?? KAMOKU_LIST[0]

  function handlePartChange(newPart: KamokuPart) {
    setPart(newPart)
    const firstInPart = KAMOKU_LIST.find((k) => k.part === newPart)
    if (firstInPart) setKamokuId(firstInPart.id)
  }

  function updateOptionText(index: number, text: string) {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, text } : o)))
  }

  function updateOptionExplanation(index: number, explanation: string) {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, explanation } : o)))
  }

  async function handleImageSelect(file: File) {
    setImageError(null)
    setImageUploading(true)
    try {
      const formData = new FormData()
      formData.set('file', file)
      const { url } = await uploadQuestionImage(formData)
      setImageUrl(url)
    } catch (err) {
      setImageError(err instanceof Error ? err.message : 'Gagal upload gambar.')
    } finally {
      setImageUploading(false)
    }
  }

  function handleSave() {
    setJustSaved(false)
    const furiganaMap = vocabChips
      .map((chip) => allVocab.find((v) => v.kanji === chip))
      .filter((v): v is Vocabulary => v !== undefined)
      .map((v) => ({ kanji: v.kanji, reading: v.furigana }))

    startTransition(async () => {
      await saveQuestion({
        id: questionId,
        kamokuId,
        source,
        difficulty,
        questionText,
        correctOption,
        options,
        frequency,
        furiganaMap,
        materialSectionIds: [...linkedMaterialIds],
        imageUrl,
      })
      setJustSaved(true)
    })
  }

  return (
    <>
      {/* Topbar */}
      <div className="flex items-center justify-between border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#90A4AE]">
            <span>Question Editor</span>
            <span>›</span>
            <span className="text-[#546E7A]">{mode === 'new' ? 'Soal Baru' : 'Edit Soal'}</span>
          </div>
          <div className="mt-0.5 text-xl font-extrabold text-[#263238]">Tambah / Edit Soal</div>
        </div>
        <div className="flex items-center gap-2.5">
          {isPending ? (
            <span className="rounded-lg bg-[#1565C0]/[0.1] px-2.5 py-1.5 text-[11px] font-bold text-[#1565C0]">
              Menyimpan…
            </span>
          ) : justSaved ? (
            <span className="rounded-lg bg-[#43A047]/[0.12] px-2.5 py-1.5 text-[11px] font-bold text-[#2E7D32]">
              ✓ Tersimpan
            </span>
          ) : (
            <span className="rounded-lg bg-[#FB8C00]/[0.12] px-2.5 py-1.5 text-[11px] font-bold text-[#E65100]">
              {correctOption ? '● Ada perubahan belum disimpan' : '● Belum ada jawaban benar'}
            </span>
          )}
          <span className="font-mono text-xs text-[#90A4AE]">ID: {displayId}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 items-start gap-5 px-7 py-5 pb-24">
        <QuestionEditorForm
          part={part}
          onPartChange={handlePartChange}
          kamokuOptions={kamokuOptions}
          kamokuId={kamokuId}
          onKamokuChange={setKamokuId}
          source={source}
          onSourceChange={setSource}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          questionText={questionText}
          onQuestionTextChange={setQuestionText}
          imageUrl={imageUrl}
          onImageSelect={handleImageSelect}
          onImageRemove={() => setImageUrl(null)}
          imageUploading={imageUploading}
          imageError={imageError}
          options={options}
          correctOption={correctOption}
          onSetCorrect={setCorrectOption}
          onOptionTextChange={updateOptionText}
          onOptionExplanationChange={updateOptionExplanation}
        />

        <div className="flex min-w-0 flex-[1_1_40%] flex-col gap-4">
          <MetadataPanel
            vocabChips={vocabChips}
            vocabSuggestions={vocabSuggestions}
            onRemoveVocab={(word) => setVocabChips((prev) => prev.filter((w) => w !== word))}
            onAddVocab={(word) => setVocabChips((prev) => (prev.includes(word) ? prev : [...prev, word]))}
            materiLinks={materiLinks}
            onToggleMateri={(key) =>
              setLinkedMaterialIds((prev) => {
                const next = new Set(prev)
                if (next.has(key)) next.delete(key)
                else next.add(key)
                return next
              })
            }
            frequency={frequency}
            onFrequencyChange={setFrequency}
          />

          <LivePreviewCard
            kamokuNameJp={selectedKamoku.nameJp}
            kamokuFuriganaMap={[]}
            partCode={`${part} Part`}
            questionText={questionText}
            questionFuriganaMap={[]}
            options={options.map((o, i) => ({ text: o.text, isCorrect: i + 1 === correctOption }))}
          />
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 z-30 flex items-center justify-between border-t border-[#37474F]/10 bg-white px-7 py-3.5 shadow-[0_-4px_16px_rgba(55,71,79,0.06)]">
        <div className="flex items-center gap-2 text-xs text-[#90A4AE]">
          <span>
            {vocabChips.length} kosakata &middot; {linkedMaterialIds.size} materi terkait
          </span>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            disabled={isPending || correctOption === 0}
            onClick={handleSave}
            className="h-[42px] rounded-[9px] border-[1.5px] border-[#1565C0] bg-[#1565C0]/[0.06] px-5 text-[13.5px] font-bold text-[#1565C0] disabled:opacity-50"
          >
            Simpan Draft
          </button>
          <button
            type="button"
            disabled={isPending || correctOption === 0}
            onClick={handleSave}
            className="h-[42px] rounded-[9px] bg-[#1565C0] px-[26px] text-[13.5px] font-bold text-white shadow-[0_4px_12px_rgba(21,101,192,0.28)] disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>
    </>
  )
}
