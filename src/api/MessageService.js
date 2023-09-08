class MessageService {
    constructor(){}
    async postOne (url, body){
      const response =  await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
            })

        const parsedResponse = await response.json()
        return parsedResponse
        
}
}

const messageAPI = new MessageService()

export default messageAPI