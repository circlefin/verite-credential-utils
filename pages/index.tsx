import { DownloadIcon } from "@heroicons/react/solid"
import type { NextPage } from "next"

const people = [
  {
    name: "Lindsay Walton",
    role: "Active Credential in good standing",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Courtney Henry",
    role: "Revoked Credential",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Tom Cook",
    role: "Expired Credential",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Custom",
    role: "Pick custom attributes"
  }
]

const Home: NextPage = () => {
  return (
    <>
      <div className="mt-10">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          KYC/AML Credentials
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {people.map((person, personIdx) => (
            <li
              key={personIdx}
              className="flex items-center justify-between py-4 space-x-3"
            >
              <div className="flex items-center flex-1 min-w-0 space-x-3">
                <div className="flex-shrink-0">
                  {person.imageUrl ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={person.imageUrl}
                      alt=""
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br to-gray-500 from-gray-200"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {person.name}
                  </p>
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {person.role}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 bg-gray-100 border border-transparent rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <DownloadIcon
                    className="-ml-1 mr-0.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {" "}
                    Download <span className="sr-only">{person.name}</span>{" "}
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Home
