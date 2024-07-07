import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };
  return (
    <Button type='primary' onClick={handleClick}>Join Now</Button>
  )
}

export default Main