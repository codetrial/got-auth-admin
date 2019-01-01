import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formItemLayout, formSubmitLayout } from '@/constants/layout.form';

const FormItem = Form.Item;

@connect(({ gotRole, loading }) => ({
  role: gotRole,
  submitting: loading.effects['gotRole/saveRole'],
}))
@Form.create()
class RoleForm extends PureComponent {
  state = {
    isNew: true,
  };

  static getDerivedStateFromProps(nextProps) {
    const { match } = nextProps;
    const roleId = match.params.id;
    return {
      id: roleId,
      isNew: roleId == null,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch({
      type: 'gotRole/updateEntity',
      payload: {},
    });

    if (!id) {
      return;
    }

    dispatch({
      type: 'gotRole/getRole',
      payload: id,
    });
  }

  handleSubmit() {
    const { id } = this.state;
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'gotRole/saveRole',
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
      role: { roleEntity },
      form: { getFieldDecorator },
    } = this.props;
    const { isNew, id } = this.state;

    return (
      <PageHeaderWrapper
        title={isNew ? '新建角色' : '修改角色'}
        content="一个角色可以包含多个资源，本身也可以单独用于鉴权。可以直接分配给用户。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {!isNew && (
              <FormItem {...formItemLayout} label="ID">
                <span className="ant-form-text">{id}</span>
              </FormItem>
            )}
            <FormItem {...formItemLayout} label="应用方">
              {getFieldDecorator('app_id', {
                initialValue: roleEntity.app_id,
                rules: [
                  {
                    required: true,
                    message: '应用方 ID 为必填项',
                  },
                ],
              })(<Input type="number" placeholder="所属应用方的 ID" disabled={!isNew} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Code">
              {getFieldDecorator('code', {
                initialValue: roleEntity.code,
                rules: [
                  {
                    required: true,
                    message: 'Code 为必填项',
                  },
                ],
              })(<Input placeholder="角色的唯一标识符" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('name', {
                initialValue: roleEntity.name,
                rules: [
                  {
                    required: true,
                    message: '名称为必填项',
                  },
                ],
              })(<Input placeholder="角色的名称" />)}
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

export default RoleForm;
