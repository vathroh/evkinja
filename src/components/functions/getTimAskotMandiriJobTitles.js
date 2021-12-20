
export default function(){

  const getTimAskotMandiri = async () => {

    const response = await fetch(process.env.VUE_APP_ROOT_API + '/job-title/tim-askot-mandiri', {
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    })

    return await response.json()
    
  }

  return { getTimAskotMandiri }
}
