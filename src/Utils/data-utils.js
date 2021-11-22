export const ROUTE_GRADES = [
  "5.14d", "5.14c", "5.14b", "5.14a", 
  "5.13d", "5.13c", "5.13b", "5.13a", 
  "5.12d", "5.12c", "5.12b", "5.12a", 
  "5.11d", "5.11c", "5.11b", "5.11a", 
  "5.10d", "5.10c", "5.10b", "5.10a", 
  "5.9", "5.8", "5.7", "5.6", "5.5"
]

export const BOULDER_GRADES = [
  "v17", "v16", "v15", "v14", "v13",
  "v12", "v11", "v10", "v9", "v8",
  "v7", "v6", "v5", "v4", "v3",
  "v2", "v1", "v0"
]

export const STYLE = ["Crimps", "Slopers", "Pinch", "Compression", "Pockets", "Incuts", "Jugs", "Jam"]
export const ANGLE = ["Slab", "Vertical", "Overhang", "Roof"]

// given the climbing grade array
// get the 6 grades needed for the pyramid
export function get_grades(top, allGrades) {
  let t = allGrades.indexOf(top);
  return allGrades.slice(t, t + 6);
}

// get all the climbs from the data of a certain grade
// and the number of climbs for that layer

export function get_layer(dat, layer_grade, num, climb_style, climb_angle, climb_start, climb_end) {
  
    let climbs = dat.filter((x) => x.grade === layer_grade).filter(function(x) {
      let startDate = new Date(climb_start)
      let endDate = new Date(climb_end)

      let date = x.date === "" ? "" : new Date(x.date)
      return date >= startDate && date <= endDate 
  })

    // filter for the climb style and angle if provided
    if (climb_style !== "all") climbs = climbs.filter((x) => x.style === climb_style)
    if (climb_angle !== "all") climbs = climbs.filter((x) => x.angle === climb_angle)
  
    climbs = climbs.map((d) => {
      return {
        name: d.name,
        grade: d.grade,
        date: d.date,
        ascent_type: d.ascent_type,
        angle: d.angle,
        style: d.style
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
        ascent_type: null,
        angle: null,
        style: null
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
        ascent_type: d.ascent_type,
        angle: d.angle,
        style: d.style
      }        
    })
  }

}

// this should always output an array of length 36
// give the top grade and climbs create a pyramid vector
// this will cut of the number of climbs once the number is completed
// if there arent enough climbs of the grade it will be filled in with nulls
export function make_pyramid(grade, raw_climbs, gradeList, climb_style, climb_angle, climb_start, climb_end, counts) {
  
  let grades = get_grades(grade, gradeList)

  let layer_0 = get_layer(raw_climbs, grades[0], counts[0], climb_style, climb_angle, climb_start, climb_end)
  let layer_1 = get_layer(raw_climbs, grades[1], counts[1], climb_style, climb_angle, climb_start, climb_end)
  let layer_2 = get_layer(raw_climbs, grades[2], counts[2], climb_style, climb_angle, climb_start, climb_end)
  let layer_3 = get_layer(raw_climbs, grades[3], counts[3], climb_style, climb_angle, climb_start, climb_end)
  let layer_4 = get_layer(raw_climbs, grades[4], counts[4], climb_style, climb_angle, climb_start, climb_end)
  let layer_5 = get_layer(raw_climbs, grades[5], counts[5], climb_style, climb_angle, climb_start, climb_end)

  return [
    ...layer_0,
    ...layer_1,
    ...layer_2,
    ...layer_3,
    ...layer_4,
    ...layer_5
  ]
}

export function get_totals(data, grade, climb_style, climb_angle, climb_start, climb_end) {
  // filter to only pyramid grades
  let result = data.filter(item => grade.includes(item.grade)).filter(function(x) {
      let startDate = new Date(climb_start)
      let endDate = new Date(climb_end)
      let date = new Date(x.date)
      return date >= startDate && date <= endDate
  })

  // filter for the climb style and angle if provided
  if (climb_style !== "all") result = result.filter((x) => x.style === climb_style)
  if (climb_angle !== "all") result = result.filter((x) => x.angle === climb_angle)

  // turn into a vector of grades
  result = result.map(x => x.grade)
  // count number of unique
  .reduce(
    (acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    },
    Object.fromEntries(grade.map(g => [g, 0]))
  );

  return Object.values(result)
}

// get the leftover amounts for each block layer
// given a vector of counts 
// which we can change if the block number changes
export function get_leftovers(total, counts) {

  let remain = total.map((x,i) => x - counts[i])

  return remain.map(function(x) {
    if (Math.sign(x) !== -1) {
      return x 
    } else {
      return 0
    }
  })
}
