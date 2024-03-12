export const ResourcesContainer = ({
  resources,
}: {
  resources?: { name: string; link: string }[]
}) => {
  return (
    <div className="flex mt-2 flex-column pl-8">
      {!!resources?.length ? (
        <ul style={{ listStyleType: 'disc' }}>
          {resources.map((resource, index) => (
            <li key={index}>
              <a
                target="_blank"
                className="hover:text-[purple]"
                href={resource.link}
              >
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <>No Resources Found</>
      )}
    </div>
  )
}
