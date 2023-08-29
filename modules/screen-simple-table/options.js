const header = ["F.Name", "L.Name", "Age", "Gender"]; // Header column names

// Data to be displayed in the table
const tableData = [
  {
    first_name: "John",
    last_name: "Wick",
    gender: "Male",
    age: 30
  },
  {
    first_name: "John",
    last_name: "Doe",
    gender: "Male",
    age: 27
  },
  {
    first_name: "John",
    last_name: "Snow",
    gender: "Male",
    age: 40
  },
  {
    first_name: "Nancy",
    last_name: "Momoland",
    gender: "Female",
    age: 30
  },
  {
    first_name: "Marks",
    last_name: "Collins",
    gender: "Male",
    age: 26
  },
  {
    first_name: "Lorri",
    last_name: "Gibson",
    gender: "Female",
    age: 23
  }
];

export default {
  headers: header,
  tableData: tableData
};
