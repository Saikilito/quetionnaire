import { getAllPossibleRoutes, getAllTopics } from '@/topics'
import Main from './main'

export default function Home({ params }: { params: { topic: string[] } }) {
  return (
    <div className="main-container">
      <Main params={params} />
    </div>
  )
}

export async function generateStaticParams() {
  const topics = getAllTopics()
  // return [
  //   {
  //     topic: [
  //       ...topics.map((topic) => topic.id),
  //       'frontend',
  //       'fullstack',
  //       'development',
  //     ],
  //   },
  // ]
  // return [
  //   ...topics.map((topic) => ({ topic: [topic.id] })),
  //   { topic: ['frontend'] },
  //   { topic: ['fullstack'] },
  //   { topic: ['development'] },
  // ]
  return getAllPossibleRoutes()
}
