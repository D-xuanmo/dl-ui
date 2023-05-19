/**
 * 本地文件预览
 * @param file 文件对象
 */
export const filePreview = (file: File): [string, () => void] => {
  const url = window.URL.createObjectURL(file)
  return [url, () => window.URL.revokeObjectURL(url)]
}
