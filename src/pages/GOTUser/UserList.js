import React, { PureComponent, Fragment } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Card, Form, Input, Button, Row, Col, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import StandardQueryList from '@/components/StandardQueryList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatFormValues, serializeSearchParam } from '@/utils/search';

// import styles from './UserList.less';

const FormItem = Form.Item;

@connect(({ gotUser, loading }) => ({
  user: gotUser,
  loading: loading.models.gotUser,
}))
@Form.create()
class UserList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (text, row) => (
        <Fragment>
          <Link to={`/got-user/${row.id}`}>修改</Link>
          <Divider type="vertical" />
          <a onClick={() => this.handleDeleteUser(true, row)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'gotUser/search',
    });
  }

  handleDeleteUser() {
    const { dispatch } = this.props;

    dispatch({
      type: 'gotUser/delete',
    });
  }

  handleSelectRows(rows) {
    this.setState({
      selectedRows: rows || [],
    });
  }

  handleStandardTableChange(pagination, filters, sorter) {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = serializeSearchParam(pagination, formValues, filters, sorter);

    dispatch({
      type: 'gotUser/search',
      payload: params,
    });
  }

  handleFormReset() {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'gotUser/search',
      payload: {},
    });
  }

  handleSearch() {
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = formatFormValues(fieldsValue);

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'gotUser/search',
        payload: {
          filter: JSON.stringify(values),
        },
      });
    });
  }

  renderQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户 ID">
              {getFieldDecorator('EQ_id')(<Input placeholder="请输入 ID" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户邮箱">
              {getFieldDecorator('EQ_email')(<Input placeholder="请输入邮箱，精确查询" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户名称">
              {getFieldDecorator('LIKE_name')(<Input placeholder="请输入名称，支持模糊查询" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      user: { userList },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="用户列表" content="业务系统的用户，可以为用户授予分组或角色。">
        <Card bordered={false}>
          <StandardQueryList
            form={this.renderQueryForm()}
            leftOperators={
              <Fragment>
                <Link to="/got-user/new">
                  <Button icon="plus" type="primary">
                    新建
                  </Button>
                </Link>
                {selectedRows.length > 0 && (
                  <span>
                    <Button>批量删除</Button>
                  </span>
                )}
              </Fragment>
            }
            rightOperators={
              <Fragment>
                <Button icon="close" onClick={() => this.handleFormReset()}>
                  重置
                </Button>
                <Button icon="search" type="primary" onClick={() => this.handleSearch()}>
                  查询
                </Button>
              </Fragment>
            }
            table={
              <StandardTable
                selectedRows={selectedRows}
                loading={loading}
                data={userList}
                rowKey="id"
                columns={this.columns}
                onSelectRow={rows => this.handleSelectRows(rows)}
                onChange={(...args) => this.handleStandardTableChange(...args)}
              />
            }
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserList;
