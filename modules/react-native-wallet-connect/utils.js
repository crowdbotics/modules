export let globalConnector;

export const setGlobalConnector = (connector) => {
    globalConnector = connector
}

export const parseAddress=(input)=>{
    const network = input.split(':')[0]
    const addressAndChainId = input.split(':')[1]
    const chainId= addressAndChainId.split('@')[1]
    const address= addressAndChainId.split('@')[0]
    console.log(chainId,address,network)
    return {
        network,
        address,
        chainId
    }
}