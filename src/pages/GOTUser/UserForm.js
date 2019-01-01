import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formItemLayout, formSubmitLayout } from '@/constants/layout.form';

const FormItem = Form.Item;

@connect(({ gotUser, loading }) => ({
  user: gotUser,
  submitting: loading.effects['gotUser/saveUser'],
}))
@Form.create()
class UserForm extends PureComponent {
  state = {
    isNew: true,
  };

  static getDerivedStateFromProps(nextProps) {
    const { match } = nextProps;
    const userId = match.params.id;
    return {
      id: userId,
      isNew: userId == null,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch({
      type: 'gotUser/updateEntity',
      payload: {},
    });

    if (!id) {
      return;
    }

    dispatch({
      type: 'gotUser/getUser',
      payload: id,
    });
  }

  handleSubmit() {
    const { id } = this.state;
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'gotUser/saveUser',
          payload: {
            id,
            ...values,
          },
        });
      }
    });
  }

  render() {
    const { submitting } = this.props;
    const {
      user: { userEntity },
      form: { getFieldDecorator },
    } = this.props;
    const { isNew, id } = this.state;

    return (
      <PageHeaderWrapper
        title={isNew ? '新建用户' : '修改用户'}
        content="业务系统的用户，可以为用户授予分组或角色。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {!isNew && (
              <FormItem {...formItemLayout} label="ID">
                <span className="ant-form-text">{id}</span>
              </FormItem>
            )}
            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
                initialValue: userEntity.email,
                rules: [
                  {
                    required: true,
                    message: '邮箱为必填项',
                  },
                ],
              })(<Input placeholder="用户的邮箱" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('name', {
                initialValue: userEntity.name,
                rules: [
                  {
                    required: true,
                    message: '名称为必填项',
                  },
                ],
              })(<Input placeholder="用户的名称" />)}
            </FormItem>
            <FormItem {...formSubmitLayout} style={{ marginTop: 32 }}>
              <Button type="primary" onClick={() => this.handleSubmit()} loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={() => router.goBack()}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserForm;
