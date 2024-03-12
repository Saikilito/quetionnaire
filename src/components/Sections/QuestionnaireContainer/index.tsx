import { useContext } from 'react'
import { Button, QuestionsContainer, ResourcesContainer, TopicsContext } from '../..'
import { capitalize } from '@/utils'

export const QuestionnaireContainer = () => {
  const { currentTopic, startQuestionnaire, cancelQuestionnaire } =
    useContext(TopicsContext)
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{capitalize(currentTopic!.id)}</h1>
        {!!currentTopic?.startedQuestionnaire ? (
          <Button
            type="secondary"
            classes="max-w-[150px]"
            onClick={() => {
              cancelQuestionnaire!()
            }}
          >
            Cancel
          </Button>
        ) : (
          <></>
        )}
      </div>

      {!currentTopic?.startedQuestionnaire ? (
        <>
          <p className="mt-4 text-lg">{currentTopic?.description}</p>

          <ResourcesContainer resources={currentTopic?.resources} />

          {!!currentTopic?.questions?.length && (
            <div className="flex justify-center mt-4">
              <Button
                type="primary"
                classes="max-w-[60%]"
                onClick={() => {
                  startQuestionnaire!()
                }}
              >
                START QUESTIONNAIRE
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <QuestionsContainer />
        </>
      )}
    </div>
  )
}
