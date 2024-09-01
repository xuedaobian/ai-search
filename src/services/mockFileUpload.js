// 模拟文件上传延迟
const MOCK_UPLOAD_DELAY = 1500

export function mockFileUpload(file, onProgress) {
  let isCancelled = false

  const uploadPromise = new Promise((resolve, reject) => {
    let progress = 0
    const intervalId = setInterval(() => {
      if (isCancelled) {
        clearInterval(intervalId)
        reject(new Error('Upload cancelled'))
        return
      }

      progress += 10
      if (progress <= 100) {
        onProgress(progress)
      }

      if (progress >= 100) {
        clearInterval(intervalId)
        // 生成一个模拟的文件URL
        const mockUrl = `/logo.svg`
        resolve({
          url: mockUrl,
          filename: file.name,
          fileType: file.type,
        })
      }
    }, MOCK_UPLOAD_DELAY / 10)
  })

  uploadPromise.cancel = () => {
    isCancelled = true
  }

  return uploadPromise
}
