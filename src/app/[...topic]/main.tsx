'use client'
import { useContext, useEffect } from 'react'
import {
  QuestionnaireContainer,
  RecommendationsContainer,
  TopicsContext,
} from '../../components'

export default function Main({ params }: { params: { topic: string[] } }) {
  const { currentTopic, selectTopic } = useContext(TopicsContext)

  const { startedQuestionnaire = false } = currentTopic!

  useEffect(() => {
    const topics = [...params.topic]
    selectTopic!(topics.pop()!, currentTopic!, topics)
  }, [params])
  return (
    <div className="main-container">
      <div
        className={`main-left transition-[width] duration-300 ${
          startedQuestionnaire ? 'w-full ' : ''
        }`}
      >
        <QuestionnaireContainer />
      </div>
      <div className={`main-right ${startedQuestionnaire ? 'hidden' : ''}`}>
        <RecommendationsContainer />
      </div>
    </div>
  )
}
