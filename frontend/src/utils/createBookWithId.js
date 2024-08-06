import { v4 as uuidv4 } from "uuid";

const createBookWithId = (book) => {
  return {
    ...book,
    id: uuidv4(),
    favorite: false,
  };
};

export default createBookWithId;
