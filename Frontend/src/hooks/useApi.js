import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading, addNotification } from '../store/slices/uiSlice';

export const useApi = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const dispatch = useDispatch();

  const execute = useCallback(async (
    config,
    showGlobalLoading = true
  ) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      if (showGlobalLoading) {
        dispatch(setLoading(true));
      }

      const response = await axios(config);

      setState(prev => ({
        ...prev,
        data: response.data,
        loading: false,
        error: null
      }));

      if (showGlobalLoading) {
        dispatch(setLoading(false));
      }

      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));

      dispatch(addNotification({ type: 'error', message: errorMessage }));
      if (showGlobalLoading) {
        dispatch(setLoading(false));
      }

      return null;
    }
  }, [dispatch]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
