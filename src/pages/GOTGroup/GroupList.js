import React, { PureComponent, Fragment } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Card, Form, Input, Button, Row, Col, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import StandardQueryList from '@/components/StandardQueryList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatFormValues, serializeSearchParam } from '@/utils/search';

// import styles from './GroupList.less';

const FormItem = Form.Item;

@connect(({ gotGroup, loading }) => ({
  group: gotGroup,
  loading: loading.models.gotGroup,
}))
@Form.create()
class GroupList extends PureComponent {
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
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (text, row) => (
        <Fragment>
          <Link to={`/got-group/${row.id}`}>修改</Link>
          <Divider type="vertical" />
          <a onClick={() => this.handleDeleteGroup(true, row)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'gotGroup/search',
    });
  }

  handleDeleteGroup() {
    const { dispatch } = this.props;

    dispatch({
      type: 'gotGroup/delete',
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
      type: 'gotGroup/search',
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
      type: 'gotGroup/search',
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
        type: 'gotGroup/search',
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
            <FormItem label="分组 ID">
              {getFieldDecorator('EQ_id')(<Input placeholder="请输入 ID" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="分组 Code">
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
      group: { groupList },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper
        title="分组列表"
        content="把多个角色聚合为一个分组，从而可以更快的进行授权。本身也可以单独用于鉴权。可以直接分配给用户。"
      >
        <Card bordered={false}>
          <StandardQueryList
            form={this.renderQueryForm()}
            leftOperators={
              <Fragment>
                <Link to="/got-group/new">
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
                data={groupList}
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

export default GroupList;
