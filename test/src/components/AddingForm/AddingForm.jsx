import React, { useState } from 'react';
import DateInput from '../DateInput/DateInput';

export default function AddingForm() {
  const [inputValue, setInputValue] = useState({
    lastName:'',
    firstName:'',
    patronomic:'',
    birthDay:'',
    phone:'',
    email:'',
    job:'',
    address:''
  })
  const [errors, setErrors] = useState('')

  const changeHandler = (e) => {
    setInputValue((prev) => ({...prev, [e.target.name]: e.target.value}));
    console.log(inputValue);
  };

  const validatePhone = phone => {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
};

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/
    return regex.test(email)
  }

  const validateForm = () => {
    const newErrors = {};
    if (!inputValue.lastName) newErrors.lastName = 'Поле является обязательным';
    if (!inputValue.firstName) newErrors.firstName = 'Поле является обязательным';
    if (!inputValue.birthDay) newErrors.birthDay= 'Поле является обязательным';
    if (!inputValue.phone) newErrors.phone = 'Поле является обязательным';
    if (!inputValue.email) newErrors.email = 'Поле является обязательным';
    
    if (inputValue.email && !validateEmail(inputValue.email)) {
      newErrors.errorEmail = 'Введен некорректный адрес почты';
    }
    if (inputValue.phone && !validatePhone(inputValue.phone)) {
      newErrors.errorPhone = 'Неверный формат номера телефона';
  }
    return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  
  if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
  }

  alert('Форма валидна, отправляется запрос');
  
  setInputValue({
      lastName: '',
      firstName: '',
      patronomic:'',
      birthDay: '',
      phone: '',
      email: '',
      job: '',
      address:''
  });
  setErrors({});
};

    
    return (
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h3>Информация о сотруднике</h3>
          <input
          className={errors.lastName ?'input-red': 'input'}
          name='lastName' 
          type='text' 
          placeholder='Фамилия' 
          value={inputValue.lastName} 
          onChange={changeHandler}
          />
          {errors.lastName && <p className='error'>{errors.lastName}</p>}
          <input
          className={errors.firstName ?'input-red': 'input'}
          name='firstName'
          type='text'
          placeholder='Имя'
          value={inputValue.firstName}
          onChange={changeHandler}
          />
          {errors.firstName && <p className='error'>{errors.firstName}</p>}
          <input 
          name='patronomic' 
          type='text' 
          placeholder='Отчество' 
          value={inputValue.patronomic} 
          onChange={changeHandler}
          />
        <div className='elem-inline'>
          <select name='gender'>
          <option className='green' value='male' selected>Мужской</option>
          <option value='female'>Женский</option>
          </select>
          <DateInput
          errors={errors.birthDay && <p className='error'>{errors.birthDay}</p>}
          className={errors.birthDay ?'inputDate-red': 'date-container'}
          birthDay={inputValue.birthDay} 
          setBirthDay={(value) => setInputValue((prev) => ({ ...prev, birthDay: value }))}
          />
        </div>
        <div className='elem-inline1'>
        <div className='elem-container'>
          <input
          className={errors.phone||errors.errorPhone ?'input-red': 'input'}
          name='phone' 
          type='text' 
          placeholder='Мобильный телефон' 
          value={inputValue.phone} 
          onChange={changeHandler}
          />
          {errors.phone && <p className='error'>{errors.phone}</p>}
          {errors.errorPhone && <p className='error'>{errors.errorPhone}</p>}
        </div>
        <div className='elem-container'>
          <input
          className={errors.email||errors.errorEmail ?'input-red': 'input'}
          name='email'
          type='text' 
          placeholder='Email' 
          value={inputValue.email}
          onChange={changeHandler}
          />
          {errors.email && <p className='error'>{errors.email}</p>}
          {errors.errorEmail && <p className='error-email'>{errors.errorEmail}</p>}
        </div>
        </div>
          <input name='address'
          type='text'
          placeholder='Адрес постоянной регистрации' 
          value={inputValue.address} 
          onChange={changeHandler}
          />
          <input name='job'
          type='text' 
          placeholder='Название работодателя' 
          value={inputValue.job} 
          onChange={changeHandler}
          />
        <button type='submit'>СОХРАНИТЬ</button>
        </form>
      </div>
    )
  }