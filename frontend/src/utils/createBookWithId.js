import { v4 as uuidv4 } from "uuid";

const createBookWithId = (book, source) => {
  return {
    ...book,
    source,
    id: uuidv4(),
    favorite: false,
  };
};

export default createBookWithId;
