import { createWorker } from 'tesseract.js'

let worker = null

export async function recognizeReceipt(imageBlob, onProgress) {
  if (!worker) {
    const opts = onProgress
      ? {
          logger: (m) => {
            if (m.status === 'recognizing text') onProgress(Math.floor(m.progress * 100))
          },
        }
      : {}
    worker = await createWorker(['eng', 'ind'], 1, opts)
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
