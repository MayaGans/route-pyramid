const climbing_grades = [
  "14D",
  "14C",
  "14B",
  "14A",
  "13D",
  "13C",
  "13B",
  "13A",
  "12D",
  "12C",
  "12B",
  "12A",
  "11D",
  "11C",
  "11B",
  "11A",
  "10D",
  "10C",
  "10B",
  "10A",
  "9",
  "8",
  "7",
  "6",
  "5",
];

// given the climbing grade array
// get the 6 grades needed for the pyramid
export function get_grades(top) {
  let t = climbing_grades.indexOf(top);
  return climbing_grades.slice(t, t + 6);
}

export function get_layer(dat, layer_grade, num) {
  let climbs = dat
  .filter((x) => x.grade === layer_grade)
  .map((d) => d.name)

  let leftover = num - climbs.length

  if (Math.sign(leftover) !== -1) {
    let nulls = Array(leftover).fill(null) 
    
    return climbs.concat(nulls).map((x) => {
    return { 
      name: x,
      grade: layer_grade
    }
      
  })
    
  } else {
    
  return climbs.slice(0, num).map((x) => {
    return { 
      name: x,
      grade: layer_grade
    }        
  })
}
}

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
