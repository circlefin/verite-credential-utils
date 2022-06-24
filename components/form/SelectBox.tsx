import { Listbox, Transition } from "@headlessui/react"
import {
  CheckIcon,
  InformationCircleIcon,
  SelectorIcon
} from "@heroicons/react/solid"
import Tippy from "@tippyjs/react"
import clsx from "clsx"
import type { FC } from "react"
import { Fragment } from "react"

import { BaseCredentialProperty } from "lib/credential-fns"

type Props<T> = {
  label?: string
  labelTooltip?: string
  items: T[]
  selected: T
  setSelected: (item: never) => void
}

const SelectBox: FC<Props<BaseCredentialProperty>> = ({
  label,
  labelTooltip,
  items,
  selected,
  setSelected
}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center space-x-2">
                <span>{label}</span>
                {labelTooltip && (
                  <Tippy content={labelTooltip}>
                    <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                  </Tippy>
                )}
              </span>
            </Listbox.Label>
          )}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="inline-flex w-full truncate">
                <span className="truncate">{selected.name}</span>
                <span className="ml-2 text-gray-500 truncate">
                  {selected.secondary}
                </span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.name}
                    className={({ active }) =>
                      clsx(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex">
                          <span
                            className={clsx(
                              selected ? "font-semibold" : "font-normal",
                              "truncate"
                            )}
                          >
                            {item.name}
                          </span>
                          <span
                            className={clsx(
                              active ? "text-indigo-200" : "text-gray-500",
                              "ml-2 truncate"
                            )}
                          >
                            {item.secondary}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SelectBox
