'use client'

import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface TopicsContextValue {
  currentTopic?: TopicState
  selectTopic?: (id: string, current: TopicState, previousParents: string[]) => void
  goBack?: (current: TopicState) => void
  startQuestionnaire?: () => void
  cancelQuestionnaire?: () => void
  completeQuestionnaire?: () => void
  resetQuestionnaire?: (current: TopicState) => void
  saveQuestionAnswer?: (
    current: TopicState,
    questionId: string,
    answer: 'A' | 'B' | 'C'
  ) => void
}

export const TopicsContext = createContext<TopicsContextValue>({})

interface Topic {
  id: string
  description?: string
  children: string[]
  resources?: any[]
  questions?: any[]
  startedQuestionnaire?: boolean
  isCompleted?: boolean
}

type TopicState = Topic & { previousParents: string[] }

const initialTopic: Topic = {
  id: 'development',
  description: 'Select which area  you want to dive in.',
  children: ['frontend', 'fullstack'],
}

export function TopicsProvider({
  children,
  topics,
}: {
  topics: any[]
  children: React.ReactNode
}) {
  const router = useRouter()
  const [allTopics, setAllTopics] = useState([...topics, initialTopic])
  const [currentTopic, setCurrentTopic] = useState<TopicState>({
    ...initialTopic,
    previousParents: [],
  })

  const refreshAllTopics = (current: TopicState) => {
    setAllTopics(
      allTopics.map((topic) => (topic.id === current.id ? current : topic))
    )
  }

  const selectTopic = (
    id: string,
    current: TopicState,
    previousParents: string[]
  ) => {
    if (!id) return

    refreshAllTopics(current)

    const selectedTopic = allTopics.find((topic) => topic.id === id)

    if (!selectedTopic) {
      router.push('/' + current.id)
    } else {
      setCurrentTopic({
        id,
        previousParents,
        children: selectedTopic.children,
        description: selectedTopic.description,
        resources: selectedTopic.resources,
        questions: selectedTopic.questions,
      })
    }
  }

  const goBack = (current: TopicState) => {
    if (!current.previousParents.length) return

    const parent = current.previousParents.pop()

    const selectedTopic = allTopics.find((topic) => topic.id === parent)

    setCurrentTopic({
      id: selectedTopic.id,
      previousParents: current.previousParents,
      children: selectedTopic.children,
      description: selectedTopic.description,
      resources: selectedTopic.resources,
      questions: selectedTopic.questions,
    })
  }

  const startQuestionnaire = () => {
    setCurrentTopic({ ...currentTopic, startedQuestionnaire: true })
  }

  const cancelQuestionnaire = () => {
    setCurrentTopic({ ...currentTopic, startedQuestionnaire: false })
  }

  const completeQuestionnaire = () => {
    setCurrentTopic({
      ...currentTopic,
      isCompleted: true,
      startedQuestionnaire: false,
    })
  }

  const resetQuestionnaire = (current: TopicState) => {
    setCurrentTopic({
      ...current,
      isCompleted: false,
      startedQuestionnaire: true,
      questions: current.questions?.map((question) => ({
        ...question,
        answer: undefined,
      })),
    })
  }

  const saveQuestionAnswer = (
    current: TopicState,
    questionId: string,
    answer: 'A' | 'B' | 'C'
  ) => {
    const { questions } = current

    if (questions) {
      setCurrentTopic({
        ...current,
        questions: questions.map((q) =>
          q.id === questionId ? { ...q, answer } : q
        ),
      })
    }
  }

  return (
    <TopicsContext.Provider
      value={{
        currentTopic,
        selectTopic,
        goBack,
        startQuestionnaire,
        cancelQuestionnaire,
        saveQuestionAnswer,
        completeQuestionnaire,
        resetQuestionnaire,
      }}
    >
      {children}
    </TopicsContext.Provider>
  )
}
