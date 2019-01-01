import React, { Component } from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Workspace.less';

class Workspace extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 600);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const { loading } = this.state;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <Card loading={loading}>
              <Card.Meta
                title="临冬城"
                description="临冬城（Winterfell）是史塔克家族祖传的城堡和权力的中心，被认为是北境的首府。其坐落于七大王国北方省份的中心，国王大道将其与君临和长城连接起来。"
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card loading={loading}>
              <Card.Meta
                title="君临城"
                description="君临（King's Landing）是七大王国的首都，位于维斯特洛东海岸，俯瞰黑水湾。是红堡和王国王座，铁王座的所在地。城市被城墙所环绕，城墙被都城守备队所驻守，或者称之为“金袍子”。"
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card loading={loading}>
              <Card.Meta
                title="阳戟城"
                description="阳戟城（Sunspear），是马泰尔家族的族堡，是多恩的首府。它位于绿血河以北，坐落于维斯特洛大陆的东南海岸，三面环海。多恩亲王的私人住所流水花园位于阳戟城以西三里格的海滩边。"
              />
            </Card>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.welcomeCard}>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
              <Tabs.TabPane tab="简介" key="views">
                <div>
                  故事发生在类似中世纪欧洲维斯特洛大陆上的七大王国中。在维斯特洛，四季中的每一个季节都持续几年，甚至数十年。
                  在小说故事发生之前的15年，七大国王卷入了一场被称为“劳勃叛乱”和“篡夺者战争”的内战。雷加·坦格利安王子诱拐了莱安娜·史塔克，
                  因而激怒了她的家人和已经与她订婚的劳勃·拜拉席恩
                  (这场战争以他命名)。当她的父亲和她的大哥，要求她的安全返回时，“疯王”
                  伊里斯·坦格利安二世处决了他们。她的二哥， 艾德，
                  加入了与他儿时一同在琼恩·艾林膝下当养子的好友劳勃·拜拉席恩的队伍，举起反旗向坦格利安王朝的统治发起挑战，
                  并通过一系列政治联姻以联合徒利家族和艾林家族
                  (艾德公爵与凯特琳·徒利以及琼恩·艾林与莱沙·徒利)。尽管强大的提利尔家族依旧支持铁王座，
                  但是由于国王之前对于他们家族的冒犯，兰尼斯特家族和马泰尔家族都按兵不动。战事在三叉戟河之战时达到高潮，在战斗中，雷加王子被劳勃·拜拉席恩击杀。这时兰尼斯特终于同意支持伊里斯国王，但最终却背叛了他，导致了君临沦陷。
                  御林铁卫詹姆·兰尼斯特杀死了伊里斯国王，兰尼斯特家族转而效忠劳勃。提利尔们和其他支持国王的家族在劳勃称王的时候投降了。但不幸的是，莱安娜·史塔克在战争中似乎是因病去世了，而劳勃·拜拉席恩娶了瑟曦·兰尼斯特以巩固与兰尼斯特的联盟。尽管劳勃胜利了，
                  疯王最小的儿子韦赛里斯和小女儿丹妮莉丝依然被剩下的忠臣安全地送到了狭海的对岸。由于道朗亲王的妹妹，伊莉亚·马泰尔
                  (雷加王子的妻子)
                  和她年幼的孩子在君临沦陷时被兰尼斯特军队杀死，在战争之后马泰尔家族选择保持独立。
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Card>
      </GridContent>
    );
  }
}

export default Workspace;
