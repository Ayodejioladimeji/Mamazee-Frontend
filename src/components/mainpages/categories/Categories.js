import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../../SEO/SEO';
const endpoint = process.env.REACT_APP_API;
const token = localStorage.getItem('token');

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState('');
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          endpoint + `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);
      } else {
        const res = await axios.post(
          endpoint + '/api/category',
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);
      }
      setOnEdit(false);
      setCategory('');
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(endpoint + `/api/category/${id}`, {
        headers: { Authorization: token },
      });
      toast.success(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className='categories'>
      <SEO title='Category' />
      <ToastContainer />
      <form onSubmit={createCategory}>
        <label htmlFor='category'>Category</label>
        <input
          type='text'
          name='category'
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className='cat-button' type='submit'>
          {onEdit ? 'Update' : 'Create'}
        </button>
      </form>

      <div className='col'>
        {categories.map((category) => (
          <div className='row' key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.name)}>
                Edit
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
