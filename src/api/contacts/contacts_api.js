import axios from 'axios'
import https from 'https'
import { CONTACTS_MICROSERVICE } from '../API_URLS'
import authHeaders from '../authHeaders'

export const saveContactToDb = (contact) => {
  const p = new Promise((res, rej) => {
    // axios.post(`${CONTACTS_MICROSERVICE}/save_contact`, contact, authHeaders())
    //   .then((data) => {
    //     res(data.data)
    //   })
    //   .catch((err) => {
    //     rej(err)
    //   })
    res()
  })
  return p
}
