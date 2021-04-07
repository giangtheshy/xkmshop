import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Meta from '../../components/Meta';

import { registerUser } from '../../store/actions/user.action';
import Input from '../../utils/components/Input/Input';
import File from '../../utils/components/File/File'
import Button from '../../utils/components/Button/Button';
import BackLink from '../../utils/components/BackLink/BackLink';
import styles from '../../scss/Account/Register.module.scss';
import Loading from '../../utils/components/Loading/Loading';
const Register = () => {
  const [data, setData] = useState({ email: "", password: "", passwordCheck: "", displayName: "", photoURL: "" })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies, setCookies] = useCookies(["user"]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(data).every(item => item !== "")) {
      const error = await dispatch(registerUser(data, setCookies, setLoading));
      if (error) {
        alert(error);
      } else {

        setData({ email: "", password: "", passwordCheck: "", displayName: "", photoURL: "" })
        router.push('/')
      }
    } else {
      alert("Phải điền đủ thông tin!")
    }
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    try {
      if (file) {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setData({ ...data, [e.target.name]: reader.result })
        };
        reader.onerror = () => {
          console.error('something went wrong!!!');
        };
      }
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <div className={styles.register}>
      <Meta title="Đăng ký tài khoản tại khumuivietnam shop để nhận những ưu đãi đặc biệt và trải nghiệm tốt hơn" />
      <BackLink list={[{ href: '/', text: "Trang chủ" }, { href: '/tai-khoan', text: "Tài khoản" }, { href: '/tai-khoan/dang-ky', text: "Đăng ký" }]} />
      <section className={styles.register__wrapper}>
        <div className={styles.register__wrapper_left}>
          <div className={styles.register__wrapper_left_header}><h1>Đăng ký tài khoản</h1></div>
          <div className={styles.register__wrapper_left_center}>
            <form onSubmit={handleSubmit}>
              <Input type="text" label="Tên người dùng" placeholder="Tên người dùng" value={data.displayName} name="displayName" onChange={handleChange} />
              <Input type="email" label="Email" placeholder="Email" value={data.email} name="email" onChange={handleChange} />
              <Input type="password" label="Password" placeholder="Password" value={data.password} name="password" onChange={handleChange} />
              <Input type="password" label="Password xác nhận" placeholder="Password xác nhận lại" value={data.passwordCheck} name="passwordCheck" onChange={handleChange} />
              <div className={styles.imgCenter}>
                {data.photoURL &&
                  <img src={data.photoURL} alt="avatar" className={styles.avatar} />
                }
                <File name="photoURL" onChange={handleChangeFile} id="file" />
              </div>
              <Button type="submit" label="Đăng ký" >
                {loading ? <Loading /> : "Đăng ký"}
              </Button>
            </form>
            <Link href="/tai-khoan/dang-nhap">Đăng nhập</Link>

          </div>
        </div>
        <div className={styles.register__wrapper_right}>

        </div>
      </section>
    </div>
  )
}

export default Register
