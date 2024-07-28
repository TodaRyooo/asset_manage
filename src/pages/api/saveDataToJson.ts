import { PostJsonDataType } from '@/types/postJsonDataType'

export const saveDataToJson = async (data: PostJsonDataType, fileTitle: string) => {
  try {
    const response = await fetch(`/api/makeJson?fileTitle=${encodeURIComponent(fileTitle)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const sendData = await response.json()
    console.log(sendData)
    // console.log(data)
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
