import { isObject } from '@xuanmo/javascript-utils'

interface IUploadProgressEvent extends ProgressEvent {
  percent: number
}

interface IRequestOptions {
  url: string
  method?: string
  data?: Record<string, any>
  headers?: Record<string, string>
  responseType?: XMLHttpRequest['responseType']
  onProgress?: (event: IUploadProgressEvent) => void
}

class Request {
  request({
    url,
    method = 'GET',
    data,
    headers,
    responseType = 'json',
    onProgress
  }: IRequestOptions) {
    return new Promise<XMLHttpRequestResponseType | XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      let requestData: any = data

      if (headers?.['Content-Type']?.includes('json')) {
        requestData = JSON.stringify(data || {})
      }

      xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          reject(xhr)
        }
        resolve(xhr.response)
      }

      xhr.upload.onprogress = (event) => {
        const progressEvent = event as IUploadProgressEvent
        progressEvent.percent = event.total > 0 ? (event.loaded / event.total) * 100 : 0
        onProgress?.(progressEvent)
      }

      xhr.onerror = reject

      xhr.open(method, url)

      xhr.responseType = responseType

      if (isObject(headers)) {
        for (const [key, value] of Object.entries(headers!)) {
          xhr.setRequestHeader(key, value)
        }
      }

      xhr.send(requestData)
    })
  }
}

const requestHandler = new Request()

const request = (config: IRequestOptions) => requestHandler.request(config)

export { Request, request }
