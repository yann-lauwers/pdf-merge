import PDFMerger from "pdf-merger-js/browser"

export async function mergePDF(documents, newPdfName) {
  const merger = new PDFMerger()
  await Promise.all(
    documents.map(async doc => {
      await merger.add(doc.file)
    })
  )
  const mergedPdf = await merger.saveAsBlob()
  const url = URL.createObjectURL(mergedPdf)
  return downloadURL(url, newPdfName)
}

function downloadURL(data, fileName) {
  var a
  a = document.createElement("a")
  a.href = data
  a.download = fileName
  document.body.appendChild(a)
  a.style = "display: none"
  a.click()
  a.remove()
}
