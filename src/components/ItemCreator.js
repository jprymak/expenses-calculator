import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from 'uuid';
import validate from "../validateInfo";


const categories = ["food", "education", "transport", "car", "alcohol", "games", "money"]

const initialValues={
  flow: "",
  name: "",
  amount: "",
  category: "",
}

export default function ItemCreator({handleSubmit}) {
  return (
    <div className="ItemCreator">
      <Formik
        initialValues={initialValues}
        validate={(values) => validate(values)}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          handleSubmit(values);
          resetForm()
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <>
            <h1 className="header">Add item</h1>
            <Form className="Form">
              {/*RADIO*/}
              <div
                role="radiogroup"
                className={`radio-group ${errors.flow && touched.flow ? "input-error" : ""
                  }`}
              >
                <h3 className="radio-group-header">Income or expense?</h3>
                <div>
                  <Field type="radio" id="income" name="flow" value="income" />
                  <label htmlFor="income">Income</label>
                </div>

                <div>
                  <Field  
                    type="radio"
                    id="expense"
                    name="flow"
                    value="expense"
                  />
                  <label htmlFor="expense">Expense</label>
                </div>
              </div>
              {errors.flow && touched.flow ? (
                <p className="error">{errors.flow}</p>
              ) : null}
              {/*NAME*/}
              <Field
                className={`input ${errors.name && touched.name ? "input-error" : ""
                  }`}
                placeholder="name"
                name="name"
                type="text"
              />

              {errors.name && touched.name ? (
                <p className="error">{errors.name}</p>
              ) : null}
              {/*AMOUNT*/}
              <Field
                className={`input ${errors.amount && touched.amount ? "input-error" : ""
                  }`}
                placeholder="amount"
                name="amount"
                type="number"
              />

              {errors.amount && touched.amount ? (
                <p className="error">{errors.amount}</p>
              ) : null}

              {/*CATEGORY*/}
              <Field
                className={`input ${errors.category && touched.category ? "input-error" : ""
                  }`}
                placeholder="category"
                name="category"
                type="select"
                as="select"
              >
                <option value="">Choose category</option>
                {
                categories.map(category=><option key={uuidv4()} value={category}>{category}</option>)
              }
                </Field>

              {errors.category && touched.category ? (
                <p className="error">{errors.category}</p>
              ) : null}

              <button className="btn" type="submit" disabled={isSubmitting}>
                Add
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
