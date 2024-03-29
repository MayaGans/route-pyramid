export const ROUTE_GRADES = [
  "5.14d",
  "5.14c",
  "5.14b",
  "5.14a",
  "5.13d",
  "5.13c",
  "5.13b",
  "5.13a",
  "5.12d",
  "5.12c",
  "5.12b",
  "5.12a",
  "5.11d",
  "5.11c",
  "5.11b",
  "5.11a",
  "5.10d",
  "5.10c",
  "5.10b",
  "5.10a",
  "5.9",
  "5.8",
  "5.7",
  "5.6",
  "5.5",
];

export const BOULDER_GRADES = [
  "v17",
  "v16",
  "v15",
  "v14",
  "v13",
  "v12",
  "v11",
  "v10",
  "v9",
  "v8",
  "v7",
  "v6",
  "v5",
  "v4",
  "v3",
  "v2",
  "v1",
  "v0",
];

export const STYLE = [
  "Crimps",
  "Slopers",
  "Pinch",
  "Compression",
  "Pockets",
  "Incuts",
  "Jugs",
  "Jam",
  "Dyno",
  "Tufa",
];

export const ANGLE = ["Slab", "Vertical", "Overhang", "Roof"];

export const get_layers = (climb, top, n) => {
  let grades = ROUTE_GRADES;
  if (climb === "Boulder") {
    grades = BOULDER_GRADES;
  }

  let topN = grades.indexOf(top);
  let bottomN = grades.indexOf(top) + n;
  return grades.slice(topN, bottomN);
};

export const make_data = (data, layers_vector) => {
  return layers_vector.reduce(
    (grouped, key) =>
      (grouped[key] = data.filter(({ grade }) => grade === key)) && grouped,
    {}
  );
};
