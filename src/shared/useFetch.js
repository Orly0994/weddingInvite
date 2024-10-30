export const useFetch = () => {
  const parameters = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const url = '/api/records'
  
  return {
    get(id) {
      return fetch(`${url}/${id}`, parameters).then(data => data.json())
    },

    put(uuid, body) {
      console.log(uuid, body)
      return fetch(`${url}/${uuid}`, {
        ...parameters,
        method: 'PUT',
        body: JSON.stringify(body)
      }).then(data => data.json())
    },

    post(body) {
      return fetch(url, {
        ...parameters,
        method: 'POST',
        body: JSON.stringify(body)
      }).then(data => data.json())
    },

    delete(id) {
      return fetch(`${url}/${id}`, {
        ...parameters,
        method: 'DELETE',
      }).then(data => data.json())
    }
  }
}