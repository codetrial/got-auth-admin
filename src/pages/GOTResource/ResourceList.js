import React, { PureComponent, Fragment } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Card, Form, Input, Button, Row, Col, Divider, Modal, Tooltip } from 'antd';
import StandardTable from '@/components/StandardTable';
import StandardQueryList from '@/components/StandardQueryList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatFormValues, serializeSearchParam } from '@/utils/search';

// import styles from './ResourceList.less';

const FormItem = Form.Item;

@connect(({ gotResource, loading }) => ({
  resource: gotResource,
  loading: loading.models.gotResource,
}))
@Form.create()
class ResourceList extends PureComponent {
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
      title: '应用方',
      dataIndex: 'app_id',
    },
    {
      title: '资源类型',
      dataIndex: 'resource_type_id',
    },
    {
      title: '描述',
      dataIndex: 'detail',
    },
    {
      title: '操作',
      render: (text, row) => (
        <Fragment>
          <Link to={`/got-resource/${row.id}`}>修改</Link>
          <Divider type="vertical" />
          <a onClick={() => this.handleDeleteResource(true, row)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'gotResource/search',
    });
  }

  handleDeleteResource() {
    const { dispatch } = this.props;

    Modal.confirm({
      title: '删除',
      content: '确定删除吗？（暂不生效）',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'gotResource/delete',
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
      type: 'gotResource/search',
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
      type: 'gotResource/search',
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
        type: 'gotResource/search',
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
            <FormItem label="资源 ID">
              {getFieldDecorator('EQ_id')(<Input placeholder="请输入 ID" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="资源 Code">
              {getFieldDecorator('EQ_code')(<Input placeholder="请输入 Code，精确查询" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="应用方 ID">
              {getFieldDecorator('EQ_app_id')(<Input placeholder="请输入应用方 ID，精确查询" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      resource: { resourceList },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper
        title="资源列表"
        content="用于描述被鉴权的基本单元，可以被分成多种类型，比如 URI、按钮等。需要注意的是，资源不可以单独分配给用户。"
      >
        <Card bordered={false}>
          <StandardQueryList
            form={this.renderQueryForm()}
            leftOperators={
              <Fragment>
                <Link to="/got-resource/new">
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
                data={resourceList}
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

export default ResourceList;
