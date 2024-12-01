---
title: "A Step-by-Step Guide to Building Reusable Components with React Hook Form"
description: "Learn how to create reusable form components using React Hook Form for better developer experience and maintainable code."
date: "2024-05-14"
image: "/blog/RHF.webp"
readingTime: "4 min read"
tags: ["React Hook Form", "React", "Frontend Development", "Web Development"]
---

# A Step-by-Step Guide to Building Reusable Components with React Hook Form

![React Hook Form Components](/blog/RHF.webp)

[React Hook Form](https://react-hook-form.com/) is a powerful library that simplifies form handling in React applications. By creating reusable form components, you can streamline your development process and ensure consistency across your forms. Last time I explained why [using react hook form is a good idea](https://www.abdurashid.com/blog/first-post) in form handlings and gives you best developer experience. I do not think it is difficult to find how to install and add to your project since there are lots of other tutorials as well. Therefore this time, I'll try to explain how to use React Hook Form in React by creating reusable components as there is no enough explanations about it.

## Step 1: Setting up the FormProvider

To use React Hook Form, you need to wrap your form components with the FormProvider component. This allows your form components to access the form context and register their fields with the form. 

```jsx
import { FormProvider } from 'react-hook-form';

export default function MyForm() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      {/* Your form components go here */}
    </FormProvider>
  );
}
```

## Step 2: Creating Reusable Input Components

One of the benefits of using React Hook Form is the ability to create reusable input components. Let's take a look at an example of a reusable input component called InputField.

```jsx
import { useFormContext } from 'react-hook-form';

function InputField({ name, label, type, required, ...rest }) {
  
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message;
  return (
    <div className={`input-wrapper ${error ? 'has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type || 'text'}
        {...register(name, { required: required })}
        {...rest}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
```


## Step 3: Using the Reusable Input Component

Now that we have created a reusable input component, let's see how we can use it in our form.

```jsx
import InputForm from './InputForm';

function MyForm() {
  // ...
  return (
    <FormProvider {...methods}>
      <InputField
        name="name"
        label="Name"
        placeholder="Enter your name"
        required="Name is required"
      />
      <InputField
        name="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        required="Email is required"
      />
      {/* Other form fields */}
    </FormProvider>
  );
}
```

## Step 4: Handling Form Submission

To handle form submission, you can use the handleSubmit function provided by React Hook Form. Here's an example:

```jsx
function MyForm() {
  const methods = useForm();
  const { handleSubmit } = methods;

const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      {/* Form fields */}
      <button type="submit">Submit</button>
    </FormProvider>
  );
}
```

## Step 5: Handling Field Validation

React Hook Form provides built-in validation rules and the ability to define custom validation functions. Let's take a look at an example of field validation using the required and validate options.

```jsx
import { useFormContext } from 'react-hook-form';

function InputField({ name, label, type, required, validate, ...rest }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[id]?.message;
  return (
    <div className={`input-wrapper ${error ? 'has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type || 'text'}
        {...register(name, { required: required, validate: validate })}
        {...rest}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
```

In this example, we add the required and validate options to the register function. The required option specifies whether the field is required or not. The validate option allows you to define a custom validation function that returns true if the field is valid and false otherwise.

Here's an example of using the InputField component with validation:

```jsx
function MyForm() {
  // ...

const validateEmail = (value) => {
    // Custom email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Invalid email format';
  };
  return (
    <FormProvider {...methods}>
      <InputField
        name="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        required="Email is required"
        validate={validateEmail}
      />
      {/* Other form fields */}
    </FormProvider>
  );
}
```

The other benefits of react hook form it supports not only text inputs, but all other forms of inputs like radio buttons, checkboxes, file input. And it can be used with much more advanced cases with controlled and uncontrolled components. If necessary I might write in the next post about more specific and advanced uses cases as well. Let me know in the comments.

## Tags
- React Hook Form
- React
- Front End Web Development
- Web Development
- React Form Handling
