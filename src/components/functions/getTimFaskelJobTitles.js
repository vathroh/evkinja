
export default function(){

  const getTimFaskel = async () => {

    const response = await fetch(process.env.VUE_APP_ROOT_API + '/job-title/tim-faskel', {
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    })

    return await response.json()
  }

  return { getTimFaskel }
}
