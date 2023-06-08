import React, { useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import AddUserForm from "./addUserform";
import UpdateUserForm from "./updateUserform";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target?.name]: event.target?.value,
  };
};

export default function Form() {
  const [formData, setFormData] = useReducer(formReducer, {});

  const formId = useSelector((state) => state.app.client.formId);

  useEffect(() => {
    if (formId) {
      // Obtenha os dados dos mercados e defina formData.mercados aqui
      const mercadosData = [
        // Array de objetos contendo os dados dos mercados
        // ...
      ];

      setFormData({
        ...formData,
        mercados: mercadosData,
      });
    }
  }, [formId]);

  return (
    <div className="container mx-auto py-5">
      {formId ? (
        <UpdateUserForm formId={formId} formData={formData} setFormData={setFormData} />
      ) : (
        <AddUserForm formData={formData} setFormData={setFormData} />
      )}
    </div>
  );
}