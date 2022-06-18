import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
export default async function update(
  colaction,
  docName,
  values,
  id,
  allData,
  edit = false,
  field
) {
  const newData = [
    ...allData,
    {
      ...values,
      id: id,
    },
  ];
  await updateDoc(doc(db, `${colaction}`, docName), {
    [field]: edit ? allData : newData,
  });
}
