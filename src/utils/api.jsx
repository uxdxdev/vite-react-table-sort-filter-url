import axios from "axios";
import data from "../../data.json";

// export default axios.create({
//   baseURL: "http://localhost:3000/",
// });

export default {
  get: () => Promise.resolve({ data: data.candidates }),
};
