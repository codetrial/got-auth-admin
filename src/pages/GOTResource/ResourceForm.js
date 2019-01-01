import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formItemLayout, formSubmitLayout } from '@/constants/layout.form';

const FormItem = Form.Item;

@connect(({ gotResource, loading }) => ({
  resource: gotResource,
  submitting: loading.effects['gotResource/saveResource'],
}))
@Form.create()
class ResourceForm extends PureComponent {
  state = {
    isNew: true,
  };

  static getDerivedStateFromProps(nextProps) {
    const { match } = nextProps;
    const resourceId = match.params.id;
    return {
      id: resourceId,
      isNew: resourceId == null,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch({
      type: 'gotResource/updateEntity',
      payload: {},
    });

    if (!id) {
      return;
    }

    dispatch({
      type: 'gotResource/getResource',
      payload: id,
    });
  }

  handleSubmit() {
    const { id } = this.state;
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'gotResource/saveResource',
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
      resource: { resourceEntity },
      form: { getFieldDecorator },
    } = this.props;
    const { isNew, id } = this.state;

    return (
      <PageHeaderWrapper
        title={isNew ? '新建资源' : '修改资源'}
        content="用于描述被鉴权的基本单元，可以被分成多种类型，比如 URI、按钮等。需要注意的是，资源不可以单独分配给用户。"
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
                initialValue: resourceEntity.app_id,
                rules: [
                  {
                    required: true,
                    message: '应用方 ID 为必填项',
                  },
                ],
              })(<Input type="number" placeholder="所属应用方的 ID" disabled={!isNew} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="类型">
              {getFieldDecorator('resource_type_id', {
                initialValue: resourceEntity.resource_type_id,
                rules: [
                  {
                    required: true,
                    message: '资源类型 ID 为必填项',
                  },
                ],
              })(<Input type="number" placeholder="资源的分类 ID" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Code">
              {getFieldDecorator('code', {
                initialValue: resourceEntity.code,
                rules: [
                  {
                    required: true,
                    message: 'Code 为必填项',
                  },
                ],
              })(<Input placeholder="资源的唯一标识符" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('detail', {
                initialValue: resourceEntity.detail,
                rules: [],
              })(<Input placeholder="资源的详细描述" />)}
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

export default ResourceForm;
