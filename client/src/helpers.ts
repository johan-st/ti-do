import { useEffect } from 'react'

const millisElapsedToString = (millis: number):string => {
  let rem = Math.floor(millis / 1000)
  const days = Math.floor(rem / 86400)
  rem -= days * 86400
  const hours = Math.floor(rem / 3600)
  rem -= hours * 3600
  const minutes = Math.floor(rem / 60)
  rem -= minutes * 60
  const seconds = rem % 60
  const res = `${days}d ${hours}h ${minutes}m ${seconds}s`
  return res
}

const millisToString = (millis: number):string => {
  const date = new Date(millis).toLocaleString()
  return date
}

const useMountEffect = (fun:()=>void):void => useEffect(fun, [])

export {useMountEffect, millisElapsedToString, millisToString }


