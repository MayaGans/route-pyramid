export const CLIMBING_GRADES = ["5.14d", "5.14c", "5.14b", "5.14a", "5.13d", "5.13c", "5.13b", "5.13a", "5.12d", "5.12c", "5.12b", "5.12a", "5.11d", "5.11c", "5.11b", "5.11a", "5.10d", "5.10c", "5.10b", "5.10a", "5.9", "5.8", "5.7", "5.6", "5.5"]

// given the climbing grade array
// get the 6 grades needed for the pyramid
export function get_grades(top) {
  let t = CLIMBING_GRADES.indexOf(top);
  return CLIMBING_GRADES.slice(t, t + 6);
}

// get all the climbs from the data of a certain grade
// and the number of climbs for that layer

export function get_layer(dat, layer_grade, num) {
  
  let climbs = dat
  .filter((x) => x.grade === layer_grade)
  .map((d) => {
    return {
      name: d.name,
      grade: d.grade,
      date: d.date,
      ascent_type: d.ascent_type
    }
  })

  // are there any leftover numbers to fill
  let leftover = num - climbs.length

  // if so add nulls
  if (Math.sign(leftover) !== -1) {

    let nulls = Array(leftover).fill({
      name: null,
      grade: layer_grade, 
      date: null,
      ascent_type: null
    }) 
    return [...climbs, ...nulls] 
    
  // otherwise just used the first numbers in the vector
  // that will 
  } else {
    
  return climbs.slice(0, num).map((d) => {
    return { 
      name: d.name,
      grade: d.grade,
      date: d.date,
      ascent_type: d.ascent_type
    }        
  })
}
}

// this should always output an array of length 36
export function make_pyramid(grade, raw_climbs) {
  
  let grades = get_grades(grade)

  let layer_0 = get_layer(raw_climbs, grades[0], 1)
  let layer_1 = get_layer(raw_climbs, grades[1], 2)
  let layer_2 = get_layer(raw_climbs, grades[2], 3)
  let layer_3 = get_layer(raw_climbs, grades[3], 6)
  let layer_4 = get_layer(raw_climbs, grades[4], 10)
  let layer_5 = get_layer(raw_climbs, grades[5], 14)

  return [
    ...layer_0,
    ...layer_1,
    ...layer_2,
    ...layer_3,
    ...layer_4,
    ...layer_5
  ]
}
