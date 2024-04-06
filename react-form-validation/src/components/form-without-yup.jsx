import React, { useState } from 'react';
import * as Yup from 'yup';

const FormWithoutYup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    // interests: [],
    birthDate: '',
  });

  const [errors, setErrors] = useState('');

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('invalid email').required('email is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{11}$/, 'Phone Number must be 11 digits')
      .required(),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must contain at least one number, one uppercase letter, and one lowercase letter'
      ),
    confirmPassword: Yup.string()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      })
      .required('Confirm Password is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .min(18, 'You must be 18 years old')
      .max(100, 'You cannot be older than 100 years')
      .required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    // interests: Yup.array()
    //   .min(1, 'select at least one interest')
    //   .required('Select at least one interest'),
    birthDate: Yup.date().required('Date is required'),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log('form submitted', formData);
      alert('Success'); // Displaying success alert
    } catch (error) {
      console.error('Form submission error:', error);
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  }
    
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
      <form className='form' action="" onSubmit={handleSubmit}>
         <div>
         <div>
  <label>FirstName</label>
  <input
    type="text" 
    name='firstName'
    value={formData.firstName}
    placeholder='Enter your first name'
    onChange={handleChange}
  />
</div>
{errors && errors.firstName && <span className="error">{errors.firstName}</span>}

     </div>

     <div>
      <label>LastName</label>
          <input type="text" 
          name='lastName'
          value={formData.lastName}
          placeholder='Enter your first name'
          onChange={handleChange}
          />
    </div>
    {errors && errors.lastName && <span className="error">{errors.lastName}</span>}

    <div>
      <label>Email</label>
          <input type="email" 
          name='email'
          value={formData.email}
          placeholder='Enter your email'
          onChange={handleChange}
          />
    </div>
    {errors && errors.email && <span className="error">{errors.email}</span>}


    <div>
      <label>Phone Number</label>
          <input type="number" 
          name='phoneNumber'
          value={formData.phoneNumber}
          placeholder='Enter your phoneNumber'
          onChange={handleChange}
          />
    </div>
    {errors && errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

    <div>
      <label>password</label>
          <input type="text" 
          name='password'
          value={formData.password}
          placeholder='Enter your password'
          onChange={handleChange}
          />
    </div>
    {errors && errors.password && <span className="error">{errors.password}</span>}
    
    
    <div>
      <label>confirm Password</label>
          <input type="text" 
          name='confirmPassword'
          value={formData.confirmPassword.value}
          placeholder='Confirm your password'
          onChange={handleChange}
          />
    </div>
    {errors && errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

    
    <div>
      <label>Age</label>
          <input type="number" 
          name='age'
          value={formData.age}
          placeholder='Enter your age'
          onChange={handleChange}
          />
    </div>
    {errors && errors.age && <span className="error">{errors.age}</span>}

    
    <div>
  <label>Gender</label>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>
{errors && errors.gender && <span className="error">{errors.gender}</span>}

<div>
  <label>Date Of Birth</label>
  <input
    type="date" 
    name='birthDate'
    value={formData.birthDate}
    onChange={handleChange}
  />
</div>
{errors && errors.birthDate && <span className="error">{errors.birthDate}</span>}


 <button type='submit'>Submit</button>
      </form>
  )
}

export default FormWithoutYup;
