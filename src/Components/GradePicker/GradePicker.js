/* 
   This module will be great to use 
   when we pick Climb type (boulder, route)
   And then that select will trigger to pick 
   from a list of grades for the top of your pyramid
*/

import { useState, useEffect } from 'react'
import { ROUTE_GRADES, BOULDER_GRADES } from '../../Utils/data-utils'

const localCache = {};

export default function useGradeList(climb) {
  
  const [gradeList, setGradeList] = useState([])
  const [status, setStatus] = useState('unloaded')

  useEffect(() => {
    if (!climb) {
      setGradeList([])
    } else if (localCache[climb]) {
      setGradeList(localCache[climb])
    } else {
      requestGradeList()
    }

    async function requestGradeList() {
      setGradeList([])
      setStatus('loading')
  
      let res = ''
      if (climb === 'Boulder') {
        res = BOULDER_GRADES
      } else {
        res = ROUTE_GRADES
      }
  
      localCache[climb] = res
      setGradeList(localCache[climb])
      setStatus('loaded')
    }

  }, [climb])

  return [gradeList, status]
}