export default function validateInfo(values) {
    let errors = {};
  
    if (!values.name.trim()) {
      errors.name = "Field cannot be empty";
    }
    if (!values.amount) {
      errors.amount = "Field cannot be empty";
    }
    if (!values.flow) {
      errors.type = "Field cannot be empty";
    }
    if (!values.category) {
      errors.category = "Field cannot be empty";
    }
    return errors;
  }
  