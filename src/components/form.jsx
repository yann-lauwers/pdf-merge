import { useEffect } from "react"
import { uniqueId } from "lodash"
import { useForm, FormProvider, useFormContext, useFieldArray } from "react-hook-form"
import { mergePDF } from "../utils/PDFMerge"
import { useDisclosure } from "@chakra-ui/react"
import { ConfirmationModal } from "./modal"
import { successToast, Toast } from "./alerts"

const icons = {
  down: (
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#ffaf23]" width="16" height="16" viewBox="0 0 24 24">
      <path d="M12 24l-8-9h6v-15h4v15h6z" />
    </svg>
  ),
  up: (
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#ffaf23]" width="16" height="16" viewBox="0 0 24 24">
      <path d="M12 0l8 9h-6v15h-4v-15h-6z" />
    </svg>
  ),
  cross: (
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#E02B20]" width="16" height="16" viewBox="0 0 24 24">
      <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
    </svg>
  ),
  pdf: (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className="w-full">
      <path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z" />
    </svg>
  ),
}

const fileNameRegex = new RegExp("((.pdf)+|[.]|W)")

export default function Form() {
  const methods = useForm({
    defaultValues: {
      newDocumentName: "",
    },
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Modal prevents me to use RHF. I need to register it here and watch for changes on the input itself.
  useEffect(() => {
    methods.register("newDocumentName", {
      validate: value => !fileNameRegex.test(value) || "You must provide a valid file name",
      required: "You must provide a valid file name",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function mergeDocuments() {
    try {
      const docs = methods.getValues("documents")
      const name = methods.getValues("newDocumentName")

      await methods.trigger(["newDocumentName"])
      if (!methods.formState.errors?.newDocumentName) {
        mergePDF(docs, name)
        methods.reset({ documents: [], newDocumentName: "" })
        onClose()
        successToast()
      }
    } catch (err) {
      console.err(err)
    }
  }

  return (
    <FormProvider {...methods}>
      <form className="w-full xs:w-11/12 md:w-9/12 space-y-16" onSubmit={methods.handleSubmit(mergeDocuments)}>
        <ConfirmationModal isOpen={isOpen} onClose={onClose} onSubmit={mergeDocuments} />
        <div className="mt-10 bg-white rounded-lg mx-auto p-5">
          <Documents />
          {methods.formState.errors.documents && methods.watch("documents").length < 2 && <Error>{methods.formState.errors.documents.message}</Error>}
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={async () => {
              if (methods.getValues("documents").length >= 2) {
                onOpen()
              } else {
                methods.setError("documents", {
                  type: "manual",
                  message: "You must provide at least two pdf files",
                })
              }
            }}
            className="w-max text-center inline-flex items-center px-4 py-2 border border-transparent text-lg rounded-md shadow-sm text-white bg-[#E02B20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E02B20] font-bold tracking-wider"
          >
            Merge
          </button>
        </div>
        <Toast />
      </form>
    </FormProvider>
  )
}

export function Error({ children }) {
  return (
    <div className="rounded-md bg-red-50 p-4 mt-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-red-800" width="14" height="14" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{children}</h3>
        </div>
      </div>
    </div>
  )
}

function DocumentAction({ action, children }) {
  return (
    <button
      onClick={action}
      className="inline-flex items-center px-1.5 py-1.5 border border-transparent rounded bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  )
}

function Documents() {
  const { fields, append, remove, swap } = useFieldArray({
    name: "documents",
  })

  return (
    <>
      {fields.length > 0 && (
        <ul className="space-y-3 mb-4">
          {fields.map((field, index) => (
            <li key={field.id} className="bg-white shadow overflow-hidden rounded-md px-6 py-4 flex justify-between items-center">
              {field.file.name}
              <div className="space-x-2 flex items-center">
                {/* Doesn't work */}
                {/* {index > 0 && (
                  <DocumentAction action={() => swap(index, index - 1)}>{icons.up}</DocumentAction>
                )}
                {index < fields.length - 1 && (
                  <DocumentAction action={() => swap(index, index + 1)}>
                    {icons.down}
                  </DocumentAction>
                )} */}
                <DocumentAction action={() => remove(index)}>{icons.cross}</DocumentAction>
              </div>
            </li>
          ))}
        </ul>
      )}
      <input
        type="file"
        id="pdf"
        className="hidden"
        accept=".pdf"
        onChange={e => (e.target.files[0] ? append({ id: uniqueId(), file: e.target.files[0] }) : null)}
      />
      <label
        htmlFor="pdf"
        className="relative cursor-pointer block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-0"
      >
        {icons.pdf}
        <span className="mt-2 block text-sm font-medium text-gray-900">Add new PDF</span>
      </label>
    </>
  )
}

export function Input({ onSubmit, onClose }) {
  const { setValue, getValues, formState, reset } = useFormContext()

  return (
    <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-[#46406F] focus-within:border-[#46406F]">
      <label htmlFor="name" className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
        New PDF name
      </label>
      <div className="flex">
        <input
          autoComplete="off"
          type="text"
          autoFocus
          onChange={e => setValue("newDocumentName", e.target.value)}
          defaultValue={getValues("newDocumentName") ? getValues("newDocumentName") : ""}
          onKeyDown={e => {
            if (e.key === "Enter") {
              onSubmit()
            }
          }}
          name="name"
          id="name"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
          placeholder="My document"
        />
        <span className="absolute right-0 top-0 h-full inline-flex items-center pl-4 pr-6 rounded-r-md border-gray-300 bg-gray-100 text-gray-500 sm:text-sm">
          .pdf
        </span>
      </div>
    </div>
  )
}
