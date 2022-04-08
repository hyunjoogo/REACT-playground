import React from 'react';
import style from './shakeInput.module.css';
import { useForm } from "react-hook-form";

const ShakeInput = (props) => {
  const {register, handleSubmit} = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", {required: true, maxLength: 20})}
/>
      <input {...register("lastName", {pattern: /^[A-Za-z]+$/i})}
             pattern="[a-z]*"
             className={style.shakeInput}/>
      <input type="number" {...register("age", {min: 18, max: 99})} />
      <input type="submit"/>
    </form>
  );
};


export default ShakeInput;
