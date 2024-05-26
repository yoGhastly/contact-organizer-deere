import { SubmitHandler } from "react-hook-form";
import { Contact } from "./types";
import { Repository } from "../../infrastructure/contact";

const repository = new Repository();

export const onSubmit: SubmitHandler<Contact> = async (data) => {
  await repository.createContact(data);
};
