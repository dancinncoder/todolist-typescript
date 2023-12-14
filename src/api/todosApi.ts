import axios from "axios";

const getTodos = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_JSON_SERVER}/todos`
  );
  console.log(response.data);
  return response.data;
};
export { getTodos };
