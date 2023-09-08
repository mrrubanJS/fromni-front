class ChannelTypeService{
    constructor(){
    }
    async getChannels(url){
        const response =  await fetch(url, {
            method: 'GET',
            })

        const parsedResponse = await response.json()
        return parsedResponse

    }
}

const channelTypeAPI = new ChannelTypeService()

export default channelTypeAPI