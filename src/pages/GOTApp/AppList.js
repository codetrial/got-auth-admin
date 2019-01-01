import React, { PureComponent, Fragment } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Card, Form, Input, Button, Row, Col, Divider, Modal, Tooltip } from 'antd';
import StandardTable from '@/components/StandardTable';
import StandardQueryList from '@/components/StandardQueryList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatFormValues, serializeSearchParam } from '@/utils/search';

// import styles from './AppList.less';

const FormItem = Form.Item;

@connect(({ gotApp, loading }) => ({
  app: gotApp,
  loading: loading.models.gotApp,
}))
@Form.create()
class AppList extends PureComponent {
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
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (text, row) => (
        <Fragment>
          <Link to={`/got-app/${row.id}`}>修改</Link>
          <Divider type="vertical" />
          <a onClick={() => this.handleDeleteApp(true, row)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'gotApp/search',
    });
  }

  handleDeleteApp() {
    const { dispatch } = this.props;

    Modal.confirm({
      title: '删除',
      content: '确定删除吗？（暂不生效）',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'gotApp/delete',
        });
      },
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
      type: 'gotApp/search',
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
      type: 'gotApp/search',
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
        type: 'gotApp/search',
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
            <FormItem label="应用方 ID">
              {getFieldDecorator('EQ_id')(<Input placeholder="请输入 ID" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="应用方 Code">
              {getFieldDecorator('EQ_code')(<Input placeholder="请输入 Code，精确查询" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="应用方名称">
              {getFieldDecorator('LIKE_name')(<Input placeholder="请输入名称，支持模糊查询" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      app: { appList },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper
        title="应用方列表"
        content="使用鉴权服务的相关系统，所有的资源、角色和分组都必须属于某个应用方。"
      >
        <Card bordered={false}>
          <StandardQueryList
            form={this.renderQueryForm()}
            leftOperators={
              <Fragment>
                <Link to="/got-app/new">
                  <Button icon="plus" type="primary">
                    新建
                  </Button>
                </Link>
                {selectedRows.length > 0 && (
                  <span>
                    <Tooltip placement="topLeft" title="暂不支持">
                      <Button>批量删除</Button>
                    </Tooltip>
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
                data={appList}
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

export default AppList;
