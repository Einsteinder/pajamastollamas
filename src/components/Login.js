
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { postLogin } from '../actions'
import { connect } from 'react-redux'

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}



const mapStateToProps = (state) => (
  {
  currentUser: state.currentUser,
})
const mapDispatchToProps = (dispatch) => ({
  login:(user)=>dispatch(postLogin(user))

})



const WrappedLoginForm = Form.create()(Login);




export default connect(
  mapStateToProps,mapDispatchToProps
)(WrappedLoginForm)