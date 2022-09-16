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
  let newData;
  if (edit === false) {
    newData = [
      ...allData,
      {
        ...values,
        id: id,
      },
    ];
    console.log(newData);
  }
  console.log(
    `colaction:${colaction}, docName:${docName}, values:${values}, id:${id}, allData:${allData}, field:${field}, newData:${newData}`
  );
  await updateDoc(doc(db, `${colaction}`, `${docName}`), {
    [field]: edit ? allData : newData,
  });
}
