/**
 * 下载文本
 * @param {String} filename 文件名
 * @param {String} text 文本
 */
export function downloadText(filename, text) {
  const blob = new Blob([text], {
    type: 'text/plain'
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = filename
  a.href = url
  a.click()
  // 回收资源
  URL.revokeObjectURL(url)
}
