import React, { useContext, useState, useEffect } from 'react'
import image1 from '../../../assets/images/logo-home-Djb_K2V0.png'
import '../../../assets/css/loginstyle.css'
import { Card, Form, Input, Button, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from "axios";
function Login() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState(null);
  const navigate = useNavigate();
    
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/Account`);
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching Account:", error);
      }
    };
    fetchAccount();
  }, []);


  const ProceedLogin = (values) => {
    values.preventDefault();
    if (validate()) {
        setLoading(true);
        try {
            const foundAccount = accounts.find(a => a.userName == username);
            if (!foundAccount) {
                message.error('Please enter valid username');
                setLoading(false);
                return; 
            }
            if (password == foundAccount.password) {
                message.success('Success');
                const jsonAccount = JSON.stringify(foundAccount);
                localStorage.setItem('Account', jsonAccount);
                navigate("/homepage");
            } else {
                message.error('Please enter valid password'); 
            }

        } catch (err) {
            message.error('Login Failed!!!' + err.message); 
        } finally {
            setLoading(false);
        }
    }
};
    
    const validate =()=>{
      let result = true;
      if (username === '' || username ===null) {
        result=false;
        alert('Please enter your Username!');
      }
      if (password === '' || password ===null) {
        result=false;
        alert('Please enter your Password!');
      }
      return result;
    }
  return (
    <Row style={{display:'block'}}>
    <Col className='offset-lg-3 col-lg-6'>
    <div className='text-center'>
    <div className="centered-image">
      <img src={image1} style={{width:'10%'}}/>
          </div>
    </div>
     <div className='text-center'>
    <h6 className="lg-2 " style={{fontWeight:'bold'}}>The social constructive learning tool</h6>
    <h5 className="lg-2 " style={{fontSize:'1.5em',color:'red', fontWeight:'bold'}}>University system (FU)</h5>
    </div>
    <br /><br /><br />
    <div className='text-center' style={{display:'grid',justifyContent:'center'}}>
    <Card title="User Login" style={{ width: 300 }}>
      <Form>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </Form.Item>
          <Button type="submit" style={{border:'1px solid black', backgroundColor:'blue', color:'HighlightText'}} onClick={ProceedLogin}>
           Login
          </Button>
      </Form>
      </Card>
    </div>
    <br /><br /><br /><br /><br /><br />
    </Col>
    <div className="d-flex justify-content-center col-12 col-md-4 col-lg-5 footer-column  w-100">
    <Col>
      <ul className="contact-menu none-list">
        <li>
            <div className="col-12" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <i style={{fontSize:'10px'}}>Khi hệ thống quá tải và quay hãy f5 và đăng nhập lại</i>
              </div>
              <div className="col-12" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <button style={{color:'blue'}} className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary edu-button   css-nk4ijk" type="button">Frequently Asked Question
                  <span className="MuiTouchRipple-root css-w0pj6f"></span>
                  </button>
                  </div>
                  <div className="col-12" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary edu-button   css-nk4ijk" type="button">
                      <div>
                        <span style={{color:'blue'}} title=" IT HELP DESK" value=" IT HELP DESK"> IT HELP DESK</span>
                        <span style={{color:'blue'}} title=" - PHONE: +84 913677744" value=" - PHONE: +84 913677744"> - PHONE: +84 913677744</span>
                        </div>
                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                        </button>
                        </div>
                        </li>
                        </ul>
                        <div className="col-12 text-center"><p>Copyright © by FPT Education</p></div>
    </Col>
    </div>
    </Row>
  )
}

export default Login