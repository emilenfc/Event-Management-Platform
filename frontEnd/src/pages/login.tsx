import React from 'react'

interface Props {}

const Login = (props: Props) => {
  return (
      <div>
          <div>
              <h1 className="text-5xl font-bold text-red-800">Login</h1>
              <div>
                  <input type="text" />
                  <label htmlFor="">your first name</label>
              </div>
              <div>
                  <input type="text" />
                  <label htmlFor="">your last name</label>
              </div>
              <div>
                  <input type="email" />
                  <label htmlFor="">your email</label>
              </div>
              <div>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">remember me</label>
              </div>
              <span>forget password</span>

          </div>
          login
      </div>
  )
}

export default Login