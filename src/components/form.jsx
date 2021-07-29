import { useRef, useState, Fragment, useEffect } from "react"
import { uniqueId } from "lodash"
import { Dialog, Transition } from '@headlessui/react'
import { useForm, FormProvider, useFormContext, useFieldArray } from "react-hook-form";

const icons = {
  down: <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#ffaf23]" width="16" height="16" viewBox="0 0 24 24"><path d="M12 24l-8-9h6v-15h4v15h6z"/></svg>,
  up: <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#ffaf23]" width="16" height="16" viewBox="0 0 24 24"><path d="M12 0l8 9h-6v15h-4v-15h-6z"/></svg>,
  cross: <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#E02B20]" width="16" height="16" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>,
  pdf: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className="w-full"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
}

export default function Form() {
  const [open, setOpen] = useState(false)
  const methods = useForm({
    defaultValues: {
      newDocumentName: "",
    }
  });

  // Modal prevents me to use RHF. I need to register it here and watch for changes on the input itself.
  useEffect(() => {
    // TODO add validation for pdf file name no dot in name etc...
    methods.register('newDocumentName', { required: true })
  }, [])

  function mergeDocuments() {
    console.log("hi")
  }

  return (
    <FormProvider {...methods} >
      <form className="w-full xs:w-11/12 md:w-9/12 space-y-16" onSubmit={methods.handleSubmit(mergeDocuments)}>
        <PDFModal open={open} setOpen={setOpen}/>
        <div className="mt-10 space-y-4 bg-white rounded-lg mx-auto p-5">
          <Documents />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-max text-center inline-flex items-center px-4 py-2 border border-transparent text-lg rounded-md shadow-sm text-white bg-[#E02B20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E02B20] font-bold tracking-wider">Merge
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

function DocumentAction({action, children}) {
  return (
    <button onClick={action} className="inline-flex items-center px-1.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{children}</button>
  )
}

function Documents() {
  const { fields, append, remove, swap, } = useFieldArray({
    name: "documents",
  });

  return (
    <>
      <ul className="space-y-3">
        {fields.map((field, index) => (
          <li key={field.id} className="bg-white shadow overflow-hidden rounded-md px-6 py-4 flex justify-between items-center">
            {/* I keep the old version adviced by RHF 7 in case of troubles */}
            {/* <input
              {...register(`documents[${index}].name`)}
              defaultValue={`${field.file.name}`}
            /> */}
            {field.file.name}
            <div className="space-x-2 flex items-center">
              {index > 0 && <DocumentAction action={() => swap(index, index - 1)}>{icons.up}</DocumentAction>}
              {index < (fields.length - 1) && <DocumentAction action={() => swap(index, index + 1)} >{icons.down}</DocumentAction>}
              <DocumentAction action={() => remove(index)} >{icons.cross}</DocumentAction>
            </div>
          </li>
        ))}
      </ul>
      <input type="file" id="pdf" className="hidden" accept=".pdf" onChange={(e) => (e.target.files[0] ? append({id: uniqueId(), file: e.target.files[0]}) : null)} />
      <label
        htmlFor="pdf"
        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-0"
      >
        {icons.pdf}
        <span className="mt-2 block text-sm font-medium text-gray-900">Add new PDF</span>
      </label>
    </>
  )
}

function Input() {
  const {setValue} = useFormContext()
  return (
    <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label
        htmlFor="name"
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
      >
        New PDF name
      </label>
      <div className="flex">
        <input
          type="text"
          onChange={e => setValue("newDocumentName", e.target.value)}
          name="name"
          id="name"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
          placeholder="My document"
        />
        <span className="absolute right-0 top-0 h-full inline-flex items-center pl-4 pr-6 rounded-r-md border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          .pdf
        </span>
      </div>
    </div>
  )
}

function PDFModal({open, setOpen}) {
  return (
    <Modal title="Confirmation" open={open} setOpen={setOpen}>
      <Input />
    </Modal>
  )
}

function Modal({open, setOpen, title, children}) {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="w-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:p-6">
              <div className="mt-3 text-center">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </Dialog.Title>
                <div className="mt-3">
                  {children}
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Merge
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
