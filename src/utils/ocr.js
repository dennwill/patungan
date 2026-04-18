import { createWorker } from 'tesseract.js'

let worker = null

export async function recognizeReceipt(imageBlob, onProgress) {
  if (!worker) {
    worker = await createWorker(['eng', 'ind'], 1, {
      logger: onProgress
        ? (m) => {
            if (m.status === 'recognizing text') {
              onProgress(Math.floor(m.progress * 100))
            }
          }
        : undefined,
    })
  }

  const { data: { text } } = await worker.recognize(imageBlob)
  return text
}

export async function terminateOCR() {
  if (worker) {
    await worker.terminate()
    worker = null
  }
}
