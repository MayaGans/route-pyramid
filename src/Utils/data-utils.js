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

// TODO
// using the raw data we'll need to make extra
// {name: null, grade: "X"}
// to fill in the pyramid
// 1. use a filter to count the number of climbs at each grade
// 2. if it doesnt match fill with more objects with null names
// 3. remove any above the max amount of that grade

export const data = [
  { name: null, grade: "13B" },

  { name: null, grade: "13A" },
  { name: null, grade: "13A" },

  { name: "Straight Outta Compton", grade: "12D" },
  { name: "Jesus Wept", grade: "12D" },
  { name: null, grade: "12D" },
  { name: null, grade: "12D" },

  { name: "Space Lord", grade: "12C" },
  { name: "Heart Shaped Box", grade: "12C" },
  { name: "Cell Block Six", grade: "12C" },
  { name: "Mosaic", grade: "12C" },
  { name: null, grade: "12C" },
  { name: null, grade: "12C" },

  { name: "Sliding Down", grade: "12B" },
  { name: "Batarang", grade: "12B" },
  { name: "Charro", grade: "12B" },
  { name: "Bullet the New Sky", grade: "12B" },
  { name: "Babyface", grade: "12B" },
  { name: "Far From God", grade: "12B" },
  { name: "Bullfighter", grade: "12B" },
  { name: null, grade: "12B" },
  { name: null, grade: "12B" },
  { name: null, grade: "12B" },

  { name: "This is the City", grade: "12A" },
  { name: "Where Egos Dare", grade: "12A" },
  { name: "Honey Bucket", grade: "12A" },
  { name: "49", grade: "12A" },
  { name: "Hot Tamale Baby", grade: "12A" },
  { name: "Twinkie", grade: "12A" },
  { name: "Starry", grade: "12A" },
  { name: "Scneezal", grade: "12A" },
  { name: "Crumblies", grade: "12A" },
  { name: "Posse Whipped", grade: "12A" },
  { name: null, grade: "12A" },
  { name: null, grade: "12A" },
  { name: null, grade: "12A" },
  { name: null, grade: "12A" },
];
