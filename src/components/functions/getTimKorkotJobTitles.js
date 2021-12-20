
export default function(){

  const getTimKorkot = async () => {

    const response = await fetch(process.env.VUE_APP_ROOT_API + '/job-title/tim-korkot', {
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    })

    return await response.json()
  }

  return { getTimKorkot }
}

