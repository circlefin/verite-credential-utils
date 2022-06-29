/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import clsx from "clsx"
import type { FC, ReactNode } from "react"

export type FAQType = {
  question: string
  answer: string | ReactNode
}

type Props = {
  faqs: FAQType[]
}

const FAQ: FC<Props> = ({ faqs }) => {
  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:py-16 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto divide-y-2 divide-gray-200">
        <h2 className="text-2xl font-extrabold text-center text-gray-900">
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {faqs.map((faq) => (
            <Disclosure as="div" key={faq.question} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <span className="flex items-center ml-6 h-7">
                        <ChevronDownIcon
                          className={clsx(
                            open ? "-rotate-180" : "rotate-0",
                            "h-6 w-6 transform"
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="pr-12 mt-2">
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default FAQ
